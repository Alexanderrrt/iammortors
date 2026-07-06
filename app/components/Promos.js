"use client";

import { useT } from "../i18n/LanguageContext";
import { COPY, SITE } from "../site.config";
import Reveal from "./Reveal";

export default function Promos() {
  const t = useT();

  function waMsg(text) {
    return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
  }

  const driverWa = waMsg(
    t({
      en: "Hi, I'm interested in the featured deal!",
      es: "¡Hola, me interesa la oferta destacada!",
    })
  );
  const financeWa = waMsg(
    t({
      en: "Hi, I'd like to know more about financing options!",
      es: "¡Hola, me gustaría saber más sobre las opciones de financiamiento!",
    })
  );
  const loyaltyWa = waMsg(
    t({
      en: "Hi, I'd like to join the loyalty program!",
      es: "¡Hola, quiero unirme al programa de fidelidad!",
    })
  );

  const includes = t(COPY.promos.driverIncludes);

  return (
    <section id="promos" className="section section--tread">
      <div className="section__inner">
        <Reveal>
          <h2 className="section__heading">{t(COPY.promos.heading)}</h2>
          <p className="section__sub">{t(COPY.promos.sub)}</p>
        </Reveal>

        <Reveal className="driver-banner-wrapper">
          <div className="driver-banner">
            <div className="driver-banner__flag" aria-hidden="true" />
            <div className="driver-banner__content">
              <p className="driver-banner__kicker">{t(COPY.promos.driverTitle)}</p>
              <div className="driver-banner__price">{COPY.promos.driverPrice}</div>
              <p className="driver-banner__desc">{t(COPY.promos.driverSub)}</p>
              <ul className="driver-banner__list">
                {includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a
                href={driverWa}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary"
              >
                {t(COPY.promos.driverCta)}
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal className="promos-grid">
          <div className="promo-card reveal-item" style={{ "--d": "0ms" }}>
            <div className="promo-card__media">
              <img
                src="/Adittional-media2.png"
                alt={`Financing options available at ${SITE.name}`}
                loading="lazy"
              />
            </div>
            <div className="promo-card__body">
              <h3>{t(COPY.promos.financeTitle)}</h3>
              <p>{t(COPY.promos.financeSub)}</p>
              <a href={financeWa} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--small">
                {t(COPY.promos.financeCta)}
              </a>
            </div>
          </div>

          <div className="promo-card reveal-item" style={{ "--d": "120ms" }}>
            <div className="promo-card__media">
              <img
                src="/loyalty-card.png"
                alt="Loyalty card - free oil change after 10 visits"
                loading="lazy"
              />
            </div>
            <div className="promo-card__body">
              <h3>{t(COPY.promos.loyaltyTitle)}</h3>
              <p>{t(COPY.promos.loyaltySub)}</p>
              <a href={loyaltyWa} target="_blank" rel="noopener noreferrer" className="btn btn--ghost btn--small">
                {t(COPY.promos.loyaltyCta)}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
