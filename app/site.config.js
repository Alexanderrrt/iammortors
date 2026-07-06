// Central place for all business facts and bilingual copy.
// Update here to change anything shown on the site.

export const SITE = {
  name: "Centro Automotriz BR",
  nameShort: "BR Auto",
  // Used for canonical URLs, sitemap, robots and Open Graph.
  // UPDATE once your domain is live.
  url: "https://centroautomotrizbr.com",
  tagline: {
    en: "High-level automotive maintenance — precise diagnostics, expert workmanship.",
    es: "Mantenimiento automotriz de alto nivel — diagnósticos precisos, trabajo experto.",
  },
  phone: "(408) 690-9455",
  phoneHref: "tel:+14086909455",
  // WhatsApp number in international format, digits only.
  whatsapp: "14086909455",
  locations: [
    {
      id: "main",
      line1: "1048 N Tenth St",
      line2: "San Jose, CA 95112",
      full: "1048 N Tenth St, San Jose, CA 95112",
      mapsHref:
        "https://www.google.com/maps/dir/?api=1&destination=1048+N+Tenth+St,+San+Jose,+CA+95112",
      mapsEmbedSrc:
        "https://maps.google.com/maps?q=1048+N+Tenth+St,+San+Jose,+CA+95112&t=&z=15&ie=UTF8&iwloc=&output=embed",
      postalCode: "95112",
    },
    {
      id: "second",
      line1: "804 Park Ave, Ste B",
      line2: "San Jose, CA 95126",
      full: "804 Park Ave, Ste B, San Jose, CA 95126",
      mapsHref:
        "https://www.google.com/maps/dir/?api=1&destination=804+Park+Ave+Ste+B,+San+Jose,+CA+95126",
      mapsEmbedSrc:
        "https://maps.google.com/maps?q=804+Park+Ave+Ste+B,+San+Jose,+CA+95126&t=&z=15&ie=UTF8&iwloc=&output=embed",
      postalCode: "95126",
    },
  ],

  social: {
    instagram: "https://www.instagram.com/mechanic_tire",
    facebook: "https://www.facebook.com/centroautomotrizbr/",
  },
  // Hours in 24h time, per weekday (0 = Sunday ... 6 = Saturday). null = closed.
  hours: [
    { day: 0, label: { en: "Sunday", es: "Domingo" }, open: null, close: null },
    { day: 1, label: { en: "Monday", es: "Lunes" }, open: "09:00", close: "18:00" },
    { day: 2, label: { en: "Tuesday", es: "Martes" }, open: "09:00", close: "18:00" },
    { day: 3, label: { en: "Wednesday", es: "Miércoles" }, open: "09:00", close: "18:00" },
    { day: 4, label: { en: "Thursday", es: "Jueves" }, open: "09:00", close: "18:00" },
    { day: 5, label: { en: "Friday", es: "Viernes" }, open: "09:00", close: "18:00" },
    { day: 6, label: { en: "Saturday", es: "Sábado" }, open: "09:00", close: "17:00" },
  ],
};

export const SERVICES = [
  {
    id: "mecanica-general",
    icon: "wrench",
    image: "/MECANICA-GENERAL.png",
    title: { en: "General Mechanics", es: "Mecánica General" },
    desc: {
      en: "Complete engine and drivetrain repair. From routine maintenance to complex overhauls, we keep your vehicle running at its best.",
      es: "Reparación completa de motor y tren motriz. Desde mantenimiento de rutina hasta reparaciones complejas, mantenemos tu vehículo en óptimas condiciones.",
    },
  },
  {
    id: "frenos",
    icon: "brakes",
    image: "/FRENOS.png",
    title: { en: "Brake Repair", es: "Frenos" },
    desc: {
      en: "Brake pads, rotors, calipers, and fluid service. We ensure your stopping power is always reliable and safe.",
      es: "Pastillas, discos, calipers y servicio de líquido de frenos. Garantizamos que tu frenado sea siempre confiable y seguro.",
    },
  },
  {
    id: "afinacion",
    icon: "oil",
    image: "/AFINACION-DE-MOTOR.png",
    title: { en: "Engine Tune-Up", es: "Afinación de Motor" },
    desc: {
      en: "Spark plugs, filters, fuel system cleaning, and ignition service. Restore power, improve fuel economy, and reduce emissions.",
      es: "Bujías, filtros, limpieza de sistema de combustible y servicio de ignición. Restaura potencia, mejora el consumo y reduce emisiones.",
    },
  },
  {
    id: "suspension",
    icon: "alignment",
    image: "/SUPENSION.png",
    title: { en: "Suspension", es: "Suspensión" },
    desc: {
      en: "Shocks, struts, control arms, and alignment. We restore your ride comfort and handling precision.",
      es: "Amortiguadores, puntales, brazos de control y alineación. Restauramos la comodidad y precisión de manejo de tu vehículo.",
    },
  },
  {
    id: "electronica",
    icon: "battery",
    image: "/ELECTRONICA.png",
    title: { en: "General Electronics", es: "Electrónica General" },
    desc: {
      en: "Electrical diagnostics, wiring repair, sensors, and computer systems. We solve the toughest electrical problems.",
      es: "Diagnósticos eléctricos, reparación de cableado, sensores y sistemas computarizados. Resolvemos los problemas eléctricos más difíciles.",
    },
  },
  {
    id: "aire-acondicionado",
    icon: "wrench",
    image: "/AIRE-ACONDICIONADO.png",
    title: { en: "A/C Repair", es: "Aire Acondicionado" },
    desc: {
      en: "Full A/C diagnostics, recharge, compressor repair, and climate control service. Stay cool all year long.",
      es: "Diagnóstico completo de A/C, recarga, reparación de compresor y servicio de climatización. Mantente fresco todo el año.",
    },
  },
  {
    id: "llantas-nuevas",
    icon: "tire",
    image: "",
    title: { en: "New Tires", es: "Llantas Nuevas" },
    desc: {
      en: "New tire sales with installation and balancing included. All major brands available — everything you need in one place.",
      es: "Venta de llantas nuevas con instalación y balanceo incluido. Todas las marcas principales — todo lo que necesitas en un solo lugar.",
    },
  },
];

// Strings for the scrolling marquee strip.
export const MARQUEE_ITEMS = [
  "Mecánica General",
  "Frenos",
  "Afinación de Motor",
  "Suspensión",
  "Electrónica",
  "Aire Acondicionado",
  "Llantas Nuevas",
  "General Mechanics",
  "Brake Repair",
  "Engine Tune-Up",
  "Suspension",
  "A/C Repair",
  "Electronics",
  "New Tires",
];

// Social media reels or featured content.
export const REELS = [
];

// Static gallery images shown when REELS is empty.
export const GALLERY_IMAGES = [
  { src: "/MASTER-3.jpg", alt: { en: "Professional mechanic at work", es: "Mecánico profesional trabajando" } },
  { src: "/Imagen-de-WhatsApp-2025-05-09-a-las-15.41.56_44d9aad2-683x1024.jpg", alt: { en: "Mechanic working on engine", es: "Mecánico trabajando en motor" } },
  { src: "/Imagen-de-WhatsApp-2025-05-09-a-las-15.41.57_6ebabeee-1024x683.jpg", alt: { en: "Engine bay service", es: "Servicio de motor" } },
  { src: "/Footer.png", alt: { en: "Centro Automotriz BR storefront", es: "Fachada de Centro Automotriz BR" } },
  { src: "/Imagen-de-WhatsApp-2025-05-09-a-las-15.41.57_c3a16bcc-1024x683.jpg", alt: { en: "Engine rebuild with chain hoist", es: "Reconstrucción de motor con grúa" } },
  { src: "/MASTER-4.jpg", alt: { en: "Vehicle maintenance on lift", es: "Mantenimiento de vehículo en elevador" } },
  { src: "/Imagen-de-WhatsApp-2025-05-09-a-las-15.41.57_01d8ad3c-1024x683.jpg", alt: { en: "Team member portrait", es: "Retrato del equipo" } },
  { src: "/Imagen-de-WhatsApp-2025-05-09-a-las-15.41.57_d757e933-1024x576.jpg", alt: { en: "Shop exterior aerial view", es: "Vista aérea del taller" } },
];

// Shop videos for the gallery.
export const GALLERY_VIDEOS = [
  { src: "/Video 1.mp4", alt: { en: "Shop work in action", es: "Trabajo del taller en acción" } },
  { src: "/Video2.mp4", alt: { en: "Engine repair process", es: "Proceso de reparación de motor" } },
  { src: "/video3.mp4", alt: { en: "Team at work", es: "Equipo trabajando" } },
];

export const OWNERS_RIDE = {
  kicker: { en: "Featured spotlight", es: "Destacado especial" },
  title: { en: "Quality You Can Trust", es: "Calidad en la que Puedes Confiar" },
  body: {
    en: "Every vehicle that comes through our doors gets the same expert care and attention to detail. From routine maintenance to complex repairs, we treat your car like it's our own.",
    es: "Cada vehículo que entra a nuestro taller recibe el mismo cuidado experto y atención al detalle. Desde mantenimiento de rutina hasta reparaciones complejas, tratamos tu auto como si fuera el nuestro.",
  },
};

export const TESTIMONIALS = [
  {
    quote: {
      en: "Excellent service! They diagnosed the problem quickly and the repair was done the same day. Very fair prices.",
      es: "¡Excelente servicio! Diagnosticaron el problema rápidamente y la reparación se hizo el mismo día. Precios muy justos.",
    },
    author: "Carlos M.",
  },
  {
    quote: {
      en: "Best mechanic shop in San Jose. They speak Spanish and English, and they really know what they're doing. Highly recommend!",
      es: "El mejor taller mecánico en San Jose. Hablan español e inglés, y realmente saben lo que hacen. ¡Muy recomendado!",
    },
    author: "Maria L.",
  },
  {
    quote: {
      en: "I've been coming here for years. Honest, reliable, and always get the job done right the first time.",
      es: "He venido aquí por años. Honestos, confiables, y siempre hacen el trabajo bien a la primera.",
    },
    author: "Roberto S.",
  },
];

export const COPY = {
  nav: {
    services: { en: "Services", es: "Servicios" },
    gallery: { en: "Gallery", es: "Galería" },
    location: { en: "Location", es: "Ubicación" },
    reviews: { en: "Reviews", es: "Reseñas" },
    quote: { en: "Get a Quote", es: "Cotizar" },
    callNow: { en: "Call Now", es: "Llamar" },
  },
  quote: {
    heading: { en: "Instant Price Estimate", es: "Estimado de Precio Instantáneo" },
    sub: {
      en: "Pick your vehicle and services for a ballpark price. We confirm the exact price in person.",
      es: "Elija su vehículo y servicios para un precio aproximado. Confirmamos el precio exacto en persona.",
    },
      vehicleStep: { en: "1. Your vehicle", es: "1. Su vehículo" },
      vehicleMakeLabel: { en: "Brand", es: "Marca" },
      vehicleModelLabel: { en: "Model", es: "Modelo" },
      vehicleYearLabel: { en: "Year", es: "Año" },
      vehicleClassLabel: { en: "Vehicle type", es: "Tipo de vehículo" },
      vehicleTextLabel: { en: "Describe your vehicle", es: "Describe tu vehículo" },
      vehicleTextPlaceholder: { en: "e.g. 2019 Toyota Camry", es: "ej. 2019 Toyota Camry" },
    servicesStep: { en: "2. What do you need?", es: "2. ¿Qué necesita?" },
    qtyLabel: { en: "Quantity", es: "Cantidad" },
    estimateLabel: { en: "Estimated total", es: "Total estimado" },
    emptyState: {
      en: "Select one or more services to see your estimate.",
      es: "Seleccione uno o más servicios para ver su estimado.",
    },
    send: { en: "Send to shop on WhatsApp", es: "Enviar al taller por WhatsApp" },
    ctaFromHome: { en: "Get an instant estimate", es: "Obtenga un estimado instantáneo" },
  },
  status: {
    open: { en: "Open now", es: "Abierto ahora" },
    closed: { en: "Closed", es: "Cerrado" },
  },
  hero: {
    kicker: { en: "San Jose, CA", es: "San Jose, CA" },
    callNow: { en: "Call Now", es: "Llamar Ahora" },
    directions: { en: "Get Directions", es: "Cómo Llegar" },
    note: {
      en: "Walk-ins welcome — no appointment needed. In-shop service only.",
      es: "Sin cita, sin problema — llega cuando quieras. Servicio solo en taller.",
    },
    alignment: {
      badge: { en: "Expert diagnostics in action", es: "Diagnósticos expertos en acción" },
      kicker: { en: "Precision diagnostics", es: "Diagnósticos de precisión" },
      title: {
        en: "Professional-Grade Diagnostics",
        es: "Diagnósticos de Nivel Profesional",
      },
      body: {
        en: "We use state-of-the-art diagnostic equipment to pinpoint issues fast and get you back on the road with confidence.",
        es: "Usamos equipo de diagnóstico de última generación para identificar problemas rápidamente y devolverte a la carretera con confianza.",
      },
      points: {
        en: ["Computer-aided engine analysis", "Electrical system scanning", "Real-time performance data"],
        es: ["Análisis de motor asistido por computadora", "Escaneo del sistema eléctrico", "Datos de rendimiento en tiempo real"],
      },
      cta: { en: "Schedule a diagnostic", es: "Agenda un diagnóstico" },
      ctaSecondary: { en: "All services", es: "Todos los servicios" },
    },
    afterpay: {
      en: "Flexible financing available — payments that work for you",
      es: "Financiamiento flexible disponible — pagos que funcionan para ti",
    },
  },
  services: {
    heading: { en: "What We Do", es: "Lo Que Hacemos" },
    sub: {
      en: "Tap a service to learn more.",
      es: "Toque un servicio para más información.",
    },
  },
  gallery: {
    heading: { en: "From the Shop", es: "Desde el Taller" },
    sub: {
      en: "A look at our work. Follow us on social for daily updates.",
      es: "Un vistazo a nuestro trabajo. Síguenos en redes para actualizaciones diarias.",
    },
  },
  location: {
    heading: { en: "Visit Us", es: "Visítenos" },
    hoursTitle: { en: "Hours", es: "Horario" },
    closedLabel: { en: "Closed", es: "Cerrado" },
  },
  reviews: {
    heading: { en: "What Customers Say", es: "Lo Que Dicen Nuestros Clientes" },
  },
  promos: {
    heading: { en: "Deals & Programs", es: "Ofertas y Programas" },
    sub: {
      en: "Flexible financing and rewards to keep you coming back.",
      es: "Financiamiento flexible y recompensas para que sigas regresando.",
    },
    financeTitle: { en: "Financing Available", es: "¡Financiamiento Disponible!" },
    financeSub: {
      en: "Quick and easy approval! All you need is an ITIN, Social Security, or bank account. Flexible payments that work for your budget.",
      es: "¡Aprobación rápida y sencilla! Solo necesitas ITIN, Social Security o cuenta bancaria. Pagos flexibles que se ajustan a tu presupuesto.",
    },
    financeCta: { en: "Ask about financing", es: "Pregunta por financiamiento" },
    loyaltyTitle: { en: "Loyalty Program", es: "Programa de Fidelidad" },
    loyaltySub: {
      en: "Earn rewards with every visit. Ask about our loyalty program and start saving today.",
      es: "Gana recompensas con cada visita. Pregunta por nuestro programa de fidelidad y empieza a ahorrar hoy.",
    },
    loyaltyCta: { en: "Ask about our program", es: "Pregunta por nuestro programa" },
    driverTitle: { en: "Full Service Package", es: "Paquete de Servicio Completo" },
    driverSub: {
      en: "Our best value package — complete tune-up, oil change, and multi-point inspection at an unbeatable price.",
      es: "Nuestro paquete de mejor valor — afinación completa, cambio de aceite e inspección multipunto a un precio imbatible.",
    },
    driverPrice: "$199",
    driverIncludes: {
      en: ["Engine Tune-Up", "Oil Change", "Multi-Point Inspection"],
      es: ["Afinación de Motor", "Cambio de Aceite", "Inspección Multipunto"],
    },
    driverCta: { en: "Claim this deal", es: "Aprovecha esta oferta" },
  },
  footer: {
    rights: {
      en: "All rights reserved.",
      es: "Todos los derechos reservados.",
    },
    followUs: { en: "Follow us", es: "Síganos" },
  },
  admin: {
    login: {
      title: { en: "Admin — Pricing", es: "Admin — Precios" },
      intro: {
        en: "Enter the admin password to edit quote pricing.",
        es: "Ingresa la contraseña de administrador para editar los precios.",
      },
      passwordPlaceholder: { en: "Password", es: "Contraseña" },
      passwordAria: { en: "Admin password", es: "Contraseña de administrador" },
      signIn: { en: "Sign in", es: "Iniciar sesión" },
      signingIn: { en: "Signing in…", es: "Iniciando sesión…" },
      wrongPassword: { en: "Incorrect password.", es: "Contraseña incorrecta." },
      notConfigured: {
        en: "Admin auth is not configured (set ADMIN_PASSWORD and AUTH_SECRET).",
        es: "La autenticación de admin no está configurada (define ADMIN_PASSWORD y AUTH_SECRET).",
      },
      failed: { en: "Login failed.", es: "No se pudo iniciar sesión." },
    },
    editor: {
      title: { en: "Quote Pricing", es: "Precios del Cotizador" },
      storageWarn: {
        en: "Storage not connected — changes apply for this session only. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to persist.",
        es: "Almacenamiento no conectado — los cambios solo aplican en esta sesión. Define SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY para guardarlos.",
      },
      logOut: { en: "Log out", es: "Cerrar sesión" },
      loggingOut: { en: "Signing out…", es: "Cerrando sesión…" },
      save: { en: "Save changes", es: "Guardar cambios" },
      saving: { en: "Saving…", es: "Guardando…" },
      saved: { en: "Saved.", es: "Guardado." },
      savedSession: {
        en: "Saved for this session — connect Supabase to make it permanent.",
        es: "Guardado para esta sesión — conecta Supabase para hacerlo permanente.",
      },
      saveFailed: { en: "Save failed.", es: "No se pudo guardar." },
      globalHeading: { en: "Global", es: "General" },
      laborRate: { en: "Labor rate ($/hr)", es: "Mano de obra ($/hr)" },
      spread: { en: "Estimate spread (%)", es: "Margen del estimado (%)" },
      currency: { en: "Currency", es: "Moneda" },
      vehicleHeading: { en: "Vehicle multipliers", es: "Multiplicadores por vehículo" },
      vehicleHint: {
        en: "Sedan is the 1.0 baseline. Bigger/more premium vehicles cost more.",
        es: "El sedán es la base (1.0). Vehículos más grandes o premium cuestan más.",
      },
      servicesHeading: { en: "Services", es: "Servicios" },
      appliesFactor: { en: "applies vehicle factor", es: "aplica factor de vehículo" },
      basePrice: { en: "Base price / unit", es: "Precio base / unidad" },
      partsBase: { en: "Parts base", es: "Base de refacciones" },
      laborHours: { en: "Labor hours", es: "Horas de mano de obra" },
      flatPrice: { en: "Flat price", es: "Precio fijo" },
      perUnit: { en: "per unit", es: "por unidad" },
      perJob: { en: "per job", es: "por trabajo" },
      modelHelp: {
        perUnit: {
          en: "Per-unit price × vehicle factor × qty, plus fees.",
          es: "Precio por unidad × factor de vehículo × cantidad, más cargos.",
        },
        labor: {
          en: "Parts + (labor hours × vehicle factor × labor rate).",
          es: "Refacciones + (horas × factor de vehículo × tarifa).",
        },
        options: {
          en: "Customer picks one option; that price is used.",
          es: "El cliente elige una opción; se usa ese precio.",
        },
        flat: { en: "Single flat price.", es: "Un solo precio fijo." },
      },
      openingEditor: { en: "Opening pricing editor…", es: "Abriendo el editor de precios…" },
    },
  },
};
