import { useState } from "react";
import { getProductVariations } from "../../data/productVariations.js";

/**
 * Determine if a hex color is light or dark for optimal icon contrast
 */
function isColorLight(hex) {
  if (!hex || !hex.startsWith("#")) return true;
  const c = hex.substring(1);
  const rgb = parseInt(c, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luma > 165;
}

export default function ProductTypeColorSelector({ product, onSelectionChange }) {
  const variations = getProductVariations(product.slug);
  const types = variations.types || [];

  const [selectedTypeId, setSelectedTypeId] = useState(() => types[0]?.id || "");
  const [selectedColorName, setSelectedColorName] = useState(() => types[0]?.colors[0]?.name || "");

  // Safely find the selected type and color or fallback to first
  const selectedType = types.find((t) => t.id === selectedTypeId) || types[0] || null;
  const availableColors = selectedType?.colors || [];
  const selectedColor =
    availableColors.find((c) => c.name === selectedColorName) || availableColors[0] || null;

  // When type changes, switch type and default to its first color
  const handleSelectType = (type) => {
    setSelectedTypeId(type.id);
    const nextColor = type.colors[0] || null;
    if (nextColor) {
      setSelectedColorName(nextColor.name);
    }
    if (onSelectionChange && nextColor) {
      onSelectionChange({ type, color: nextColor });
    }
  };

  const handleSelectColor = (color) => {
    setSelectedColorName(color.name);
    if (onSelectionChange && selectedType) {
      onSelectionChange({ type: selectedType, color });
    }
  };

  if (!types.length || !selectedType) return null;

  return (
    <div className="mt-5 rounded-2xl border border-neutral-200/80 bg-white p-4 sm:p-5 shadow-xs">
      {/* 1. Type Selection Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 pb-3">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-forest">
            {variations.typeLabel || "1. Select Blinds Type"}
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            Choose a type to reveal available designer fabrics and colours
          </p>
        </div>
        <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-bold text-moss border border-brand-line">
          {types.length} Types Available
        </span>
      </div>

      {/* Type Cards Grid */}
      <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {types.map((type) => {
          const isSelected = selectedType.id === type.id;
          return (
            <button
              type="button"
              key={type.id}
              onClick={() => handleSelectType(type)}
              className={
                "group relative flex flex-col items-start rounded-xl p-3 text-left transition-all duration-150 " +
                (isSelected
                  ? "bg-forest text-white shadow-sm ring-2 ring-forest"
                  : "bg-neutral-50/70 text-forest border border-neutral-200/80 hover:border-moss/40 hover:bg-neutral-100/80")
              }
            >
              <div className="flex w-full items-center justify-between gap-2">
                <span className="font-bold text-xs sm:text-sm tracking-tight">
                  {type.name}
                </span>
                {type.badge && (
                  <span
                    className={
                      "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider shrink-0 " +
                      (isSelected
                        ? "bg-lime text-forest"
                        : "bg-white text-moss border border-brand-line/80")
                    }
                  >
                    {type.badge}
                  </span>
                )}
              </div>
              <p
                className={
                  "mt-1.5 text-xs line-clamp-2 leading-relaxed " +
                  (isSelected ? "text-white/80" : "text-neutral-500")
                }
              >
                {type.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* 2. Color Swatches Section (Opens when type is selected) */}
      {selectedType.colors && selectedType.colors.length > 0 && (
        <div className="mt-4 rounded-xl bg-brand-50/70 border border-brand-line/80 p-3.5 sm:p-4">
          {/* Swatch Strip Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-moss">
                Available Colours & Finishes
              </span>
              <span className="text-xs text-neutral-500 font-medium">
                ({selectedType.colors.length} choices)
              </span>
            </div>
            {selectedColor && (
              <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-forest border border-brand-line shadow-2xs">
                <span
                  className="size-3 rounded-full border border-black/10 shrink-0"
                  style={{ backgroundColor: selectedColor.hex }}
                />
                <span className="font-bold">{selectedColor.name}</span>
                {selectedColor.code && (
                  <span className="text-[10px] text-neutral-400 font-normal">
                    {selectedColor.code}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Color Swatch Circles */}
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 gap-2.5">
            {selectedType.colors.map((color) => {
              const isSelected = selectedColor?.name === color.name;
              const isLight = isColorLight(color.hex);
              return (
                <button
                  type="button"
                  key={color.name}
                  onClick={() => handleSelectColor(color)}
                  aria-label={`Select finish ${color.name}`}
                  className={
                    "group relative flex flex-col items-center gap-1.5 p-1.5 rounded-xl transition-all duration-150 " +
                    (isSelected ? "bg-white shadow-xs ring-1.5 ring-lime" : "hover:bg-white/70")
                  }
                >
                  <div
                    className={
                      "relative flex size-10 sm:size-11 items-center justify-center rounded-full border border-black/10 transition-transform duration-150 " +
                      (isSelected
                        ? "ring-2 ring-lime ring-offset-2 ring-offset-brand-50 scale-105 shadow-sm"
                        : "group-hover:scale-105 shadow-2xs")
                    }
                    style={{ backgroundColor: color.hex }}
                  >
                    {isSelected && (
                      <svg
                        className={`size-4 ${isLight ? "text-forest" : "text-white"}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <span className="text-[11px] font-medium text-neutral-700 text-center truncate w-full px-0.5 leading-tight">
                    {color.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Selection Summary Bar */}
          {selectedColor && (
            <div className="mt-3.5 pt-3 border-t border-brand-line/70 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className="size-5 rounded-md border border-black/10 shadow-2xs shrink-0"
                  style={{ backgroundColor: selectedColor.hex }}
                />
                <div className="text-xs truncate">
                  <span className="text-neutral-500 font-normal">Selected: </span>
                  <span className="font-bold text-forest">{selectedType.name}</span>
                  <span className="text-neutral-400 mx-1.5">·</span>
                  <span className="text-moss font-bold">{selectedColor.name}</span>
                </div>
              </div>
              <a
                href={`/online-quote?product=${encodeURIComponent(product.slug)}&type=${encodeURIComponent(selectedType.id)}&color=${encodeURIComponent(selectedColor.name)}`}
                className="btn btn-dark !py-1.5 !px-3 text-[11px] font-bold shadow-xs whitespace-nowrap"
              >
                Quote This Selection →
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
