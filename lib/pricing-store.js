import { createClient } from "@supabase/supabase-js";
import { DEFAULT_PRICING } from "./pricing.default.js";

// Pricing persistence. Uses Supabase (service-role key, server-side only) when
// configured; otherwise falls back to the bundled default for reads and an
// in-memory copy for writes so the whole flow works in dev without keys.

const TABLE = "pricing";
const ROW_ID = 1;

let devMemory = null; // dev-only in-memory store when Supabase isn't configured

const stripBom = (s) => (typeof s === "string" ? s.replace(/^﻿/, "") : s);

export function storeConfigured() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function client() {
  return createClient(
    stripBom(process.env.SUPABASE_URL),
    stripBom(process.env.SUPABASE_SERVICE_ROLE_KEY),
    { auth: { persistSession: false } },
  );
}

// A stored document is only usable if it has the core shape; otherwise
// (e.g. the empty seed row) fall back to the bundled defaults.
function isValidPricing(p) {
  return p && Array.isArray(p.services) && Array.isArray(p.vehicleClasses) && p.services.length > 0;
}

// Upgrade older stored documents in memory without overwriting any price the
// shop edited. New services are appended and new uncertainty fields are
// backfilled from code defaults until the admin saves them explicitly.
export function mergePricingDefaults(stored) {
  const defaultsById = new Map(DEFAULT_PRICING.services.map((service) => [service.id, service]));
  const have = new Set(stored.services.map((s) => s.id));
  const missing = DEFAULT_PRICING.services.filter((s) => !have.has(s.id));
  const services = stored.services.map((service) => {
    if (Number.isFinite(service.rangePct)) return service;
    const fallback = defaultsById.get(service.id);
    return { ...service, rangePct: fallback?.rangePct ?? stored.rangePct ?? DEFAULT_PRICING.rangePct };
  });

  const legacyDisclaimer = {
    en: "This is an estimate only. Final price is confirmed at the shop after we check your vehicle.",
    es: "Esto es solo un estimado. El precio final se confirma en el taller después de revisar su vehículo.",
  };
  const disclaimer = {
    en: !stored.disclaimer?.en || stored.disclaimer.en === legacyDisclaimer.en
      ? DEFAULT_PRICING.disclaimer.en
      : stored.disclaimer.en,
    es: !stored.disclaimer?.es || stored.disclaimer.es === legacyDisclaimer.es
      ? DEFAULT_PRICING.disclaimer.es
      : stored.disclaimer.es,
  };

  return { ...stored, services: [...services, ...missing], disclaimer };
}

export async function getPricing() {
  if (!storeConfigured()) {
    return devMemory || DEFAULT_PRICING;
  }
  try {
    const { data, error } = await client().from(TABLE).select("data").eq("id", ROW_ID).single();
    if (error || !isValidPricing(data?.data)) return DEFAULT_PRICING;
    return mergePricingDefaults(data.data);
  } catch {
    return DEFAULT_PRICING;
  }
}

export async function setPricing(pricing) {
  if (!storeConfigured()) {
    devMemory = pricing; // non-persistent, dev only
    return { ok: true, persisted: false };
  }
  const { error } = await client()
    .from(TABLE)
    .upsert({ id: ROW_ID, data: pricing, updated_at: new Date().toISOString() });
  if (error) throw new Error(error.message);
  return { ok: true, persisted: true };
}
