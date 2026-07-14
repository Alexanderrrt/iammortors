export const LEGAL_VERSION = "2026-07-14";

export const LEGAL_EFFECTIVE_DATE = {
  en: "July 14, 2026",
  es: "14 de julio de 2026",
};

export function legalConsentNote(lang = "en") {
  return lang === "es"
    ? `Consentimiento web: Términos, Privacidad y contacto sobre la solicitud; versión ${LEGAL_VERSION}.`
    : `Web consent: Terms, Privacy, and request-related contact; version ${LEGAL_VERSION}.`;
}
