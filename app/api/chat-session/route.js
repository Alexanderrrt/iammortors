import { cookies } from "next/headers";
import {
  CHAT_SESSION_COOKIE,
  chatSessionConfigured,
  chatSessionCookieOptions,
  issueChatSession,
  turnstileConfigured,
  verifyChatSession,
} from "../../../lib/chat-session";

export const dynamic = "force-dynamic";

// Ensures the visitor has a signed chat session cookie before they can save a
// lead, upload photos, or reserve an appointment. Idempotent: an existing valid
// session is reused rather than reissued.
export async function POST() {
  if (!chatSessionConfigured()) {
    return Response.json(
      { ok: false, error: "Booking is not configured on this server.", code: "chat_not_configured" },
      { status: 503 },
    );
  }

  const store = cookies();
  const existing = await verifyChatSession(store.get(CHAT_SESSION_COOKIE)?.value);
  if (existing) {
    return Response.json({ ok: true, expiresAt: existing.expiresAt });
  }

  // No Turnstile widget ships in this build, so a session is challenge-verified
  // unless a Turnstile secret is configured (which would require the widget).
  const { token, session } = await issueChatSession({ challengeVerified: !turnstileConfigured() });
  store.set(CHAT_SESSION_COOKIE, token, chatSessionCookieOptions(session.exp));
  return Response.json({ ok: true, expiresAt: session.exp });
}
