"use client";

import Image from "next/image";
import { useT } from "../i18n/LanguageContext";
import { COPY, SITE } from "../site.config";
import Icon from "./Icons";
import Reveal from "./Reveal";

function LocationCard({ loc, t, today }) {
  return (
    <div className="location-card">
      <div className="location-card__map">
        <iframe
          title={`${SITE.name} — ${loc.line1}`}
          src={loc.mapsEmbedSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <span className="location-card__logobadge" aria-hidden="true">
          <Image src="/media/brand/logo.png" alt="" width={180} height={58} />
        </span>
        <a
          className="location-card__maplink"
          href={loc.mapsHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="pin" /> Apple Maps
        </a>
      </div>

      <div className="location-card__info">
        <div className="location-card__details">
          <h3>{SITE.name}</h3>

          <p className="location-card__address">
            <Icon name="pin" />
            <span>
              {loc.line1}
              <br />
              {loc.line2}
            </span>
          </p>

          <a className="location-card__phone" href={SITE.phoneHref}>
            <Icon name="phone" />
            {SITE.phone}
          </a>

          <a
            href={loc.mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary btn--small location-directions"
          >
            <Icon name="pin" /> {t(COPY.hero.directions)}
          </a>
        </div>

        <div className="location-card__hours">
          <h4>{t(COPY.location.hoursTitle)}</h4>
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
          <Image
            className="location-storefront__img"
            src="/media/hero/shop-lift.jpg"
            alt={`${SITE.name} storefront`}
            loading="lazy"
            width={1400}
            height={520}
            sizes="(max-width: 900px) 100vw, 1140px"
          />
        </Reveal>

        <Reveal className="location-grid">
          {SITE.locations.map((loc) => (
            <LocationCard key={loc.id} loc={loc} t={t} today={today} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
