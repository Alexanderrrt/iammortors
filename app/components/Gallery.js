"use client";

import { useRef } from "react";
import { useT } from "../i18n/LanguageContext";
import { COPY, REELS, SITE } from "../site.config";
import Icon from "./Icons";
import Reveal from "./Reveal";

export default function Gallery() {
  const t = useT();
  const trackRef = useRef(null);

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
              <a
                key={permalink}
                href={permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="reel-card reveal-item"
                style={{ "--d": `${i * 80}ms` }}
              >
                <iframe
                  src={`${permalink}embed/captioned/`}
                  title={`Tires SOS Rescue Instagram reel ${i + 1}`}
                  loading="lazy"
                  scrolling="no"
                  tabIndex={-1}
                />
                <div className="reel-top-fade" />
                <div className="reel-play">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="23" stroke="white" strokeWidth="2" opacity="0.9"/>
                    <path d="M19 14.5L34 24L19 33.5V14.5Z" fill="white" opacity="0.95"/>
                  </svg>
                </div>
                <div className="reel-label">
                  <Icon name="instagram" />
                  <span>Watch Reel</span>
                </div>
              </a>
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
