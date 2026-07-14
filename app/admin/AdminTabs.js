"use client";

import { useState } from "react";
import { useT } from "../i18n/LanguageContext";
import PricingEditor from "./PricingEditor";
import BookingDashboard from "./BookingDashboard";

const COPY = {
  pricing: { en: "Pricing", es: "Precios" },
  appointments: { en: "Appointments", es: "Citas" },
};

export default function AdminTabs({ initialPricing, persistent, authReady }) {
  const t = useT();
  const [tab, setTab] = useState("pricing");

  return (
    <div className="admin-tabs">
      <div className="admin-tabs__nav" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "pricing"}
          className={`admin-tabs__btn ${tab === "pricing" ? "admin-tabs__btn--on" : ""}`}
          onClick={() => setTab("pricing")}
        >
          {t(COPY.pricing)}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "appointments"}
          className={`admin-tabs__btn ${tab === "appointments" ? "admin-tabs__btn--on" : ""}`}
          onClick={() => setTab("appointments")}
        >
          {t(COPY.appointments)}
        </button>
      </div>

      {tab === "pricing" ? (
        <PricingEditor initialPricing={initialPricing} persistent={persistent} authReady={authReady} />
      ) : (
        <BookingDashboard />
      )}
    </div>
  );
}
