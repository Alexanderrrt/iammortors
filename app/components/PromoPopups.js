"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useT } from "../i18n/LanguageContext";
import { COPY, SITE } from "../site.config";
import Icon from "./Icons";

// Give visitors time to orient themselves before showing an offer, and let
// each offer breathe instead of competing with the first viewport.
const SHOW_DELAY_MS = 5200;
const ROTATE_MS = 12000;
const STORAGE_KEY = "iam-promo-popups-hidden";

// "poster" ads are complete flyer artwork (headline, offer, contact baked in),
// so they are shown whole and never cropped. "card" ads pair a plain photo with
// copy from the site config.
const ADS = [
  {
    id: "service-package",
    type: "poster",
    tone: "service",
    image: "/media/promotions/body-shop-poster.png",
    alt: {
      en: "Body shop and auto repair — we work with all major insurances. Call (408) 920-0555.",
      es: "Body shop y reparacion de autos — trabajamos con todas las aseguranzas. Llame al (408) 920-0555.",
    },
    cta: COPY.promos.driverCta,
    message: {
      en: "Hi, I saw the body shop popup and would like a free estimate.",
      es: "Hola, vi el popup del body shop y quiero un estimado gratis.",
    },
  },
  {
    id: "financing",
    type: "poster",
    tone: "finance",
    image: "/media/promotions/financing-poster.png",
    alt: {
      en: "Financing available — fast, simple approval. Call (408) 920-0555.",
      es: "Financiamiento disponible — aprobacion rapida y sencilla. Llame al (408) 920-0555.",
    },
    cta: COPY.promos.financeCta,
    message: {
      en: "Hi, I saw the financing popup and would like to know my options.",
      es: "Hola, vi el popup de financiamiento y quiero conocer mis opciones.",
    },
  },
  {
    id: "tires",
    type: "poster",
    tone: "tires",
    wide: true,
    image: "/services/new-tires-shop.png",
    alt: {
      en: "IAM Motors — tires, body shop and auto repair. Insurance welcome. 423 W San Carlos St, San Jose.",
      es: "IAM Motors — llantas, body shop y reparacion de autos. Seguros bienvenidos. 423 W San Carlos St, San Jose.",
    },
    cta: { en: "Ask about tires", es: "Preguntar por llantas" },
    message: {
      en: "Hi, I saw the tire popup and would like help choosing tires.",
      es: "Hola, vi el popup de llantas y quiero ayuda para elegir llantas.",
    },
  },
];

export default function PromoPopups() {
  const t = useT();
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.sessionStorage.getItem(STORAGE_KEY) === "1") return undefined;

    const timer = window.setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) return undefined;

    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % ADS.length);
    }, ROTATE_MS);

    return () => window.clearInterval(timer);
  }, [visible]);

  const close = useCallback(() => {
    window.sessionStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }, []);

  if (!visible) return null;

  const ad = ADS[active];
  const waHref = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(t(ad.message))}`;

  const counter = (
    <span className="promo-popups__counter">
      {active + 1}/{ADS.length}
    </span>
  );

  const dots = (
    <div className="promo-popups__dots" role="tablist" aria-label={t({ en: "Choose offer", es: "Elegir oferta" })}>
      {ADS.map((item, index) => (
        <button
          key={item.id}
          type="button"
          role="tab"
          aria-selected={index === active}
          className={index === active ? "promo-popups__dot promo-popups__dot--active" : "promo-popups__dot"}
          onClick={() => setActive(index)}
          aria-label={t({ en: `Show offer ${index + 1}`, es: `Mostrar oferta ${index + 1}` })}
        />
      ))}
    </div>
  );

  const closeButton = (
    <button
      type="button"
      className="promo-popups__close"
      onClick={close}
      aria-label={t({ en: "Hide offers", es: "Ocultar ofertas" })}
    >
      <Icon name="close" />
    </button>
  );

  return (
    <aside
      className={`promo-popups promo-popups--${ad.type} promo-popups--${ad.tone}${ad.wide ? " promo-popups--wide" : ""}`}
      aria-label={t({ en: "Current shop offers", es: "Ofertas actuales del taller" })}
    >
      {ad.type === "poster" ? (
        <article className="promo-popups__card promo-popups__card--poster" aria-live="polite">
          {closeButton}
          <a className="promo-popups__poster" href={waHref} target="_blank" rel="noopener noreferrer">
            <Image src={ad.image} alt={t(ad.alt)} loading="lazy" width={900} height={1100} sizes="(max-width: 720px) 280px, 360px" />
            {counter}
          </a>
          <footer className="promo-popups__bar">
            <a className="btn btn--primary btn--small" href={waHref} target="_blank" rel="noopener noreferrer">
              {t(ad.cta)}
            </a>
            <a className="promo-popups__call" href={SITE.phoneHref}>
              <Icon name="phone" />
              {SITE.phone}
            </a>
            {dots}
          </footer>
        </article>
      ) : (
        <article className="promo-popups__card promo-popups__card--split" aria-live="polite">
          {closeButton}
          <div className="promo-popups__media">
            <Image src={ad.image} alt="" loading="lazy" width={400} height={520} sizes="118px" />
            {counter}
          </div>
          <div className="promo-popups__body">
            <p className="promo-popups__eyebrow">{t(ad.eyebrow)}</p>
            <h2>{t(ad.title)}</h2>
            <p>{t(ad.body)}</p>
            <div className="promo-popups__actions">
              <a className="btn btn--primary btn--small" href={waHref} target="_blank" rel="noopener noreferrer">
                {t(ad.cta)}
              </a>
              <a className="promo-popups__call" href={SITE.phoneHref}>
                <Icon name="phone" />
                {SITE.phone}
              </a>
            </div>
            {dots}
          </div>
        </article>
      )}
    </aside>
  );
}
