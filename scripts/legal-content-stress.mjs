import assert from "node:assert/strict";
import { PRIVACY_DOCUMENT, TERMS_DOCUMENT } from "../app/legal-content.js";
import { SITE } from "../app/site.config.js";
import { LEGAL_VERSION, legalConsentNote } from "../lib/legal.js";

function documentText(document, lang) {
  const copy = document[lang];
  return [
    copy.title,
    copy.effective,
    copy.intro,
    ...copy.sections.flatMap((section) => [
      section.title,
      ...(section.paragraphs || []),
      ...(section.bullets || []),
    ]),
  ].join(" ");
}

for (const [name, document, minimumSections] of [
  ["privacy", PRIVACY_DOCUMENT, 15],
  ["terms", TERMS_DOCUMENT, 17],
]) {
  for (const lang of ["en", "es"]) {
    const copy = document[lang];
    assert.ok(copy, `${name} is missing ${lang}`);
    assert.ok(copy.sections.length >= minimumSections, `${name} ${lang} is incomplete`);
    assert.equal(new Set(copy.sections.map((section) => section.id)).size, copy.sections.length, `${name} ${lang} has duplicate anchors`);
    assert.ok(copy.sections.every((section) => section.title && (section.paragraphs?.length || section.bullets?.length)), `${name} ${lang} has an empty section`);
    assert.match(copy.relatedHref, /^\/(?:privacy|terms)$/);
  }
}

const privacyEn = documentText(PRIVACY_DOCUMENT, "en");
const privacyEs = documentText(PRIVACY_DOCUMENT, "es");
const termsEn = documentText(TERMS_DOCUMENT, "en");
const termsEs = documentText(TERMS_DOCUMENT, "es");

for (const provider of ["Supabase", "Groq", "Cloudflare", "WhatsApp"]) {
  assert.match(privacyEn, new RegExp(provider, "i"), `privacy policy omits ${provider}`);
}
assert.match(privacyEn, /California privacy rights/i);
assert.match(privacyEn, /does not sell personal information/i);
assert.match(privacyEn, /four hours/i);
assert.match(privacyEn, /does not currently request or store payment-card/i);
assert.match(privacyEs, /Derechos de privacidad de California/i);
assert.match(termsEn, /preliminary ranges/i);
assert.match(termsEn, /artificial intelligence/i);
assert.match(termsEn, /Santa Clara County/i);
assert.match(termsEs, /rangos preliminares/i);
assert.match(privacyEn + termsEn, new RegExp(SITE.phone.replace(/[()]/g, "\\$&")));
assert.equal(SITE.url, "https://iammotors.com");
assert.match(legalConsentNote("en"), new RegExp(LEGAL_VERSION));
assert.match(legalConsentNote("es"), new RegExp(LEGAL_VERSION));

console.log("Legal content stress test passed: bilingual policies, disclosures, anchors, contact, and consent version verified.");
