"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage, useT } from "../i18n/LanguageContext";
import { COPY } from "../site.config";
import AdminLoader from "./AdminLoader";

const E = COPY.admin.editor;

export default function PricingEditor({ initialPricing, persistent, authReady }) {
  const router = useRouter();
  const { lang, toggleLang } = useLanguage();
  const t = useT();
  const [pricing, setPricing] = useState(initialPricing);
  const [status, setStatus] = useState(null); // {ok, msg: {en, es}}
  const [saving, setSaving] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // immutable-ish update helper
  const edit = (mutator) =>
    setPricing((p) => {
      const next = structuredClone(p);
      mutator(next);
      return next;
    });

  const numHandler = (mutator) => (e) => {
    const v = e.target.value === "" ? 0 : Number(e.target.value);
    if (Number.isFinite(v)) edit((n) => mutator(n, Math.max(0, v)));
  };

  async function save() {
    setSaving(true);
    setStatus(null);
    const res = await fetch("/api/admin/pricing", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pricing),
    });
    setSaving(false);
    const body = await res.json().catch(() => ({}));
    if (res.ok) {
      setStatus({ ok: true, msg: body.persisted ? E.saved : E.savedSession });
      router.refresh();
    } else {
      // Server detail (validation etc.) is English-only; show it after the
      // bilingual headline rather than dropping it.
      const detail = body.error ? ` (${body.error})` : "";
      setStatus({ ok: false, msg: { en: E.saveFailed.en + detail, es: E.saveFailed.es + detail } });
    }
  }

  async function logout() {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <>
      {loggingOut && <AdminLoader message={t(E.loggingOut)} />}
      <div className="editor">
      <header className="editor__bar">
        <div>
          <h1>{t(E.title)}</h1>
          {!persistent && <p className="editor__warn">{t(E.storageWarn)}</p>}
        </div>
        <div className="editor__actions">
          {status && (
            <span className={status.ok ? "editor__ok" : "editor__err"}>{t(status.msg)}</span>
          )}
          <button type="button" className="lang-toggle" onClick={toggleLang} aria-label="Toggle language">
            {lang === "en" ? "ES" : "EN"}
          </button>
          <button className="btn btn--ghost btn--small" onClick={logout} disabled={loggingOut || saving}>
            {loggingOut ? t(E.loggingOut) : t(E.logOut)}
          </button>
          <button className="btn btn--primary btn--small" onClick={save} disabled={saving}>
            {saving ? t(E.saving) : t(E.save)}
          </button>
        </div>
      </header>

      {/* Global settings */}
      <section className="editor__group">
        <h2>{t(E.globalHeading)}</h2>
        <div className="editor__row">
          <label>
            <span>{t(E.laborRate)}</span>
            <input type="number" min="0" value={pricing.laborRate} onChange={numHandler((n, v) => (n.laborRate = v))} />
          </label>
          <label>
            <span>{t(E.spread)}</span>
            <input
              type="number"
              min="0"
              max="90"
              value={Math.round(pricing.rangePct * 100)}
              onChange={numHandler((n, v) => (n.rangePct = Math.min(0.9, v / 100)))}
            />
          </label>
          <label>
            <span>{t(E.currency)}</span>
            <input value={pricing.currency} onChange={(e) => edit((n) => (n.currency = e.target.value))} />
          </label>
        </div>
      </section>

      {/* Vehicle multipliers */}
      <section className="editor__group">
        <h2>{t(E.vehicleHeading)}</h2>
        <p className="editor__hint">{t(E.vehicleHint)}</p>
        <div className="editor__grid">
          {pricing.vehicleClasses.map((vc, i) => (
            <label key={vc.id} className="editor__cell">
              <span>{t(vc.label)}</span>
              <input
                type="number"
                step="0.05"
                min="0"
                value={vc.factor}
                onChange={numHandler((n, v) => (n.vehicleClasses[i].factor = v))}
              />
            </label>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="editor__group">
        <h2>{t(E.servicesHeading)}</h2>
        {pricing.services.map((svc, i) => (
          <div key={svc.id} className="editor__svc">
            <div className="editor__svc-head">
              <strong>{t(svc.label)}</strong>
              <span className="editor__tag">{svc.model}</span>
              <label className="editor__inline-check">
                <input
                  type="checkbox"
                  checked={svc.appliesVehicleFactor}
                  onChange={(e) => edit((n) => (n.services[i].appliesVehicleFactor = e.target.checked))}
                />
                {t(E.appliesFactor)}
              </label>
            </div>
            <p className="editor__hint">{t(E.modelHelp[svc.model])}</p>

            <div className="editor__row">
              <label>
                <span>{t(E.serviceSpread)}</span>
                <input
                  type="number"
                  min="0"
                  max="90"
                  value={Math.round((svc.rangePct ?? pricing.rangePct) * 100)}
                  onChange={numHandler((n, v) => (n.services[i].rangePct = Math.min(0.9, v / 100)))}
                />
              </label>

              {svc.model === "perUnit" && (
                <>
                  <label>
                    <span>{t(E.basePrice)}</span>
                    <input type="number" min="0" value={svc.basePrice} onChange={numHandler((n, v) => (n.services[i].basePrice = v))} />
                  </label>
                  {svc.fees?.map((f, fi) => (
                    <label key={fi}>
                      <span>{t(f.label)} ({t(f.per === "unit" ? E.perUnit : E.perJob)})</span>
                      <input type="number" min="0" value={f.amount} onChange={numHandler((n, v) => (n.services[i].fees[fi].amount = v))} />
                    </label>
                  ))}
                </>
              )}

              {svc.model === "labor" && (
                <>
                  <label>
                    <span>{t(E.partsBase)}</span>
                    <input type="number" min="0" value={svc.partsBase} onChange={numHandler((n, v) => (n.services[i].partsBase = v))} />
                  </label>
                  <label>
                    <span>{t(E.laborHours)}</span>
                    <input type="number" min="0" step="0.25" value={svc.laborHours} onChange={numHandler((n, v) => (n.services[i].laborHours = v))} />
                  </label>
                </>
              )}

              {svc.model === "options" &&
                svc.options.map((o, oi) => (
                  <label key={o.id}>
                    <span>{t(o.label)}</span>
                    <input type="number" min="0" value={o.price} onChange={numHandler((n, v) => (n.services[i].options[oi].price = v))} />
                  </label>
                ))}

              {svc.model === "flat" && (
                <label>
                  <span>{t(E.flatPrice)}</span>
                  <input type="number" min="0" value={svc.flatPrice} onChange={numHandler((n, v) => (n.services[i].flatPrice = v))} />
                </label>
              )}
            </div>
          </div>
        ))}
      </section>
      </div>
    </>
  );
}
