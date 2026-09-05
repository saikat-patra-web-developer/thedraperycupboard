// Temporary NZD rates per square metre, used only by /online-quote.
// Replace these sample rates with your final pricing when ready.
export const quoteRates = [
  { slug: "roller-blinds", name: "Roller Blinds", rate: 4.8 },
  { slug: "sunfilter-blinds", name: "Sunfilter Blinds", rate: 12.5 },
  { slug: "vertical-blinds", name: "Vertical Blinds", rate: 18 },
  { slug: "venetian-blinds", name: "Venetian Blinds", rate: 24 },
  { slug: "curtains", name: "Curtains", rate: 32 },
  { slug: "roman-curtains", name: "Roman Curtains", rate: 38 },
  { slug: "zebra-blinds", name: "Zebra Blinds", rate: 28 },
  { slug: "honeycomb-blinds", name: "Honeycomb Blinds", rate: 35 },
  { slug: "verishade", name: "Verishade", rate: 45 },
  { slug: "roman-shades", name: "Roman Shades", rate: 36 },
  { slug: "shutters", name: "Shutters", rate: 65 },
  { slug: "pergola", name: "Pergola", rate: 120 },
  { slug: "outdoor-shades", name: "Outdoor Shades", rate: 55 },
];

export function calculateWindow({ product, width, drop }) {
  const selected = quoteRates.find(item => item.slug === product);
  const w = Number(width);
  const d = Number(drop);
  if (!selected || !Number.isFinite(w) || !Number.isFinite(d) ||
      w <= 0 || d <= 0) return null;
  const area = (w / 1000) * (d / 1000);
  const unitCents = Math.round(area * selected.rate * 100);
  const totalCents = unitCents;
  if (!Number.isFinite(area) || !Number.isSafeInteger(totalCents)) return null;
  return { area, unitPrice: unitCents / 100, total: totalCents / 100, rate: selected.rate };
}
