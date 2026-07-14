import { cookies } from "next/headers";
import { randomUUID } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { verifySession, SESSION_COOKIE } from "../../../../lib/auth";
import { getPricing, setPricing } from "../../../../lib/pricing-store";
import { sanitizePricing } from "../../../../lib/pricing-validate";
import { estimateTotal } from "../../../../lib/quote";
import { BUCKET, MAX_PHOTOS, createTraining, listTraining, setTrainingStatus, trainingStoreConfigured } from "../../../../lib/training-store";

export const dynamic = "force-dynamic";
export const maxDuration = 30;
const MAX_BYTES = 8 * 1024 * 1024;
const EXT = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif", "image/heic": "heic", "image/heif": "heif" };

async function auth() { return verifySession(cookies().get(SESSION_COOKIE)?.value); }
function json(body, status = 200) { return Response.json(body, { status, headers: { "Cache-Control": "no-store" } }); }
function storage() { return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } }); }
async function ensureBucket(supa) { const { error } = await supa.storage.createBucket(BUCKET, { public: true }); if (error && !/exist/i.test(error.message || "")) throw new Error(error.message); }

function compactPricing(pricing) {
  return { laborRate: pricing.laborRate, rangePct: pricing.rangePct, currency: pricing.currency, vehicleClasses: pricing.vehicleClasses, services: pricing.services, disclaimer: pricing.disclaimer };
}

async function aiProposal(pricing, examples) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return { pricing: null, source: "deterministic" };
  const approved = examples.filter((x) => x.status === "approved").slice(0, 80);
  const prompt = [
    "You are the pricing rules analyst for an auto repair shop.",
    "Refine the pricing JSON using only the staff-approved examples below. Preserve every id, label, model, currency, disclaimer, and valid JSON shape. Adjust only numeric pricing fields and rangePct/laborRate when the examples justify it. Do not invent services. Keep all numbers non-negative. Return JSON with exactly one key: pricing.",
    `CURRENT_PRICING=${JSON.stringify(compactPricing(pricing))}`,
    `APPROVED_EXAMPLES=${JSON.stringify(approved.map((x) => ({ vehicleClassId: x.vehicleClassId, vehicleText: x.vehicleText, serviceId: x.serviceId, approvedLow: x.approvedLow, approvedHigh: x.approvedHigh, inspectionNotes: x.inspectionNotes })))}`,
  ].join("\n");
  const content = [{ type: "text", text: prompt }];
  for (const example of approved) {
    for (const photo of example.photos.slice(0, 2)) {
      if (typeof photo === "string" && (photo.startsWith("https://") || photo.startsWith("data:image/"))) {
        content.push({ type: "image_url", image_url: { url: photo } });
      }
    }
  }
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST", headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: "meta-llama/llama-4-scout-17b-16e-instruct", temperature: 0.1, response_format: { type: "json_object" }, messages: [{ role: "system", content: "Return machine-readable JSON only. Use the attached job photos as visual evidence, but never override staff-entered approved prices." }, { role: "user", content }] }),
    signal: AbortSignal.timeout(25000),
  });
  if (!response.ok) throw new Error(`AI proposal failed (${response.status}).`);
  const data = await response.json();
  const raw = data?.choices?.[0]?.message?.content;
  const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
  return { pricing: sanitizePricing(parsed?.pricing), source: "groq-llama-4-scout" };
}

export async function GET() {
  if (!(await auth())) return json({ error: "Unauthorized." }, 401);
  try { return json({ ok: true, examples: await listTraining(), storeConfigured: trainingStoreConfigured() }); }
  catch (e) { return json({ error: e.message }, 503); }
}

export async function POST(request) {
  if (!(await auth())) return json({ error: "Unauthorized." }, 401);
  let form;
  try { form = await request.formData(); } catch { return json({ error: "Invalid training form." }, 400); }
  const files = form.getAll("photos").filter((item) => item && typeof item.arrayBuffer === "function");
  if (files.length > MAX_PHOTOS) return json({ error: `Up to ${MAX_PHOTOS} photos.` }, 400);
  for (const file of files) if (!EXT[file.type] || file.size > MAX_BYTES) return json({ error: "Use JPG, PNG, WebP, GIF, or HEIC images under 8 MB each." }, 415);
  const photos = [];
  try {
    if (trainingStoreConfigured() && files.length) {
      const supa = storage(); await ensureBucket(supa);
      for (const file of files) { const path = `training/${randomUUID()}.${EXT[file.type]}`; const { error } = await supa.storage.from(BUCKET).upload(path, Buffer.from(await file.arrayBuffer()), { contentType: file.type, upsert: false }); if (error) throw new Error(error.message); photos.push(supa.storage.from(BUCKET).getPublicUrl(path).data.publicUrl); }
    } else {
      for (const file of files) photos.push(`data:${file.type};base64,${Buffer.from(await file.arrayBuffer()).toString("base64")}`);
    }
    return json({ ok: true, example: await createTraining({ vehicleClassId: form.get("vehicleClassId"), vehicleText: form.get("vehicleText"), serviceId: form.get("serviceId"), approvedLow: form.get("approvedLow"), approvedHigh: form.get("approvedHigh"), inspectionNotes: form.get("inspectionNotes"), photos }) });
  } catch (e) { return json({ error: e.message || "Could not save training example." }, 503); }
}

export async function PATCH(request) {
  if (!(await auth())) return json({ error: "Unauthorized." }, 401);
  const body = await request.json().catch(() => ({}));
  try {
    if (body.action === "status") {
      const example = await setTrainingStatus(body.id, body.status, body.staffNotes);
      if (body.status !== "approved") return json({ ok: true, example });
      const pricing = await getPricing();
      const examples = await listTraining();
      let proposal;
      try { proposal = await aiProposal(pricing, examples); }
      catch { proposal = { pricing: null, source: "deterministic" }; }
      if (!proposal.pricing) {
        // Safe fallback when the AI is unavailable: use the same approved-example
        // refinement path as the review button below.
        proposal = await buildDeterministicProposal(pricing, examples);
      }
      return json({ ok: true, example, proposedPricing: proposal.pricing, proposalSource: proposal.source });
    }
    if (body.action === "proposal") {
      const pricing = await getPricing(); const examples = (await listTraining()).filter((x) => x.status === "approved");
      const proposal = await aiProposal(pricing, examples);
      if (proposal.pricing) return json({ ok: true, proposedPricing: proposal.pricing, proposalSource: proposal.source, exampleCount: examples.length });
      const fallback = await buildDeterministicProposal(pricing, examples);
      return json({ ok: true, proposedPricing: fallback.pricing, adjustments: fallback.adjustments, proposalSource: fallback.source, exampleCount: examples.length });
    }
    if (body.action === "apply") { const clean = sanitizePricing(body.pricing); const result = await setPricing(clean); return json({ ok: true, persisted: result.persisted }); }
    return json({ error: "Unknown action." }, 400);
  } catch (e) { return json({ error: e.message || "Training action failed." }, 422); }
}

async function buildDeterministicProposal(pricing, examples) {
      const proposed = structuredClone(pricing); const adjustments = [];
      for (const service of proposed.services) {
        const matches = examples.filter((x) => x.serviceId === service.id && x.vehicleClassId === "sedan");
        if (!matches.length) continue;
        const actual = matches.reduce((sum, x) => sum + (x.approvedLow + x.approvedHigh) / 2, 0) / matches.length;
        const current = estimateTotal(pricing, "sedan", { [service.id]: { selected: true } }).subtotal;
        if (!current || !Number.isFinite(actual)) continue;
        const factor = Math.max(0.5, Math.min(2, actual / current));
        if (service.model === "labor") { service.partsBase = Math.round(service.partsBase * factor); service.laborHours = Math.round(service.laborHours * factor * 10) / 10; }
        else if (service.model === "flat") service.flatPrice = Math.round(service.flatPrice * factor);
        else if (service.model === "perUnit") service.basePrice = Math.round(service.basePrice * factor);
        else if (service.model === "options") service.options = service.options.map((o) => ({ ...o, price: Math.round(o.price * factor) }));
        adjustments.push({ serviceId: service.id, examples: matches.length, factor: Math.round(factor * 100) / 100 });
      }
      return { pricing: sanitizePricing(proposed), adjustments, source: "deterministic" };
}
