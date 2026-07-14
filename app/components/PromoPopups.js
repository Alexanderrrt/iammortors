"use client";

import { useEffect, useState } from "react";
import { useT } from "../i18n/LanguageContext";
import { COPY, SITE } from "../site.config";
import Icon from "./Icons";

const SHOW_DELAY_MS = 1400;
const ROTATE_MS = 7800;
const STORAGE_KEY = "br-promo-popups-hidden";

const ADS = [
  {
    id: "service-package",
    tone: "service",
    image: "/media/promotions/body-shop-poster.png",
    eyebrow: { en: "Today in Iam Motors", es: "Hoy en Iam Motors" },
    title: COPY.promos.driverTitle,
    price: COPY.promos.driverPrice,
    body: COPY.promos.driverSub,
    cta: COPY.promos.driverCta,
    message: {
      en: "Hi, I saw the full service package popup and would like to claim the deal.",
      es: "Hola, vi el popup del paquete de servicio completo y quiero aprovechar la oferta.",
    },
  },
  {
    id: "financing",
    tone: "finance",
    image: "/media/promotions/financing-poster.png",
    eyebrow: { en: "Flexible payments", es: "Pagos flexibles" },
    title: COPY.promos.financeTitle,
    body: COPY.promos.financeSub,
    cta: COPY.promos.financeCta,
    message: {
      en: "Hi, I saw the financing popup and would like to know my options.",
      es: "Hola, vi el popup de financiamiento y quiero conocer mis opciones.",
    },
  },
  {
    id: "tires",
    tone: "tires",
    image: "/services/new-tires-shop.png",
    eyebrow: { en: "Tire counter", es: "Llantas" },
    title: {
      en: "Need tires? Ask what is in stock today.",
      es: "Necesita llantas? Pregunte que tenemos disponible hoy.",
    },
    body: {
      en: "Major brands, mounting, balancing, and honest guidance for your driving style.",
      es: "Marcas reconocidas, instalacion, balanceo y guia honesta para su forma de manejar.",
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

  if (!visible) return null;

  const ad = ADS[active];
  const waHref = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(t(ad.message))}`;

  function close() {
    window.sessionStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }

  return (
    <aside className={`promo-popups promo-popups--${ad.tone}`} aria-label={t({ en: "Current shop offers", es: "Ofertas actuales del taller" })}>
      <article className="promo-popups__card" aria-live="polite">
        <button className="promo-popups__close" type="button" onClick={close} aria-label={t({ en: "Hide offers", es: "Ocultar ofertas" })}>
          <Icon name="close" />
        </button>

        <div className="promo-popups__media" aria-hidden="true">
          <img src={ad.image} alt="" loading="lazy" />
          <span>{active + 1}/{ADS.length}</span>
        </div>

        <div className="promo-popups__body">
          <p className="promo-popups__eyebrow">{t(ad.eyebrow)}</p>
          <h2>{t(ad.title)}</h2>
          {ad.price ? <strong className="promo-popups__price">{ad.price}</strong> : null}
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

          <div className="promo-popups__dots" aria-label={t({ en: "Choose offer", es: "Elegir oferta" })}>
            {ADS.map((item, index) => (
              <button
                key={item.id}
                className={index === active ? "promo-popups__dot promo-popups__dot--active" : "promo-popups__dot"}
                type="button"
                onClick={() => setActive(index)}
                aria-label={t({ en: `Show offer ${index + 1}`, es: `Mostrar oferta ${index + 1}` })}
              />
            ))}
          </div>
        </div>
      </article>
    </aside>
  );
}
