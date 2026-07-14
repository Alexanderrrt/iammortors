"use client";

import { useEffect, useRef } from "react";
import { useT } from "../i18n/LanguageContext";
import { COPY, REELS, GALLERY_IMAGES, GALLERY_VIDEOS, SITE } from "../site.config";
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

        {REELS.length > 0 ? (
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
        ) : GALLERY_IMAGES.length > 0 ? (
          <Reveal className="gallery-grid">
            {GALLERY_IMAGES.map((img, i) => (
              <div key={img.src} className="gallery-grid__item reveal-item" style={{ "--d": `${i * 70}ms` }}>
                <img src={img.src} alt={t(img.alt)} loading="lazy" />
              </div>
            ))}
          </Reveal>
        ) : null}

        {GALLERY_VIDEOS && GALLERY_VIDEOS.length > 0 && (
          <>
            <Reveal className="gallery-film">
              <div className="gallery-film__frame">
                <video
                  src={GALLERY_VIDEOS[0].src}
                  poster="/media/hero/shop-lift.jpg"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  disablePictureInPicture
                  controlsList="nodownload noplaybackrate nofullscreen"
                  aria-label={t(GALLERY_VIDEOS[0].alt)}
                />
                <div className="gallery-film__wash" aria-hidden="true" />
                <div className="gallery-film__content">
                  <span className="gallery-film__eyebrow">IAM MOTORS / IN MOTION</span>
                  <h3>Precision in motion.</h3>
                  <p>Real people. Real craft. Every vehicle handled with care.</p>
                  <span className="gallery-film__cue"><span aria-hidden="true" /> Watch the shop</span>
                </div>
                <span className="gallery-film__mark" aria-hidden="true">IAM</span>
              </div>
            </Reveal>

            {GALLERY_VIDEOS.length > 1 && (
              <Reveal className="gallery-videos">
                {GALLERY_VIDEOS.slice(1).map((vid, i) => (
                  <div key={vid.src} className="gallery-videos__item reveal-item" style={{ "--d": `${i * 100}ms` }}>
                    <video
                      src={vid.src}
                      poster="/media/hero/shop-lift.jpg"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      disablePictureInPicture
                      controlsList="nodownload noplaybackrate nofullscreen"
                      aria-label={t(vid.alt)}
                    />
                  </div>
                ))}
              </Reveal>
            )}
          </>
        )}

        <Reveal>
          <a
            href={SITE.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary gallery-cta"
          >
            <Icon name="instagram" /> Follow us
          </a>
        </Reveal>
      </div>
    </section>
  );
}
