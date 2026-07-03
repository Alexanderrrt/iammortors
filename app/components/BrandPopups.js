"use client";

import { useCallback, useEffect, useState } from "react";
import { useT } from "../i18n/LanguageContext";

const BRANDS = [
  {
    name: "Bridgestone",
    tagline: {
      en: "Bridgestone tires in stock — engineered for performance & safety",
      es: "Llantas Bridgestone en stock — diseñadas para rendimiento y seguridad",
    },
  },
  {
    name: "Goodyear",
    tagline: {
      en: "Goodyear tires available — trusted for over 125 years",
      es: "Llantas Goodyear disponibles — confianza por más de 125 años",
    },
  },
  {
    name: "Continental",
    tagline: {
      en: "Continental tires — German engineering, Bay Area prices",
      es: "Llantas Continental — ingeniería alemana, precios del Bay Area",
    },
  },
  {
    name: "Pirelli",
    tagline: {
      en: "Pirelli tires — premium Italian performance for your ride",
      es: "Llantas Pirelli — rendimiento premium italiano para tu carro",
    },
  },
  {
    name: "Hankook",
    tagline: {
      en: "Hankook tires — quality & value you can count on",
      es: "Llantas Hankook — calidad y valor en los que puedes confiar",
    },
  },
  {
    name: "BFGoodrich",
    tagline: {
      en: "BFGoodrich tires — built tough for every road",
      es: "Llantas BFGoodrich — hechas para cualquier camino",
    },
  },
  {
    name: "Yokohama",
    tagline: {
      en: "Yokohama tires — innovation meets the road",
      es: "Llantas Yokohama — innovación en cada kilómetro",
    },
  },
  {
    name: "Toyo",
    tagline: {
      en: "Toyo tires in stock — designed to perform",
      es: "Llantas Toyo en stock — diseñadas para rendir",
    },
  },
  {
    name: "Cooper",
    tagline: {
      en: "Cooper tires — American-made quality at great prices",
      es: "Llantas Cooper — calidad americana a precios increíbles",
    },
  },
  {
    name: "Falken",
    tagline: {
      en: "Falken tires — high performance, great value",
      es: "Llantas Falken — alto rendimiento, gran valor",
    },
  },
  {
    name: "Firestone",
    tagline: {
      en: "Firestone tires available — dependable since 1900",
      es: "Llantas Firestone disponibles — confiables desde 1900",
    },
  },
  {
    name: "Nexen",
    tagline: {
      en: "Nexen tires — affordable quality for every driver",
      es: "Llantas Nexen — calidad accesible para cada conductor",
    },
  },
];

const CTA = {
  en: "Ask about this brand",
  es: "Pregunta por esta marca",
};

const CLOSE_LABEL = {
  en: "Close",
  es: "Cerrar",
};

const WE_CARRY = {
  en: "We carry top brands",
  es: "Manejamos las mejores marcas",
};

const AFTERPAY_LINE = {
  en: "Afterpay & Snap Finance accepted",
  es: "Aceptamos Afterpay y Snap Finance",
};

export default function BrandPopups({ phoneHref }) {
  const t = useT();
  const [visible, setVisible] = useState(false);
  const [brandIndex, setBrandIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const idx = Math.floor(Math.random() * BRANDS.length);
    setBrandIndex(idx);
    const timer = setTimeout(() => setVisible(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  const nextBrand = useCallback(() => {
    setBrandIndex((prev) => (prev + 1) % BRANDS.length);
  }, []);

  useEffect(() => {
    if (!visible || dismissed) return;
    const interval = setInterval(nextBrand, 6000);
    return () => clearInterval(interval);
  }, [visible, dismissed, nextBrand]);

  const dismiss = () => {
    setDismissed(true);
    setVisible(false);
  };

  if (!visible || dismissed) return null;

  const brand = BRANDS[brandIndex];

  return (
    <div className="brand-popup" role="dialog" aria-label={t(WE_CARRY)}>
      <div className="brand-popup__inner">
        <button
          type="button"
          className="brand-popup__close"
          onClick={dismiss}
          aria-label={t(CLOSE_LABEL)}
        >
          &times;
        </button>

        <div className="brand-popup__tire" aria-hidden="true">
          <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="24" cy="24" r="20" />
            <circle cx="24" cy="24" r="14" />
            <circle cx="24" cy="24" r="5" />
          </svg>
        </div>

        <p className="brand-popup__kicker">{t(WE_CARRY)}</p>
        <p className="brand-popup__brand">{brand.name}</p>
        <p className="brand-popup__tagline">{t(brand.tagline)}</p>

        <div className="brand-popup__afterpay">
          <span className="afterpay-chip afterpay-chip--mint">Afterpay</span>
          <span className="afterpay-chip">Snap Finance</span>
          <span className="brand-popup__afterpay-text">{t(AFTERPAY_LINE)}</span>
        </div>

        <a href={phoneHref} className="btn btn--primary btn--small brand-popup__cta">
          {t(CTA)}
        </a>

        <div className="brand-popup__dots">
          {BRANDS.map((b, i) => (
            <button
              key={b.name}
              type="button"
              className={`brand-popup__dot ${i === brandIndex ? "brand-popup__dot--on" : ""}`}
              onClick={() => setBrandIndex(i)}
              aria-label={b.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
