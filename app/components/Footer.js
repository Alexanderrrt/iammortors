"use client";

import { useT } from "../i18n/LanguageContext";
import { COPY, SITE } from "../site.config";
import BrandLogo from "./BrandLogo";

export default function Footer() {
  const t = useT();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div>
          <div className="footer__brand">
            <BrandLogo className="footer__logo" alt={SITE.name} wordmark />
          </div>
          {SITE.locations.map((loc) => (
            <p key={loc.id}>{loc.full}</p>
          ))}
          <a href={SITE.phoneHref}>{SITE.phone}</a>
          <p className="footer__payments">
            <span className="afterpay-chip">Financing Option</span>
            <span className="afterpay-chip afterpay-chip--mint">Pay Later</span>
            · Visa · Mastercard · Cash
          </p>
        </div>

        <div>
          <p className="footer__label">{t(COPY.footer.followUs)}</p>
          <div className="footer__social">
            <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
          </div>
        </div>

        <div>
          <p className="footer__label">{t(COPY.footer.legal)}</p>
          <nav className="footer__social" aria-label={t(COPY.footer.legal)}>
            <a href="/privacy">{t(COPY.footer.privacy)}</a>
            <a href="/terms">{t(COPY.footer.terms)}</a>
          </nav>
        </div>
      </div>

      <p className="footer__copyright">
        © {year} {SITE.name}. {t(COPY.footer.rights)}
      </p>
    </footer>
  );
}
