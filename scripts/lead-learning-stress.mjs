import assert from "node:assert/strict";

process.env.IAM_DEV_MEMORY_STORE = "1";

const { saveQuoteLead, getChatRecords, getLeadLearningRecords, deleteRecord } = await import("../lib/booking-store.js");
const { buildLeadLearningContext } = await import("../lib/quote-intelligence.js");

await saveQuoteLead({
  sessionId: "stress-session-1234567890",
  lang: "es",
  customerName: "Test Customer",
  phone: "555-000-0000",
  vehicle: "2024 Ford Mustang GT",
  service: "Cambio de Aceite",
  summary: "$110-$150",
  lastMessage: "quiero cambio de aceite para mi mustang",
});

const records = await getChatRecords();
const lead = records.leads[0];
const learningRecords = await getLeadLearningRecords();
const context = buildLeadLearningContext(learningRecords);

assert.equal(lead.lastMessage, "quiero cambio de aceite para mi mustang");
assert.deepEqual(Object.keys(learningRecords[0]).sort(), ["lastMessage", "service", "vehicle"]);
assert.match(context, /quiero cambio de aceite/);
assert.match(context, /Cambio de Aceite/);
assert.doesNotMatch(context, /555-000-0000|Test Customer/);

const deletion = await deleteRecord("lead", lead.id);
assert.deepEqual(deletion.deleted.leadIds, [lead.id]);
assert.equal((await getChatRecords()).leads.length, 0);

console.log("Lead-learning persistence stress test passed.");
