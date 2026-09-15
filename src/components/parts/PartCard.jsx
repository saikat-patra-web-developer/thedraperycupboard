import { useState } from "react";
import { useCart } from "../../hooks/useCart.js";
import Icon from "../ui/Icon.jsx";

const money = (val) => new Intl.NumberFormat("en-NZ", { style: "currency", currency: "NZD" }).format(val);

export default function PartCard({ part }) {
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(part.variants ? part.variants[0] : null);
  const selectedPack = part.packOptions ? part.packOptions[0] : null;
  const [addedAnimation, setAddedAnimation] = useState(false);

  const price = Math.round(part.price * (selectedPack?.multiplier || 1) * 100) / 100;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(part, 1, selectedVariant, selectedPack);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  return (
    <article className="card group flex flex-col h-full bg-white transition duration-200 hover:shadow-lg border border-brand-line">
      {/* Visual Header / Thumbnail Box */}
      <div className="relative aspect-[1.3] w-full bg-gradient-to-br from-neutral-50 to-brand-50/60 p-5 flex flex-col justify-between overflow-hidden border-b border-neutral-100">
        <div className="flex items-center justify-between gap-2 z-10">
          <span className="rounded-md bg-white/90 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-moss shadow-2xs">
            {part.blindType}
          </span>
          {part.badge && (
            <span className="rounded-md bg-forest px-2.5 py-1 text-[11px] font-semibold text-white shadow-2xs">
              {part.badge}
            </span>
          )}
        </div>

        {/* Central Graphic Illustration */}
        <div className="my-auto flex items-center justify-center text-forest/75 transition-transform duration-300 group-hover:scale-110">
          <div className="size-20 rounded-2xl bg-white/80 shadow-xs border border-brand-line/60 flex items-center justify-center p-3 text-moss">
            <Icon
              name={
                part.category === "motors"
                  ? "wifi"
                  : part.category === "curtains"
                  ? "spark"
                  : part.category === "safety"
                  ? "shield"
                  : "tools"
              }
              size={36}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-neutral-500 z-10">
          <span className="font-mono font-medium">SKU: {part.sku}</span>
          <span className="flex items-center gap-1 text-moss font-semibold">
            <span className="size-1.5 rounded-full bg-lime animate-pulse" />
            In Stock
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="flex flex-1 flex-col p-5">
        {/* Rating */}
        <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-2">
          <div className="flex text-amber-400">
            {"★".repeat(Math.floor(part.rating))}
            {part.rating % 1 !== 0 && "★"}
          </div>
          <span className="font-bold text-neutral-700">{part.rating}</span>
          <span>({part.reviewsCount})</span>
        </div>

        {/* Product Title */}
        <h3 className="!text-lg font-bold text-forest group-hover:text-moss transition">
          <a href={`/parts/${part.slug}`}>{part.name}</a>
        </h3>

        <p className="mt-2 text-xs leading-relaxed text-brand-grey line-clamp-2">
          {part.description}
        </p>

        {/* Variant Selectors (If multiple options exist) */}
        {part.variants && part.variants.length > 1 && (
          <div className="mt-3 pt-3 border-t border-neutral-100">
            <span className="text-[11px] font-semibold text-neutral-600 block mb-1.5">
              Option: <span className="text-forest font-bold">{selectedVariant?.label}</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {part.variants.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSelectedVariant(v)}
                  className={`px-2 py-1 text-[11px] rounded border transition ${
                    selectedVariant?.id === v.id
                      ? "border-forest bg-forest text-white font-semibold"
                      : "border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-neutral-400"
                  }`}
                >
                  {v.hex && (
                    <span
                      className="inline-block size-2 rounded-full mr-1 border border-neutral-300 align-middle"
                      style={{ backgroundColor: v.hex }}
                    />
                  )}
                  {v.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Price and Cart Footer */}
        <div className="mt-auto pt-4 flex items-center justify-between gap-3 border-t border-neutral-100">
          <div>
            <div className="text-xl font-bold text-forest">{money(price)}</div>
            <div className="text-[10px] text-neutral-500">Incl. 15% NZ GST</div>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className={`btn !min-h-10 !px-4 !py-2 text-xs font-semibold rounded-lg transition-all ${
              addedAnimation ? "!bg-moss !text-white scale-105" : "btn-dark"
            }`}
          >
            {addedAnimation ? (
              <span className="flex items-center gap-1.5">
                <Icon name="check" size={14} /> Added!
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Icon name="tools" size={14} className="text-lime" /> Add to Cart
              </span>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
