// Central place for all business facts and bilingual copy.
// Update here to change anything shown on the site.

export const SITE = {
  name: "IAM MOTORS SERVICES LLC",
  nameShort: "IAM Motors",
  // Used for canonical URLs, sitemap, robots and Open Graph.
  // UPDATE once your domain is live.
  url: "https://iammotors.com",
  tagline: {
    en: "Full-service auto body shop and repair — collision repair, paint, body work, Prius/hybrid systems, diagnostics, and maintenance. Quality workmanship, clear communication, honest estimates.",
    es: "Taller de carrocería y reparación automotriz completo — reparación de colisiones, pintura, trabajo de carrocería, sistemas Prius/híbrido, diagnóstico y mantenimiento. Artesanía de calidad, comunicación clara, estimados honestos.",
  },
  phone: "(669) 324-5719",
  phoneHref: "tel:+16693245719",
  // WhatsApp number in international format, digits only.
  whatsapp: "16693245719",
  locations: [
    {
      id: "main",
      line1: "IAM MOTORS SERVICES LLC",
      line2: "San Jose, CA",
      full: "San Jose, CA",
      mapsHref:
        "https://www.google.com/maps/search/IAM+Motors+San+Jose+California",
      mapsEmbedSrc:
        "https://www.openstreetmap.org/export/embed.html?bbox=-121.95%2C37.25%2C-121.77%2C37.37&layer=mapnik",
      postalCode: "95110",
    },
  ],

  social: {
    instagram: "https://www.instagram.com/iammotors/",
    facebook: "https://www.facebook.com/iammotors/",
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
    id: "collision-repair",
    icon: "wrench",
    image: "/media/gallery/collision-repair.png",
    title: { en: "Collision Repair", es: "Reparación de Colisiones" },
    desc: {
      en: "Expert collision and accident repair. We restore your vehicle to pre-accident condition with precision and care.",
      es: "Reparación experta de colisiones y accidentes. Restauramos tu vehículo a su condición previa con precisión y cuidado.",
    },
  },
  {
    id: "paint-body",
    icon: "oil",
    image: "/media/gallery/paint-body.png",
    title: { en: "Paint & Body Work", es: "Pintura y Trabajo de Carrocería" },
    desc: {
      en: "Professional painting, color matching, and body work restoration. We deliver showroom-quality finishes with expert craftsmanship.",
      es: "Pintura profesional, emparejamiento de colores y restauración de carrocería. Entregamos acabados de calidad showroom con artesanía experta.",
    },
  },
  {
    id: "dent-removal",
    icon: "brakes",
    image: "/media/gallery/dent-removal.png",
    title: { en: "Dent Removal & Paintless Repair", es: "Remoción de Abolladuras" },
    desc: {
      en: "Paintless dent repair and removal. Fast, affordable, and damage-free restoration of your vehicle's body.",
      es: "Reparación sin pintura de abolladuras. Restauración rápida, asequible y sin daños de la carrocería de tu vehículo.",
    },
  },
  {
    id: "prius-hybrid",
    icon: "battery",
    image: "/media/gallery/hybrid-systems.png",
    title: { en: "Toyota Prius & Hybrid Systems", es: "Sistemas Toyota Prius e Híbridos" },
    desc: {
      en: "Specialized diagnostics and repair for Toyota Prius and hybrid vehicle systems. Expert knowledge and certified technicians.",
      es: "Diagnóstico y reparación especializada de sistemas Toyota Prius e híbridos. Conocimiento experto y técnicos certificados.",
    },
  },
  {
    id: "diagnostics",
    icon: "wrench",
    image: "/media/gallery/diagnostics.png",
    title: { en: "Diagnostics & Check-Engine Repairs", es: "Diagnóstico y Reparación de Luz de Motor" },
    desc: {
      en: "Complete vehicle diagnostics, check-engine light repairs, and troubleshooting. We identify and fix the root cause of any issue.",
      es: "Diagnóstico completo de vehículos y reparación de luz de motor. Identificamos y reparamos la causa raíz de cualquier problema.",
    },
  },
  {
    id: "mechanical",
    icon: "alignment",
    image: "/media/gallery/brakes-suspension.png",
    title: { en: "Brakes, Suspension & Cooling", es: "Frenos, Suspensión y Refrigeración" },
    desc: {
      en: "Full mechanical service including brake repair, suspension work, cooling system maintenance, and general repairs for all gas and hybrid vehicles.",
      es: "Servicio mecánico completo incluyendo reparación de frenos, trabajo de suspensión, mantenimiento del sistema de refrigeración y reparaciones generales.",
    },
  },
  {
    id: "maintenance",
    icon: "oil",
    image: "/media/gallery/maintenance.png",
    title: { en: "Maintenance & Service", es: "Mantenimiento y Servicio" },
    desc: {
      en: "Routine maintenance, oil changes, fluid service, filters, and preventive care to keep your vehicle running smoothly.",
      es: "Mantenimiento rutinario, cambios de aceite, servicio de fluidos, filtros y cuidado preventivo para mantener tu vehículo en perfecto estado.",
    },
  },
  {
    id: "frame-alignment",
    icon: "alignment",
    image: "/media/gallery/frame-alignment.png",
    title: { en: "Frame Alignment", es: "Alineación de Bastidor" },
    desc: {
      en: "Precision frame and structural alignment. We ensure your vehicle's frame is perfectly straight and safe.",
      es: "Alineación de bastidor y estructura de precisión. Aseguramos que el bastidor de tu vehículo esté perfectamente recto y seguro.",
    },
  },
  {
    id: "insurance-claims",
    icon: "wrench",
    image: "/media/gallery/insurance-claims.png",
    title: { en: "Insurance Claims", es: "Reclamos de Seguros" },
    desc: {
      en: "We work directly with insurance companies. Let us handle your claim — you focus on what matters.",
      es: "Trabajamos directamente con compañías de seguros. Déjanos manejar tu reclamo — tú enfócate en lo importante.",
    },
  },
];

// Strings for the scrolling marquee strip.
export const MARQUEE_ITEMS = [
  "Reparación de Colisiones",
  "Pintura y Carrocería",
  "Sistemas Prius e Híbridos",
  "Diagnóstico de Motor",
  "Frenos y Suspensión",
  "Mantenimiento Completo",
  "Alineación de Bastidor",
  "Reclamos de Seguros",
  "Collision Repair",
  "Paint & Body Work",
  "Prius & Hybrid Systems",
  "Engine Diagnostics",
  "Brakes & Suspension",
  "Full Maintenance",
  "Frame Alignment",
  "Insurance Claims",
];

// Social media reels or featured content.
export const REELS = [
];

// Static gallery images shown when REELS is empty.
export const GALLERY_IMAGES = [
  { src: "/media/gallery/mechanic-at-work.jpg", alt: { en: "Professional mechanic at work", es: "Mecánico profesional trabajando" } },
  { src: "/media/hero/shop-lift.jpg", alt: { en: "Vehicle maintenance on lift", es: "Mantenimiento de vehículo en elevador" } },
  { src: "/media/gallery/gallery-workshop.png", alt: { en: "IAM Motors workshop at golden hour", es: "Taller de IAM Motors al atardecer" } },
  { src: "/media/posters/general-mechanics.png", alt: { en: "General mechanical service", es: "Servicio mecánico general" } },
  { src: "/media/posters/air-conditioning.png", alt: { en: "Technician at work in the shop", es: "Técnico trabajando en el taller" } },
  { src: "/services/new-tires-shop.png", alt: { en: "Tire service at the shop", es: "Servicio de llantas en el taller" } },
  { src: "/media/posters/suspension.png", alt: { en: "Suspension service detail", es: "Detalle del servicio de suspensión" } },
];

// Shop videos for the gallery.
export const GALLERY_VIDEOS = [
  { src: "/media/video/shop-work.mp4", alt: { en: "Shop work in action", es: "Trabajo del taller en acción" } },
];

export const OWNERS_RIDE = {
  kicker: { en: "Our commitment", es: "Nuestro compromiso" },
  title: { en: "Quality Workmanship & Clear Communication", es: "Artesanía de Calidad y Comunicación Clara" },
  body: {
    en: "From collision repair to hybrid systems to routine maintenance, we deliver quality workmanship backed by honest estimates and clear communication. Your vehicle is in trusted hands.",
    es: "Desde reparación de colisiones hasta sistemas híbridos hasta mantenimiento rutinario, entregamos artesanía de calidad respaldada por estimados honestos y comunicación clara. Tu vehículo está en manos de confianza.",
  },
};

export const ABOUT_US = {
  brandStatement: {
    en: "Under new ownership, IAM Motors Services LLC delivers full-service auto repair with quality workmanship, clear communication, and honest estimates.",
    es: "Bajo nueva administración, IAM Motors Services LLC entrega reparación automotriz completa con artesanía de calidad, comunicación clara y estimados honestos.",
  },
  cards: [
    {
      id: "who-we-are",
      title: { en: "Who We Are", es: "Quiénes Somos" },
      body: {
        en: "IAM Motors Services LLC is a full-service auto body and repair shop proudly serving San Jose. We specialize in collision repair, paint and body work, and comprehensive mechanical service — from Toyota Prius and hybrid systems to diagnostics, brakes, suspension, cooling systems, and maintenance for all vehicles.",
        es: "IAM Motors Services LLC es un taller de carrocería y reparación automotriz completo sirviendo con orgullo a San Jose. Nos especializamos en reparación de colisiones, pintura y trabajo de carrocería, y servicio mecánico completo — desde sistemas Toyota Prius e híbridos hasta diagnóstico, frenos, suspensión, sistemas de refrigeración y mantenimiento para todos los vehículos.",
      },
    },
    {
      id: "mission",
      title: { en: "Our Mission", es: "Nuestra Misión" },
      body: {
        en: "To provide exceptional collision repair, body work, and comprehensive mechanical service — with quality workmanship, clear communication, honest estimates, and seamless insurance claim handling.",
        es: "Brindar reparación excepcional de colisiones, trabajo de carrocería y servicio mecánico completo — con artesanía de calidad, comunicación clara, estimados honestos y manejo sin problemas de reclamos de seguros.",
      },
    },
    {
      id: "vision",
      title: { en: "Our Vision", es: "Nuestra Visión" },
      body: {
        en: "To be San Jose's trusted full-service auto repair shop — known for quality workmanship, transparency, expertise with hybrid and gas vehicles, and genuine care for every customer.",
        es: "Ser el taller de reparación automotriz de confianza de San Jose — conocidos por artesanía de calidad, transparencia, experiencia con vehículos híbridos y de gasolina, y atención genuina a cada cliente.",
      },
    },
  ],
};

export const TESTIMONIALS = [
  {
    quote: {
      en: "After my accident, IAM Motors handled everything. Insurance claim, repairs, perfect paint match. Car looks brand new. Highly recommend!",
      es: "Después de mi accidente, IAM Motors manejó todo. Reclamo de seguros, reparaciones, emparejamiento de pintura perfecto. Auto se ve como nuevo. ¡Muy recomendado!",
    },
    author: "David R.",
  },
  {
    quote: {
      en: "Professional work, honest pricing, and they really care about your vehicle. Best collision shop I've found. They speak Spanish too!",
      es: "Trabajo profesional, precios honestos, y realmente les importa tu vehículo. Mejor taller de colisiones que he encontrado. ¡También hablan español!",
    },
    author: "Sandra G.",
  },
  {
    quote: {
      en: "Insurance approved their work immediately. Fast turnaround, excellent results. My car was fixed perfectly in 2 weeks.",
      es: "El seguro aprobó su trabajo inmediatamente. Entrega rápida, excelentes resultados. Mi auto se reparó perfectamente en 2 semanas.",
    },
    author: "Miguel C.",
  },
];

export const COPY = {
  nav: {
    about: { en: "Our Company", es: "Nuestra Empresa" },
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
      en: "Type your vehicle and pick services for a ballpark price. We confirm the exact price in person.",
      es: "Escriba su vehículo y elija servicios para un precio aproximado. Confirmamos el precio exacto en persona.",
    },
      vehicleStep: { en: "1. Your vehicle", es: "1. Su vehículo" },
      vehicleTextLabel: { en: "Vehicle", es: "Vehículo" },
      vehicleTextPlaceholder: { en: "e.g. 2019 Toyota Camry", es: "ej. 2019 Toyota Camry" },
      vehicleTextHint: { en: "Type any details you want us to know.", es: "Escriba cualquier detalle que quiera que sepamos." },
      vehicleClassLabel: { en: "Vehicle type", es: "Tipo de vehículo" },
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
    kicker: { en: "Full-Service Auto Repair & Body Shop", es: "Taller de Carrocería y Reparación Automotriz Completo" },
    callNow: { en: "Call Now", es: "Llamar Ahora" },
    directions: { en: "Get Directions", es: "Cómo Llegar" },
    note: {
      en: "Collision repair, paint, body work, hybrid systems, diagnostics, brakes, suspension, maintenance. Insurance welcome.",
      es: "Reparación de colisiones, pintura, carrocería, sistemas híbridos, diagnóstico, frenos, suspensión, mantenimiento. Seguros bienvenidos.",
    },
    alignment: {
      badge: { en: "Collision & mechanical expertise", es: "Experiencia en colisiones y mecánica" },
      kicker: { en: "Quality workmanship", es: "Artesanía de calidad" },
      title: {
        en: "Expert Collision Repair, Paint & Mechanical Service",
        es: "Reparación Experta de Colisiones, Pintura y Servicio Mecánico",
      },
      body: {
        en: "IAM Motors Services LLC provides complete auto repair — from collision damage and paint to Toyota Prius systems, diagnostics, brakes, suspension, cooling systems, and preventive maintenance. Quality workmanship, clear communication, honest estimates.",
        es: "IAM Motors Services LLC proporciona reparación automotriz completa — desde daño de colisión y pintura hasta sistemas Toyota Prius, diagnóstico, frenos, suspensión, sistemas de refrigeración y mantenimiento preventivo. Artesanía de calidad, comunicación clara, estimados honestos.",
      },
      points: {
        en: ["Prius & hybrid system specialists", "Complete mechanical diagnostics", "Professional paint & body work"],
        es: ["Especialistas en sistemas Prius e híbridos", "Diagnóstico mecánico completo", "Pintura y carrocería profesional"],
      },
      cta: { en: "Get a free estimate", es: "Obtén un estimado gratis" },
      ctaSecondary: { en: "All services", es: "Todos los servicios" },
    },
    afterpay: {
      en: "Insurance claims handled — we work with your insurance company",
      es: "Reclamos de seguros manejados — trabajamos con tu compañía de seguros",
    },
  },
  about: {
    heading: { en: "Our Company", es: "Nuestra Empresa" },
    sub: {
      en: "Full-service auto repair under new ownership. Quality workmanship, clear communication, honest estimates, and expertise with all vehicles including Toyota Prius and hybrid systems.",
      es: "Reparación automotriz completa bajo nueva administración. Artesanía de calidad, comunicación clara, estimados honestos y experiencia con todos los vehículos incluyendo Toyota Prius y sistemas híbridos.",
    },
  },
  services: {
    heading: { en: "Our Services", es: "Nuestros Servicios" },
    sub: {
      en: "Complete auto repair: collision repair, paint & body work, Toyota Prius & hybrid systems, diagnostics, brakes, suspension, cooling systems, and maintenance.",
      es: "Reparación automotriz completa: reparación de colisiones, pintura y carrocería, sistemas Toyota Prius e híbridos, diagnóstico, frenos, suspensión, sistemas de refrigeración y mantenimiento.",
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
    heading: { en: "Why Choose IAM Motors", es: "Por Qué Elegirnos" },
    sub: {
      en: "Quality workmanship, clear communication, honest estimates, Prius expertise, and full-service repair.",
      es: "Artesanía de calidad, comunicación clara, estimados honestos, experiencia Prius y reparación completa.",
    },
    financeTitle: { en: "Hybrid & Gas Vehicle Expertise", es: "Experiencia en Vehículos Híbridos y de Gasolina" },
    financeSub: {
      en: "We specialize in Toyota Prius and hybrid systems while serving all gas vehicles. Complete diagnostics and repair for every vehicle type.",
      es: "Nos especializamos en sistemas Toyota Prius e híbridos mientras servimos todos los vehículos de gasolina. Diagnóstico y reparación completa para cada tipo de vehículo.",
    },
    financeCta: { en: "Ask about hybrid service", es: "Pregunta sobre servicio híbrido" },
    loyaltyTitle: { en: "Insurance Direct Repair", es: "Reparación Directa de Seguros" },
    loyaltySub: {
      en: "We are preferred vendors for most insurance companies. We handle your claim, manage deductibles, and get you back on the road fast.",
      es: "Somos vendedores preferentes para la mayoría de compañías de seguros. Manejamos tu reclamo, gestionamos deducciones y te devolvemos a la carretera rápidamente.",
    },
    loyaltyCta: { en: "Contact us for insurance work", es: "Contáctanos para trabajo de seguros" },
    driverTitle: { en: "Free Honest Estimates", es: "Estimaciones Gratuitas y Honestas" },
    driverSub: {
      en: "Get a detailed, honest estimate for any work — free, no obligation. We believe in transparent pricing and clear communication.",
      es: "Obtén un estimado detallado y honesto para cualquier trabajo — gratis, sin obligación. Creemos en precios transparentes y comunicación clara.",
    },
    driverPrice: "FREE",
    driverIncludes: {
      en: ["Detailed Assessment", "Honest Pricing", "Clear Communication"],
      es: ["Evaluación Detallada", "Precios Honestos", "Comunicación Clara"],
    },
    driverCta: { en: "Request an estimate", es: "Solicita un estimado" },
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
