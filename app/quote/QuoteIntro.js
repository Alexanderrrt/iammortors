"use client";

import { useT } from "../i18n/LanguageContext";
import { COPY } from "../site.config";

export default function QuoteIntro() {
  const t = useT();
  return (
    <>
      <h1 className="section__heading">{t(COPY.quote.heading)}</h1>
      <p className="section__sub">{t(COPY.quote.sub)}</p>
      <p className="qchat__helper">
        {t({
          en: "For the clearest estimate, include your vehicle year, make, model, and a short description. You can also add a damage photo.",
          es: "Para un estimado más claro, incluye el año, marca, modelo y una breve descripción. También puedes agregar una foto del daño.",
        })}
      </p>
    </>
  );
}
