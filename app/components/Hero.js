"use client";

import Image from "next/image";
import { useT } from "../i18n/LanguageContext";
import { SITE } from "../site.config";
import Icon from "./Icons";

const TRUST_ITEMS = [
  {
    icon: "estimate",
    title: { en: "Free estimates", es: "Estimados gratis" },
    detail: { en: "No obligation", es: "Sin obligación" },
  },
  {
    icon: "walkIn",
    title: { en: "Walk-ins welcome", es: "Aceptamos sin cita" },
    detail: { en: "No appointment needed", es: "No necesitas cita" },
  },
  {
    icon: "language",
    title: { en: "English & Spanish", es: "Inglés y español" },
    detail: { en: "We're here to help", es: "Estamos para ayudarte" },
  },
];

const PROOF_ITEMS = [
  {
    icon: "shield",
    value: { en: "Expert", es: "Expertos" },
    label: { en: "Technicians", es: "Técnicos" },
    detail: { en: "Skilled professionals", es: "Profesionales capacitados" },
  },
  {
    icon: "wrench",
    value: { en: "Quality", es: "Calidad" },
    label: { en: "Service", es: "Servicio" },
    detail: { en: "Top-quality parts and care", es: "Piezas y atención de calidad" },
  },
  {
    icon: "clipboard",
    value: { en: "Honest", es: "Honestos" },
    label: { en: "Estimates", es: "Estimados" },
    detail: { en: "Clear, upfront communication", es: "Comunicación clara" },
  },
  {
    icon: "car",
    value: { en: "All makes", es: "Todas las marcas" },
    label: { en: "& models", es: "y modelos" },
    detail: { en: "Gas, hybrid, and more", es: "Gasolina, híbridos y más" },
  },
  {
    icon: "handshake",
    value: { en: "Customer", es: "Enfoque" },
    label: { en: "focused", es: "en el cliente" },
    detail: { en: "Your vehicle, our priority", es: "Tu vehículo es prioridad" },
  },
];

export default function Hero() {
  const t = useT();

  return (
    <>
      <section id="top" className="hero hero--reference">
        <Image
          className="hero__bg"
          src="/media/hero/hero.jpg"
          alt="IAM Motors workshop"
          fill
          priority
          sizes="100vw"
        />
        <div className="hero__shade" aria-hidden="true" />

        <div className="hero__inner">
          <div className="hero__copy">
            <p className="hero__kicker">
              <span aria-hidden="true" />
              {t({ en: "Full-service auto repair & body shop", es: "Taller completo de reparación y carrocería" })}
            </p>
            <h1 className="hero__title">
              <span>IAM</span>
              <span><em>MOTORS</em></span>
            </h1>
            <p className="hero__tagline">
              {t({
                en: "Full-service auto body shop and repair — collision repair, paint, body work, Prius/hybrid systems, diagnostics, and maintenance. Quality workmanship, clear communication, honest estimates.",
                es: "Taller completo de carrocería y reparación — colisiones, pintura, carrocería, sistemas Prius/híbridos, diagnóstico y mantenimiento. Trabajo de calidad, comunicación clara y estimados honestos.",
              })}
            </p>

            <ul className="hero__trust" aria-label={t({ en: "Why choose IAM Motors", es: "Por qué elegir IAM Motors" })}>
              {TRUST_ITEMS.map((item) => (
                <li key={item.title.en}>
                  <span className="hero__trust-icon"><Icon name={item.icon} /></span>
                  <span>
                    <strong>{t(item.title)}</strong>
                    <small>{t(item.detail)}</small>
                  </span>
                </li>
              ))}
            </ul>

            <div className="hero__actions">
              <a href="/quote" className="btn btn--primary">
                {t({ en: "Get an instant estimate", es: "Obtén un estimado instantáneo" })} <Icon name="arrow" />
              </a>
              <a href={SITE.phoneHref} className="btn btn--ghost hero__ghost">
                <Icon name="phone" /> {t({ en: "Call now", es: "Llama ahora" })}
              </a>
              <a href={SITE.locations[0].mapsHref} target="_blank" rel="noopener noreferrer" className="btn btn--ghost hero__ghost">
                <Icon name="pin" /> {t({ en: "Get directions", es: "Cómo llegar" })}
              </a>
            </div>

            <div className="hero__finance">
              <span className="hero__finance-item"><Icon name="battery" /> {t({ en: "Financing option", es: "Opción de financiamiento" })}</span>
              <span className="hero__finance-item hero__finance-item--gold"><Icon name="tire" /> {t({ en: "Pay later", es: "Paga después" })}</span>
              <span className="hero__finance-note">{t({ en: "Insurance claims handled — we work with your insurance company", es: "Manejamos reclamos — trabajamos con tu compañía de seguros" })}</span>
            </div>
          </div>

          <div className="hero__visual" aria-hidden="true">
            <Image
              className="hero__visual-image"
              src="/media/hero/porsche-workshop.png"
              alt=""
              fill
              sizes="(max-width: 860px) 0vw, 55vw"
            />
            <div className="hero__visual-glow" />
            <div className="hero__visual-caption">IAM MOTORS / IN MOTION</div>
          </div>
        </div>
      </section>

      <section className="hero-proof" aria-labelledby="hero-proof-title">
        <div className="hero-proof__inner">
          <div className="hero-proof__intro">
            <p className="hero-proof__kicker"><span aria-hidden="true" /> {t({ en: "Why choose us", es: "Por qué elegirnos" })}</p>
            <h2 id="hero-proof-title">{t({ en: "Built on trust. Driven by quality.", es: "Construidos con confianza. Impulsados por calidad." })}</h2>
            <p>{t({ en: "We treat every vehicle like our own. Professional service you can count on.", es: "Tratamos cada vehículo como el nuestro. Servicio profesional en el que puedes confiar." })}</p>
          </div>
          <div className="hero-proof__grid">
            {PROOF_ITEMS.map((item) => (
              <article className="hero-proof__card" key={item.label.en}>
                <Icon name={item.icon} />
                <strong>{t(item.value)}</strong>
                <b>{t(item.label)}</b>
                <small>{t(item.detail)}</small>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
