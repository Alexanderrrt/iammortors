import { randomUUID } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { devMemoryStoreEnabled } from "./runtime-mode";

const TABLE = "training_examples";
const BUCKET = "training-photos";
const MAX_PHOTOS = 8;
const MAX_TEXT = 2000;
let memory = [];

function clean(value, max = MAX_TEXT) {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim().slice(0, max) : "";
}
function configured() {
  return !devMemoryStoreEnabled() && Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}
function client() {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
}
function fromRow(row) {
  return {
    id: row.id, createdAt: row.created_at, updatedAt: row.updated_at, status: row.status,
    vehicleClassId: row.vehicle_class_id, vehicleText: row.vehicle_text || "", serviceId: row.service_id,
    photos: Array.isArray(row.photo_urls) ? row.photo_urls : [], approvedLow: Number(row.approved_low),
    approvedHigh: Number(row.approved_high), inspectionNotes: row.inspection_notes || "", staffNotes: row.staff_notes || "",
    approvedBy: row.approved_by || "", approvedAt: row.approved_at || "",
  };
}
export function trainingStoreConfigured() { return configured(); }

export async function listTraining() {
  if (!configured()) return [...memory].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const { data, error } = await client().from(TABLE).select("*").order("created_at", { ascending: false }).limit(200);
  if (error) throw new Error(error.message);
  return (data || []).map(fromRow);
}

export async function createTraining(input) {
  const low = Number(input.approvedLow), high = Number(input.approvedHigh);
  if (!input.vehicleClassId || !input.serviceId || !Number.isFinite(low) || !Number.isFinite(high) || low < 0 || high < low) {
    throw new Error("Vehicle, service, and a valid approved price range are required.");
  }
  const item = {
    id: `train_${randomUUID()}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), status: "pending",
    vehicleClassId: clean(input.vehicleClassId, 80), vehicleText: clean(input.vehicleText, 160), serviceId: clean(input.serviceId, 100),
    photos: (Array.isArray(input.photos) ? input.photos : []).filter((x) => typeof x === "string").slice(0, MAX_PHOTOS),
    approvedLow: low, approvedHigh: high, inspectionNotes: clean(input.inspectionNotes), staffNotes: "", approvedBy: "", approvedAt: "",
  };
  if (!configured()) { memory = [item, ...memory].slice(0, 200); return item; }
  const row = {
    id: item.id, status: item.status, vehicle_class_id: item.vehicleClassId, vehicle_text: item.vehicleText,
    service_id: item.serviceId, photo_urls: item.photos, approved_low: item.approvedLow, approved_high: item.approvedHigh,
    inspection_notes: item.inspectionNotes,
  };
  const { data, error } = await client().from(TABLE).insert(row).select("*").single();
  if (error) throw new Error(error.message);
  return fromRow(data);
}

export async function setTrainingStatus(id, status, staffNotes = "") {
  if (!["approved", "rejected", "archived"].includes(status)) throw new Error("Invalid training status.");
  const now = new Date().toISOString();
  if (!configured()) {
    const item = memory.find((x) => x.id === id);
    if (!item) throw new Error("Training example not found.");
    Object.assign(item, { status, staffNotes: clean(staffNotes), updatedAt: now, approvedBy: status === "approved" ? "admin" : "", approvedAt: status === "approved" ? now : "" });
    return item;
  }
  const { data, error } = await client().from(TABLE).update({ status, staff_notes: clean(staffNotes), approved_by: status === "approved" ? "admin" : null, approved_at: status === "approved" ? now : null }).eq("id", id).select("*").single();
  if (error) throw new Error(error.message);
  return fromRow(data);
}

export { BUCKET, MAX_PHOTOS };
