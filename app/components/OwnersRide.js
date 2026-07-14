"use client";

import Image from "next/image";
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
          <Image
            className="owners-ride__img owners-ride__img--owner"
            src="/media/hero/hero.jpg"
            alt={`Team at ${SITE.name}`}
            loading="lazy"
            width={1000}
            height={700}
            sizes="(max-width: 800px) 100vw, 50vw"
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
