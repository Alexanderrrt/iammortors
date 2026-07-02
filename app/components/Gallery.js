"use client";

import { useT } from "../i18n/LanguageContext";
import { COPY, SITE } from "../site.config";
import Reveal from "./Reveal";

// Placeholder tiles — swap these for real shop/vehicle photos in /public
// and replace this grid with <img> tags pointing at them.
const PLACEHOLDER_TILES = ["🛞", "🔧", "🚗", "🛠️", "🏁", "⚙️"];

export default function Gallery() {
  const t = useT();

  return (
    <section id="gallery" className="section section--muted section--angled">
      <div className="section__inner">
        <Reveal>
          <h2 className="section__heading">{t(COPY.gallery.heading)}</h2>
          <p className="section__sub">{t(COPY.gallery.sub)}</p>
        </Reveal>

        <Reveal className="gallery-grid">
          {PLACEHOLDER_TILES.map((emoji, i) => (
            <div
              className="gallery-tile reveal-item"
              style={{ "--d": `${i * 60}ms` }}
              key={i}
              aria-hidden="true"
            >
              <span>{emoji}</span>
            </div>
          ))}
        </Reveal>

        <Reveal>
          <a
            href={SITE.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--secondary gallery-cta"
          >
            📸 @tiressosrescue
          </a>
        </Reveal>
      </div>
    </section>
  );
}
