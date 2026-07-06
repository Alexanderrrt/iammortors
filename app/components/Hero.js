"use client";

import { useT } from "../i18n/LanguageContext";
import { COPY, SITE } from "../site.config";
import Icon from "./Icons";

function AlignmentIcon() {
  return (
    <svg
      className="alignment-spotlight__icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="5.5" />
      <path d="M12 2v3.5M12 18.5V22" />
      <path d="M4 7l2.4 1.6M19.9 7l-2.4 1.6M4 17l2.4-1.6M19.9 17l-2.4-1.6" />
    </svg>
  );
}

export default function Hero() {
  const t = useT();
  const alignment = COPY.hero.alignment;
  const trustItems = [
    { en: "Two San Jose locations", es: "Dos ubicaciones en San Jose" },
    { en: "Walk-ins welcome", es: "Sin cita, bienvenidos" },
    { en: "English and Spanish", es: "Inglés y español" },
  ];

  return (
    <>
      <section id="top" className="hero">
        <img
          className="hero__bg"
          src="/MASTER-1.jpg"
          alt=""
          aria-hidden="true"
        />
        <div className="hero__shade" aria-hidden="true" />

        <div className="hero__inner">
          <div className="hero__text">
            <p className="hero__kicker hero__enter" style={{ "--d": "0ms" }}>
              {t(COPY.hero.kicker)}
            </p>
            <h1 className="hero__title hero__enter" style={{ "--d": "100ms" }}>
              {SITE.name}
            </h1>
            <p className="hero__tagline hero__enter" style={{ "--d": "190ms" }}>
              {t(SITE.tagline)}
            </p>

            <ul className="hero__trust hero__enter" style={{ "--d": "260ms" }}>
              {trustItems.map((item) => (
                <li key={item.en}>{t(item)}</li>
              ))}
            </ul>

            <div className="hero__actions hero__enter" style={{ "--d": "330ms" }}>
              <a href="/quote" className="btn btn--primary">
                {t(COPY.quote.ctaFromHome)} <Icon name="arrow" />
              </a>
              <a href={SITE.phoneHref} className="btn btn--ghost hero__ghost">
                <Icon name="phone" /> {t(COPY.hero.callNow)}
              </a>
              <a
                href={SITE.locations[0].mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--ghost hero__ghost"
              >
                <Icon name="pin" /> {t(COPY.hero.directions)}
              </a>
            </div>

            <p className="hero__afterpay hero__enter" style={{ "--d": "400ms" }}>
              <span className="afterpay-chip">Financing Option</span>
              <span className="afterpay-chip afterpay-chip--mint">Pay Later</span>
              {t(COPY.hero.afterpay)}
            </p>

            <p className="hero__note hero__enter" style={{ "--d": "470ms" }}>
              {t(COPY.hero.note)}
            </p>
          </div>
        </div>
      </section>

      <section className="alignment-spotlight" aria-label={t(alignment.title)}>
        <div className="alignment-spotlight__inner">
          <div className="alignment-spotlight__media">
            <img
              src="/Hero.jpg"
              alt={`${SITE.name} alignment diagnostic equipment`}
              loading="lazy"
            />
            <span className="alignment-spotlight__badge">{t(alignment.badge)}</span>
          </div>

          <div className="alignment-spotlight__copy">
            <p className="alignment-spotlight__kicker">
              <AlignmentIcon /> {t(alignment.kicker)}
            </p>
            <h2 className="alignment-spotlight__title">{t(alignment.title)}</h2>
            <p className="alignment-spotlight__body">{t(alignment.body)}</p>
            <ul className="alignment-spotlight__points">
              {t(alignment.points).map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <div className="alignment-spotlight__actions">
              <a href={SITE.phoneHref} className="btn btn--primary">
                <Icon name="phone" /> {t(alignment.cta)}
              </a>
              <a href="/#services" className="btn btn--ghost">
                {t(alignment.ctaSecondary)} <Icon name="arrow" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
