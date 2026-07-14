"use client";

import { useT } from "../i18n/LanguageContext";
import { OWNERS_RIDE, SITE } from "../site.config";
import Reveal from "./Reveal";

export default function OwnersRide() {
  const t = useT();

  return (
    <section id="owners-ride" className="owners-ride">
      <Reveal className="owners-ride__inner">
        <div className="owners-ride__media">
          <span className="owners-ride__m-stripes" aria-hidden="true" />
          <img
            className="owners-ride__img owners-ride__img--owner"
            src="/Imagen-de-WhatsApp-2025-05-09-a-las-15.41.57_9da89c4b-1024x683.jpg"
            alt={`Team at ${SITE.name}`}
            loading="lazy"
          />
        </div>

        <div className="owners-ride__copy">
          <p className="owners-ride__kicker reveal-item" style={{ "--d": "0ms" }}>
            {t(OWNERS_RIDE.kicker)}
          </p>
          <h2 className="owners-ride__title reveal-item" style={{ "--d": "80ms" }}>
            {t(OWNERS_RIDE.title)}
          </h2>
          <p className="owners-ride__body reveal-item" style={{ "--d": "160ms" }}>
            {t(OWNERS_RIDE.body)}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
