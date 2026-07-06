"use client";

import { useT } from "../i18n/LanguageContext";
import { COPY, SERVICES } from "../site.config";
import Icon from "./Icons";
import Reveal from "./Reveal";

const FALLBACK_IMAGES = {
  "llantas-nuevas": "/services/new-tires-shop.png",
};

const SERVICE_CTA = {
  en: "Estimate this service",
  es: "Cotizar este servicio",
};

export default function Services() {
  const t = useT();

  return (
    <section id="services" className="section section--tread">
      <div className="section__inner">
        <Reveal>
          <h2 className="section__heading">{t(COPY.services.heading)}</h2>
          <p className="section__sub">{t(COPY.services.sub)}</p>
        </Reveal>

        <Reveal className="services-grid">
          {SERVICES.map((service, i) => {
            const image = service.image || FALLBACK_IMAGES[service.id];

            return (
              <article
                key={service.id}
                className={`service-card service-card--${service.id} reveal-item`}
                style={{ "--d": `${i * 70}ms` }}
              >
                {image && (
                  <img
                    className="service-card__image"
                    src={image}
                    alt={t(service.title)}
                    loading="lazy"
                  />
                )}
                <div className="service-card__body">
                  <span className="service-card__icon" aria-hidden="true">
                    <Icon name={service.icon} />
                  </span>
                  <h3 className="service-card__title">{t(service.title)}</h3>
                  <p className="service-card__desc">{t(service.desc)}</p>
                  <a href="/quote" className="service-card__link">
                    {t(SERVICE_CTA)} <Icon name="arrow" />
                  </a>
                </div>
              </article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
