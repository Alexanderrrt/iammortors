"use client";

import { useCallback, useEffect, useState } from "react";
import { useT } from "../i18n/LanguageContext";

const BRANDS = [
  {
    name: "Bridgestone",
    logo: "/brands/bridgestone.svg",
    tagline: {
      en: "Leading brand in the industry — quality you can trust",
      es: "Marca líder en la industria — calidad en la que puedes confiar",
    },
  },
  {
    name: "Goodyear",
    logo: "/brands/goodyear.svg",
    tagline: {
      en: "Premium selection available — built to perform",
      es: "Selección premium disponible — hecho para rendir",
    },
  },
  {
    name: "Continental",
    logo: "/brands/continental.svg",
    tagline: {
      en: "Top-rated brand — excellence at every level",
      es: "Marca mejor calificada — excelencia en cada nivel",
    },
  },
  {
    name: "Pirelli",
    logo: "/brands/pirelli.svg",
    tagline: {
      en: "Trusted name in the business — since day one",
      es: "Nombre de confianza en el negocio — desde el primer día",
    },
  },
  {
    name: "BFGoodrich",
    logo: "/brands/bfgoodrich.svg",
    tagline: {
      en: "Innovative products — designed with you in mind",
      es: "Productos innovadores — diseñados pensando en ti",
    },
  },
];

const CTA = {
  en: "Inquire about this brand",
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

const FINANCING_LINE = {
  en: "Flexible financing options available",
  es: "Opciones de financiamiento flexibles disponibles",
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

        <p className="brand-popup__kicker">{t(WE_CARRY)}</p>
        <div className="brand-popup__logo" key={brand.name}>
          {brand.logo ? (
            <img src={brand.logo} alt={brand.name} className="brand-popup__logo-img" />
          ) : (
            <div className="brand-popup__placeholder-logo">{brand.name}</div>
          )}
        </div>
        <p className="brand-popup__tagline">{t(brand.tagline)}</p>

        <div className="brand-popup__afterpay">
          <span className="brand-popup__afterpay-text">{t(FINANCING_LINE)}</span>
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
