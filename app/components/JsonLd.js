import { SITE } from "../site.config";

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function locationSchema(loc) {
  return {
    "@type": ["TireShop", "AutoRepair"],
    name: SITE.name,
    url: SITE.url,
    telephone: SITE.phoneHref.replace("tel:", ""),
    priceRange: "$$",
    image: `${SITE.url}/media/brand/logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.line1,
      addressLocality: "San Jose",
      addressRegion: "CA",
      postalCode: loc.postalCode,
      addressCountry: "US",
    },
    openingHoursSpecification: SITE.hours
      .filter((h) => h.open && h.close)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: DAY_NAMES[h.day],
        opens: h.open,
        closes: h.close,
      })),
    sameAs: [SITE.social.instagram, SITE.social.facebook].filter(Boolean),
    knowsLanguage: ["en", "es"],
    paymentAccepted: "Cash, Credit Card, Financing",
  };
}

// schema.org LocalBusiness markup so Google can surface name, hours,
// phone and address in local search results and the map pack.
export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: SITE.name,
        url: SITE.url,
        description:
          "IAM Motors Services LLC is a bilingual auto body and repair shop in San Jose, CA specializing in collision repair, paint and body work, Prius and hybrid systems, diagnostics, brakes, suspension, and maintenance.",
        logo: `${SITE.url}/media/brand/logo.png`,
        sameAs: [SITE.social.instagram, SITE.social.facebook].filter(Boolean),
        knowsLanguage: ["en", "es"],
      },
      ...SITE.locations.map(locationSchema),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
