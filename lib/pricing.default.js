// Default / seed pricing for the quote estimator. This is the single source
// of truth for prices until a Supabase store is connected; after that, the
// admin panel edits a copy of this shape in the database.
//
// All money is in whole USD. The estimate engine (lib/quote.js) reads this.

export const DEFAULT_PRICING = {
  laborRate: 120, // $/hour
  rangePct: 0.25, // fallback only; each service below has its own uncertainty
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
      rangePct: 0.5,
      appliesVehicleFactor: true,
      partsBase: 400, // parts estimate for typical collision
      laborHours: 8, // sedan baseline
    },
    {
      id: "dent-removal",
      icon: "alignment",
      label: { en: "Dent Removal (Paintless)", es: "Remoción de Abolladuras" },
      model: "flat",
      rangePct: 0.4,
      flatPrice: 150,
      appliesVehicleFactor: true,
    },
    {
      id: "painting",
      icon: "oil",
      label: { en: "Paint & Refinishing", es: "Pintura y Acabado" },
      model: "labor",
      rangePct: 0.45,
      appliesVehicleFactor: true,
      partsBase: 200, // paint/materials
      laborHours: 6, // sedan baseline
    },
    {
      id: "frame-alignment",
      icon: "alignment",
      label: { en: "Frame Alignment", es: "Alineación de Bastidor" },
      model: "labor",
      rangePct: 0.5,
      appliesVehicleFactor: true,
      partsBase: 100,
      laborHours: 4,
    },
    {
      id: "mechanical-repair",
      icon: "brakes",
      label: { en: "Mechanical Repair", es: "Reparación Mecánica" },
      model: "labor",
      rangePct: 0.5,
      appliesVehicleFactor: true,
      partsBase: 250,
      laborHours: 5,
    },
    {
      id: "oil-change",
      icon: "oil",
      label: { en: "Oil Change", es: "Cambio de Aceite" },
      model: "flat",
      rangePct: 0.15,
      flatPrice: 129,
      appliesVehicleFactor: false,
    },
    {
      id: "diagnostics",
      icon: "estimate",
      label: { en: "Vehicle Diagnostics", es: "Diagnóstico del Vehículo" },
      model: "flat",
      rangePct: 0.15,
      flatPrice: 149,
      appliesVehicleFactor: false,
    },
    {
      id: "brake-service",
      icon: "brakes",
      label: { en: "Brake Service", es: "Servicio de Frenos" },
      model: "labor",
      rangePct: 0.35,
      partsBase: 250,
      laborHours: 2,
      appliesVehicleFactor: true,
    },
    {
      id: "suspension-repair",
      icon: "suspension",
      label: { en: "Suspension Repair", es: "Reparación de Suspensión" },
      model: "labor",
      rangePct: 0.45,
      partsBase: 300,
      laborHours: 3,
      appliesVehicleFactor: true,
    },
    {
      id: "cooling-service",
      icon: "oil",
      label: { en: "Cooling System Service", es: "Servicio del Sistema de Enfriamiento" },
      model: "labor",
      rangePct: 0.35,
      partsBase: 150,
      laborHours: 1.5,
      appliesVehicleFactor: true,
    },
    {
      id: "battery-replacement",
      icon: "battery",
      label: { en: "Battery Replacement", es: "Cambio de Batería" },
      model: "flat",
      rangePct: 0.25,
      flatPrice: 249,
      appliesVehicleFactor: false,
    },
    {
      id: "wheel-alignment",
      icon: "alignment",
      label: { en: "Wheel Alignment", es: "Alineación de Ruedas" },
      model: "flat",
      rangePct: 0.15,
      flatPrice: 129,
      appliesVehicleFactor: true,
    },
    {
      id: "scheduled-maintenance",
      icon: "clipboard",
      label: { en: "Scheduled Maintenance", es: "Mantenimiento Programado" },
      model: "flat",
      rangePct: 0.35,
      flatPrice: 199,
      appliesVehicleFactor: false,
    },
    {
      id: "insurance-claims",
      icon: "battery",
      label: { en: "Insurance Claims Processing", es: "Procesamiento de Reclamos" },
      model: "flat",
      rangePct: 0,
      flatPrice: 0, // typically no charge — included
      appliesVehicleFactor: false,
    },
    {
      id: "glass-replacement",
      icon: "tire",
      label: { en: "Glass Replacement", es: "Reemplazo de Cristales" },
      model: "options",
      rangePct: 0.35,
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
      rangePct: 0.3,
      flatPrice: 75,
      appliesVehicleFactor: true,
    },
  ],

  disclaimer: {
    en: "Preliminary range only. Parts, labor, hidden damage, diagnostics, and inspection can change the final price. The shop confirms pricing after seeing the vehicle.",
    es: "Este rango es preliminar. Las piezas, la mano de obra, los daños ocultos, el diagnóstico y la inspección pueden cambiar el precio final. El taller confirma el precio después de ver el vehículo.",
  },
};
