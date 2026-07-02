"use client";

import { useT } from "../i18n/LanguageContext";
import { COPY, SITE } from "../site.config";

// Tire-tread ring that slowly rotates behind the hero headline.
function TreadRing() {
  return (
    <svg className="hero__tread" viewBox="0 0 200 200" aria-hidden="true">
      <circle cx="100" cy="100" r="88" fill="none" stroke="currentColor" strokeWidth="14" strokeDasharray="10 8" />
      <circle cx="100" cy="100" r="62" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="4 10" />
    </svg>
  );
}

export default function Hero() {
  const t = useT();

  return (
    <section id="top" className="hero">
      <TreadRing />
      <div className="hero__inner">
        <p className="hero__kicker hero__enter" style={{ "--d": "0ms" }}>
          {t(COPY.hero.kicker)}
        </p>
        <h1 className="hero__title hero__enter" style={{ "--d": "120ms" }}>
          Tires <span className="hero__title-accent">SOS</span> Rescue
        </h1>
        <p className="hero__tagline hero__enter" style={{ "--d": "240ms" }}>
          {t(SITE.tagline)}
        </p>

        <div className="hero__actions hero__enter" style={{ "--d": "360ms" }}>
          <a href={SITE.phoneHref} className="btn btn--primary btn--pulse">
            {t(COPY.hero.callNow)}
          </a>
          <a href={SITE.mapsHref} target="_blank" rel="noopener noreferrer" className="btn btn--secondary">
            {t(COPY.hero.directions)}
          </a>
        </div>

        <p className="hero__note hero__enter" style={{ "--d": "480ms" }}>
          {t(COPY.hero.note)}
        </p>
      </div>
    </section>
  );
}
