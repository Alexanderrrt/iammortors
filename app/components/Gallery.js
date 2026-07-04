"use client";

import { useEffect, useRef } from "react";
import { useT } from "../i18n/LanguageContext";
import { COPY, REELS, SITE } from "../site.config";
import Icon from "./Icons";
import Reveal from "./Reveal";

export default function Gallery() {
  const t = useT();
  const trackRef = useRef(null);
  const processed = useRef(false);

  useEffect(() => {
    if (processed.current) return;
    processed.current = true;

    const id = setInterval(() => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
        clearInterval(id);
      }
    }, 200);

    return () => clearInterval(id);
  }, []);

  const scroll = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(".reel-card");
    const w = card ? card.offsetWidth + 16 : 320;
    track.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  return (
    <section id="gallery" className="section section--muted">
      <div className="section__inner">
        <Reveal>
          <h2 className="section__heading">{t(COPY.gallery.heading)}</h2>
          <p className="section__sub">{t(COPY.gallery.sub)}</p>
        </Reveal>

        <Reveal className="reels-wrapper">
          <button className="reels-arrow reels-arrow--left" onClick={() => scroll(-1)} aria-label="Previous reel">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div className="reels-track" ref={trackRef}>
            {REELS.map((permalink, i) => (
              <div
                key={permalink}
                className="reel-card reveal-item"
                style={{ "--d": `${i * 80}ms` }}
              >
                <blockquote
                  className="instagram-media"
                  data-instgrm-permalink={permalink}
                  data-instgrm-version="14"
                />
              </div>
            ))}
          </div>
          <button className="reels-arrow reels-arrow--right" onClick={() => scroll(1)} aria-label="Next reel">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </Reveal>

        <Reveal>
          <a
            href={SITE.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary gallery-cta"
          >
            <Icon name="instagram" /> Follow @tiressosrescue
          </a>
        </Reveal>
      </div>
    </section>
  );
}
