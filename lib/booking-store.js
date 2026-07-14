import { createHash, randomUUID } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { validateShopSlot } from "./appointment-slots.js";
import { devMemoryStoreEnabled } from "./runtime-mode.js";

// Persistence for the quote chatbot's leads and appointments. Uses Supabase
// (service role, server-only) when configured; otherwise an in-memory dev copy
// so the whole booking flow works locally without keys. Reservation and slot
// blocking go through race-safe Postgres functions in the persisted path.

const LEADS_TABLE = "chat_leads";
const APPOINTMENTS_TABLE = "chat_appointments";
const BLOCKED_TABLE = "chat_blocked_slots";
const QUOTE_PHOTOS_BUCKET = "quote-photos";
const MAX_LEADS = 120;
const MAX_APPOINTMENTS = 120;
const MAX_PHOTOS = 8;
const MAX_PHOTO_LEN = 8_000_000; // fits a dev-mode data URL; real storage URLs are tiny

const LEAD_STATUSES = new Set(["new", "contacted", "booked", "done", "lost"]);
const APPOINTMENT_STATUSES = new Set(["requested", "confirmed", "completed", "no-show", "canceled"]);
const BOOKING_ACTIVE = new Set(["requested", "confirmed"]);

let devMemory = {
  leads: [],
  appointments: [],
  blockedSlots: [],
};

function noStoreFetch(input, init = {}) {
  return fetch(input, { ...init, cache: "no-store" });
}

function cleanEnv(value) {
  if (typeof value !== "string") return value;
  return value.replace(/^﻿/, "").replace(/^ï»¿/, "");
}

export function recordsStoreConfigured() {
  return !devMemoryStoreEnabled() && Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function client() {
  return createClient(
    cleanEnv(process.env.SUPABASE_URL),
    cleanEnv(process.env.SUPABASE_SERVICE_ROLE_KEY),
    { auth: { persistSession: false }, global: { fetch: noStoreFetch } },
  );
}

async function deleteStoredQuotePhotos(db, sessionId) {
  if (!sessionId) return;
  const bucket = db.storage.from(QUOTE_PHOTOS_BUCKET);
  const { data, error } = await bucket.list(sessionId, { limit: MAX_PHOTOS + 10 });
  if (error) {
    if (/not found|does not exist/i.test(error.message || "")) return;
    throw new Error(`Photo cleanup failed: ${error.message}`);
  }
  const paths = (data || [])
    .filter((item) => item?.name)
    .map((item) => `${sessionId}/${item.name}`);
  if (!paths.length) return;
  const { error: removeError } = await bucket.remove(paths);
  if (removeError) throw new Error(`Photo cleanup failed: ${removeError.message}`);
}

function nowIso() {
  return new Date().toISOString();
}

function stableId(prefix, sessionId) {
  if (sessionId) {
    const digest = createHash("sha256").update(sessionId).digest("hex").slice(0, 32);
    return `${prefix}_${digest}`;
  }
  return `${prefix}_${randomUUID()}`;
}

function normalizeText(value, max = 500) {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim().slice(0, max) : "";
}

function normalizePhotos(value) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item) => typeof item === "string" && item.trim())
    .map((item) => item.trim().slice(0, MAX_PHOTO_LEN))
    .slice(0, MAX_PHOTOS);
}

function validDateString(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return false;
  const date = new Date(`${value}T12:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function validTimeString(value) {
  return /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value || "");
}

function normalizedDbTime(value) {
  if (typeof value !== "string") return "";
  const match = value.match(/^(\d{2}):(\d{2})/);
  return match ? `${match[1]}:${match[2]}` : "";
}

function leadFromRow(row) {
  if (!row) return null;
  const structuredTime = normalizedDbTime(row.preferred_time);
  return {
    id: row.id,
    sessionId: row.session_id,
    source: row.source || "",
    lang: row.lang === "es" ? "es" : "en",
    status: row.status || "new",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    appointmentRequested: Boolean(row.appointment_requested),
    summary: row.summary || "",
    customerName: row.customer_name || "",
    phone: row.phone || "",
    vehicle: row.vehicle || "",
    service: row.service || "",
    photos: Array.isArray(row.photos) ? row.photos : [],
    preferredDate: row.preferred_date || "",
    preferredTime: structuredTime || row.preferred_time_text || "",
    preferredTimeText: row.preferred_time_text || "",
    lastMessage: row.last_message || "",
  };
}

function appointmentFromRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    leadId: row.lead_id || "",
    sessionId: row.session_id,
    status: row.status || "requested",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    customerName: row.customer_name || "",
    phone: row.phone || "",
    service: row.service || "",
    vehicle: row.vehicle || "",
    notes: row.notes || "",
    scheduledDate: row.scheduled_date || "",
    scheduledTime: normalizedDbTime(row.scheduled_time),
  };
}

function blockedFromRow(row) {
  return {
    date: row.slot_date,
    time: row.is_all_day ? "all" : normalizedDbTime(row.slot_time),
    createdAt: row.created_at,
  };
}

function leadInsertRow(lead) {
  return {
    id: lead.id,
    session_id: lead.sessionId,
    source: lead.source,
    lang: lead.lang,
    status: lead.status,
    created_at: lead.createdAt,
    updated_at: lead.updatedAt,
    appointment_requested: lead.appointmentRequested,
    summary: lead.summary,
    customer_name: lead.customerName,
    phone: lead.phone,
    vehicle: lead.vehicle,
    service: lead.service,
    photos: lead.photos || [],
    preferred_date: lead.preferredDate || null,
    preferred_time: validTimeString(lead.preferredTime) ? lead.preferredTime : null,
    preferred_time_text: lead.preferredTimeText || "",
    last_message: lead.lastMessage || "",
  };
}

function leadUpdateRow(lead) {
  const row = leadInsertRow(lead);
  delete row.id;
  delete row.session_id;
  delete row.status;
  delete row.created_at;
  return row;
}

function appointmentInsertRow(appointment) {
  return {
    id: appointment.id,
    lead_id: appointment.leadId || null,
    session_id: appointment.sessionId,
    status: appointment.status,
    created_at: appointment.createdAt,
    updated_at: appointment.updatedAt,
    customer_name: appointment.customerName,
    phone: appointment.phone,
    service: appointment.service,
    vehicle: appointment.vehicle,
    notes: appointment.notes,
    scheduled_date: appointment.scheduledDate || null,
    scheduled_time: appointment.scheduledTime || null,
  };
}

function isUniqueViolation(error) {
  return error?.code === "23505";
}

// ---------------------------------------------------------------------------
// Reads
// ---------------------------------------------------------------------------

export async function getChatRecords() {
  if (!recordsStoreConfigured()) {
    return {
      leads: [...devMemory.leads],
      appointments: [...devMemory.appointments],
      blockedSlots: [...devMemory.blockedSlots],
    };
  }
  try {
    const db = client();
    const [leadResult, appointmentResult, blockedResult] = await Promise.all([
      db.from(LEADS_TABLE).select("*").order("updated_at", { ascending: false }).limit(MAX_LEADS),
      db.from(APPOINTMENTS_TABLE).select("*").order("updated_at", { ascending: false }).limit(MAX_APPOINTMENTS),
      db.from(BLOCKED_TABLE).select("*").order("slot_date", { ascending: true }),
    ]);
    if (leadResult.error) throw leadResult.error;
    if (appointmentResult.error) throw appointmentResult.error;
    if (blockedResult.error) throw blockedResult.error;
    return {
      leads: (leadResult.data || []).map(leadFromRow),
      appointments: (appointmentResult.data || []).map(appointmentFromRow),
      blockedSlots: (blockedResult.data || []).map(blockedFromRow),
    };
  } catch {
    return { leads: [], appointments: [], blockedSlots: [] };
  }
}

// Minimal, PII-free projection for chatbot wording patterns. The estimator
// never needs customer names, phone numbers, photos, or appointment records.
export async function getLeadLearningRecords() {
  if (!recordsStoreConfigured()) {
    return devMemory.leads.slice(0, 20).map((lead) => ({
      vehicle: lead.vehicle || "",
      service: lead.service || "",
      lastMessage: lead.lastMessage || "",
    }));
  }
  try {
    const { data, error } = await client()
      .from(LEADS_TABLE)
      .select("vehicle,service,last_message")
      .order("updated_at", { ascending: false })
      .limit(20);
    if (error) throw error;
    return (data || []).map((lead) => ({
      vehicle: lead.vehicle || "",
      service: lead.service || "",
      lastMessage: lead.last_message || "",
    }));
  } catch {
    return [];
  }
}

export async function getLeadBySession(sessionId) {
  const cleanSessionId = normalizeText(sessionId, 120);
  if (!cleanSessionId) return null;
  if (!recordsStoreConfigured()) return devMemory.leads.find((lead) => lead.sessionId === cleanSessionId) || null;
  const { data, error } = await client()
    .from(LEADS_TABLE)
    .select("*")
    .eq("session_id", cleanSessionId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return leadFromRow(data);
}

async function getAppointmentBySession(sessionId) {
  if (!recordsStoreConfigured()) {
    return devMemory.appointments.find((appointment) => appointment.sessionId === sessionId) || null;
  }
  const { data, error } = await client()
    .from(APPOINTMENTS_TABLE)
    .select("*")
    .eq("session_id", sessionId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return appointmentFromRow(data);
}

// ---------------------------------------------------------------------------
// Lead capture (structured — the Groq chat supplies clean fields directly)
// ---------------------------------------------------------------------------

async function persistLead(lead, existingLead) {
  if (!recordsStoreConfigured()) {
    devMemory.leads = [lead, ...devMemory.leads.filter((item) => item.sessionId !== lead.sessionId)].slice(0, MAX_LEADS);
    return lead;
  }

  const db = client();
  if (existingLead) {
    const { data, error } = await db
      .from(LEADS_TABLE)
      .update(leadUpdateRow(lead))
      .eq("id", existingLead.id)
      .select("*")
      .single();
    if (!error) return leadFromRow(data);
    if (error.code !== "PGRST116") throw new Error(error.message);
  }

  const { data, error } = await db.from(LEADS_TABLE).insert(leadInsertRow(lead)).select("*").single();
  if (!error) return leadFromRow(data);
  if (!isUniqueViolation(error)) throw new Error(error.message);

  const racedLead = await getLeadBySession(lead.sessionId);
  if (!racedLead) throw new Error("Lead persistence conflict.");
  return persistLead({ ...lead, id: racedLead.id, status: racedLead.status, createdAt: racedLead.createdAt }, racedLead);
}

// Upsert the lead for a chat session from the structured quote details plus the
// contact info and any dropped-in photos. Idempotent: re-saving with an updated
// photo list or corrected contact simply overwrites the same session row.
export async function saveQuoteLead({
  sessionId,
  lang = "en",
  customerName = "",
  phone = "",
  vehicle = "",
  service = "",
  summary = "",
  lastMessage = "",
  photos = [],
}) {
  const cleanSessionId = normalizeText(sessionId, 120);
  if (!cleanSessionId) throw Object.assign(new Error("Missing session."), { code: "invalid_session" });

  const fields = {
    customerName: normalizeText(customerName, 60),
    phone: normalizeText(phone, 40),
    vehicle: normalizeText(vehicle, 120),
    service: normalizeText(service, 200),
  };
  const timestamp = nowIso();
  const existingLead = await getLeadBySession(cleanSessionId);

  const lead = {
    id: existingLead?.id || stableId("lead", cleanSessionId),
    sessionId: cleanSessionId,
    source: "Quote chat",
    lang: lang === "es" ? "es" : "en",
    status: existingLead?.status || "new",
    createdAt: existingLead?.createdAt || timestamp,
    updatedAt: timestamp,
    appointmentRequested: true,
    summary: normalizeText(summary, 500) || existingLead?.summary || "",
    customerName: fields.customerName || existingLead?.customerName || "",
    phone: fields.phone || existingLead?.phone || "",
    vehicle: fields.vehicle || existingLead?.vehicle || "",
    service: fields.service || existingLead?.service || "",
    photos: normalizePhotos(photos.length ? photos : existingLead?.photos || []),
    preferredDate: existingLead?.preferredDate || "",
    preferredTime: existingLead?.preferredTime || "",
    preferredTimeText: existingLead?.preferredTimeText || "",
    lastMessage: normalizeText(lastMessage, 400) || normalizeText(summary, 400),
  };

  const saved = await persistLead(lead, existingLead);
  return { ok: true, persisted: recordsStoreConfigured(), lead: saved };
}

// ---------------------------------------------------------------------------
// Reservation + availability
// ---------------------------------------------------------------------------

function reservationError(error) {
  const message = error?.message || "Appointment reservation failed.";
  const result = new Error(message.replace(/^CHAT_RESERVATION_/, "").replaceAll("_", " ").toLowerCase());
  result.code = message.startsWith("CHAT_RESERVATION_") ? message : error?.code || "reservation_failed";
  return result;
}

export async function reserveAppointment(identifier, scheduledDate, scheduledTime) {
  const cleanIdentifier = normalizeText(
    typeof identifier === "object" ? identifier.id || identifier.appointmentId || identifier.sessionId : identifier,
    160,
  );
  const date = normalizeText(scheduledDate, 10);
  const time = normalizeText(scheduledTime, 5);
  if (!cleanIdentifier) throw new Error("Missing appointment or session identifier.");
  if (!validDateString(date)) throw new Error("Invalid appointment date.");
  if (!validTimeString(time)) throw new Error("Invalid appointment time.");
  const slotValidation = validateShopSlot(date, time, { maxDays: 365 });
  if (!slotValidation.ok) {
    throw Object.assign(new Error(slotValidation.message), { code: slotValidation.code });
  }

  if (!recordsStoreConfigured()) {
    let appointment = devMemory.appointments.find(
      (item) => item.id === cleanIdentifier || item.sessionId === cleanIdentifier,
    );
    const lead = appointment
      ? devMemory.leads.find((item) => item.id === appointment.leadId || item.sessionId === appointment.sessionId)
      : devMemory.leads.find((item) => item.id === cleanIdentifier || item.sessionId === cleanIdentifier);
    if (!lead) throw Object.assign(new Error("Lead not found."), { code: "CHAT_RESERVATION_LEAD_NOT_FOUND" });
    if (!lead.service || !lead.vehicle || !lead.customerName || !lead.phone) {
      throw Object.assign(new Error("Service, vehicle, name, and phone are required before reserving."), { code: "CHAT_RESERVATION_DETAILS_REQUIRED" });
    }
    lead.appointmentRequested = true;
    lead.status = "booked";
    const blocked = devMemory.blockedSlots.some((slot) => slot.date === date && (slot.time === "all" || slot.time === time));
    if (blocked) throw Object.assign(new Error("Time slot is blocked."), { code: "CHAT_RESERVATION_BLOCKED" });
    const conflict = devMemory.appointments.some(
      (item) => item.id !== appointment?.id && item.scheduledDate === date && item.scheduledTime === time && BOOKING_ACTIVE.has(item.status),
    );
    if (conflict) throw Object.assign(new Error("Time slot is already booked."), { code: "CHAT_RESERVATION_CONFLICT" });
    appointment = appointment || {
      id: stableId("appt", lead.sessionId),
      leadId: lead.id,
      sessionId: lead.sessionId,
      createdAt: nowIso(),
      customerName: lead.customerName,
      phone: lead.phone,
      service: lead.service,
      vehicle: lead.vehicle,
      notes: lead.summary,
    };
    const updated = { ...appointment, scheduledDate: date, scheduledTime: time, status: "confirmed", updatedAt: nowIso() };
    devMemory.appointments = [updated, ...devMemory.appointments.filter((item) => item.id !== updated.id)];
    return { ok: true, persisted: false, appointment: updated };
  }

  const { data, error } = await client().rpc("reserve_chat_appointment", {
    p_identifier: cleanIdentifier,
    p_scheduled_date: date,
    p_scheduled_time: time,
  });
  if (error) throw reservationError(error);
  const row = Array.isArray(data) ? data[0] : data;
  if (!row) throw new Error("Appointment reservation failed.");
  const leadId = typeof row.lead_id === "string" ? row.lead_id : "";
  const sessionId = typeof row.session_id === "string" ? row.session_id : cleanIdentifier;
  if (leadId || sessionId) {
    try {
      let query = client().from(LEADS_TABLE).update({ appointment_requested: true, status: "booked", updated_at: nowIso() });
      query = leadId ? query.eq("id", leadId) : query.eq("session_id", sessionId);
      await query.select("id");
    } catch {
      // The appointment committed atomically in the RPC; a lead metadata update
      // failure must never turn that success into a false error response.
    }
  }
  return { ok: true, persisted: true, appointment: appointmentFromRow(row) };
}

export function scheduleAppointment(id, scheduledDate, scheduledTime) {
  return reserveAppointment(id, scheduledDate, scheduledTime);
}

export async function unscheduleAppointment(id) {
  const timestamp = nowIso();
  if (!recordsStoreConfigured()) {
    const appointment = devMemory.appointments.find((item) => item.id === id);
    if (!appointment) throw new Error("Appointment not found.");
    devMemory.appointments = devMemory.appointments.map((item) =>
      item.id === id ? { ...item, scheduledDate: "", scheduledTime: "", status: "requested", updatedAt: timestamp } : item,
    );
    return { ok: true, persisted: false };
  }
  const { data, error } = await client()
    .from(APPOINTMENTS_TABLE)
    .update({ scheduled_date: null, scheduled_time: null, status: "requested", updated_at: timestamp })
    .eq("id", id)
    .select("id");
  if (error) throw new Error(error.message);
  if (!data?.length) throw new Error("Appointment not found.");
  return { ok: true, persisted: true };
}

export async function blockSlot(date, time) {
  if (!validDateString(date) || (time !== "all" && !validTimeString(time))) throw new Error("Invalid date or time.");
  if (!recordsStoreConfigured()) {
    const already = devMemory.blockedSlots.some((slot) => slot.date === date && slot.time === time);
    if (already) return { ok: true, action: "already_blocked", persisted: false };
    const conflict = devMemory.appointments.some(
      (item) => item.scheduledDate === date && (time === "all" || item.scheduledTime === time) && BOOKING_ACTIVE.has(item.status),
    );
    if (conflict) throw new Error("Cannot block a reserved time slot.");
    devMemory.blockedSlots.push({ date, time, createdAt: nowIso() });
    return { ok: true, action: "blocked", persisted: false };
  }
  const { data, error } = await client().rpc("block_chat_slot", {
    p_slot_date: date,
    p_slot_time: time === "all" ? null : time,
    p_all_day: time === "all",
  });
  if (error) throw new Error(error.message);
  const row = Array.isArray(data) ? data[0] : data;
  return { ok: true, action: row?.action || "blocked", persisted: true };
}

export async function unblockSlot(date, time) {
  if (!validDateString(date) || (time !== "all" && !validTimeString(time))) throw new Error("Invalid date or time.");
  if (!recordsStoreConfigured()) {
    const before = devMemory.blockedSlots.length;
    devMemory.blockedSlots = devMemory.blockedSlots.filter((slot) => !(slot.date === date && slot.time === time));
    return { ok: true, action: before === devMemory.blockedSlots.length ? "not_found" : "unblocked", persisted: false };
  }
  let query = client().from(BLOCKED_TABLE).delete().eq("slot_date", date).eq("is_all_day", time === "all");
  if (time !== "all") query = query.eq("slot_time", time);
  const { data, error } = await query.select("id");
  if (error) throw new Error(error.message);
  return { ok: true, action: data?.length ? "unblocked" : "not_found", persisted: true };
}

export async function getAvailability() {
  if (!recordsStoreConfigured()) {
    const bookedSet = new Set();
    devMemory.appointments.forEach((appointment) => {
      if (appointment.scheduledDate && appointment.scheduledTime && BOOKING_ACTIVE.has(appointment.status)) {
        bookedSet.add(`${appointment.scheduledDate}_${appointment.scheduledTime}`);
      }
    });
    const blockedSet = new Set();
    const blockedDays = new Set();
    devMemory.blockedSlots.forEach((slot) => {
      if (slot.time === "all") blockedDays.add(slot.date);
      else blockedSet.add(`${slot.date}_${slot.time}`);
    });
    return { bookedSet, blockedSet, blockedDays, blockedSlots: [...devMemory.blockedSlots] };
  }

  const db = client();
  const [appointmentResult, blockedResult] = await Promise.all([
    db
      .from(APPOINTMENTS_TABLE)
      .select("scheduled_date,scheduled_time,status")
      .in("status", [...BOOKING_ACTIVE])
      .not("scheduled_date", "is", null),
    db.from(BLOCKED_TABLE).select("*"),
  ]);
  if (appointmentResult.error) throw new Error(appointmentResult.error.message);
  if (blockedResult.error) throw new Error(blockedResult.error.message);
  const bookedSet = new Set(
    (appointmentResult.data || []).map((row) => `${row.scheduled_date}_${normalizedDbTime(row.scheduled_time)}`),
  );
  const blockedSlots = (blockedResult.data || []).map(blockedFromRow);
  const blockedSet = new Set();
  const blockedDays = new Set();
  blockedSlots.forEach((slot) => {
    if (slot.time === "all") blockedDays.add(slot.date);
    else blockedSet.add(`${slot.date}_${slot.time}`);
  });
  return { bookedSet, blockedSet, blockedDays, blockedSlots };
}

// ---------------------------------------------------------------------------
// Admin record management
// ---------------------------------------------------------------------------

export async function updateRecordStatus(type, id, status) {
  if (type !== "appointment" && type !== "lead") throw new Error("Invalid record type.");
  const allowed = type === "appointment" ? APPOINTMENT_STATUSES : LEAD_STATUSES;
  if (!allowed.has(status)) throw new Error("Invalid status.");
  const timestamp = nowIso();

  if (!recordsStoreConfigured()) {
    const key = type === "appointment" ? "appointments" : "leads";
    let found = false;
    devMemory[key] = devMemory[key].map((record) => {
      if (record.id !== id) return record;
      found = true;
      return { ...record, status, updatedAt: timestamp };
    });
    if (!found) throw new Error("Record not found.");
    return { ok: true, persisted: false };
  }

  const table = type === "appointment" ? APPOINTMENTS_TABLE : LEADS_TABLE;
  const { data, error } = await client()
    .from(table)
    .update({ status, updated_at: timestamp })
    .eq("id", id)
    .select("id");
  if (error) throw new Error(error.message);
  if (!data?.length) throw new Error("Record not found.");
  return { ok: true, persisted: true };
}

export async function deleteRecord(type, id) {
  if (type !== "appointment" && type !== "lead") throw new Error("Invalid record type.");
  if (!recordsStoreConfigured()) {
    if (type === "appointment") {
      const exists = devMemory.appointments.some((appointment) => appointment.id === id);
      if (!exists) throw new Error("Record not found.");
      devMemory.appointments = devMemory.appointments.filter((appointment) => appointment.id !== id);
      return { ok: true, persisted: false, deleted: { type, id, appointmentIds: [id], leadIds: [] } };
    }
    const lead = devMemory.leads.find((item) => item.id === id);
    if (!lead) throw new Error("Record not found.");
    const appointmentIds = devMemory.appointments
      .filter((appointment) => appointment.leadId === id || appointment.sessionId === lead.sessionId)
      .map((appointment) => appointment.id);
    devMemory.leads = devMemory.leads.filter((item) => item.id !== id);
    devMemory.appointments = devMemory.appointments.filter((item) => !appointmentIds.includes(item.id));
    return { ok: true, persisted: false, deleted: { type, id, appointmentIds, leadIds: [id] } };
  }

  const db = client();
  if (type === "appointment") {
    const { data, error } = await db.from(APPOINTMENTS_TABLE).delete().eq("id", id).select("id");
    if (error) throw new Error(error.message);
    if (!data?.length) throw new Error("Record not found.");
    return { ok: true, persisted: true, deleted: { type, id, appointmentIds: [id], leadIds: [] } };
  }

  const { data: leadRow, error: leadError } = await db
    .from(LEADS_TABLE)
    .select("id,session_id")
    .eq("id", id)
    .maybeSingle();
  if (leadError) throw new Error(leadError.message);
  if (!leadRow) throw new Error("Record not found.");
  const { data: appointmentRows, error: appointmentError } = await db
    .from(APPOINTMENTS_TABLE)
    .select("id")
    .eq("lead_id", id);
  if (appointmentError) throw new Error(appointmentError.message);
  await deleteStoredQuotePhotos(db, leadRow.session_id);
  const { data, error } = await db.from(LEADS_TABLE).delete().eq("id", id).select("id");
  if (error) throw new Error(error.message);
  if (!data?.length) throw new Error("Record not found.");
  return {
    ok: true,
    persisted: true,
    deleted: { type, id, appointmentIds: (appointmentRows || []).map((row) => row.id), leadIds: [id] },
  };
}

export async function createManualAppointment({
  customerName = "",
  phone = "",
  service = "",
  vehicle = "",
  notes = "",
  scheduledDate,
  scheduledTime,
}) {
  const date = normalizeText(scheduledDate, 10);
  const time = normalizeText(scheduledTime, 5);
  const required = {
    customerName: normalizeText(customerName, 60),
    phone: normalizeText(phone, 40),
    service: normalizeText(service, 80),
    vehicle: normalizeText(vehicle, 120),
  };
  if (Object.values(required).some((value) => !value)) {
    throw Object.assign(new Error("Name, phone, service, and vehicle are required."), { code: "missing_fields" });
  }
  if (!date || !time) throw Object.assign(new Error("Date and time are required."), { code: "missing_fields" });
  if (!validDateString(date)) throw Object.assign(new Error("Invalid date."), { code: "invalid_date" });
  if (!validTimeString(time)) throw Object.assign(new Error("Invalid time."), { code: "invalid_time" });

  const slotValidation = validateShopSlot(date, time, { maxDays: 365, allowPast: false });
  if (!slotValidation.ok) {
    throw Object.assign(new Error(slotValidation.message), { code: slotValidation.code });
  }

  const timestamp = nowIso();
  const sessionId = `manual_${randomUUID()}`;
  const notes_ = normalizeText(
    [required.service && `Service: ${required.service}`, required.vehicle && `Vehicle: ${required.vehicle}`, notes && `Notes: ${notes}`]
      .filter(Boolean)
      .join(" | "),
    2000,
  );

  const lead = {
    id: stableId("lead"),
    sessionId,
    source: "Manual",
    lang: "en",
    status: "booked",
    createdAt: timestamp,
    updatedAt: timestamp,
    appointmentRequested: true,
    summary: notes_,
    customerName: required.customerName,
    phone: required.phone,
    vehicle: required.vehicle,
    service: required.service,
    photos: [],
    preferredDate: "",
    preferredTime: "",
    preferredTimeText: "",
    lastMessage: "",
  };

  const appointment = {
    id: stableId("appt"),
    leadId: lead.id,
    sessionId,
    status: "confirmed",
    createdAt: timestamp,
    updatedAt: timestamp,
    customerName: lead.customerName,
    phone: lead.phone,
    service: lead.service,
    vehicle: lead.vehicle,
    notes: notes_,
    scheduledDate: date,
    scheduledTime: time,
  };

  if (!recordsStoreConfigured()) {
    const blocked = devMemory.blockedSlots.some((slot) => slot.date === date && (slot.time === "all" || slot.time === time));
    if (blocked) throw Object.assign(new Error("That time slot is blocked."), { code: "CHAT_RESERVATION_BLOCKED" });
    const conflict = devMemory.appointments.some(
      (item) => item.scheduledDate === date && item.scheduledTime === time && BOOKING_ACTIVE.has(item.status),
    );
    if (conflict) throw Object.assign(new Error("That time slot is already booked."), { code: "CHAT_RESERVATION_CONFLICT" });
    devMemory.leads = [lead, ...devMemory.leads].slice(0, MAX_LEADS);
    devMemory.appointments = [appointment, ...devMemory.appointments].slice(0, MAX_APPOINTMENTS);
    return { ok: true, persisted: false, lead, appointment };
  }

  const db = client();
  const { data: blockedRows } = await db
    .from(BLOCKED_TABLE)
    .select("id")
    .eq("slot_date", date)
    .or(`and(is_all_day.eq.true),and(is_all_day.eq.false,slot_time.eq.${time})`)
    .limit(1);
  if (blockedRows?.length) throw Object.assign(new Error("That time slot is blocked."), { code: "CHAT_RESERVATION_BLOCKED" });
  const { data: conflictRows } = await db
    .from(APPOINTMENTS_TABLE)
    .select("id")
    .eq("scheduled_date", date)
    .eq("scheduled_time", time)
    .in("status", [...BOOKING_ACTIVE])
    .limit(1);
  if (conflictRows?.length) throw Object.assign(new Error("That time slot is already booked."), { code: "CHAT_RESERVATION_CONFLICT" });

  const savedLead = await persistLead(lead, null);
  const { data, error } = await db.from(APPOINTMENTS_TABLE).insert(appointmentInsertRow(appointment)).select("*").single();
  if (error) {
    if (isUniqueViolation(error)) throw Object.assign(new Error("That time slot is already booked."), { code: "CHAT_RESERVATION_CONFLICT" });
    throw new Error(error.message);
  }
  return { ok: true, persisted: true, lead: savedLead, appointment: appointmentFromRow(data) };
}
