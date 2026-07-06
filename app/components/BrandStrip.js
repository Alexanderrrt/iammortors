"use client";

import { useT } from "../i18n/LanguageContext";
import { SITE } from "../site.config";
import Reveal from "./Reveal";

const BRANDS = [
  { name: "Bridgestone", logo: "/brands/bridgestone.svg" },
  { name: "Goodyear", logo: "/brands/goodyear.svg" },
  { name: "Continental", logo: "/brands/continental.svg" },
  { name: "Pirelli", logo: "/brands/pirelli.svg" },
  { name: "BFGoodrich", logo: "/brands/bfgoodrich.svg" },
  { name: "Firestone", logo: "/brands/firestone.svg" },
  { name: "Yokohama", logo: "/brands/yokohama.svg" },
  { name: "Falken", logo: "/brands/falken.svg" },
];

const COPY = {
  kicker: { en: "Tire brands", es: "Marcas de llantas" },
  title: { en: "Top brands, installed right.", es: "Marcas reconocidas, instaladas correctamente." },
  body: {
    en: "Ask us what is available today. We help you choose the right tire for your vehicle, budget, and driving style.",
    es: "Pregunte qué tenemos disponible hoy. Le ayudamos a elegir la llanta correcta para su vehículo, presupuesto y forma de manejar.",
  },
  cta: { en: "Ask about tires", es: "Preguntar por llantas" },
};

export default function BrandStrip() {
  const t = useT();

  return (
    <section className="brand-strip" aria-labelledby="brand-strip-title">
      <Reveal className="brand-strip__inner">
        <div className="brand-strip__copy">
          <p className="brand-strip__kicker">{t(COPY.kicker)}</p>
          <h2 id="brand-strip-title">{t(COPY.title)}</h2>
          <p>{t(COPY.body)}</p>
          <a href={SITE.phoneHref} className="btn btn--ghost btn--small">
            {t(COPY.cta)}
          </a>
        </div>

        <div className="brand-strip__logos" aria-label={t(COPY.kicker)}>
          {BRANDS.map((brand) => (
            <span className="brand-strip__logo" key={brand.name}>
              <img src={brand.logo} alt={brand.name} loading="lazy" />
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
