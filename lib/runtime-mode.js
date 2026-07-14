// When set to "1", the booking store ignores Supabase and uses its in-memory
// fallback. Useful for local testing of the full booking flow before the
// Supabase schema (db/booking-schema.sql) has been applied. Kept dynamic so the
// flag is read at request time, not baked into a production build.
const DEV_MEMORY_ENV = "IAM_DEV_MEMORY_STORE";

export function devMemoryStoreEnabled() {
  return String(process.env[DEV_MEMORY_ENV] || "").trim() === "1";
}
