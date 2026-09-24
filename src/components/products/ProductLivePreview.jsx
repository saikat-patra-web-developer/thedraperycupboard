import { useState } from "react";

const TREATMENT_MAP = {
  "roller-blinds": "/images/products/roller-treatment.webp",
  "sunfilter-blinds": "/images/products/sunfilter-treatment.webp",
  "vertical-blinds": "/images/products/vertical-treatment.webp",
  "venetian-blinds": "/images/products/venetian-treatment.webp",
  "curtains": "/images/products/curtains-treatment.webp",
  "roman-curtains": "/images/products/roman_shades-treatment.webp",
  "zebra-blinds": "/images/products/zebra-treatment.webp",
  "honeycomb-blinds": "/images/products/honeycomb-treatment.webp",
  "verishade": "/images/products/curtains-treatment.webp",
  "roman-shades": "/images/products/roman_shades-treatment.webp",
  "shutters": "/images/products/shutters-treatment.webp",
  "pergola": "/images/products/outdoor-treatment.webp",
  "outdoor-shades": "/images/products/outdoor-treatment.webp",
  "home-automation": "/images/products/roller-treatment.webp",
  "alarm-cctv": "/images/alarm-cctv-800.webp",
};

/**
 * Calculate realistic tint opacity for blend multiplication
 */
function getTintOpacity(hex) {
  if (!hex) return 0;
  const lower = hex.toLowerCase();
  if (lower === "#ffffff" || lower === "#fdfcfa" || lower === "#fbfbf9" || lower === "#fafafa") {
    return 0.05;
  }
  if (lower.startsWith("#1") || lower.startsWith("#2") || lower.startsWith("#3") || lower.startsWith("#4")) {
    return 0.78;
  }
  return 0.64;
}

/**
 * Determine blind material opacity based on type
 */
function getMaterialOpacity(typeName = "") {
  const t = typeName.toLowerCase();
  if (t.includes("sunfilter") || t.includes("screen") || t.includes("sheer") || t.includes("open")) {
    return 0.72; // Translucent daylight view
  }
  if (t.includes("light filtering") || t.includes("translucent") || t.includes("soft")) {
    return 0.88; // Diffuse glow
  }
  return 0.98; // Blockout / solid
}

export default function ProductLivePreview({ product, selectedVariation }) {
  const [coverage, setCoverage] = useState(85);
  const [isEvening, setIsEvening] = useState(false);

  const type = selectedVariation?.type;
  const color = selectedVariation?.color;
  const colorHex = color?.hex || "#E8DFD1";
  const typeName = type?.name || "Standard";
  const colorName = color?.name || "Natural";

  const treatmentImage = TREATMENT_MAP[product.slug] || "/images/products/roller-treatment.webp";
  const isVerticalOrCurtain = product.slug === "curtains" || product.slug === "verishade" || product.slug === "vertical-blinds";
  const tintOpacity = getTintOpacity(colorHex);
  const materialOpacity = getMaterialOpacity(typeName);

  return (
    <div className="rounded-2xl border border-neutral-200/90 bg-white p-4 sm:p-5 shadow-xs">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-neutral-100">
        <div className="flex items-center gap-2">
          <span className="flex size-2 rounded-full bg-lime animate-pulse"></span>
          <h3 className="text-sm font-bold uppercase tracking-wider text-forest">
            Live Window Preview
          </h3>
        </div>
        <div className="flex items-center gap-1.5 bg-neutral-100 rounded-lg p-0.5 text-xs">
          <button
            type="button"
            onClick={() => setIsEvening(false)}
            aria-pressed={!isEvening}
            className={
              "px-2.5 py-1 rounded-md font-semibold transition-all " +
              (!isEvening ? "bg-white text-forest shadow-2xs font-bold" : "text-neutral-500 hover:text-forest")
            }
          >
            ☀️ Day
          </button>
          <button
            type="button"
            onClick={() => setIsEvening(true)}
            aria-pressed={isEvening}
            className={
              "px-2.5 py-1 rounded-md font-semibold transition-all " +
              (isEvening ? "bg-forest text-white shadow-2xs font-bold" : "text-neutral-500 hover:text-forest")
            }
          >
            🌙 Evening
          </button>
        </div>
      </div>

      {/* Realistic Window Preview Stage */}
      <div className="relative mt-3.5 overflow-hidden rounded-xl border-4 border-neutral-200/90 bg-neutral-900 shadow-inner aspect-[1.22/1] sm:aspect-[1.28/1]">
        {/* Background Scenic Outdoor View through Window */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/dining-800.webp"
            alt="Scenic daylight outside window"
            className={
              "h-full w-full object-cover transition-all duration-500 " +
              (isEvening ? "brightness-35 contrast-125 saturate-60" : "brightness-100 contrast-100")
            }
          />
          {/* Subtle outdoor glass reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-sky-400/10 via-transparent to-white/10 pointer-events-none" />
        </div>

        {/* Evening Ambient Glow Overlay */}
        {isEvening && (
          <div className="absolute inset-0 z-1 bg-amber-950/20 mix-blend-color-burn pointer-events-none" />
        )}

        {/* Window Architecture: Top Cassette / Headrail */}
        <div className="absolute top-0 inset-x-0 z-30 h-6 bg-gradient-to-b from-neutral-100 via-neutral-50 to-neutral-200 border-b border-black/20 shadow-xs flex items-center justify-between px-3">
          <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">
            {product.name}
          </span>
          <div className="flex items-center gap-1 opacity-40">
            <span className="size-1 rounded-full bg-neutral-500"></span>
            <span className="size-1 rounded-full bg-neutral-500"></span>
          </div>
        </div>

        {/* The Blind Treatment Covering Layer */}
        <div
          className="absolute top-6 inset-x-0 z-20 flex flex-col transition-all duration-500 ease-out overflow-hidden"
          style={{
            height: isVerticalOrCurtain ? "calc(100% - 24px)" : `${coverage}%`,
            width: isVerticalOrCurtain ? `${coverage}%` : "100%",
            filter: `drop-shadow(0px 8px 12px rgba(0, 0, 0, ${isEvening ? "0.6" : "0.35"}))`,
          }}
        >
          {/* Blind Fabric / Texture Container with Multiply Tint */}
          <div
            className="relative h-full w-full overflow-hidden transition-opacity duration-300"
            style={{ opacity: materialOpacity }}
          >
            {/* Photographic Treatment Image */}
            <img
              src={treatmentImage}
              alt={`${product.name} texture preview`}
              className="h-full w-full object-cover object-top select-none pointer-events-none"
            />

            {/* Dynamic Real-Time Color Tinting */}
            {tintOpacity > 0 && (
              <div
                className="absolute inset-0 pointer-events-none transition-colors duration-200"
                style={{
                  backgroundColor: colorHex,
                  mixBlendMode: "multiply",
                  opacity: tintOpacity,
                }}
              />
            )}

            {/* Subtle Fabric Highlight Sheen */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-black/10 pointer-events-none" />
          </div>

          {/* Bottom Weighted Rail for Rollers/Venetians */}
          {!isVerticalOrCurtain && (
            <div className="h-2.5 w-full bg-gradient-to-b from-neutral-200 to-neutral-300 border-t border-black/15 shadow-sm shrink-0" />
          )}
        </div>

        {/* Window Architecture: Bottom Window Sill */}
        <div className="absolute bottom-0 inset-x-0 z-30 h-3.5 bg-gradient-to-b from-neutral-50 to-neutral-200 border-t border-black/15 shadow-md" />

        {/* Live Active Selection Overlay Badge */}
        <div className="absolute bottom-5 left-3.5 z-40 flex items-center gap-2 rounded-xl bg-forest/90 px-3 py-1.5 text-xs text-white shadow-lg backdrop-blur-sm border border-white/10 max-w-[85%]">
          <span
            className="size-3.5 rounded-full border border-white/40 shrink-0 shadow-2xs"
            style={{ backgroundColor: colorHex }}
          />
          <div className="truncate">
            <span className="font-bold">{typeName}</span>
            <span className="text-white/60 mx-1.5">·</span>
            <span className="text-lime font-semibold">{colorName}</span>
          </div>
        </div>

        {/* Coverage Status Badge */}
        <div className="absolute top-8 right-3.5 z-40 rounded-full bg-black/60 px-2.5 py-0.5 text-[10px] font-bold text-white backdrop-blur-xs">
          {coverage}% Coverage
        </div>
      </div>

      {/* Coverage & Visualizer Action Controls */}
      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-neutral-100">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-neutral-500 mr-1">Drop Height:</span>
          {[
            { label: "25%", val: 25 },
            { label: "50%", val: 50 },
            { label: "85%", val: 85 },
            { label: "100%", val: 100 },
          ].map((item) => (
            <button
              type="button"
              key={item.val}
              onClick={() => setCoverage(item.val)}
              className={
                "rounded-lg px-2 py-1 text-xs font-bold transition-all " +
                (coverage === item.val
                  ? "bg-forest text-white shadow-2xs"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200")
              }
            >
              {item.label}
            </button>
          ))}
        </div>

        <a
          href={`/live-preview?product=${encodeURIComponent(product.slug)}`}
          className="text-xs font-bold text-moss hover:text-forest transition-colors flex items-center gap-1"
        >
          <span>3D Room Visualizer</span>
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}
