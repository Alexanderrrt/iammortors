"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useLanguage } from "../i18n/LanguageContext";
import { formatMoney } from "../../lib/quote";
import Icon from "./Icons";
import QuoteBooking from "./QuoteBooking";

const STR = {
  intro: {
    en: "Hi! Tell me your vehicle and what happened — a dent, collision, cracked windshield, anything — and I'll put together an estimate.",
    es: "¡Hola! Dime tu vehículo y qué pasó — una abolladura, choque, parabrisas roto, lo que sea — y te preparo un estimado.",
  },
  placeholder: {
    en: "e.g. Someone dented my Camry's door…",
    es: "ej. Abollaron la puerta de mi Camry…",
  },
  send: { en: "Send", es: "Enviar" },
  typing: { en: "Typing…", es: "Escribiendo…" },
  estimate: { en: "Estimated total", es: "Total estimado" },
  waButton: { en: "Send to shop on WhatsApp", es: "Enviar al taller por WhatsApp" },
  bookButton: { en: "Book an appointment", es: "Agendar una cita" },
  error: {
    en: "Sorry — something went wrong. Please try again.",
    es: "Lo siento — algo salió mal. Inténtalo de nuevo.",
  },
  photo: { en: "Analyze a damage photo", es: "Analizar una foto del daño" },
  analyzing: { en: "Analyzing photo…", es: "Analizando foto…" },
  photoReady: { en: "Photo analyzed — send for an estimate", es: "Foto analizada — envía para ver el estimado" },
};

function QuoteCard({ output, lang, onBook }) {
  if (!output || !output.hasSelection) return null;
  const t = (o) => (o ? o[lang] || o.en : "");
  const cur = output.currency || "USD";

  return (
    <div className="qchat__card">
      <span className="qchat__card-label">{t(STR.estimate)}</span>
      <p className="qchat__card-range">
        {formatMoney(output.low, cur)} <span>–</span> {formatMoney(output.high, cur)}
      </p>
      {output.vehicleClassLabel && (
        <p className="qchat__card-veh">
          {output.vehicleText ? `${output.vehicleText} · ` : ""}
          {output.vehicleClassLabel}
        </p>
      )}
      <ul className="qchat__card-lines">
        {output.lines.map((l, i) => (
          <li key={i}>
            <span>{l.label}</span>
            <span>{formatMoney(l.amount, cur)}</span>
          </li>
        ))}
      </ul>
      <button type="button" className="btn btn--primary qchat__card-send" onClick={() => onBook(output)}>
        <Icon name="camera" /> {t(STR.bookButton)}
      </button>
      {output.whatsapp && (
        <a
          className="btn btn--ghost qchat__card-wa"
          href={output.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="phone" /> {t(STR.waButton)}
        </a>
      )}
      {output.disclaimer && <p className="qchat__card-disclaimer">{output.disclaimer}</p>}
    </div>
  );
}

export default function QuoteChatbot() {
  const { lang } = useLanguage();
  const t = (o) => (o ? o[lang] || o.en : "");
  const [input, setInput] = useState("");
  const [booking, setBooking] = useState(null);
  const [photoAnalysis, setPhotoAnalysis] = useState(null);
  const [photoBusy, setPhotoBusy] = useState(false);
  const [photoError, setPhotoError] = useState("");
  const [photoDragOver, setPhotoDragOver] = useState(false);
  const photoRef = useRef(null);
  const scrollRef = useRef(null);

  const openBooking = (output) => {
    const cur = output.currency || "USD";
    const vehicle = [output.vehicleText, output.vehicleClassLabel].filter(Boolean).join(" — ");
    const service = output.lines.map((l) => l.label).join(", ");
    const summary = [
      `${formatMoney(output.low, cur)}–${formatMoney(output.high, cur)}`,
      service,
      vehicle,
    ]
      .filter(Boolean)
      .join(" · ");
    setBooking({ vehicle, service, summary });
  };

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/quote-chat" }),
  });

  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, status]);

  const submit = (e) => {
    e.preventDefault();
    const text = input.trim();
    if ((!text && !photoAnalysis) || busy || photoBusy) return;
    const message = text || "Please give me an estimate based on this damage photo.";
    sendMessage({ text: message }, { body: { lang, imageAnalysis: photoAnalysis } });
    setInput("");
    setPhotoAnalysis(null);
  };

  const analyzePhoto = async (files) => {
    const file = Array.from(files || [])[0];
    if (!file) return;
    setPhotoError("");
    setPhotoBusy(true);
    try {
      const body = new FormData();
      body.append("photos", file);
      body.append("lang", lang);
      const res = await fetch("/api/quote-analyze", { method: "POST", body });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "analysis");
      setPhotoAnalysis(data.analysis);
    } catch (err) {
      setPhotoError(err.message || t(STR.error));
      setPhotoAnalysis(null);
    } finally {
      setPhotoBusy(false);
    }
  };

  return (
    <div className="qchat">
      <div className="qchat__log" ref={scrollRef} aria-live="polite">
        <div className="qchat__msg qchat__msg--bot">
          <div className="qchat__bubble">{t(STR.intro)}</div>
        </div>

        {messages.map((m) => (
          <div
            key={m.id}
            className={`qchat__msg ${m.role === "user" ? "qchat__msg--user" : "qchat__msg--bot"}`}
          >
            {m.parts.map((part, i) => {
              if (part.type === "text") {
                return part.text ? (
                  <div key={i} className="qchat__bubble">
                    {part.text}
                  </div>
                ) : null;
              }
              if (part.type === "tool-computeQuote" && part.state === "output-available") {
                return <QuoteCard key={i} output={part.output} lang={lang} onBook={openBooking} />;
              }
              return null;
            })}
          </div>
        ))}

        {busy && (
          <div className="qchat__msg qchat__msg--bot">
            <div className="qchat__bubble qchat__bubble--typing">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

        {error && (
          <div className="qchat__msg qchat__msg--bot">
            <div className="qchat__bubble qchat__bubble--error">{t(STR.error)}</div>
          </div>
        )}

        {booking && (
          <div className="qchat__msg qchat__msg--bot qchat__msg--wide">
            <QuoteBooking lang={lang} quoteContext={booking} />
          </div>
        )}
      </div>

      {!booking && (
        <form className="qchat__input" onSubmit={submit}>
          <input
            ref={photoRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            hidden
            onChange={(e) => {
              analyzePhoto(e.target.files);
              e.target.value = "";
            }}
          />
          <div
            className={`qchat__photo-drop${photoDragOver ? " qchat__photo-drop--active" : ""}`}
            onDragOver={(e) => {
              e.preventDefault();
              if (!busy && !photoBusy) setPhotoDragOver(true);
            }}
            onDragLeave={() => setPhotoDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setPhotoDragOver(false);
              if (!busy && !photoBusy) analyzePhoto(e.dataTransfer.files);
            }}
          >
            <button type="button" className="btn btn--ghost qchat__photo" onClick={() => photoRef.current?.click()} disabled={busy || photoBusy}>
              {photoBusy ? t(STR.analyzing) : t(STR.photo)}
            </button>
            <span>or drop an image here</span>
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t(STR.placeholder)}
            aria-label={t(STR.placeholder)}
            disabled={busy}
          />
          <button type="submit" className="btn btn--primary" disabled={busy || photoBusy || (!input.trim() && !photoAnalysis)}>
            {busy ? t(STR.typing) : t(STR.send)}
          </button>
          {photoAnalysis && <span className="qchat__photo-status">{t(STR.photoReady)}</span>}
          {photoError && <span className="qchat__photo-error">{photoError}</span>}
        </form>
      )}
    </div>
  );
}
