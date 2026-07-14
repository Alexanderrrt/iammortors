import { LEGAL_EFFECTIVE_DATE } from "../lib/legal.js";
import { SITE } from "./site.config.js";

export const PRIVACY_DOCUMENT = {
  en: {
    eyebrow: "Legal",
    title: "Privacy Policy",
    effective: `Effective: ${LEGAL_EFFECTIVE_DATE.en}`,
    intro: `${SITE.name} (“IAM Motors,” “we,” “us,” or “our”) explains here how information is collected, used, disclosed, and protected when you use iammotors.com, request an estimate, upload a photo, or request an appointment.`,
    toc: "On this page",
    relatedLabel: "Also review our Terms of Use",
    relatedHref: "/terms",
    sections: [
      {
        id: "scope",
        title: "1. Scope",
        paragraphs: [
          "This Policy applies to the public IAM Motors website and its online estimate, chat, photo-upload, and appointment-request features. It does not govern information collected solely during an in-shop repair transaction, employment relationship, or by a third-party service under its own policy.",
        ],
      },
      {
        id: "information",
        title: "2. Information we collect",
        paragraphs: [
          "Depending on how you use the site, we may collect the following categories of information:",
          "The public website does not currently request or store payment-card details.",
        ],
        bullets: [
          "Contact details: your name and telephone or WhatsApp number when you request follow-up or an appointment.",
          "Vehicle and service information: year, make, model, vehicle class, requested service, damage description, visible symptoms, estimate range, and related notes.",
          "Conversation content: messages submitted to the estimator and limited de-identified wording patterns derived from recent leads.",
          "Photos: optional vehicle or damage images, their file type and size, and AI-generated descriptions or classifications.",
          "Appointment information: requested or scheduled date and time, appointment status, and communications about the request.",
          "Technical and security data: a signed session identifier, IP address used for bot and abuse prevention, hashed rate-limit identifiers, request timestamps, and standard server or provider logs that may include browser, device, and network information.",
          "Preferences: your English or Spanish language selection, stored locally in your browser.",
        ],
      },
      {
        id: "sources",
        title: "3. Sources of information",
        bullets: [
          "Directly from you when you type, upload, call, message, or schedule.",
          "Automatically from your browser, device, security cookies, and service providers when you use the site.",
          "From IAM Motors staff when they update a lead, appointment, inspection result, or staff-reviewed pricing example.",
        ],
      },
      {
        id: "uses",
        title: "4. How we use information",
        bullets: [
          "Provide preliminary estimates and analyze visible vehicle damage.",
          "Respond to requests, contact you, and schedule or manage appointments.",
          "Operate, secure, troubleshoot, and improve the website and estimating process.",
          "Prevent spam, fraud, automated abuse, and conflicting appointment reservations.",
          "Maintain business records, resolve disputes, comply with law, and protect customers, IAM Motors, and others.",
          "Use de-identified vehicle, service, and request patterns—and staff-reviewed examples where permitted—to improve service routing and pricing guidance. Contact details are excluded from the chatbot’s learning context.",
        ],
      },
      {
        id: "ai",
        title: "5. AI-assisted estimates and photos",
        paragraphs: [
          "The estimator uses Groq-hosted AI models to process chat text and, when you choose, vehicle photos. The AI helps classify a vehicle, identify possible services, and describe visible damage. Pricing is calculated by IAM Motors rules; AI output is not a diagnosis, final price, repair authorization, or safety inspection.",
          "Your submitted content may be transmitted to Groq for processing. Do not upload faces, identification documents, financial information, medical information, or unrelated personal content. Third-party processing is also governed by the provider’s terms and privacy practices.",
        ],
      },
      {
        id: "disclosures",
        title: "6. When we disclose information",
        paragraphs: ["We may disclose information only as reasonably necessary to:"],
        bullets: [
          "Supabase, which provides database and file-storage infrastructure.",
          "Groq, which processes AI chat and image-analysis requests.",
          "Cloudflare Turnstile, which receives security-token and network information to distinguish people from abusive automation.",
          "Hosting, communications, IT, professional, insurance, payment, financing, or repair partners supporting a request or our business.",
          "Government authorities, courts, insurers, or other parties when required by law or reasonably necessary to protect rights, safety, property, or prevent fraud.",
          "A buyer, successor, or adviser in connection with a merger, financing, sale, or other business transaction, subject to appropriate safeguards.",
        ],
      },
      {
        id: "third-parties",
        title: "7. WhatsApp, maps, social media, and embedded content",
        paragraphs: [
          "If you open WhatsApp, Meta services, Instagram, Facebook, Google Maps, or Apple Maps, those companies may receive information such as your IP address, device information, cookies, and the content you choose to send. Instagram content embedded on our site may communicate with Meta when it loads. Their handling of information is governed by their own policies, not this Policy.",
        ],
      },
      {
        id: "cookies",
        title: "8. Cookies and local storage",
        bullets: [
          "iam_chat: a signed, HTTP-only cookie used to secure and associate a quote conversation, upload, lead, and appointment request. It normally expires after four hours.",
          "tsr-lang: a local-storage preference that remembers English or Spanish until you clear site data.",
          "Turnstile and embedded third-party services may use their own cookies or similar technologies for security or functionality.",
        ],
        paragraphs: [
          "We do not currently use the public website to sell personal information or intentionally share it for cross-context behavioral advertising. Because of that, Global Privacy Control or Do Not Track signals do not change our current practices. Third-party embeds may respond differently under their own policies.",
        ],
      },
      {
        id: "sale",
        title: "9. Sale and targeted advertising",
        paragraphs: [
          "IAM Motors does not sell personal information for money and does not knowingly share personal information for cross-context behavioral advertising. We also do not use information collected through the quote form to send unrelated marketing without separate permission.",
        ],
      },
      {
        id: "retention",
        title: "10. Retention",
        paragraphs: [
          "We retain quote leads, appointment records, messages, photos, consent records, and related business records for as long as reasonably necessary to handle the request, provide services, maintain records, resolve disputes, enforce agreements, and meet legal, tax, insurance, or operational requirements. Security records are generally short-lived but may remain until routine cleanup. Backups may persist for a limited additional period.",
          "There is no customer account on the public site. You may request deletion as described below, subject to legal exceptions and records we must retain.",
        ],
      },
      {
        id: "security",
        title: "11. Security",
        paragraphs: [
          "We use reasonable administrative and technical safeguards, including signed session cookies, bot verification, rate limiting, authenticated staff tools, server-side credentials, and restricted database access. No internet transmission or storage system is guaranteed to be completely secure. Uploaded booking photos may use unlisted, hard-to-guess links; anyone who obtains an exact active link may be able to view it, so photo links should be treated as confidential and not shared unnecessarily.",
        ],
      },
      {
        id: "california",
        title: "12. California privacy rights",
        paragraphs: [
          "To the extent California law applies, California residents may request access to categories or specific pieces of personal information, correction, deletion, and information about collection and disclosure. Residents may also have rights to opt out of sale or sharing, limit certain uses of sensitive personal information, and receive equal service for exercising privacy rights. We do not currently sell or knowingly share personal information for cross-context behavioral advertising.",
          "To make a request, call us or write to the address in the Contact section. Describe the request and provide enough information for us to reasonably verify that you are the person concerned. An authorized agent may submit a request when legally permitted; we may request proof of authority and direct verification. We will not discriminate for exercising an applicable privacy right. Some information may be exempt or retained where law permits.",
        ],
      },
      {
        id: "children",
        title: "13. Children",
        paragraphs: [
          "The website is not directed to children under 13, and we do not knowingly collect their personal information. A person under 18 should use appointment and estimate features only with a parent or legal guardian’s involvement. Contact us if you believe a child submitted information.",
        ],
      },
      {
        id: "changes",
        title: "14. Changes to this Policy",
        paragraphs: [
          "We may update this Policy when our practices, providers, or legal obligations change. The revised version will appear here with a new effective date. Material changes may also be highlighted on the site when appropriate.",
        ],
      },
      {
        id: "contact",
        title: "15. Contact us",
        paragraphs: [
          `For privacy questions or requests, call ${SITE.phone} or write to ${SITE.name}, ${SITE.locations[0].full}.`,
        ],
      },
    ],
  },
  es: {
    eyebrow: "Legal",
    title: "Política de Privacidad",
    effective: `Vigente desde: ${LEGAL_EFFECTIVE_DATE.es}`,
    intro: `${SITE.name} (“IAM Motors”, “nosotros” o “nuestro”) explica cómo se recopila, usa, comparte y protege la información cuando usa iammotors.com, solicita un estimado, sube una foto o pide una cita.`,
    toc: "En esta página",
    relatedLabel: "Consulte también nuestros Términos de Uso",
    relatedHref: "/terms",
    sections: [
      {
        id: "scope",
        title: "1. Alcance",
        paragraphs: [
          "Esta Política se aplica al sitio público de IAM Motors y a sus funciones de estimado, chat, carga de fotos y solicitud de citas. No rige la información recopilada exclusivamente durante una reparación en el taller, una relación laboral o por un servicio externo bajo su propia política.",
        ],
      },
      {
        id: "information",
        title: "2. Información que recopilamos",
        paragraphs: [
          "Según cómo use el sitio, podemos recopilar las siguientes categorías:",
          "Actualmente, el sitio público no solicita ni almacena datos de tarjetas de pago.",
        ],
        bullets: [
          "Datos de contacto: nombre y número de teléfono o WhatsApp cuando solicita seguimiento o una cita.",
          "Vehículo y servicio: año, marca, modelo, clase de vehículo, servicio solicitado, descripción del daño, síntomas visibles, rango estimado y notas relacionadas.",
          "Contenido de conversación: mensajes enviados al estimador y patrones limitados y desidentificados derivados de solicitudes recientes.",
          "Fotos: imágenes opcionales del vehículo o daño, tipo y tamaño del archivo, y descripciones o clasificaciones generadas por IA.",
          "Citas: fecha y hora solicitada o programada, estado y comunicaciones sobre la solicitud.",
          "Datos técnicos y de seguridad: identificador de sesión firmado, dirección IP usada para prevenir bots y abuso, identificadores cifrados para límites de uso, horas de solicitud y registros estándar del servidor o proveedores que pueden incluir navegador, dispositivo y red.",
          "Preferencias: selección de inglés o español guardada localmente en su navegador.",
        ],
      },
      {
        id: "sources",
        title: "3. Fuentes de información",
        bullets: [
          "Directamente de usted cuando escribe, sube archivos, llama, envía mensajes o agenda.",
          "Automáticamente desde su navegador, dispositivo, cookies de seguridad y proveedores al usar el sitio.",
          "Del personal de IAM Motors cuando actualiza una solicitud, cita, inspección o ejemplo de precios revisado.",
        ],
      },
      {
        id: "uses",
        title: "4. Cómo usamos la información",
        bullets: [
          "Proporcionar estimados preliminares y analizar daño visible.",
          "Responder, contactarle y programar o administrar citas.",
          "Operar, proteger, solucionar problemas y mejorar el sitio y el proceso de estimación.",
          "Prevenir spam, fraude, abuso automatizado y conflictos de citas.",
          "Mantener registros, resolver disputas, cumplir la ley y proteger a clientes, IAM Motors y terceros.",
          "Usar patrones desidentificados de vehículo, servicio y solicitud—y ejemplos revisados por el personal cuando esté permitido—para mejorar la clasificación y orientación de precios. Los datos de contacto se excluyen del contexto de aprendizaje del chatbot.",
        ],
      },
      {
        id: "ai",
        title: "5. Estimados y fotos asistidos por IA",
        paragraphs: [
          "El estimador usa modelos de IA alojados por Groq para procesar texto del chat y, si usted decide, fotos del vehículo. La IA ayuda a clasificar el vehículo, identificar posibles servicios y describir daño visible. Los precios se calculan mediante reglas de IAM Motors; la IA no constituye diagnóstico, precio final, autorización de reparación ni inspección de seguridad.",
          "El contenido enviado puede transmitirse a Groq para su procesamiento. No suba rostros, identificaciones, información financiera o médica, ni contenido personal no relacionado. El procesamiento de terceros también se rige por sus propios términos y prácticas de privacidad.",
        ],
      },
      {
        id: "disclosures",
        title: "6. Cuándo compartimos información",
        paragraphs: ["Podemos compartir información solo cuando sea razonablemente necesario con:"],
        bullets: [
          "Supabase, proveedor de base de datos y almacenamiento de archivos.",
          "Groq, que procesa solicitudes de chat y análisis de imágenes con IA.",
          "Cloudflare Turnstile, que recibe datos de token y red para distinguir personas de automatización abusiva.",
          "Proveedores de alojamiento, comunicaciones, TI, servicios profesionales, seguros, pagos, financiamiento o reparación que apoyan la solicitud o el negocio.",
          "Autoridades, tribunales, aseguradoras u otros cuando la ley lo requiera o sea necesario para proteger derechos, seguridad, propiedad o prevenir fraude.",
          "Un comprador, sucesor o asesor relacionado con una fusión, financiamiento, venta u otra transacción comercial, con protecciones apropiadas.",
        ],
      },
      {
        id: "third-parties",
        title: "7. WhatsApp, mapas, redes sociales y contenido integrado",
        paragraphs: [
          "Si abre WhatsApp, servicios de Meta, Instagram, Facebook, Google Maps o Apple Maps, esas compañías pueden recibir su IP, datos del dispositivo, cookies y el contenido que decida enviar. El contenido de Instagram integrado puede comunicarse con Meta al cargarse. Sus políticas, no esta Política, rigen el tratamiento por esas compañías.",
        ],
      },
      {
        id: "cookies",
        title: "8. Cookies y almacenamiento local",
        bullets: [
          "iam_chat: cookie firmada y solo HTTP que protege y relaciona una conversación, carga, solicitud y cita. Normalmente vence después de cuatro horas.",
          "tsr-lang: preferencia local que recuerda inglés o español hasta que borre los datos del sitio.",
          "Turnstile y servicios externos integrados pueden usar sus propias cookies o tecnologías similares para seguridad o funcionamiento.",
        ],
        paragraphs: [
          "Actualmente no usamos el sitio público para vender información personal ni compartirla intencionalmente para publicidad conductual entre contextos. Por ello, las señales Global Privacy Control o Do Not Track no cambian nuestras prácticas actuales. Los servicios integrados pueden responder de manera distinta bajo sus políticas.",
        ],
      },
      {
        id: "sale",
        title: "9. Venta y publicidad dirigida",
        paragraphs: [
          "IAM Motors no vende información personal por dinero ni la comparte a sabiendas para publicidad conductual entre contextos. Tampoco usamos los datos del formulario de cotización para mercadeo no relacionado sin permiso separado.",
        ],
      },
      {
        id: "retention",
        title: "10. Conservación",
        paragraphs: [
          "Conservamos solicitudes, citas, mensajes, fotos, registros de consentimiento y documentos relacionados durante el tiempo razonablemente necesario para atender la solicitud, prestar servicios, mantener registros, resolver disputas, aplicar acuerdos y cumplir requisitos legales, fiscales, de seguros u operativos. Los registros de seguridad suelen ser de corta duración, pero pueden permanecer hasta una limpieza rutinaria. Las copias de respaldo pueden persistir por un período adicional limitado.",
          "El sitio público no crea una cuenta de cliente. Puede solicitar eliminación como se explica abajo, sujeto a excepciones legales y registros que debamos conservar.",
        ],
      },
      {
        id: "security",
        title: "11. Seguridad",
        paragraphs: [
          "Usamos medidas administrativas y técnicas razonables, incluidas cookies de sesión firmadas, verificación de bots, límites de uso, herramientas autenticadas para el personal, credenciales del lado del servidor y acceso restringido a la base de datos. Ninguna transmisión o almacenamiento por internet es completamente seguro. Las fotos de citas pueden usar enlaces no listados y difíciles de adivinar; quien obtenga un enlace activo exacto podría ver la imagen, por lo que debe tratarlo como confidencial y no compartirlo innecesariamente.",
        ],
      },
      {
        id: "california",
        title: "12. Derechos de privacidad de California",
        paragraphs: [
          "En la medida en que aplique la ley de California, los residentes pueden solicitar acceso a categorías o datos específicos, corrección, eliminación e información sobre recopilación y divulgación. También pueden tener derechos a excluirse de venta o intercambio, limitar ciertos usos de información sensible y recibir el mismo servicio al ejercer sus derechos. Actualmente no vendemos ni compartimos a sabiendas información personal para publicidad conductual entre contextos.",
          "Para solicitarlo, llámenos o escriba a la dirección de Contacto. Describa su solicitud y proporcione suficiente información para verificar razonablemente su identidad. Un agente autorizado puede presentar una solicitud cuando la ley lo permita; podemos pedir prueba de autoridad y verificación directa. No discriminaremos por ejercer un derecho aplicable. Cierta información puede estar exenta o conservarse cuando la ley lo permita.",
        ],
      },
      {
        id: "children",
        title: "13. Menores",
        paragraphs: [
          "El sitio no está dirigido a menores de 13 años y no recopilamos conscientemente su información personal. Una persona menor de 18 debe usar las funciones de citas y estimados con participación de su padre, madre o tutor legal. Contáctenos si cree que un menor envió información.",
        ],
      },
      {
        id: "changes",
        title: "14. Cambios a esta Política",
        paragraphs: [
          "Podemos actualizar esta Política cuando cambien nuestras prácticas, proveedores u obligaciones legales. La versión revisada aparecerá aquí con una nueva fecha de vigencia. Los cambios importantes también podrán destacarse en el sitio.",
        ],
      },
      {
        id: "contact",
        title: "15. Contacto",
        paragraphs: [
          `Para preguntas o solicitudes de privacidad, llame al ${SITE.phone} o escriba a ${SITE.name}, ${SITE.locations[0].full}.`,
        ],
      },
    ],
  },
};

export const TERMS_DOCUMENT = {
  en: {
    eyebrow: "Legal",
    title: "Terms of Use",
    effective: `Effective: ${LEGAL_EFFECTIVE_DATE.en}`,
    intro: `These Terms govern use of iammotors.com and its online estimate, chat, photo, and appointment features provided by ${SITE.name}. Please read them before using the site.`,
    toc: "On this page",
    relatedLabel: "Also review our Privacy Policy",
    relatedHref: "/privacy",
    sections: [
      {
        id: "agreement",
        title: "1. Agreement to these Terms",
        paragraphs: [
          "By accessing or using the site, you agree to these Terms and acknowledge the Privacy Policy. If you do not agree, do not use the interactive features. If you use the site for a company or another person, you represent that you have authority to act for them.",
        ],
      },
      {
        id: "eligibility",
        title: "2. Eligibility",
        paragraphs: [
          "You must be at least 18 years old to request an appointment or agree to repair services. A minor may use the informational portions of the site only with a parent or legal guardian. The site is intended primarily for users in the United States.",
        ],
      },
      {
        id: "services",
        title: "3. Website information and shop services",
        paragraphs: [
          "The site describes auto-body, collision, mechanical, maintenance, towing, insurance-support, and related services. Availability, qualifications, parts, timing, and pricing vary by vehicle and condition. Website content is general information and may be changed or corrected without notice.",
          "The site is not an emergency service. If a vehicle may be unsafe, is leaking fuel, is smoking, is in traffic, or someone is injured, move to safety when possible and contact emergency or roadside assistance.",
        ],
      },
      {
        id: "estimates",
        title: "4. Online estimates and AI output",
        paragraphs: [
          "All online amounts are preliminary ranges based on limited information, configured pricing rules, and vehicle categories. Chat and photo analysis use artificial intelligence and may misidentify a vehicle, part, damage, or needed service. Hidden damage, diagnostic findings, labor, parts, taxes, fees, calibrations, paint matching, market conditions, and insurance decisions may materially change the final amount.",
          "An online estimate is not an offer, guarantee, diagnosis, repair authorization, insurance appraisal, or promise that the vehicle is safe to drive. IAM Motors must inspect the vehicle and confirm scope and price. Nothing on the site replaces a written estimate, repair order, authorization, invoice, or consumer right required by California law.",
        ],
      },
      {
        id: "appointments",
        title: "5. Appointment requests",
        paragraphs: [
          "Submitting or selecting a time creates an appointment request only. A time may require shop confirmation and may be changed because of availability, parts, staffing, emergencies, or scheduling conflicts. Contact the shop promptly if you need to cancel or reschedule.",
          "Any actual repair is governed by the documents and authorizations provided at the shop. Insurance coverage, claim approval, financing, warranties, and third-party payments are subject to separate terms and approval by the responsible provider.",
        ],
      },
      {
        id: "communications",
        title: "6. Calls, texts, and WhatsApp",
        paragraphs: [
          "When you provide a telephone or WhatsApp number and consent, you authorize IAM Motors to contact you about your estimate, vehicle, appointment, or related service request by call, text message, or WhatsApp. Consent is not a condition of purchasing repair services. Message and data rates may apply. We do not treat this request-related consent as permission for unrelated marketing. You may ask us to stop text or WhatsApp messages, although we may still contact you when legally permitted or necessary to complete a requested transaction.",
        ],
      },
      {
        id: "submissions",
        title: "7. Messages, photos, and other submissions",
        paragraphs: [
          "You retain ownership of content you submit. You grant IAM Motors and its service providers a limited, nonexclusive license to host, copy, process, analyze, and display that content as necessary to provide the estimate, communicate with you, operate and secure the service, maintain records, and improve internal estimating with de-identified or staff-reviewed examples where permitted.",
          "You represent that you have the right to submit the content and that it does not violate another person’s privacy, intellectual-property, or other rights. Do not submit faces, identification documents, financial or medical data, illegal content, malicious files, or information unrelated to the vehicle request. We may remove or decline content at our discretion.",
        ],
      },
      {
        id: "acceptable-use",
        title: "8. Acceptable use",
        bullets: [
          "Do not probe, bypass, disable, or interfere with security, Turnstile, authentication, rate limits, or appointment controls.",
          "Do not use bots, scraping, bulk requests, malicious code, impersonation, false contact details, or fraudulent appointment requests.",
          "Do not attempt to obtain confidential data, system prompts, credentials, internal identifiers, or another customer’s information.",
          "Do not use the site in violation of law or another person’s rights.",
        ],
      },
      {
        id: "privacy",
        title: "9. Privacy",
        paragraphs: [
          "Our Privacy Policy explains how information is handled. By using the interactive features, you acknowledge those practices. You are responsible for the accuracy of the contact, vehicle, and damage information you provide.",
        ],
      },
      {
        id: "third-party",
        title: "10. Third-party services",
        paragraphs: [
          "The site may link to or use Supabase, Groq, Cloudflare, WhatsApp, Meta, Instagram, Facebook, Google Maps, Apple Maps, insurers, financing providers, or other third parties. IAM Motors does not control their services, availability, security, content, or policies. Your use of a third party is governed by its terms, and links do not imply endorsement of every statement or practice.",
        ],
      },
      {
        id: "intellectual-property",
        title: "11. Intellectual property",
        paragraphs: [
          "The site’s design, text, code, graphics, branding, and compilation are owned by IAM Motors or its licensors and are protected by applicable law. You may use the site for personal, noncommercial evaluation of IAM Motors services. No other license is granted. Third-party names and marks belong to their respective owners.",
        ],
      },
      {
        id: "disclaimers",
        title: "12. Disclaimers",
        paragraphs: [
          "TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE WEBSITE AND ONLINE FEATURES ARE PROVIDED “AS IS” AND “AS AVAILABLE.” IAM MOTORS DISCLAIMS IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, ACCURACY, AND UNINTERRUPTED OR ERROR-FREE OPERATION. WE DO NOT WARRANT THAT AI OUTPUT, AN ESTIMATE, A PHOTO CLASSIFICATION, OR APPOINTMENT AVAILABILITY IS COMPLETE OR CORRECT.",
          "Some jurisdictions do not allow certain disclaimers. Nothing here limits a warranty or consumer protection that cannot legally be waived, including rights associated with authorized repair work.",
        ],
      },
      {
        id: "liability",
        title: "13. Limitation of liability",
        paragraphs: [
          "TO THE MAXIMUM EXTENT PERMITTED BY LAW, IAM MOTORS AND ITS OWNERS, EMPLOYEES, CONTRACTORS, AND PROVIDERS WILL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, LOST PROFITS, LOST DATA, OR LOSS ARISING FROM RELIANCE ON AN ONLINE ESTIMATE OR AI OUTPUT. FOR CLAIMS ARISING ONLY FROM USE OF THE WEBSITE—NOT FROM PAID REPAIR WORK—OUR AGGREGATE LIABILITY WILL NOT EXCEED $100.",
          "These limits do not apply where prohibited, or to liability that cannot legally be limited. Separate documents may govern liability for paid repair services.",
        ],
      },
      {
        id: "indemnity",
        title: "14. Indemnification",
        paragraphs: [
          "To the extent permitted by law, you agree to defend and indemnify IAM Motors from third-party claims arising from content you unlawfully submit, misuse of the site, fraud, or violation of these Terms or another person’s rights. This does not require a consumer to indemnify IAM Motors for IAM Motors’ own unlawful conduct.",
        ],
      },
      {
        id: "law",
        title: "15. Governing law and disputes",
        paragraphs: [
          "California law governs these Terms without regard to conflict-of-law rules. Before filing a website-related claim, please contact us and allow 30 days for an informal resolution. Unless applicable law requires otherwise, disputes concerning only the website will be brought in the state or federal courts serving Santa Clara County, California. Small-claims rights and non-waivable consumer rights remain available.",
        ],
      },
      {
        id: "general",
        title: "16. Changes and general terms",
        paragraphs: [
          "We may update the site or these Terms. The revised Terms apply prospectively from the effective date shown here. If a provision is unenforceable, it will be limited to the minimum extent necessary and the remaining provisions will continue. Failure to enforce a provision is not a waiver. These Terms, together with the Privacy Policy, are the entire agreement concerning the public website, but do not replace later repair documents.",
          "The Spanish translation is provided for convenience. To the extent permitted by law, the English version controls if there is a conflict in meaning.",
        ],
      },
      {
        id: "contact",
        title: "17. Contact",
        paragraphs: [
          `Questions about these Terms may be directed to ${SITE.name} at ${SITE.phone} or ${SITE.locations[0].full}.`,
        ],
      },
    ],
  },
  es: {
    eyebrow: "Legal",
    title: "Términos de Uso",
    effective: `Vigente desde: ${LEGAL_EFFECTIVE_DATE.es}`,
    intro: `Estos Términos rigen el uso de iammotors.com y sus funciones de estimado, chat, fotos y citas proporcionadas por ${SITE.name}. Léalos antes de usar el sitio.`,
    toc: "En esta página",
    relatedLabel: "Consulte también nuestra Política de Privacidad",
    relatedHref: "/privacy",
    sections: [
      {
        id: "agreement",
        title: "1. Aceptación de estos Términos",
        paragraphs: [
          "Al acceder o usar el sitio, acepta estos Términos y reconoce la Política de Privacidad. Si no está de acuerdo, no use las funciones interactivas. Si usa el sitio para una empresa u otra persona, declara que tiene autoridad para representarla.",
        ],
      },
      {
        id: "eligibility",
        title: "2. Elegibilidad",
        paragraphs: [
          "Debe tener al menos 18 años para solicitar una cita o aceptar servicios de reparación. Un menor puede usar las partes informativas solo con un padre, madre o tutor legal. El sitio está destinado principalmente a usuarios en Estados Unidos.",
        ],
      },
      {
        id: "services",
        title: "3. Información del sitio y servicios del taller",
        paragraphs: [
          "El sitio describe servicios de carrocería, colisión, mecánica, mantenimiento, grúa, apoyo con seguros y otros relacionados. La disponibilidad, requisitos, piezas, tiempo y precio varían según el vehículo y su condición. El contenido es información general y puede cambiar o corregirse sin aviso.",
          "El sitio no es un servicio de emergencia. Si el vehículo puede ser inseguro, pierde combustible, emite humo, está en el tráfico o alguien está lesionado, muévase a un lugar seguro cuando sea posible y contacte emergencias o asistencia vial.",
        ],
      },
      {
        id: "estimates",
        title: "4. Estimados en línea y resultados de IA",
        paragraphs: [
          "Todos los montos en línea son rangos preliminares basados en información limitada, reglas configuradas y categorías de vehículos. El chat y análisis de fotos usan inteligencia artificial y pueden identificar incorrectamente un vehículo, pieza, daño o servicio. Daños ocultos, diagnóstico, mano de obra, piezas, impuestos, cargos, calibraciones, color de pintura, mercado y decisiones de seguros pueden cambiar considerablemente el precio final.",
          "Un estimado en línea no es oferta, garantía, diagnóstico, autorización de reparación, avalúo de seguro ni promesa de seguridad para conducir. IAM Motors debe inspeccionar el vehículo y confirmar alcance y precio. Nada reemplaza un estimado escrito, orden, autorización, factura o derecho exigido por la ley de California.",
        ],
      },
      {
        id: "appointments",
        title: "5. Solicitudes de cita",
        paragraphs: [
          "Enviar o seleccionar una hora crea solo una solicitud. El horario puede requerir confirmación y cambiar por disponibilidad, piezas, personal, emergencias o conflictos. Contacte al taller pronto para cancelar o reprogramar.",
          "Toda reparación real se rige por documentos y autorizaciones entregados en el taller. Cobertura de seguro, aprobación de reclamos, financiamiento, garantías y pagos de terceros están sujetos a términos y aprobación separados.",
        ],
      },
      {
        id: "communications",
        title: "6. Llamadas, textos y WhatsApp",
        paragraphs: [
          "Al proporcionar un número de teléfono o WhatsApp y dar consentimiento, autoriza a IAM Motors a contactarle sobre su estimado, vehículo, cita o solicitud relacionada por llamada, texto o WhatsApp. El consentimiento no es condición para comprar servicios. Pueden aplicar cargos de mensajes y datos. Este consentimiento no autoriza mercadeo no relacionado. Puede pedir que detengamos textos o WhatsApp, aunque podremos contactarle cuando la ley lo permita o sea necesario para completar una transacción solicitada.",
        ],
      },
      {
        id: "submissions",
        title: "7. Mensajes, fotos y otros envíos",
        paragraphs: [
          "Conserva la propiedad de su contenido. Otorga a IAM Motors y sus proveedores una licencia limitada y no exclusiva para alojar, copiar, procesar, analizar y mostrarlo cuando sea necesario para estimar, comunicarse, operar y proteger el servicio, mantener registros y mejorar internamente los estimados con ejemplos desidentificados o revisados cuando esté permitido.",
          "Declara que tiene derecho a enviar el contenido y que no viola privacidad, propiedad intelectual u otros derechos. No envíe rostros, identificaciones, datos financieros o médicos, contenido ilegal, archivos maliciosos ni información no relacionada. Podemos eliminar o rechazar contenido.",
        ],
      },
      {
        id: "acceptable-use",
        title: "8. Uso aceptable",
        bullets: [
          "No investigue, evada, desactive ni interfiera con seguridad, Turnstile, autenticación, límites de uso o controles de citas.",
          "No use bots, extracción masiva, solicitudes automatizadas, código malicioso, suplantación, datos falsos ni citas fraudulentas.",
          "No intente obtener datos confidenciales, instrucciones internas, credenciales, identificadores internos ni información de otro cliente.",
          "No use el sitio para violar la ley o derechos de terceros.",
        ],
      },
      {
        id: "privacy",
        title: "9. Privacidad",
        paragraphs: [
          "Nuestra Política de Privacidad explica cómo manejamos información. Al usar funciones interactivas, reconoce esas prácticas. Usted es responsable de la exactitud de los datos de contacto, vehículo y daño que proporciona.",
        ],
      },
      {
        id: "third-party",
        title: "10. Servicios de terceros",
        paragraphs: [
          "El sitio puede enlazar o usar Supabase, Groq, Cloudflare, WhatsApp, Meta, Instagram, Facebook, Google Maps, Apple Maps, aseguradoras, proveedores de financiamiento u otros. IAM Motors no controla sus servicios, disponibilidad, seguridad, contenido o políticas. El uso de un tercero se rige por sus términos, y un enlace no respalda todas sus declaraciones o prácticas.",
        ],
      },
      {
        id: "intellectual-property",
        title: "11. Propiedad intelectual",
        paragraphs: [
          "El diseño, texto, código, gráficos, marca y compilación del sitio pertenecen a IAM Motors o sus licenciantes y están protegidos por ley. Puede usarlo personalmente y sin fines comerciales para evaluar servicios. No se otorga otra licencia. Los nombres y marcas de terceros pertenecen a sus dueños.",
        ],
      },
      {
        id: "disclaimers",
        title: "12. Exclusiones de garantía",
        paragraphs: [
          "EN LA MÁXIMA MEDIDA PERMITIDA, EL SITIO Y SUS FUNCIONES SE OFRECEN “TAL CUAL” Y “SEGÚN DISPONIBILIDAD”. IAM MOTORS EXCLUYE GARANTÍAS IMPLÍCITAS DE COMERCIABILIDAD, IDONEIDAD, TÍTULO, NO INFRACCIÓN, EXACTITUD Y OPERACIÓN ININTERRUMPIDA O SIN ERRORES. NO GARANTIZAMOS QUE UN RESULTADO DE IA, ESTIMADO, CLASIFICACIÓN DE FOTO O DISPONIBILIDAD SEA COMPLETO O CORRECTO.",
          "Algunas jurisdicciones no permiten ciertas exclusiones. Nada limita una garantía o protección al consumidor que legalmente no pueda renunciarse, incluidos derechos relacionados con reparaciones autorizadas.",
        ],
      },
      {
        id: "liability",
        title: "13. Limitación de responsabilidad",
        paragraphs: [
          "EN LA MÁXIMA MEDIDA PERMITIDA, IAM MOTORS Y SUS DUEÑOS, EMPLEADOS, CONTRATISTAS Y PROVEEDORES NO SERÁN RESPONSABLES POR DAÑOS INDIRECTOS, INCIDENTALES, ESPECIALES, CONSECUENTES, EJEMPLARES O PUNITIVOS, PÉRDIDA DE GANANCIAS O DATOS, NI PÉRDIDAS POR CONFIAR EN UN ESTIMADO O RESULTADO DE IA. PARA RECLAMOS DERIVADOS SOLO DEL SITIO—NO DE REPARACIONES PAGADAS—NUESTRA RESPONSABILIDAD TOTAL NO EXCEDERÁ $100.",
          "Estos límites no aplican donde estén prohibidos ni a responsabilidad que no pueda limitarse. Documentos separados pueden regir las reparaciones pagadas.",
        ],
      },
      {
        id: "indemnity",
        title: "14. Indemnización",
        paragraphs: [
          "En la medida permitida, acepta defender e indemnizar a IAM Motors frente a reclamos de terceros derivados de contenido enviado ilegalmente, uso indebido, fraude o violación de estos Términos o derechos ajenos. Esto no exige indemnizar a IAM Motors por su propia conducta ilegal.",
        ],
      },
      {
        id: "law",
        title: "15. Ley aplicable y disputas",
        paragraphs: [
          "La ley de California rige estos Términos. Antes de presentar un reclamo relacionado con el sitio, contáctenos y permita 30 días para buscar una solución informal. Salvo que la ley exija otra cosa, disputas sobre el sitio se presentarán en tribunales estatales o federales de Santa Clara County, California. Permanecen disponibles los derechos de reclamos menores y derechos irrenunciables del consumidor.",
        ],
      },
      {
        id: "general",
        title: "16. Cambios y términos generales",
        paragraphs: [
          "Podemos actualizar el sitio o estos Términos. Los Términos revisados aplican hacia el futuro desde la fecha indicada. Si una disposición no puede aplicarse, se limitará al mínimo necesario y las demás continuarán. No exigir una disposición no es renuncia. Estos Términos y la Política son el acuerdo sobre el sitio público, pero no reemplazan documentos posteriores de reparación.",
          "La traducción al español se proporciona por conveniencia. En la medida permitida por la ley, la versión en inglés controla si existe conflicto de significado.",
        ],
      },
      {
        id: "contact",
        title: "17. Contacto",
        paragraphs: [
          `Puede dirigir preguntas sobre estos Términos a ${SITE.name} al ${SITE.phone} o en ${SITE.locations[0].full}.`,
        ],
      },
    ],
  },
};
