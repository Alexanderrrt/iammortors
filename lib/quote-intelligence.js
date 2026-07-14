const OIL_CHANGE_PATTERNS = [
  /oil\s*change/i,
  /cambio\s+de\s+aceite/i,
  /cambiar\s+el\s+aceite/i,
  /servicio\s+de\s+aceite/i,
  /routine\s+maintenance/i,
  /mantenimiento\s+rutinario/i,
];

export function asksForOilChange(messages) {
  const text = JSON.stringify(messages || []);
  return OIL_CHANGE_PATTERNS.some((pattern) => pattern.test(text));
}

export function sanitizeImageAnalysis(value, pricing) {
  if (!value || typeof value !== "object") return null;
  const vehicleClassId = pricing.vehicleClasses.some((item) => item.id === value.vehicleClassId)
    ? value.vehicleClassId
    : "";
  const services = Array.isArray(value.services)
    ? value.services
        .filter((item) => item && pricing.services.some((service) => service.id === item.serviceId))
        .slice(0, 6)
        .map((item) => {
          const service = pricing.services.find((candidate) => candidate.id === item.serviceId);
          return {
            serviceId: item.serviceId,
            ...(service?.model === "perUnit" && Number.isFinite(item.qty) ? { qty: Math.max(1, Math.min(4, Math.round(item.qty))) } : {}),
            ...(service?.model === "options" && typeof item.optionId === "string" ? { optionId: item.optionId.slice(0, 60) } : {}),
          };
        })
    : [];
  if (!vehicleClassId || !services.length) return null;
  return {
    vehicleClassId,
    services,
    vehicleText: typeof value.vehicleText === "string" ? value.vehicleText.replace(/\s+/g, " ").trim().slice(0, 120) : "",
  };
}

export function inferVehicleClassId(pricing, requestedId, vehicleText = "") {
  const text = String(vehicleText).toLowerCase();
  const has = (id) => pricing.vehicleClasses.some((item) => item.id === id);
  if (/(mustang|camaro|challenger|charger|brz|miata|mx-5|86 coupe|gt86|supra)/.test(text) && has("compact")) return "compact";
  if (/(f-?150|f-?250|silverado|sierra|ram\s*(1500|2500)?|tundra|tacoma|frontier|colorado|ranger|explorer|expedition|tahoe|suburban)/.test(text) && has("suv_truck")) return "suv_truck";
  if (/(porsche|ferrari|lamborghini|maserati|mclaren|aston martin|bentley|rolls[- ]royce)/.test(text) && has("luxury_perf")) return "luxury_perf";
  if (/(camry|accord|altima|malibu|passat|sonata|sentra)/.test(text) && has("sedan")) return "sedan";
  return has(requestedId) ? requestedId : pricing.vehicleClasses[0]?.id;
}

export function routeServices(services, oilIntent, pricing) {
  if (!oilIntent || !pricing.services.some((service) => service.id === "oil-change")) return services;
  const withoutGenericRepair = services.filter((service) => service.serviceId !== "mechanical-repair");
  return [...withoutGenericRepair, { serviceId: "oil-change" }];
}

export function buildLeadLearningContext(leads = []) {
  const seen = new Set();
  const examples = [];
  for (const lead of leads) {
    const vehicle = typeof lead.vehicle === "string" ? lead.vehicle.replace(/\s+/g, " ").trim().slice(0, 80) : "";
    const service = typeof lead.service === "string" ? lead.service.replace(/\s+/g, " ").trim().slice(0, 100) : "";
    if (!vehicle && !service) continue;
    const key = `${vehicle}|${service}`.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    examples.push(`vehicle=${vehicle || "unknown"}; service=${service || "unknown"}`);
    if (examples.length >= 20) break;
  }
  return examples.length
    ? `\nANONYMIZED LEAD PATTERNS (use only as wording/context hints; never copy contact details or prices):\n${examples.map((item) => `- ${item}`).join("\n")}`
    : "";
}
