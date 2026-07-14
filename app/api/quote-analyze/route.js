import { getPricing } from "../../../lib/pricing-store";
import { CHAT_SESSION_COOKIE, turnstileConfigured, verifyChatSession } from "../../../lib/chat-session";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

const MODEL = "meta-llama/llama-4-scout-17b-16e-instruct";
const MAX_FILES = 5;
const MAX_BYTES = 4 * 1024 * 1024;
const MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function json(body, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store, max-age=0" } });
}

const labelFor = (value, lang) => (value ? value[lang] || value.en : "");

function buildPrompt(pricing, lang) {
  const classes = pricing.vehicleClasses
    .map((item) => `${item.id}: ${labelFor(item.label, lang)}`)
    .join(", ");
  const services = pricing.services
    .map((item) => `${item.id}: ${labelFor(item.label, lang)}`)
    .join(", ");

  return `You inspect auto-body damage photos for an online estimator. Return JSON only.
Use only these vehicle class ids: ${classes}
Use only these service ids: ${services}
Identify the closest vehicle class, describe visible damage briefly, and select one or more applicable services. Do not invent a price. If the photo is unclear, choose the closest likely option and lower confidence.
Return exactly this shape: {"vehicleClassId":"string","vehicleText":"string","services":[{"serviceId":"string","qty":1,"optionId":"string"}],"summary":"string","confidence":"low|medium|high"}
Omit qty and optionId when they are not needed. Language: ${lang === "es" ? "Spanish" : "English"}.`;
}

function parseResult(text, pricing) {
  let value;
  try {
    value = JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    try {
      value = match ? JSON.parse(match[0]) : null;
    } catch {
      value = null;
    }
  }
  if (!value || typeof value !== "object") throw new Error("invalid_analysis");

  const vehicleClassId = pricing.vehicleClasses.some((item) => item.id === value.vehicleClassId)
    ? value.vehicleClassId
    : pricing.vehicleClasses[0]?.id;
  const services = Array.isArray(value.services)
    ? value.services
        .filter((item) => item && pricing.services.some((service) => service.id === item.serviceId))
        .map((item) => ({
          serviceId: item.serviceId,
          ...(Number.isFinite(item.qty) ? { qty: item.qty } : {}),
          ...(typeof item.optionId === "string" ? { optionId: item.optionId } : {}),
        }))
        .slice(0, 6)
    : [];
  if (!vehicleClassId || !services.length) throw new Error("insufficient_analysis");

  return {
    vehicleClassId,
    vehicleText: typeof value.vehicleText === "string" ? value.vehicleText.slice(0, 120) : "",
    services,
    summary: typeof value.summary === "string" ? value.summary.slice(0, 400) : "",
    confidence: ["low", "medium", "high"].includes(value.confidence) ? value.confidence : "low",
  };
}

export async function POST(request) {
  const session = await verifyChatSession(request.cookies?.get?.(CHAT_SESSION_COOKIE)?.value || "");
  if (!session || (turnstileConfigured() && !session.challengeVerified)) {
    return json({ ok: false, error: "Please complete the security check first.", code: "turnstile_required" }, 401);
  }

  if (!process.env.GROQ_API_KEY) return json({ ok: false, error: "Vision analysis is not configured." }, 500);

  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, error: "Invalid image upload." }, 400);
  }

  const lang = form.get("lang") === "es" ? "es" : "en";
  const files = form.getAll("photos").filter((item) => item && typeof item.arrayBuffer === "function");
  if (!files.length) return json({ ok: false, error: "Please add a vehicle photo." }, 400);
  if (files.length > MAX_FILES) return json({ ok: false, error: `Up to ${MAX_FILES} photos.` }, 400);
  if (files.some((file) => !MIME_TYPES.has(file.type) || file.size > MAX_BYTES)) {
    return json({ ok: false, error: "Use JPG, PNG, or WebP images under 4 MB each." }, 415);
  }

  const images = await Promise.all(
    files.map(async (file) => `data:${file.type};base64,${Buffer.from(await file.arrayBuffer()).toString("base64")}`),
  );
  const pricing = await getPricing();
  const content = [
    { type: "text", text: buildPrompt(pricing, lang) },
    ...images.map((image_url) => ({ type: "image_url", image_url: { url: image_url } })),
  ];

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "user", content }],
        temperature: 0.1,
        max_tokens: 500,
        response_format: { type: "json_object" },
      }),
      cache: "no-store",
    });
    const payload = await response.json().catch(() => null);
    if (!response.ok) throw new Error(payload?.error?.message || "vision_request_failed");
    const result = parseResult(payload?.choices?.[0]?.message?.content || "", pricing);
    return json({ ok: true, analysis: result });
  } catch (error) {
    console.error("quote image analysis failed", error);
    return json({ ok: false, error: "We could not read that photo. Try a clearer image or describe the damage." }, 502);
  }
}
