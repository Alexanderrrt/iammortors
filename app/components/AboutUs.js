"use client";

import { useT } from "../i18n/LanguageContext";
import { ABOUT_US, COPY } from "../site.config";
import Reveal from "./Reveal";

export default function AboutUs() {
  const t = useT();

  return (
    <section id="about" className="section">
      <div className="section__inner">
        <Reveal>
          <h2 className="section__heading">{t(COPY.about.heading)}</h2>
          <p className="section__sub">{t(COPY.about.sub)}</p>
        </Reveal>

        <Reveal className="about-grid">
          {ABOUT_US.cards.map((card, i) => (
            <div
              key={card.id}
              className="about-card reveal-item"
              style={{ "--d": `${i * 100}ms` }}
            >
              <h3 className="about-card__title">{t(card.title)}</h3>
              <p className="about-card__body">{t(card.body)}</p>
            </div>
          ))}
        </Reveal>

        <Reveal className="about-statement reveal-item">
          <p>{t(ABOUT_US.brandStatement)}</p>
        </Reveal>
      </div>
    </section>
  );
}
