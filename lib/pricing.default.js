// Default / seed pricing for the quote estimator. This is the single source
// of truth for prices until a Supabase store is connected; after that, the
// admin panel edits a copy of this shape in the database.
//
// All money is in whole USD. The estimate engine (lib/quote.js) reads this.

export const DEFAULT_PRICING = {
  laborRate: 120, // $/hour
  rangePct: 0.15, // estimate spread: shown as ±15% around the subtotal
  currency: "USD",

  // Vehicle variation is captured by a class factor (not a full model DB).
  // sedan = 1.0 is the baseline every base price is quoted against.
  vehicleClasses: [
    { id: "compact", label: { en: "Compact / Coupe", es: "Compacto / Coupé" }, factor: 0.9 },
    { id: "sedan", label: { en: "Sedan", es: "Sedán" }, factor: 1.0 },
    { id: "suv_truck", label: { en: "SUV / Truck", es: "SUV / Camioneta" }, factor: 1.25 },
    { id: "luxury_perf", label: { en: "Luxury / Performance", es: "Lujo / Alto Desempeño" }, factor: 1.6 },
  ],

  services: [
    {
      id: "collision-repair",
      icon: "wrench",
      label: { en: "Collision Repair", es: "Reparación de Colisiones" },
      model: "labor",
      appliesVehicleFactor: true,
      partsBase: 400, // parts estimate for typical collision
      laborHours: 8, // sedan baseline
    },
    {
      id: "dent-removal",
      icon: "alignment",
      label: { en: "Dent Removal (Paintless)", es: "Remoción de Abolladuras" },
      model: "flat",
      flatPrice: 150,
      appliesVehicleFactor: true,
    },
    {
      id: "painting",
      icon: "oil",
      label: { en: "Paint & Refinishing", es: "Pintura y Acabado" },
      model: "labor",
      appliesVehicleFactor: true,
      partsBase: 200, // paint/materials
      laborHours: 6, // sedan baseline
    },
    {
      id: "frame-alignment",
      icon: "alignment",
      label: { en: "Frame Alignment", es: "Alineación de Bastidor" },
      model: "labor",
      appliesVehicleFactor: true,
      partsBase: 100,
      laborHours: 4,
    },
    {
      id: "mechanical-repair",
      icon: "brakes",
      label: { en: "Mechanical Repair", es: "Reparación Mecánica" },
      model: "labor",
      appliesVehicleFactor: true,
      partsBase: 250,
      laborHours: 5,
    },
    {
      id: "insurance-claims",
      icon: "battery",
      label: { en: "Insurance Claims Processing", es: "Procesamiento de Reclamos" },
      model: "flat",
      flatPrice: 0, // typically no charge — included
      appliesVehicleFactor: false,
    },
    {
      id: "glass-replacement",
      icon: "tire",
      label: { en: "Glass Replacement", es: "Reemplazo de Cristales" },
      model: "options",
      appliesVehicleFactor: true,
      options: [
        { id: "windshield", label: { en: "Windshield", es: "Parabrisas" }, price: 350 },
        { id: "door-window", label: { en: "Door Window", es: "Ventana de Puerta" }, price: 250 },
        { id: "rear-window", label: { en: "Rear Window", es: "Ventana Trasera" }, price: 300 },
      ],
    },
    {
      id: "towing-24hr",
      icon: "wrench",
      label: { en: "24/7 Towing Service", es: "Servicio de Grúa 24/7" },
      model: "flat",
      flatPrice: 75,
      appliesVehicleFactor: true,
    },
  ],

  disclaimer: {
    en: "This is an estimate only. Final price is confirmed at the shop after we check your vehicle.",
    es: "Esto es solo un estimado. El precio final se confirma en el taller después de revisar su vehículo.",
  },
};
