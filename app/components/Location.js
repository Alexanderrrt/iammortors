"use client";

import { useT } from "../i18n/LanguageContext";
import { COPY, SITE } from "../site.config";
import Icon from "./Icons";
import Reveal from "./Reveal";

function LocationCard({ loc, t }) {
  return (
    <div className="location-card">
      <div className="location-card__map">
        <iframe
          title={`${SITE.name} — ${loc.line1}`}
          src={loc.mapsEmbedSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="location-card__details">
        <h3>{SITE.name}</h3>
        <p>{loc.line1}</p>
        <p>{loc.line2}</p>
        <a href={SITE.phoneHref}>{SITE.phone}</a>
        <a
          href={loc.mapsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--ghost btn--small location-directions"
        >
          <Icon name="pin" /> {t(COPY.hero.directions)}
        </a>
      </div>
    </div>
  );
}

export default function Location() {
  const t = useT();
  const today = new Date().getDay();

  return (
    <section id="location" className="section section--tread">
      <div className="section__inner">
        <Reveal>
          <h2 className="section__heading">{t(COPY.location.heading)}</h2>
        </Reveal>

        <Reveal className="location-storefront">
          <img
            className="location-storefront__img"
            src="/media/hero/shop-lift.jpg"
            alt={`${SITE.name} storefront`}
            loading="lazy"
          />
        </Reveal>

        <Reveal className="location-grid">
          {SITE.locations.map((loc) => (
            <LocationCard key={loc.id} loc={loc} t={t} />
          ))}
        </Reveal>

        <Reveal>
          <div className="location-block location-block--hours">
            <h3>{t(COPY.location.hoursTitle)}</h3>
            <table className="hours-table">
              <tbody>
                {SITE.hours.map((h) => (
                  <tr key={h.day} className={h.day === today ? "hours-table__today" : ""}>
                    <td>{t(h.label)}</td>
                    <td>
                      {h.open && h.close
                        ? `${h.open} – ${h.close}`
                        : t(COPY.location.closedLabel)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
