"use client";

import { useT } from "../i18n/LanguageContext";
import { SITE } from "../site.config";
import Reveal from "./Reveal";

export default function LoyaltyCard() {
  const t = useT();

  const wa = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
    t({
      en: "Hi, I'd like to join the IAM Motors loyalty program!",
      es: "¡Hola, quiero unirme al programa de fidelidad de IAM Motors!",
    })
  )}`;

  return (
    <section id="loyalty" className="section">
      <div className="section__inner">
        <Reveal className="loyalty">
          <div className="loyalty__media">
            <img
              src="/media/promotions/loyalty-card.png"
              alt={t({
                en: "IAM Motors loyalty card — collect ten visits and the tenth service is free.",
                es: "Tarjeta de fidelidad IAM Motors — junta diez visitas y el décimo servicio es gratis.",
              })}
              loading="lazy"
            />
          </div>

          <div className="loyalty__body">
            <p className="loyalty__eyebrow">
              {t({ en: "Loyalty rewards", es: "Recompensas de fidelidad" })}
            </p>
            <h2>{t({ en: "Your 10th visit is on us", es: "Tu 10ª visita va por nuestra cuenta" })}</h2>
            <p>
              {t({
                en: "Every service earns a stamp. Collect ten and your tenth visit is free — our way of thanking the customers who keep coming back.",
                es: "Cada servicio gana un sello. Junta diez y tu décima visita es gratis — nuestra forma de agradecer a los clientes que regresan.",
              })}
            </p>
            <a className="btn btn--primary loyalty__cta" href={wa} target="_blank" rel="noopener noreferrer">
              {t({ en: "Join the loyalty program", es: "Únete al programa" })}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
