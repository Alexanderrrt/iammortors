// Pure quote engine — no React, no I/O, so it is unit-testable in plain node.
// Given the pricing document and a customer's selections, produce a price
// range and a human-readable breakdown.

import { SITE } from "../app/site.config.js";

function round5(n) {
  return Math.round(n / 5) * 5;
}

function classFactor(pricing, vehicleClassId) {
  const vc = pricing.vehicleClasses.find((c) => c.id === vehicleClassId);
  return vc ? vc.factor : 1;
}

// Subtotal for a single selected service. `sel` = { qty, optionId }.
export function serviceSubtotal(pricing, service, vehicleClassId, sel = {}) {
  const factor = service.appliesVehicleFactor ? classFactor(pricing, vehicleClassId) : 1;

  switch (service.model) {
    case "perUnit": {
      const qty = clampQty(service, sel.qty);
      const unit = service.basePrice * factor;
      const fees = (service.fees || []).reduce((sum, f) => {
        return sum + (f.per === "unit" ? f.amount * qty : f.amount);
      }, 0);
      return unit * qty + fees;
    }
    case "labor":
      return service.partsBase * factor + service.laborHours * factor * pricing.laborRate;
    case "options": {
      const opt =
        (service.options || []).find((o) => o.id === sel.optionId) || (service.options || [])[0];
      return opt ? opt.price * factor : 0;
    }
    case "flat":
    default:
      return (service.flatPrice || 0) * factor;
  }
}

export function clampQty(service, qty) {
  if (service.model !== "perUnit") return 1;
  const { min = 1, max = 4, default: def = 1 } = service.qty || {};
  const n = Number.isFinite(qty) ? qty : def;
  return Math.min(max, Math.max(min, Math.round(n)));
}

// selections: { [serviceId]: { selected, qty, optionId } }
export function estimateTotal(pricing, vehicleClassId, selections) {
  const lines = [];
  let subtotal = 0;
  let low = 0;
  let high = 0;

  for (const service of pricing.services) {
    const sel = selections[service.id];
    if (!sel || !sel.selected) continue;
    const amount = serviceSubtotal(pricing, service, vehicleClassId, sel);
    const configuredRange = Number.isFinite(service.rangePct)
      ? service.rangePct
      : pricing.rangePct || 0;
    const rangePct = Math.min(0.9, Math.max(0, configuredRange));
    const lineLow = round5(Math.max(0, amount * (1 - rangePct)));
    const lineHigh = round5(amount * (1 + rangePct));
    subtotal += amount;
    low += lineLow;
    high += lineHigh;
    lines.push({
      id: service.id,
      label: service.label,
      amount,
      low: lineLow,
      high: lineHigh,
      rangePct,
    });
  }

  return {
    subtotal,
    low,
    high,
    lines,
    hasSelection: lines.length > 0,
  };
}

export function formatMoney(n, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(n);
}

// Build the WhatsApp message a customer sends to lock in the real price.
export function buildWhatsAppMessage({ pricing, lang, vehicleClass, vehicleText, result }) {
  const L = (obj) => (obj ? obj[lang] || obj.en : "");
  const vc = pricing.vehicleClasses.find((c) => c.id === vehicleClass);
  const cur = pricing.currency;

  const header =
    lang === "es"
      ? `Hola! Me gustaría un estimado de ${SITE.name}.`
      : `Hi! I'd like a quote from ${SITE.name}.`;
  const vehLabel = lang === "es" ? "Vehículo" : "Vehicle";
  const svcLabel = lang === "es" ? "Servicios" : "Services";
  const estLabel = lang === "es" ? "Estimado" : "Estimate";

  const typedVehicle = vehicleText && vehicleText.trim();
  const vehicle = [typedVehicle || (lang === "es" ? "(no indicado)" : "(not specified)"), vc && L(vc.label)]
    .filter(Boolean)
    .join(" — ");

  const lines = result.lines
    .map((l) => `• ${L(l.label)} (${formatMoney(l.low, cur)} – ${formatMoney(l.high, cur)})`)
    .join("\n");

  return [
    header,
    "",
    `${vehLabel}: ${vehicle || (lang === "es" ? "(no indicado)" : "(not specified)")}`,
    `${svcLabel}:`,
    lines,
    "",
    `${estLabel}: ${formatMoney(result.low, cur)} – ${formatMoney(result.high, cur)}`,
  ].join("\n");
}
