import { groq } from "@ai-sdk/groq";
import { streamText, tool, convertToModelMessages, stepCountIs } from "ai";
import { z } from "zod";
import { getPricing } from "../../../lib/pricing-store";
import { getLeadLearningRecords } from "../../../lib/booking-store";
import { estimateTotal, buildWhatsAppMessage } from "../../../lib/quote";
import { detectServiceIntents, detectUnpricedServiceIntents, detectVehicleClassId, extractUserTexts, inferVehicleClassId, routeServices, buildLeadLearningContext, needsBodyDamageClarification, sanitizeImageAnalysis } from "../../../lib/quote-intelligence";
import { SITE } from "../../site.config";
import { CHAT_SESSION_COOKIE, turnstileConfigured, verifyChatSession } from "../../../lib/chat-session";
import { checkChatRateLimits, getClientIp } from "../../../lib/chat-rate-limit";

// The chatbot never invents prices. The model only extracts what the customer
// wants (vehicle class + services); the `computeQuote` tool runs the same
// deterministic engine the /quote form uses, so every number is grounded in
// the live pricing document.

export const dynamic = "force-dynamic";
export const maxDuration = 30;

const MODEL = "meta-llama/llama-4-scout-17b-16e-instruct";
const MAX_BODY_BYTES = 250_000;
const MAX_MESSAGE_BYTES = 24_000;

const pick = (obj, lang) => (obj ? obj[lang] || obj.en : "");

// Describe the shop's real services/classes so the model can only choose
// from what actually exists (ids match the pricing document).
function buildSystemPrompt(pricing, lang) {
  const classes = pricing.vehicleClasses
    .map((c) => `- ${c.id}: ${pick(c.label, lang)}`)
    .join("\n");

  const services = pricing.services
    .map((s) => {
      let extra = "";
      if (s.model === "options" && Array.isArray(s.options)) {
        extra =
          " (needs optionId, one of: " +
          s.options.map((o) => `${o.id}=${pick(o.label, lang)}`).join(", ") +
          ")";
      } else if (s.model === "perUnit") {
        extra = " (accepts a qty)";
      }
      return `- ${s.id}: ${pick(s.label, lang)}${extra}`;
    })
    .join("\n");

  const langName = lang === "es" ? "Spanish" : "English";

  return `You are the friendly online estimator for ${SITE.name}, an auto body shop.
Your job: chat with the customer, figure out their vehicle and what repairs they need, then produce a price estimate by calling the computeQuote tool.

STRICT RULES ABOUT PRICES:
- You must NEVER state, guess, calculate, or negotiate a dollar amount yourself.
- The ONLY way a price reaches the customer is by calling the computeQuote tool. The app shows the tool's result to the customer as a price card.
- Every result is a preliminary range whose width reflects how much that service can vary. Never describe it as a fixed price or imply that it is guaranteed before inspection.
- If you don't yet know the vehicle type or what service they need, ask a short, friendly question. Do not call the tool until you have at least the vehicle class and one service.
- Only ever reference services and vehicle classes from the lists below (use the exact ids when calling the tool). If a customer asks for something not on the list, say the shop will confirm it in person and offer to estimate the closest listed services.
- Never force an unpriced request into a vaguely similar service merely to produce a number. Quote supported services only and clearly say the remaining work needs shop confirmation.
- Prefer the most specific listed service. Never substitute mechanical-repair for oil changes, diagnostics, brakes, suspension, cooling, batteries, wheel alignment, or scheduled maintenance.
- If the customer gives a year, make, and model, infer the closest class and continue; do not ask them whether it is a sedan/SUV/truck unless the model is genuinely unknown.
- If a glass request does not identify windshield, door window, or rear window, ask one short clarification before estimating.
- For collision, dent, paint, or frame work, do not estimate from only a generic service name. First get one useful detail such as the damaged area, visible damage, what happened, or a photo.
- If the request is vague (for example, only "it makes a noise"), ask one focused symptom question instead of guessing an expensive repair.
- Never show a $0 estimate. For insurance-only handling or a service without a usable price, explain that the shop must confirm it directly.

VEHICLE CLASSES (pick the closest id from the customer's description):
${classes}

SERVICES:
${services}

STYLE:
- Reply in ${langName}. Keep messages short and warm — you're texting a busy customer.
- When the customer describes damage (e.g. "someone dented my door"), map it to the right service(s) and pick the vehicle class from their car ("Camry" -> sedan, "F-150" -> suv_truck, etc.). Confirm briefly if unsure.
- Never expose internal ids such as luxury_perf, suv_truck, oil-change, or brake-service. Use natural customer-facing labels only.
- Once the vehicle and service are known, call computeQuote immediately. Do not narrate your internal classification or ask the customer to confirm a class the server already verified.
- After the tool returns, give a one-line friendly summary and tell them they can tap the WhatsApp button to lock in the real price with the shop. Do not restate the exact dollar figures — the card already shows them.`;
}

export async function POST(req) {
  const session = await verifyChatSession(req.cookies?.get?.(CHAT_SESSION_COOKIE)?.value || "");
  if (!session || (turnstileConfigured() && !session.challengeVerified)) {
    return Response.json({ error: "Please complete the security check first.", code: "turnstile_required" }, { status: 401 });
  }

  if (!process.env.GROQ_API_KEY) {
    return Response.json(
      { error: "GROQ_API_KEY is not set on the server." },
      { status: 500 },
    );
  }

  const rate = await checkChatRateLimits({ ip: getClientIp(req), sessionId: session.id });
  if (!rate.allowed) {
    return Response.json(
      { error: "Too many requests. Please wait and try again.", code: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(rate.retryAfter), "Cache-Control": "no-store" } },
    );
  }

  const declaredLength = Number(req.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return Response.json({ error: "Chat request is too large.", code: "too_large" }, { status: 413 });
  }

  let body;
  try {
    const text = await req.text();
    if (new TextEncoder().encode(text).byteLength > MAX_BODY_BYTES) {
      return Response.json({ error: "Chat request is too large.", code: "too_large" }, { status: 413 });
    }
    body = JSON.parse(text);
  } catch {
    return Response.json({ error: "Invalid chat request." }, { status: 400 });
  }
  const { messages, lang = "en", imageAnalysis } = body || {};
  if (
    !Array.isArray(messages) ||
    messages.length > 50 ||
    messages.some((message) =>
      !message ||
      typeof message !== "object" ||
      !["user", "assistant"].includes(message.role) ||
      new TextEncoder().encode(JSON.stringify(message)).byteLength > MAX_MESSAGE_BYTES
    )
  ) {
    return Response.json({ error: "Invalid or oversized chat history." }, { status: 400 });
  }
  const pricing = await getPricing();
  const learnedLeadContext = buildLeadLearningContext(await getLeadLearningRecords());
  const detectedIntent = detectServiceIntents(messages, pricing);
  const unpricedIntents = detectUnpricedServiceIntents(messages);
  const trustedImageAnalysis = sanitizeImageAnalysis(imageAnalysis, pricing);
  const userTexts = extractUserTexts(messages);
  const latestUserText = (userTexts[userTexts.length - 1] || "").slice(0, 500);
  const detectedVehicleClassId = [...userTexts]
    .reverse()
    .map((text) => detectVehicleClassId(pricing, text))
    .find(Boolean) || "";
  const detectedIntentContext = detectedIntent.services.length
    ? `\nSERVER_VERIFIED_SERVICE_INTENTS=${JSON.stringify(detectedIntent.services)}\nUse these exact service ids when calling computeQuote. They override conflicting model guesses.`
    : "";
  const detectedVehicleContext = detectedVehicleClassId
    ? `\nSERVER_VERIFIED_VEHICLE_CLASS=${detectedVehicleClassId}\nUse this exact class id when calling computeQuote. Do not mention the id to the customer.`
    : "";
  const unpricedIntentContext = unpricedIntents.length
    ? `\nSERVER_VERIFIED_UNPRICED_REQUESTS=${JSON.stringify(unpricedIntents)}\nDo not map these requests to a priced service. If supported requests also exist, quote only those; otherwise explain that the shop must inspect and confirm pricing.`
    : "";
  const authoritativeServices = detectedIntent.services.length
    ? detectedIntent.services
    : trustedImageAnalysis?.services || [];
  const authoritativeVehicleClassId = detectedVehicleClassId || trustedImageAnalysis?.vehicleClassId || "";
  const needsOptionClarification = authoritativeServices.some((selection) => {
    const service = pricing.services.find((candidate) => candidate.id === selection.serviceId);
    return service?.model === "options" && !service.options?.some((option) => option.id === selection.optionId);
  });
  const needsDamageClarification = needsBodyDamageClarification(
    messages,
    authoritativeServices.map((service) => service.serviceId),
    Boolean(trustedImageAnalysis),
  );
  const mustComputeQuote = Boolean(
    authoritativeVehicleClassId &&
    authoritativeServices.length &&
    !needsOptionClarification &&
    !needsDamageClarification,
  );

  const computeQuote = tool({
    description:
      "Compute a real price estimate for the customer's selected repairs. " +
      "Call this once you know the vehicle class and at least one service. " +
      "This is the ONLY source of prices.",
    inputSchema: z.object({
      vehicleClassId: z
        .string()
        .refine((id) => pricing.vehicleClasses.some((vehicleClass) => vehicleClass.id === id), "Unknown vehicle class id.")
        .describe("One of the vehicle class ids from the system prompt."),
      vehicleText: z
        .string()
        .optional()
        .describe("The customer's own words for their vehicle, e.g. '2018 Toyota Camry'."),
      services: z
        .array(
          z.object({
            serviceId: z
              .string()
              .refine((id) => pricing.services.some((service) => service.id === id), "Unknown service id.")
              .describe("A service id from the system prompt."),
            qty: z.number().optional().describe("Quantity, for per-unit services."),
            optionId: z
              .string()
              .optional()
              .describe("Option id, required for services that list options (e.g. glass)."),
          }),
        )
        .min(1)
        .describe("The services the customer wants estimated."),
    }),
    execute: async ({ vehicleClassId, vehicleText, services }) => {
      if (unpricedIntents.length && !detectedIntent.services.length) {
        return {
          hasSelection: false,
          contactRequired: true,
          unpricedRequests: unpricedIntents.map((intent) => intent.label),
          currency: pricing.currency,
          low: 0,
          high: 0,
          lines: [],
          vehicleClassLabel: "",
          vehicleText: vehicleText || "",
          disclaimer: pick(pricing.disclaimer, lang),
          whatsapp: null,
        };
      }
      const normalizedVehicleClassId = detectedVehicleClassId || inferVehicleClassId(pricing, vehicleClassId, vehicleText || latestUserText);
      const knownServiceIds = new Set(pricing.services.map((service) => service.id));
      const routedServices = routeServices(services, detectedIntent.services, pricing).filter((service) => knownServiceIds.has(service.serviceId));
      if (!routedServices.length) return { hasSelection: false, currency: pricing.currency, low: 0, high: 0, lines: [], vehicleClassLabel: "", vehicleText: vehicleText || "", disclaimer: pick(pricing.disclaimer, lang), whatsapp: null };

      if (needsBodyDamageClarification(messages, routedServices.map((service) => service.serviceId), Boolean(trustedImageAnalysis))) {
        return {
          hasSelection: false,
          needsClarification: true,
          clarification: lang === "es"
            ? "¿Qué parte del vehículo está dañada y qué daño puede ver? También puede agregar una foto."
            : "Which part of the vehicle is damaged, and what damage can you see? You can also add a photo.",
          currency: pricing.currency,
          low: 0,
          high: 0,
          lines: [],
          vehicleClassLabel: "",
          vehicleText: vehicleText || "",
          disclaimer: pick(pricing.disclaimer, lang),
          whatsapp: null,
        };
      }

      const unresolvedOption = routedServices.find((selection) => {
        const service = pricing.services.find((candidate) => candidate.id === selection.serviceId);
        return service?.model === "options" && !service.options?.some((option) => option.id === selection.optionId);
      });
      if (unresolvedOption) {
        return {
          hasSelection: false,
          needsClarification: true,
          clarification: lang === "es" ? "¿Es el parabrisas, una ventana de puerta o el vidrio trasero?" : "Is it the windshield, a door window, or the rear window?",
          currency: pricing.currency,
          low: 0,
          high: 0,
          lines: [],
          vehicleClassLabel: "",
          vehicleText: vehicleText || "",
          disclaimer: pick(pricing.disclaimer, lang),
          whatsapp: null,
        };
      }
      const selections = {};
      for (const s of routedServices) {
        selections[s.serviceId] = {
          selected: true,
          qty: s.qty,
          optionId: s.optionId,
        };
      }

      const result = estimateTotal(pricing, normalizedVehicleClassId, selections);
      const vc = pricing.vehicleClasses.find((c) => c.id === normalizedVehicleClassId);
      const contactRequired = result.hasSelection && result.subtotal <= 0;

      const whatsappText = result.hasSelection && !contactRequired
        ? buildWhatsAppMessage({ pricing, lang, vehicleClass: normalizedVehicleClassId, vehicleText, result })
        : "";

      // Structured payload the client renders as the authoritative price card.
      return {
        hasSelection: result.hasSelection && !contactRequired,
        contactRequired,
        unpricedRequests: unpricedIntents.map((intent) => intent.label),
        currency: pricing.currency,
        low: result.low,
        high: result.high,
        vehicleClassLabel: vc ? pick(vc.label, lang) : "",
        vehicleText: vehicleText || "",
        lines: result.lines.map((l) => ({
          label: pick(l.label, lang),
          amount: l.amount,
          low: l.low,
          high: l.high,
        })),
        disclaimer: pick(pricing.disclaimer, lang),
        whatsapp: whatsappText
          ? `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(whatsappText)}`
          : null,
      };
    },
  });

  const modelMessages = await convertToModelMessages(messages);
  if (trustedImageAnalysis) {
    modelMessages.push({
      role: "user",
      content: `A server-side photo inspection found this structured information. Treat it as customer context and call computeQuote using these ids; do not invent prices: ${JSON.stringify(trustedImageAnalysis)}`,
    });
  }

  const result = streamText({
    model: groq(MODEL),
    system: buildSystemPrompt(pricing, lang) + detectedIntentContext + detectedVehicleContext + unpricedIntentContext + learnedLeadContext,
    messages: modelMessages,
    tools: { computeQuote },
    stopWhen: stepCountIs(5),
    prepareStep: ({ stepNumber }) => ({
      toolChoice: mustComputeQuote && stepNumber === 0 ? "required" : "auto",
    }),
    temperature: 0.3,
  });

  return result.toUIMessageStreamResponse();
}
