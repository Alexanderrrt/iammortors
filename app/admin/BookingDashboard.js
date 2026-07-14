"use client";

import { useCallback, useEffect, useState } from "react";
import { useT } from "../i18n/LanguageContext";
import AppointmentCalendar from "./AppointmentCalendar";

const COPY = {
  title: { en: "Appointments & Leads", es: "Citas y Prospectos" },
  memoryWarning: {
    en: "Storage isn't configured — appointments live in memory and reset on restart. Run db/booking-schema.sql in Supabase to persist them.",
    es: "El almacenamiento no está configurado — las citas viven en memoria y se reinician. Ejecuta db/booking-schema.sql en Supabase para conservarlas.",
  },
  loading: { en: "Loading…", es: "Cargando…" },
  leads: { en: "Quote Leads", es: "Prospectos" },
  noLeads: { en: "No leads yet.", es: "Aún no hay prospectos." },
  photos: { en: "Photos", es: "Fotos" },
  delete: { en: "Delete", es: "Eliminar" },
  confirmDelete: { en: "Delete this record?", es: "¿Eliminar este registro?" },
  vehicle: { en: "Vehicle", es: "Vehículo" },
  service: { en: "Service", es: "Servicio" },
};

const LEAD_STATUSES = [
  { value: "new", label: { en: "New", es: "Nuevo" } },
  { value: "contacted", label: { en: "Contacted", es: "Contactado" } },
  { value: "booked", label: { en: "Booked", es: "Agendado" } },
  { value: "done", label: { en: "Done", es: "Terminado" } },
  { value: "lost", label: { en: "Lost", es: "Perdido" } },
];

export default function BookingDashboard() {
  const t = useT();
  const [records, setRecords] = useState({ leads: [], appointments: [], blockedSlots: [] });
  const [storeConfigured, setStoreConfigured] = useState(true);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/records", { cache: "no-store" });
      if (!res.ok) throw new Error("load");
      const data = await res.json();
      setRecords({
        leads: data.leads || [],
        appointments: data.appointments || [],
        blockedSlots: data.blockedSlots || [],
      });
      setStoreConfigured(data.storeConfigured !== false);
    } catch {
      setError("Could not load appointments.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const mutate = useCallback(
    async (method, body, id) => {
      setBusy(true);
      setUpdatingId(id || null);
      setError("");
      try {
        const res = await fetch("/api/admin/records", {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || "Request failed.");
        await load();
        return true;
      } catch (err) {
        setError(err.message || "Request failed.");
        return false;
      } finally {
        setBusy(false);
        setUpdatingId(null);
      }
    },
    [load],
  );

  const onSchedule = (id, scheduledDate, scheduledTime) =>
    mutate("PATCH", { action: "schedule", id, scheduledDate, scheduledTime }, id);
  const onUnschedule = (id) => mutate("PATCH", { action: "unschedule", id }, id);
  const onStatus = (type, id, status) => mutate("PATCH", { type, id, status }, id);
  const onBlock = (date, time) => mutate("PATCH", { action: "block", date, time });
  const onUnblock = (date, time) => mutate("PATCH", { action: "unblock", date, time });
  const onCreate = (payload) => mutate("PATCH", { action: "create", ...payload });
  const onDelete = (type, id) => {
    if (!window.confirm(t(COPY.confirmDelete))) return;
    mutate("DELETE", { type, id }, id);
  };

  if (loading) return <p className="cal__empty">{t(COPY.loading)}</p>;

  return (
    <div className="booking-dash">
      <h2 className="booking-dash__title">{t(COPY.title)}</h2>
      {!storeConfigured && <p className="booking-dash__warn">{t(COPY.memoryWarning)}</p>}
      {error && <p className="cal__create-error">{error}</p>}

      <AppointmentCalendar
        appointments={records.appointments}
        blockedSlots={records.blockedSlots}
        t={t}
        onSchedule={onSchedule}
        onUnschedule={onUnschedule}
        onStatus={onStatus}
        onDelete={onDelete}
        onBlock={onBlock}
        onUnblock={onUnblock}
        onCreate={onCreate}
        disabled={busy}
        updatingId={updatingId}
      />

      <div className="cal__section">
        <h3>
          {t(COPY.leads)} <span className="cal__count">{records.leads.length}</span>
        </h3>
        {records.leads.length === 0 && <p className="cal__empty">{t(COPY.noLeads)}</p>}
        {records.leads.map((lead) => (
          <div key={lead.id} className="lead-card">
            <div className="lead-card__info">
              <strong>{lead.customerName || lead.phone || "—"}</strong>
              {lead.phone && <span>{lead.phone}</span>}
              {lead.vehicle && <span>{t(COPY.vehicle)}: {lead.vehicle}</span>}
              {lead.service && <span>{t(COPY.service)}: {lead.service}</span>}
              {lead.summary && <span className="lead-card__summary">{lead.summary}</span>}
            </div>

            {lead.photos?.length > 0 && (
              <div className="lead-card__photos">
                {lead.photos.map((url, i) => (
                  <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="lead-card__photo">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt={`${lead.customerName || "lead"} photo ${i + 1}`} />
                  </a>
                ))}
              </div>
            )}

            <div className="lead-card__actions">
              <select
                value={lead.status}
                onChange={(e) => onStatus("lead", lead.id, e.target.value)}
                disabled={updatingId === lead.id}
              >
                {LEAD_STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {t(s.label)}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="btn btn--ghost btn--small cal__delete-btn"
                onClick={() => onDelete("lead", lead.id)}
                disabled={updatingId === lead.id}
              >
                {t(COPY.delete)}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
