"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "./Icons";

const STR = {
  heading: { en: "Book your appointment", es: "Agenda tu cita" },
  name: { en: "Your name", es: "Tu nombre" },
  phone: { en: "Phone / WhatsApp", es: "Teléfono / WhatsApp" },
  photosLabel: { en: "Add photos of the damage (optional)", es: "Agrega fotos del daño (opcional)" },
  photosHint: { en: "Drag & drop or tap to upload — up to 8 images.", es: "Arrastra o toca para subir — hasta 8 imágenes." },
  uploading: { en: "Uploading…", es: "Subiendo…" },
  consent: {
    en: "I agree to be contacted about this request.",
    es: "Acepto ser contactado sobre esta solicitud.",
  },
  continue: { en: "See available times", es: "Ver horarios disponibles" },
  pickTime: { en: "Pick a time that works for you", es: "Elige un horario que te convenga" },
  noSlots: {
    en: "No open times in the next few days. We'll reach out to schedule.",
    es: "No hay horarios en los próximos días. Te contactaremos para agendar.",
  },
  booking: { en: "Booking…", es: "Reservando…" },
  back: { en: "Back", es: "Atrás" },
  doneTitle: { en: "You're booked! 🎉", es: "¡Listo! 🎉" },
  doneBody: {
    en: "Your appointment request is saved. The shop will confirm your time shortly.",
    es: "Tu solicitud de cita está guardada. El taller confirmará tu horario pronto.",
  },
  required: { en: "Name and phone are required.", es: "El nombre y el teléfono son obligatorios." },
  consentRequired: { en: "Please agree to be contacted.", es: "Por favor acepta ser contactado." },
  genericError: { en: "Something went wrong. Please try again.", es: "Algo salió mal. Inténtalo de nuevo." },
};

const DAYS = {
  en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  es: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
};

function formatTime12(time) {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

function dayLabel(dateKey, lang) {
  const [y, mo, d] = dateKey.split("-").map(Number);
  const dow = new Date(Date.UTC(y, mo - 1, d, 12)).getUTCDay();
  return `${DAYS[lang][dow]} ${mo}/${d}`;
}

export default function QuoteBooking({ lang, quoteContext, onDone }) {
  const t = (o) => (o ? o[lang] || o.en : "");
  const [step, setStep] = useState("form"); // form | slots | done
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [photos, setPhotos] = useState([]); // uploaded URLs
  const [uploading, setUploading] = useState(false);
  const [days, setDays] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef(null);

  // A session cookie must exist before uploading photos or saving the lead.
  useEffect(() => {
    fetch("/api/chat-session", { method: "POST" }).catch(() => {});
  }, []);

  const addFiles = async (fileList) => {
    const files = Array.from(fileList || []).filter((f) => f.type.startsWith("image/"));
    if (!files.length) return;
    setError("");
    setUploading(true);
    try {
      const body = new FormData();
      files.slice(0, 8).forEach((f) => body.append("photos", f));
      const res = await fetch("/api/quote-photos", { method: "POST", body });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "upload");
      setPhotos((prev) => [...prev, ...data.photos].slice(0, 8));
    } catch {
      setError(t(STR.genericError));
    } finally {
      setUploading(false);
    }
  };

  const removePhoto = (index) => setPhotos((prev) => prev.filter((_, i) => i !== index));

  const submitDetails = async (e) => {
    e.preventDefault();
    setError("");
    if (!name.trim() || !phone.trim()) return setError(t(STR.required));
    if (!consent) return setError(t(STR.consentRequired));
    setBusy(true);
    try {
      await fetch("/api/chat-session", { method: "POST" });
      const leadRes = await fetch("/api/quote-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lang,
          name,
          phone,
          vehicle: quoteContext?.vehicle || "",
          service: quoteContext?.service || "",
          summary: quoteContext?.summary || "",
          photos,
        }),
      });
      const leadData = await leadRes.json();
      if (!leadRes.ok || !leadData.ok) throw new Error(leadData.error || "lead");

      const availRes = await fetch("/api/availability", { cache: "no-store" });
      const availData = await availRes.json();
      if (!availRes.ok) throw new Error(availData.error || "availability");
      setDays(Array.isArray(availData.days) ? availData.days : []);
      setStep("slots");
    } catch {
      setError(t(STR.genericError));
    } finally {
      setBusy(false);
    }
  };

  const reserve = async (date, time) => {
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/appointments/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scheduledDate: date, scheduledTime: time, privacyConsent: true }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "reserve");
      setStep("done");
      onDone?.();
    } catch (err) {
      setError(err.message || t(STR.genericError));
    } finally {
      setBusy(false);
    }
  };

  if (step === "done") {
    return (
      <div className="qbook qbook--done">
        <strong className="qbook__done-title">{t(STR.doneTitle)}</strong>
        <p>{t(STR.doneBody)}</p>
      </div>
    );
  }

  if (step === "slots") {
    return (
      <div className="qbook">
        <span className="qbook__heading">{t(STR.pickTime)}</span>
        {days.length === 0 ? (
          <p className="qbook__empty">{t(STR.noSlots)}</p>
        ) : (
          <div className="qbook__days">
            {days.map((day) => (
              <div key={day.date} className="qbook__day">
                <span className="qbook__day-label">{dayLabel(day.date, lang)}</span>
                <div className="qbook__slots">
                  {day.slots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      className="qbook__slot"
                      disabled={busy}
                      onClick={() => reserve(day.date, slot)}
                    >
                      {formatTime12(slot)}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        {error && <p className="qbook__error">{error}</p>}
        {busy && <p className="qbook__busy">{t(STR.booking)}</p>}
      </div>
    );
  }

  return (
    <form className="qbook" onSubmit={submitDetails}>
      <span className="qbook__heading">{t(STR.heading)}</span>

      <label className="qbook__field">
        <span>{t(STR.name)}</span>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
      </label>

      <label className="qbook__field">
        <span>{t(STR.phone)}</span>
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" required />
      </label>

      <div className="qbook__field">
        <span>{t(STR.photosLabel)}</span>
        <div
          className="qbook__drop"
          role="button"
          tabIndex={0}
          onClick={() => fileRef.current?.click()}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && fileRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            addFiles(e.dataTransfer.files);
          }}
        >
          <Icon name="camera" />
          <span>{uploading ? t(STR.uploading) : t(STR.photosHint)}</span>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = "";
          }}
        />
        {photos.length > 0 && (
          <div className="qbook__thumbs">
            {photos.map((url, i) => (
              <span key={i} className="qbook__thumb">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt={`photo ${i + 1}`} />
                <button type="button" aria-label="Remove" onClick={() => removePhoto(i)}>
                  ✕
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <label className="qbook__consent">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>{t(STR.consent)}</span>
      </label>

      {error && <p className="qbook__error">{error}</p>}

      <button type="submit" className="btn btn--primary qbook__submit" disabled={busy || uploading}>
        {busy ? t(STR.booking) : t(STR.continue)}
      </button>
    </form>
  );
}
