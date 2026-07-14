import { cookies } from "next/headers";
import {
  CHAT_SESSION_COOKIE,
  chatSessionConfigured,
  chatSessionCookieOptions,
  issueChatSession,
  turnstileConfigured,
  verifyChatSession,
  verifyTurnstileToken,
} from "../../../lib/chat-session";

export const dynamic = "force-dynamic";

// Ensures the visitor has a signed chat session cookie before they can save a
// lead, upload photos, or reserve an appointment. Idempotent: an existing valid
// session is reused rather than reissued.
export async function POST(request) {
  if (!chatSessionConfigured()) {
    return Response.json(
      { ok: false, error: "Booking is not configured on this server.", code: "chat_not_configured" },
      { status: 503 },
    );
  }

  const store = cookies();
  const existing = await verifyChatSession(store.get(CHAT_SESSION_COOKIE)?.value);
  if (existing && (!turnstileConfigured() || existing.challengeVerified)) {
    return Response.json({ ok: true, expiresAt: existing.expiresAt });
  }

  let body = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  let challengeVerified = !turnstileConfigured();
  if (turnstileConfigured()) {
    const forwarded = request.headers.get("x-forwarded-for") || "";
    const remoteIp = forwarded.split(",")[0].trim();
    const verification = await verifyTurnstileToken(body?.token, remoteIp);
    if (!verification.ok) {
      return Response.json(
        { ok: false, error: "Please complete the security check and try again.", code: "turnstile_required" },
        { status: 403 },
      );
    }
    challengeVerified = true;
  }

  const { token, session } = await issueChatSession({ challengeVerified });
  store.set(CHAT_SESSION_COOKIE, token, chatSessionCookieOptions(session.exp));
  return Response.json({ ok: true, expiresAt: session.exp });
}
