import { useState } from "react";

const TREATMENT_MAP = {
  "roller-blinds": "/images/products/roller-treatment.webp",
  "sunfilter-blinds": "/images/products/sunfilter-treatment.webp",
  "vertical-blinds": "/images/products/vertical-treatment.webp",
  "venetian-blinds": "/images/products/venetian-treatment.webp",
  "curtains": "/images/products/curtains-left-panel.webp",
  "roman-curtains": "/images/products/roman_shades-treatment.webp",
  "zebra-blinds": "/images/products/zebra-treatment.webp",
  "honeycomb-blinds": "/images/products/honeycomb-treatment.webp",
  "verishade": "/images/products/verishade-treatment.webp",
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
 * Determine blind material opacity based on product and type
 */
function getMaterialOpacity(productSlug, typeId = "", typeName = "") {
  if (productSlug === "curtains") {
    if (typeId === "s-fold-sheer" || typeName.toLowerCase().includes("sheer")) {
      return 0.88; // Translucent daylight glow with crisp visible fabric wave pleats
    }
    if (typeId === "textured-linen") {
      return 0.96; // Textured organic slub
    }
    return 1.0; // Blockout drapes
  }
  if (productSlug === "verishade") {
    if (typeId === "darkening-blade") {
      return 0.98;
    }
    return 0.92; // Alternating soft sheer and opaque folds
  }
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
  const typeId = type?.id || "";
  const typeName = type?.name || "Standard";
  const colorName = color?.name || "Natural";

  const isCurtains = product.slug === "curtains";
  const isVerishade = product.slug === "verishade";
  const isVertical = product.slug === "vertical-blinds";

  const treatmentImage = TREATMENT_MAP[product.slug] || "/images/products/roller-treatment.webp";
  const tintOpacity = getTintOpacity(colorHex);
  const materialOpacity = getMaterialOpacity(product.slug, typeId, typeName);

  // Realistic biparting curtain panel width percentage
  const getCurtainPanelPercent = (cov) => {
    if (cov <= 25) return 18; // Stiff elegant stack on sides, 64% open center
    if (cov <= 50) return 18 + ((cov - 25) / 25) * 12; // 18% -> 30%
    if (cov <= 85) return 30 + ((cov - 50) / 35) * 14; // 30% -> 44%
    return 44 + ((cov - 85) / 15) * 6.8; // 44% -> 50.8% (overlaps seamlessly in center)
  };
  const curtainPanelWidth = getCurtainPanelPercent(coverage);

  const controlLabel = isCurtains
    ? "Curtain Draw:"
    : isVerishade
    ? "Shade Draw:"
    : isVertical
    ? "Blind Draw:"
    : "Drop Height:";

  const getBadgeStatus = () => {
    if (isCurtains || isVerishade) {
      if (coverage <= 25) return `${coverage}% Drawn · Open`;
      if (coverage === 100) return "100% Drawn · Closed";
      return `${coverage}% Drawn`;
    }
    return `${coverage}% Coverage`;
  };

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
      <div className="relative mt-3.5 overflow-hidden rounded-xl border border-neutral-300/80 bg-neutral-950 shadow-inner aspect-[4/3]">
        {/* Background Scenic Outdoor View through Window */}
        <div className="absolute inset-0 z-0 select-none overflow-hidden">
          <img
            src="/images/window-day-800.webp"
            srcSet="/images/window-day-480.webp 480w, /images/window-day-800.webp 800w, /images/window-day-1200.webp 1200w"
            sizes="(max-width: 640px) 100vw, 600px"
            alt="Scenic daylight outside window"
            className={
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 " +
              (isEvening ? "opacity-0" : "opacity-100")
            }
          />
          <img
            src="/images/window-night-800.webp"
            srcSet="/images/window-night-480.webp 480w, /images/window-night-800.webp 800w, /images/window-night-1200.webp 1200w"
            sizes="(max-width: 640px) 100vw, 600px"
            alt="Scenic evening outside window"
            className={
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 " +
              (isEvening ? "opacity-100" : "opacity-0")
            }
          />
          {/* Subtle outdoor glass reflection sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-sky-400/5 via-transparent to-white/10 pointer-events-none" />
        </div>

        {/* Window Architecture: Top Track or Headrail */}
        {isCurtains || isVerishade ? (
          <div className="absolute top-0 inset-x-0 z-30 h-3.5 bg-gradient-to-b from-neutral-700 via-neutral-800 to-neutral-950 border-b border-black/50 shadow-xs flex items-center justify-between px-3">
            <div className="flex w-full items-center justify-between px-1 opacity-60">
              {Array.from({ length: 18 }).map((_, i) => (
                <span key={i} className="size-1 rounded-full bg-neutral-400/80 shadow-2xs" />
              ))}
            </div>
          </div>
        ) : (
          <div className="absolute top-0 inset-x-0 z-30 h-6 bg-gradient-to-b from-neutral-800 via-neutral-900 to-black border-b border-black/40 shadow-sm flex items-center justify-between px-3">
            <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-300">
              {product.name}
            </span>
            <div className="flex items-center gap-1 opacity-50">
              <span className="size-1 rounded-full bg-neutral-400"></span>
              <span className="size-1 rounded-full bg-neutral-400"></span>
            </div>
          </div>
        )}

        {/* 1. CURTAINS: Real Biparting Dual Wave Drape Panels */}
        {isCurtains && (
          <div className="absolute top-3.5 inset-x-0 bottom-0 z-20 pointer-events-none overflow-hidden">
            {/* Left Curtain Drape Panel */}
            <div
              className="absolute top-0 left-0 bottom-0 overflow-hidden transition-all duration-700 ease-out"
              style={{
                width: `${curtainPanelWidth}%`,
                filter: `drop-shadow(4px 0px 10px rgba(0, 0, 0, ${isEvening ? "0.6" : "0.35"}))`,
              }}
            >
              <div
                className="relative h-full w-full overflow-hidden transition-opacity duration-300"
                style={{ opacity: materialOpacity }}
              >
                <img
                  src="/images/products/curtains-left-panel.webp"
                  alt="Left curtain wave drape"
                  className="h-full w-full object-fill select-none pointer-events-none"
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
                {/* Fabric Highlight Sheen */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-black/10 pointer-events-none" />
                {/* Evening Warm Glow */}
                {isEvening && (
                  <div className="absolute inset-0 bg-amber-500/10 mix-blend-soft-light pointer-events-none" />
                )}
              </div>
            </div>

            {/* Right Curtain Drape Panel */}
            <div
              className="absolute top-0 right-0 bottom-0 overflow-hidden transition-all duration-700 ease-out"
              style={{
                width: `${curtainPanelWidth}%`,
                filter: `drop-shadow(-4px 0px 10px rgba(0, 0, 0, ${isEvening ? "0.6" : "0.35"}))`,
              }}
            >
              <div
                className="relative h-full w-full overflow-hidden transition-opacity duration-300"
                style={{ opacity: materialOpacity }}
              >
                <img
                  src="/images/products/curtains-right-panel.webp"
                  alt="Right curtain wave drape"
                  className="h-full w-full object-fill select-none pointer-events-none"
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
                {/* Fabric Highlight Sheen */}
                <div className="absolute inset-0 bg-gradient-to-l from-white/10 via-transparent to-black/10 pointer-events-none" />
                {/* Evening Warm Glow */}
                {isEvening && (
                  <div className="absolute inset-0 bg-amber-500/10 mix-blend-soft-light pointer-events-none" />
                )}
              </div>
            </div>
          </div>
        )}

        {/* 2. VERISHADE: Real Soft-Fold Walk-Through Vanes */}
        {isVerishade && (
          <div className="absolute top-3.5 inset-x-0 bottom-0 z-20 pointer-events-none overflow-hidden">
            <div
              className="absolute top-0 left-0 bottom-0 overflow-hidden transition-all duration-700 ease-out"
              style={{
                width: `${coverage}%`,
                filter: `drop-shadow(6px 0px 14px rgba(0, 0, 0, ${isEvening ? "0.6" : "0.35"}))`,
              }}
            >
              <div
                className="relative h-full w-full overflow-hidden transition-opacity duration-300"
                style={{ opacity: materialOpacity }}
              >
                <img
                  src="/images/products/verishade-treatment.webp"
                  alt="Verishade smart soft-fold vanes"
                  className="h-full w-full object-cover object-left select-none pointer-events-none"
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
                {/* Sheer fabric highlight sheen */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-black/10 pointer-events-none" />
                {/* Evening Warm Glow */}
                {isEvening && (
                  <div className="absolute inset-0 bg-amber-500/10 mix-blend-soft-light pointer-events-none" />
                )}
              </div>
            </div>
          </div>
        )}

        {/* 3. STANDARD BLINDS & TOP-DOWN TREATMENTS */}
        {!isCurtains && !isVerishade && (
          <div
            className="absolute top-6 inset-x-0 z-20 flex flex-col transition-all duration-500 ease-out overflow-hidden"
            style={{
              height: isVertical
                ? "calc(100% - 24px - 4%)"
                : `calc((100% - 24px - 4%) * ${coverage / 100})`,
              width: isVertical ? `${coverage}%` : "100%",
              filter: `drop-shadow(0px 8px 14px rgba(0, 0, 0, ${isEvening ? "0.6" : "0.35"}))`,
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

              {/* Subtle warm room lighting in evening mode */}
              {isEvening && (
                <div className="absolute inset-0 bg-amber-500/10 mix-blend-soft-light pointer-events-none" />
              )}
            </div>

            {/* Bottom Weighted Rail for Rollers/Venetians */}
            {!isVertical && (
              <div className="h-2.5 w-full bg-gradient-to-b from-neutral-700 via-neutral-800 to-neutral-900 border-t border-black/30 shadow-sm shrink-0" />
            )}
          </div>
        )}

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

        {/* Coverage / Drawn Status Badge */}
        <div className="absolute top-8 right-3.5 z-40 rounded-full bg-black/60 px-2.5 py-0.5 text-[10px] font-bold text-white backdrop-blur-xs">
          {getBadgeStatus()}
        </div>
      </div>

      {/* Coverage & Visualizer Action Controls */}
      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-neutral-100">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-neutral-500 mr-1">{controlLabel}</span>
          {[
            { label: isCurtains || isVerishade ? "25% Open" : "25%", val: 25 },
            { label: "50%", val: 50 },
            { label: "85%", val: 85 },
            { label: isCurtains || isVerishade ? "100% Closed" : "100%", val: 100 },
          ].map((item) => (
            <button
              type="button"
              key={item.val}
              onClick={() => setCoverage(item.val)}
              className={
                "rounded-lg px-2.5 py-1 text-xs font-bold transition-all " +
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
