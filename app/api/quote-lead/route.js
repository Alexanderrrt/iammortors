import { CHAT_SESSION_COOKIE, turnstileConfigured, verifyChatSession } from "../../../lib/chat-session";
import { checkChatRateLimits, getClientIp } from "../../../lib/chat-rate-limit";
import { saveQuoteLead } from "../../../lib/booking-store";

export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 200_000; // generous — data-URL photos may ride along in dev

function json(body, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store, max-age=0" } });
}

export async function POST(request) {
  const session = await verifyChatSession(request.cookies?.get?.(CHAT_SESSION_COOKIE)?.value || "");
  if (!session || (turnstileConfigured() && !session.challengeVerified)) {
    return json({ ok: false, error: "Please start a new session.", code: "invalid_session" }, 401);
  }

  const rate = await checkChatRateLimits({ ip: getClientIp(request), sessionId: session.id });
  if (!rate.allowed) {
    return json({ ok: false, error: "Too many requests. Please wait and try again.", code: "rate_limited" }, 429);
  }

  const text = await request.text();
  if (new TextEncoder().encode(text).byteLength > MAX_BODY_BYTES) {
    return json({ ok: false, error: "Request too large.", code: "too_large" }, 413);
  }

  let body;
  try {
    body = JSON.parse(text);
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("shape");
  } catch {
    return json({ ok: false, error: "Invalid request.", code: "invalid_json" }, 400);
  }

  const name = typeof body.name === "string" ? body.name : "";
  const phone = typeof body.phone === "string" ? body.phone : "";
  if (!name.trim() || !phone.trim()) {
    return json({ ok: false, error: "Name and phone are required.", code: "missing_contact" }, 422);
  }

  try {
    const result = await saveQuoteLead({
      sessionId: session.id,
      lang: body.lang === "es" ? "es" : "en",
      customerName: name,
      phone,
      vehicle: typeof body.vehicle === "string" ? body.vehicle : "",
      service: typeof body.service === "string" ? body.service : "",
      summary: typeof body.summary === "string" ? body.summary : "",
      photos: Array.isArray(body.photos) ? body.photos : [],
    });
    return json({ ok: true, persisted: result.persisted });
  } catch (error) {
    return json({ ok: false, error: "Could not save your details.", code: error.code || "save_failed" }, 503);
  }
}
