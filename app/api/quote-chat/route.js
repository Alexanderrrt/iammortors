import { groq } from "@ai-sdk/groq";
import { streamText, tool, convertToModelMessages, stepCountIs } from "ai";
import { z } from "zod";
import { getPricing } from "../../../lib/pricing-store";
import { estimateTotal, buildWhatsAppMessage } from "../../../lib/quote";
import { SITE } from "../../site.config";

// The chatbot never invents prices. The model only extracts what the customer
// wants (vehicle class + services); the `computeQuote` tool runs the same
// deterministic engine the /quote form uses, so every number is grounded in
// the live pricing document.

export const dynamic = "force-dynamic";
export const maxDuration = 30;

const MODEL = "llama-3.1-8b-instant";

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
- If you don't yet know the vehicle type or what service they need, ask a short, friendly question. Do not call the tool until you have at least the vehicle class and one service.
- Only ever reference services and vehicle classes from the lists below (use the exact ids when calling the tool). If a customer asks for something not on the list, say the shop will confirm it in person and offer to estimate the closest listed services.

VEHICLE CLASSES (pick the closest id from the customer's description):
${classes}

SERVICES:
${services}

STYLE:
- Reply in ${langName}. Keep messages short and warm — you're texting a busy customer.
- When the customer describes damage (e.g. "someone dented my door"), map it to the right service(s) and pick the vehicle class from their car ("Camry" -> sedan, "F-150" -> suv_truck, etc.). Confirm briefly if unsure.
- After the tool returns, give a one-line friendly summary and tell them they can tap the WhatsApp button to lock in the real price with the shop. Do not restate the exact dollar figures — the card already shows them.`;
}

export async function POST(req) {
  if (!process.env.GROQ_API_KEY) {
    return Response.json(
      { error: "GROQ_API_KEY is not set on the server." },
      { status: 500 },
    );
  }

  const { messages, lang = "en", imageAnalysis } = await req.json();
  const pricing = await getPricing();

  const computeQuote = tool({
    description:
      "Compute a real price estimate for the customer's selected repairs. " +
      "Call this once you know the vehicle class and at least one service. " +
      "This is the ONLY source of prices.",
    inputSchema: z.object({
      vehicleClassId: z
        .string()
        .describe("One of the vehicle class ids from the system prompt."),
      vehicleText: z
        .string()
        .optional()
        .describe("The customer's own words for their vehicle, e.g. '2018 Toyota Camry'."),
      services: z
        .array(
          z.object({
            serviceId: z.string().describe("A service id from the system prompt."),
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
      const selections = {};
      for (const s of services) {
        selections[s.serviceId] = {
          selected: true,
          qty: s.qty,
          optionId: s.optionId,
        };
      }

      const result = estimateTotal(pricing, vehicleClassId, selections);
      const vc = pricing.vehicleClasses.find((c) => c.id === vehicleClassId);

      const whatsappText = result.hasSelection
        ? buildWhatsAppMessage({ pricing, lang, vehicleClass: vehicleClassId, vehicleText, result })
        : "";

      // Structured payload the client renders as the authoritative price card.
      return {
        hasSelection: result.hasSelection,
        currency: pricing.currency,
        low: result.low,
        high: result.high,
        vehicleClassLabel: vc ? pick(vc.label, lang) : "",
        vehicleText: vehicleText || "",
        lines: result.lines.map((l) => ({
          label: pick(l.label, lang),
          amount: l.amount,
        })),
        disclaimer: pick(pricing.disclaimer, lang),
        whatsapp: whatsappText
          ? `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(whatsappText)}`
          : null,
      };
    },
  });

  const modelMessages = await convertToModelMessages(messages);
  if (imageAnalysis?.vehicleClassId && Array.isArray(imageAnalysis.services)) {
    modelMessages.push({
      role: "user",
      content: `A server-side photo inspection found this structured information. Treat it as customer context and call computeQuote using these ids; do not invent prices: ${JSON.stringify(imageAnalysis)}`,
    });
  }

  const result = streamText({
    model: groq(MODEL),
    system: buildSystemPrompt(pricing, lang),
    messages: modelMessages,
    tools: { computeQuote },
    stopWhen: stepCountIs(5),
    temperature: 0.3,
  });

  return result.toUIMessageStreamResponse();
}
