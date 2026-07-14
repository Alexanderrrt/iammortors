const SERVICE_RULES = [
  {
    id: "oil-change",
    patterns: [
      /\boil\s*(?:and\s*filter\s*)?change\b/i,
      /\bcambio\s+de\s+aceite\b/i,
      /\bcambiar\s+(?:el\s+)?aceite\b/i,
      /\bservicio\s+de\s+aceite\b/i,
    ],
  },
  {
    id: "diagnostics",
    patterns: [
      /\bcheck[ -]?engine(?:\s+light)?\b/i,
      /\bdiagnostic(?:s| test| scan)?\b/i,
      /\bwarning\s+light\b/i,
      /\btransmission\s+(?:is\s+)?slipping\b/i,
      /\b(?:car|engine)\s+(?:won't|will\s+not|doesn't|does\s+not)\s+start\b/i,
      /\bengine\s+(?:noise|knock(?:ing)?)\b/i,
      /\bluz\s+(?:de\s+)?(?:check\s+engine|motor)\b/i,
      /\bdiagn[oó]stic[oa]\b/i,
      /\bescanear\b/i,
      /\btransmisi[oó]n\s+(?:patina|se\s+resbala)\b/i,
      /\bno\s+(?:prende|arranca)\b/i,
    ],
  },
  {
    id: "brake-service",
    patterns: [
      /\bbrake(?:s| pads?| rotors?| service)?\b/i,
      /\bsqueak(?:s|ing)?\s+(?:when|while)\s+braking\b/i,
      /\bfrenos?\b/i,
      /\bpastillas?\s+de\s+freno\b/i,
      /\bdiscos?\s+de\s+freno\b/i,
    ],
  },
  {
    id: "suspension-repair",
    patterns: [
      /\bsuspension\b/i,
      /\bshocks?\b/i,
      /\bstruts?\b/i,
      /\bcontrol\s+arms?\b/i,
      /\bball\s+joints?\b/i,
      /\bsuspensi[oó]n\b/i,
      /\bamortiguadores?\b/i,
    ],
  },
  {
    id: "cooling-service",
    patterns: [
      /\bradiator\b/i,
      /\bcoolant\b/i,
      /\boverheat(?:s|ing|ed)?\b/i,
      /\bwater\s+pump\b/i,
      /\banticongelante\b/i,
      /\bradiador\b/i,
      /\bse\s+calienta\b/i,
      /\bsobrecalentamiento\b/i,
    ],
  },
  {
    id: "battery-replacement",
    patterns: [
      /\b(?:replace|new|dead|bad)\s+battery\b/i,
      /\bbattery\s+(?:replacement|is\s+dead|died)\b/i,
      /\bcambio\s+de\s+bater[ií]a\b/i,
      /\bbater[ií]a\s+(?:nueva|muerta|descargada)\b/i,
    ],
  },
  {
    id: "wheel-alignment",
    patterns: [
      /\bwheel\s+alignment\b/i,
      /\balignment\s+for\s+(?:my\s+)?(?:car|truck|vehicle|wheels?)\b/i,
      /\balineaci[oó]n\s+de\s+(?:ruedas|llantas)\b/i,
      /\balinear\s+(?:las\s+)?(?:ruedas|llantas)\b/i,
    ],
  },
  {
    id: "scheduled-maintenance",
    patterns: [
      /\broutine\s+maintenance\b/i,
      /\bscheduled\s+maintenance\b/i,
      /\b(?:30|60|90|100)k\s+service\b/i,
      /\btune[ -]?up\b/i,
      /\bservice\s+interval\b/i,
      /\bmantenimiento\s+(?:rutinario|programado|preventivo)\b/i,
      /\bafinaci[oó]n\b/i,
    ],
  },
  {
    id: "glass-replacement",
    patterns: [
      /\bwindshield\b/i,
      /\bdoor\s+window\b/i,
      /\brear\s+window\b/i,
      /\bback\s+glass\b/i,
      /\bcar\s+window\b/i,
      /\bparabrisas\b/i,
      /\bventana\s+(?:lateral|de\s+puerta)\b/i,
      /\bvidrio\s+trasero\b/i,
      /\bmedall[oó]n\b/i,
      /\bcristal\s+(?:roto|quebrado|estrellado)\b/i,
    ],
    selection(text) {
      if (/\b(?:rear\s+window|back\s+glass|vidrio\s+trasero|medall[oó]n)\b/i.test(text)) return { optionId: "rear-window" };
      if (/\b(?:door\s+window|car\s+window|ventana\s+(?:lateral|de\s+puerta))\b/i.test(text)) return { optionId: "door-window" };
      if (/\b(?:windshield|parabrisas)\b/i.test(text)) return { optionId: "windshield" };
      return {};
    },
  },
  {
    id: "dent-removal",
    patterns: [
      /\bdents?\b/i,
      /\bdented\b/i,
      /\bdoor\s+ding\b/i,
      /\bpaintless\s+dent\b/i,
      /\babolladur[ao]s?\b/i,
      /\babollaron\b/i,
      /\bgolpe\s+peque[nñ]o\b/i,
      /\bsacar\s+(?:un\s+)?golpe\b/i,
    ],
  },
  {
    id: "painting",
    patterns: [
      /\bpaint(?:ing| job| repair)?\b/i,
      /\brefinish(?:ing)?\b/i,
      /\bclear\s+coat\b/i,
      /\bdeep\s+scratch\b/i,
      /\bpintura\b/i,
      /\brepintar\b/i,
      /\bray[oó]n\s+profundo\b/i,
      /\brasp[oó]n\b/i,
    ],
  },
  {
    id: "frame-alignment",
    patterns: [
      /\bbent\s+frame\b/i,
      /\bframe\s+(?:is\s+)?bent\b/i,
      /\bframe\s+(?:damage|straighten(?:ing)?)\b/i,
      /\bunibody\s+damage\b/i,
      /\bchassis\s+(?:damage|bent)\b/i,
      /\bchasis\s+(?:est[aá]\s+)?(?:doblado|da[nñ]ado)\b/i,
      /\bbastidor\s+(?:est[aá]\s+)?(?:doblado|da[nñ]ado)\b/i,
    ],
  },
  {
    id: "collision-repair",
    patterns: [
      /\bcollision\b/i,
      /\bcar\s+accident\b/i,
      /\bcrash(?:ed)?\b/i,
      /\bwreck(?:ed)?\b/i,
      /\brear[ -]?ended\b/i,
      /\bside[ -]?swip(?:e|ed)\b/i,
      /\bfender\s+bender\b/i,
      /\bhit[ -]?and[ -]?run\b/i,
      /\bbody\s+damage\b/i,
      /\bchoque\b/i,
      /\bcolisi[oó]n\b/i,
      /\baccidente\b/i,
      /\bme\s+(?:chocaron|pegaron|golpearon)\b/i,
      /\bda[nñ]o\s+de\s+carrocer[ií]a\b/i,
    ],
  },
  {
    id: "towing-24hr",
    patterns: [
      /\btow(?:ing| truck)?\b/i,
      /\bstranded\b/i,
      /\bneed\s+a\s+lift\b/i,
      /\bgr[uú]a\b/i,
      /\bvarado\b/i,
      /\bremolque\b/i,
    ],
  },
  {
    id: "insurance-claims",
    patterns: [
      /\binsurance\s+claim\b/i,
      /\bfile\s+(?:an?\s+)?claim\b/i,
      /\bwork\s+with\s+(?:my\s+)?insurance\b/i,
      /\breclamo\s+(?:de\s+)?seguro\b/i,
      /\baseguranza\b/i,
      /\bcompa[nñ][ií]a\s+de\s+seguros\b/i,
    ],
  },
  {
    id: "mechanical-repair",
    patterns: [
      /\bengine\s+(?:repair|replacement|rebuild)\b/i,
      /\btransmission\s+(?:repair|replacement|rebuild)\b/i,
      /\balternator\s+(?:repair|replacement|replace)\b/i,
      /\bstarter\s+(?:motor\s+)?(?:repair|replacement|replace)\b/i,
      /\bfuel\s+pump\s+(?:repair|replacement|replace)\b/i,
      /\breparaci[oó]n\s+(?:de\s+)?motor\b/i,
      /\b(?:reparar|reemplazar)\s+(?:la\s+)?transmisi[oó]n\b/i,
      /\b(?:reparar|reemplazar)\s+(?:el\s+)?(?:alternador|arranque|motor\s+de\s+arranque|bomba\s+de\s+gasolina)\b/i,
    ],
  },
];

// Requests the shop may handle, but which do not have a grounded price model.
// These must never be silently forced into the generic mechanical-repair price.
const UNPRICED_SERVICE_RULES = [
  {
    id: "air-conditioning",
    label: "air-conditioning service",
    patterns: [
      /\b(?:a\/?c|air\s+condition(?:er|ing))\s+(?:repair|service|recharge|not\s+working)\b/i,
      /\b(?:freon|refrigerant)\s+(?:recharge|leak)\b/i,
      /\baire\s+acondicionado\b/i,
      /\brecarga\s+de\s+(?:a\/?c|refrigerante)\b/i,
    ],
  },
  {
    id: "tires",
    label: "tire service",
    patterns: [
      /\btires?\b/i,
      /\b(?:llantas|neum[aá]ticos)\b/i,
      /\b(?:new|replace|replacement|rotate|rotation|flat|punctured?)\s+tires?\b/i,
      /\btire\s+(?:replacement|rotation|repair|patch)\b/i,
      /\b(?:cambio|rotaci[oó]n|reparaci[oó]n)\s+de\s+(?:llantas|neum[aá]ticos)\b/i,
      /\bllanta\s+(?:ponchada|pinchada)\b/i,
    ],
  },
  {
    id: "emissions",
    label: "smog or emissions testing",
    patterns: [
      /\b(?:smog|emissions?)\s+(?:check|test|inspection)\b/i,
      /\bverificaci[oó]n\s+(?:de\s+)?emisiones\b/i,
    ],
  },
  {
    id: "detailing",
    label: "detailing",
    patterns: [
      /\b(?:auto|car)\s+detail(?:ing)?\b/i,
      /\binterior\s+detail(?:ing)?\b/i,
      /\bdetallado\s+(?:automotriz|interior)\b/i,
      /\blavado\s+de\s+auto\b/i,
    ],
  },
  {
    id: "keys",
    label: "key or key-fob programming",
    patterns: [
      /\b(?:car\s+)?key\s+(?:replacement|programming|fob)\b/i,
      /\bkey\s+fob\b/i,
      /\bprogramar\s+(?:una\s+)?llave\b/i,
      /\bllave\s+(?:nueva|de\s+repuesto|con\s+chip)\b/i,
    ],
  },
  {
    id: "accessories",
    label: "audio, tint, or accessory installation",
    patterns: [
      /\b(?:stereo|radio|speaker|subwoofer)\s+(?:install|installation|repair)\b/i,
      /\bwindow\s+tint(?:ing)?\b/i,
      /\bpolarizado\s+de\s+(?:ventanas|vidrios)\b/i,
      /\binstalar\s+(?:radio|est[eé]reo|bocinas)\b/i,
    ],
  },
];

function messageText(message) {
  if (!message || typeof message !== "object") return "";
  if (typeof message.content === "string") return message.content;
  if (typeof message.text === "string") return message.text;
  if (Array.isArray(message.parts)) {
    return message.parts
      .filter((part) => part?.type === "text" && typeof part.text === "string")
      .map((part) => part.text)
      .join(" ");
  }
  return "";
}

export function extractUserTexts(messages) {
  return (Array.isArray(messages) ? messages : [])
    .filter((message) => message?.role === "user")
    .map(messageText)
    .map((text) => text.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

function patternState(text, patterns) {
  let positive = false;
  let negative = false;
  for (const pattern of patterns) {
    const flags = pattern.flags.includes("g") ? pattern.flags : `${pattern.flags}g`;
    const matcher = new RegExp(pattern.source, flags);
    let match;
    while ((match = matcher.exec(text))) {
      const before = text.slice(Math.max(0, match.index - 36), match.index);
      const isNegative = /(?:\bno\b|\bnot\b|\bdon't\b|\bdo\s+not\b|\bwithout\b|\bsin\b|\bno\s+necesito\b|\bno\s+quiero\b)[^.!?,;]{0,24}$/i.test(before);
      if (isNegative) negative = true;
      else positive = true;
      if (matcher.lastIndex === match.index) matcher.lastIndex += 1;
    }
  }
  return { positive, negative };
}

function dedupeServices(services) {
  const byId = new Map();
  for (const service of services) {
    if (!service?.serviceId) continue;
    const previous = byId.get(service.serviceId) || {};
    byId.set(service.serviceId, { ...previous, ...service });
  }
  return [...byId.values()];
}

export function detectServiceIntents(messages, pricing) {
  const available = new Set(pricing.services.map((service) => service.id));
  let active = [];
  let matchedAny = false;

  for (const text of extractUserTexts(messages)) {
    const positives = [];
    const negatives = new Set();
    for (const rule of SERVICE_RULES) {
      if (!available.has(rule.id)) continue;
      const state = patternState(text, rule.patterns);
      if (state.negative) negatives.add(rule.id);
      if (state.positive) positives.push({ serviceId: rule.id, ...(rule.selection ? rule.selection(text) : {}) });
    }

    if (negatives.size) active = active.filter((service) => !negatives.has(service.serviceId));
    if (!positives.length) continue;

    matchedAny = true;
    const additive = /\b(?:also|too|plus|along\s+with|and|también|además|junto\s+con|y)\b/i.test(text);
    active = dedupeServices(additive && active.length ? [...active, ...positives] : positives);
  }

  const ids = new Set(active.map((service) => service.serviceId));
  const allText = extractUserTexts(messages).join(" ");
  if (ids.has("dent-removal") && ids.has("collision-repair")) {
    active = active.filter((service) => service.serviceId !== "collision-repair");
    if (/\b(?:collision|car\s+accident|crash|wreck|rear[ -]?ended|side[ -]?swiped|fender\s+bender|hit[ -]?and[ -]?run|choque|colisi[oó]n|accidente|me\s+(?:chocaron|pegaron|golpearon))\b/i.test(allText)) {
      active = active.filter((service) => service.serviceId !== "dent-removal");
      active.push({ serviceId: "collision-repair" });
    }
  }

  return { services: dedupeServices(active), matchedAny };
}

export function detectUnpricedServiceIntents(messages) {
  let active = [];

  for (const text of extractUserTexts(messages)) {
    const positives = [];
    const negatives = new Set();
    for (const rule of UNPRICED_SERVICE_RULES) {
      const state = patternState(text, rule.patterns);
      const alignmentOnly = rule.id === "tires" &&
        /\b(?:wheel\s+alignment|alignment\s+(?:for\s+)?(?:my\s+)?(?:tires?|wheels?)|alineaci[oó]n\s+de\s+(?:ruedas|llantas))\b/i.test(text) &&
        !/\b(?:new|replace|replacement|rotate|rotation|flat|punctured?|cambio|rotaci[oó]n|reparaci[oó]n|ponchada|pinchada)\b/i.test(text);
      if (state.negative) negatives.add(rule.id);
      if (state.positive && !alignmentOnly) positives.push({ id: rule.id, label: rule.label });
    }

    if (negatives.size) active = active.filter((service) => !negatives.has(service.id));
    if (!positives.length) continue;

    const additive = /\b(?:also|too|plus|along\s+with|and|también|además|junto\s+con|y)\b/i.test(text);
    const next = additive && active.length ? [...active, ...positives] : positives;
    active = [...new Map(next.map((service) => [service.id, service])).values()];
  }

  return active;
}

export function needsBodyDamageClarification(messages, serviceIds, hasTrustedPhoto = false) {
  if (hasTrustedPhoto) return false;
  const highVarianceBodyServices = new Set([
    "collision-repair",
    "dent-removal",
    "painting",
    "frame-alignment",
  ]);
  if (!(Array.isArray(serviceIds) ? serviceIds : []).some((id) => highVarianceBodyServices.has(id))) {
    return false;
  }

  const text = extractUserTexts(messages).join(" ");
  return !/\b(?:front|rear|side|left|right|driver|passenger|bumper|door|fender|hood|trunk|quarter\s+panel|roof|rocker|frame|chassis|panel|windshield|rear[ -]?ended|side[ -]?swiped|fender\s+bender|dent(?:ed)?|ding|scratch(?:ed)?|crack(?:ed)?|broken|bent|crushed|scraped|paint|airbags?|frente|frontal|atr[aá]s|traser[ao]|lado|izquierd[ao]|derech[ao]|conductor|pasajero|defensa|parachoques|puerta|salpicadera|cofre|cajuela|techo|chasis|panel|parabrisas|abolladur[ao]|abollaron|ray[oó]n|rot[ao]|quebrad[ao]|doblad[ao]|aplastad[ao]|raspad[ao]|pintura|bolsas?\s+de\s+aire)\b/i.test(text);
}

export function asksForOilChange(messages) {
  return detectServiceIntents(messages, { services: [{ id: "oil-change" }] }).services.some((service) => service.serviceId === "oil-change");
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
          const validOption = service?.model === "options" && service.options?.some((option) => option.id === item.optionId);
          return {
            serviceId: item.serviceId,
            ...(service?.model === "perUnit" && Number.isFinite(item.qty) ? { qty: Math.max(1, Math.min(4, Math.round(item.qty))) } : {}),
            ...(validOption ? { optionId: item.optionId } : {}),
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

export function detectVehicleClassId(pricing, vehicleText = "") {
  const text = String(vehicleText).toLowerCase();
  const has = (id) => pricing.vehicleClasses.some((item) => item.id === id);

  if (/\b(?:truck|pickup|suv|crossover|minivan|camioneta|troca)\b/i.test(text) && has("suv_truck")) return "suv_truck";
  if (/\b(?:coupe|convertible|hatchback|compact|coup[eé]|convertible|compacto)\b/i.test(text) && has("compact")) return "compact";
  if (/\b(?:sedan|sed[aá]n)\b/i.test(text) && has("sedan")) return "sedan";

  if (/\b(?:mustang|camaro|challenger|charger|brz|miata|mx-5|gt86|gr86|supra|civic|corolla|golf|jetta|elantra|forte)\b/i.test(text) && has("compact")) return "compact";
  if (/\b(?:f-?150|f-?250|f-?350|silverado|sierra|ram\s*(?:1500|2500|3500)?|tundra|tacoma|frontier|colorado|ranger|explorer|expedition|escape|bronco|tahoe|suburban|rav4|highlander|4runner|pilot|cr-v|rogue|pathfinder|wrangler|grand\s+cherokee)\b/i.test(text) && has("suv_truck")) return "suv_truck";
  if (/\b(?:porsche|ferrari|lamborghini|maserati|mclaren|aston\s+martin|bentley|rolls[- ]royce|mercedes|bmw|audi|lexus|acura|infiniti|tesla)\b/i.test(text) && has("luxury_perf")) return "luxury_perf";
  if (/\b(?:camry|accord|altima|malibu|passat|sonata|sentra|maxima|avalon|impala)\b/i.test(text) && has("sedan")) return "sedan";
  return null;
}

export function inferVehicleClassId(pricing, requestedId, vehicleText = "") {
  const detected = detectVehicleClassId(pricing, vehicleText);
  if (detected) return detected;
  return pricing.vehicleClasses.some((item) => item.id === requestedId) ? requestedId : pricing.vehicleClasses[0]?.id;
}

export function routeServices(modelServices, detectedServices, pricing) {
  const known = new Map(pricing.services.map((service) => [service.id, service]));
  const model = dedupeServices(Array.isArray(modelServices) ? modelServices : []).filter((service) => known.has(service.serviceId));
  const detected = dedupeServices(Array.isArray(detectedServices) ? detectedServices : []).filter((service) => known.has(service.serviceId));
  if (!detected.length) return model;

  return detected.map((service) => {
    const definition = known.get(service.serviceId);
    const modelMatch = model.find((candidate) => candidate.serviceId === service.serviceId);
    if (definition.model === "options" && !service.optionId && modelMatch?.optionId) {
      const valid = definition.options?.some((option) => option.id === modelMatch.optionId);
      if (valid) return { ...service, optionId: modelMatch.optionId };
    }
    return service;
  });
}

function cleanLearningValue(value, max) {
  return typeof value === "string"
    ? value
        .replace(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/g, " ")
        .replace(/\+?\d[\d\s().-]{7,}\d/g, " ")
        .replace(/[^\p{L}\p{N}\s.,/&+\-]/gu, " ")
        .replace(/\b(?:ignore|system|assistant|developer|instructions?|prompt|tools?)\b/gi, " ")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, max)
    : "";
}

export function buildLeadLearningContext(leads = []) {
  const seen = new Set();
  const examples = [];
  for (const lead of leads) {
    const vehicle = cleanLearningValue(lead?.vehicle, 80);
    const service = cleanLearningValue(lead?.service, 100);
    const request = cleanLearningValue(lead?.lastMessage, 180);
    if (!vehicle && !service && !request) continue;
    const key = `${vehicle}|${service}|${request}`.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    examples.push({ request: request || "unknown", vehicle: vehicle || "unknown", service: service || "unknown" });
    if (examples.length >= 20) break;
  }
  return examples.length
    ? `\nANONYMIZED_LEAD_PATTERNS_DATA_ONLY=${JSON.stringify(examples)}`
    : "";
}
