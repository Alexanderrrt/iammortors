import { randomUUID } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { CHAT_SESSION_COOKIE, turnstileConfigured, verifyChatSession } from "../../../lib/chat-session";
import { checkChatRateLimits, getClientIp } from "../../../lib/chat-rate-limit";
import { recordsStoreConfigured } from "../../../lib/booking-store";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

const BUCKET = "quote-photos";
const MAX_FILES = 8;
const MAX_BYTES = 8 * 1024 * 1024; // 8 MB per photo
const EXT = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/heic": "heic",
  "image/heif": "heif",
};

let bucketReady = false;

function json(body, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store, max-age=0" } });
}

function cleanEnv(value) {
  return typeof value === "string" ? value.replace(/^﻿/, "").trim() : value;
}

function storageClient() {
  return createClient(cleanEnv(process.env.SUPABASE_URL), cleanEnv(process.env.SUPABASE_SERVICE_ROLE_KEY), {
    auth: { persistSession: false },
  });
}

async function ensureBucket(supa) {
  if (bucketReady) return;
  // createBucket is idempotent for our purposes: a "already exists" error is fine.
  const { error } = await supa.storage.createBucket(BUCKET, { public: true });
  if (error && !/exist/i.test(error.message || "")) throw new Error(error.message);
  bucketReady = true;
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

  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, error: "Invalid upload.", code: "invalid_form" }, 400);
  }

  const files = form.getAll("photos").filter((item) => item && typeof item.arrayBuffer === "function");
  if (!files.length) return json({ ok: false, error: "No photos provided.", code: "no_files" }, 400);
  if (files.length > MAX_FILES) return json({ ok: false, error: `Up to ${MAX_FILES} photos.`, code: "too_many" }, 400);

  for (const file of files) {
    if (!EXT[file.type]) return json({ ok: false, error: "Only JPG, PNG, WebP, GIF, or HEIC images.", code: "bad_type" }, 415);
    if (file.size > MAX_BYTES) return json({ ok: false, error: "Each photo must be under 8 MB.", code: "too_large" }, 413);
  }

  const persisted = recordsStoreConfigured();
  const urls = [];

  try {
    if (persisted) {
      const supa = storageClient();
      await ensureBucket(supa);
      for (const file of files) {
        const path = `${session.id}/${randomUUID()}.${EXT[file.type]}`;
        const buffer = Buffer.from(await file.arrayBuffer());
        const { error } = await supa.storage.from(BUCKET).upload(path, buffer, {
          contentType: file.type,
          upsert: false,
        });
        if (error) throw new Error(error.message);
        urls.push(supa.storage.from(BUCKET).getPublicUrl(path).data.publicUrl);
      }
    } else {
      // Dev fallback (no Supabase): return data URLs so the flow works end-to-end.
      for (const file of files) {
        const buffer = Buffer.from(await file.arrayBuffer());
        urls.push(`data:${file.type};base64,${buffer.toString("base64")}`);
      }
    }
  } catch {
    return json({ ok: false, error: "Photo upload failed. Please try again.", code: "upload_failed" }, 503);
  }

  return json({ ok: true, persisted, photos: urls });
}
