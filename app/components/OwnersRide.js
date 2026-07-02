"use client";

import { useT } from "../i18n/LanguageContext";
import { OWNERS_RIDE } from "../site.config";
import Reveal from "./Reveal";

export default function OwnersRide() {
  const t = useT();

  return (
    <section id="owners-ride" className="owners-ride">
      <Reveal className="owners-ride__inner">
        <div className="owners-ride__media">
          <span className="owners-ride__m-stripes" aria-hidden="true" />
          {/* To show the owner's real car: drop owners-m3.jpg into /public,
              then replace the placeholder div below with:
              <img src="/owners-m3.jpg" alt="BMW M3 Competition" /> */}
          <div className="owners-ride__placeholder">
            <span className="owners-ride__placeholder-icon" aria-hidden="true">
              🏁
            </span>
            <span className="owners-ride__placeholder-note">{t(OWNERS_RIDE.photoNote)}</span>
          </div>
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
