"use client";

import { useLanguage } from "../i18n/LanguageContext";

export default function LegalDocument({ document }) {
  const { lang } = useLanguage();
  const copy = document[lang] || document.en;

  return (
    <main id="main-content" className="legal-page">
      <header className="legal-hero">
        <div className="legal-hero__inner">
          <span className="legal-hero__eyebrow">{copy.eyebrow}</span>
          <h1>{copy.title}</h1>
          <p className="legal-hero__date">{copy.effective}</p>
          <p className="legal-hero__intro">{copy.intro}</p>
        </div>
      </header>

      <div className="legal-layout">
        <nav className="legal-toc" aria-label={copy.toc}>
          <strong>{copy.toc}</strong>
          {copy.sections.map((section) => (
            <a key={section.id} href={`#${section.id}`}>
              {section.title}
            </a>
          ))}
        </nav>

        <article className="legal-document">
          {copy.sections.map((section) => (
            <section key={section.id} id={section.id} className="legal-section">
              <h2>{section.title}</h2>
              {section.paragraphs?.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              {section.bullets?.length > 0 && (
                <ul>
                  {section.bullets.map((bullet, index) => <li key={index}>{bullet}</li>)}
                </ul>
              )}
            </section>
          ))}

          <a className="legal-related" href={copy.relatedHref}>
            {copy.relatedLabel} <span aria-hidden="true">→</span>
          </a>
        </article>
      </div>
    </main>
  );
}
