"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLanguage, useT } from "../i18n/LanguageContext";
import { useOpenStatus } from "../hooks/useOpenStatus";
import { useSecretAdminTap } from "../hooks/useSecretAdminTap";
import { COPY, SITE } from "../site.config";
import Icon from "./Icons";
import BrandLogo from "./BrandLogo";

export default function Header() {
  const { lang, toggleLang } = useLanguage();
  const t = useT();
  const isOpen = useOpenStatus();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const onSecretAdminTap = useSecretAdminTap();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.classList.add("no-scroll");
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("no-scroll");
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="header__inner">
        <a href="/" className="header__brand">
          <span className="header__logo-hit" role="presentation" onClick={onSecretAdminTap}>
            <BrandLogo className="header__logo" alt={SITE.name} width={220} height={70} priority />
          </span>
        </a>

        <nav className="header__nav" aria-label="Primary navigation">
          <a href="/#about">{t(COPY.nav.about)}</a>
          <a href="/#services">{t(COPY.nav.services)}</a>
          <a href="/quote">{t(COPY.nav.quote)}</a>
          <a href="/#gallery">{t(COPY.nav.gallery)}</a>
          <a href="/#location">{t(COPY.nav.location)}</a>
          <a href="/#reviews">{t(COPY.nav.reviews)}</a>
        </nav>

        <div className="header__actions">
          {isOpen !== null && (
            <span className={`status-badge ${isOpen ? "status-badge--open" : "status-badge--closed"}`}>
              <span className="status-badge__dot" />
              {isOpen ? t(COPY.status.open) : t(COPY.status.closed)}
            </span>
          )}

          <button
            type="button"
            className="lang-toggle"
            onClick={toggleLang}
            aria-label="Toggle language"
          >
            {lang === "en" ? "ES" : "EN"}
          </button>

          <a href={SITE.phoneHref} className="btn btn--primary btn--small">
            <Icon name="phone" /> {t(COPY.nav.callNow)}
          </a>

          <button
            type="button"
            className="header__burger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>
        </div>
      </div>

      {mounted &&
        createPortal(
          <div
            className={`mobile-nav ${menuOpen ? "mobile-nav--open" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-hidden={!menuOpen}
          >
            <div className="mobile-nav__backdrop" onClick={closeMenu} />
            <nav className="mobile-nav__panel" aria-label="Mobile navigation">
              <a href="/#about" onClick={closeMenu}>{t(COPY.nav.about)}</a>
              <a href="/#services" onClick={closeMenu}>{t(COPY.nav.services)}</a>
              <a href="/quote" onClick={closeMenu}>{t(COPY.nav.quote)}</a>
              <a href="/#gallery" onClick={closeMenu}>{t(COPY.nav.gallery)}</a>
              <a href="/#location" onClick={closeMenu}>{t(COPY.nav.location)}</a>
              <a href="/#reviews" onClick={closeMenu}>{t(COPY.nav.reviews)}</a>
              <a href={SITE.phoneHref} className="btn btn--primary" onClick={closeMenu}>
                <Icon name="phone" /> {t(COPY.nav.callNow)}
              </a>
            </nav>
          </div>,
          document.body
        )}
    </header>
  );
}
