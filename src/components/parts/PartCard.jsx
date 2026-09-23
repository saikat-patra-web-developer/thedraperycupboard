import { useState } from "react";
import { useCart } from "../../hooks/useCart.js";
import Icon from "../ui/Icon.jsx";
import Arrow from "../ui/Arrow.jsx";
import Img from "../ui/Image.jsx";

const money = (val) => new Intl.NumberFormat("en-NZ", { style: "currency", currency: "NZD" }).format(val);

export default function PartCard({ part }) {
  const { items, addItem, updateQuantity } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(part.variants ? part.variants[0] : null);
  const selectedPack = part.packOptions ? part.packOptions[0] : null;
  const [addedAnimation, setAddedAnimation] = useState(false);

  const price = Math.round(part.price * (selectedPack?.multiplier || 1) * 100) / 100;
  const variantKey = selectedVariant?.id || "default";
  const packKey = selectedPack?.id || "default";
  const cartItemId = `${part.id}-${variantKey}-${packKey}`;

  const inCartItem = items.find((item) => item.cartItemId === cartItemId);
  const inCartQty = inCartItem ? inCartItem.quantity : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(part, 1, selectedVariant, selectedPack, { openDrawer: false });
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleIncrease = (e) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(cartItemId, inCartQty + 1);
  };

  const handleDecrease = (e) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(cartItemId, inCartQty - 1);
  };

  const handleViewCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.assign("/cart");
  };

  return (
    <article
      className={`card group flex flex-col h-full bg-white transition-all duration-200 border ${
        inCartQty > 0
          ? "border-lime shadow-md ring-1 ring-lime/40"
          : "border-brand-line hover:shadow-lg"
      }`}
    >
      {/* Visual Header / Product WebP Image Box */}
      <div className="relative aspect-[1.25] w-full bg-gradient-to-br from-neutral-50 via-white to-brand-50/60 p-4 flex flex-col justify-between overflow-hidden border-b border-neutral-100">
        <div className="flex items-center justify-between gap-2 z-10">
          <span className="rounded-md bg-white/90 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-moss shadow-2xs border border-brand-line/40">
            {part.blindType}
          </span>
          {inCartQty > 0 ? (
            <span className="rounded-md bg-lime/90 border border-moss/20 px-2.5 py-0.8 text-[11px] font-bold text-forest shadow-2xs flex items-center gap-1">
              <Icon name="check" size={12} className="text-moss" /> {inCartQty} in cart
            </span>
          ) : part.badge ? (
            <span className="rounded-md bg-forest px-2.5 py-1 text-[11px] font-semibold text-white shadow-2xs">
              {part.badge}
            </span>
          ) : null}
        </div>

        {/* Real Product WebP Image Display */}
        <a
          href={`/online-shop/${part.slug}`}
          className="my-auto flex items-center justify-center p-2 transition-transform duration-300 group-hover:scale-105"
          title={`View ${part.name}`}
        >
          {part.image ? (
            <Img
              name={part.image}
              alt={part.name}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="max-h-40 w-full object-contain drop-shadow-sm"
            />
          ) : (
            <div className="size-20 rounded-2xl bg-white/80 shadow-xs border border-brand-line/60 flex items-center justify-center p-3 text-moss group-hover:border-forest group-hover:shadow-sm transition">
              <Icon name="tools" size={36} />
            </div>
          )}
        </a>

        <div className="flex items-center justify-between text-[11px] text-neutral-500 z-10 pt-1">
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
          <a href={`/online-shop/${part.slug}`}>{part.name}</a>
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
        {inCartQty === 0 ? (
          <div className="mt-auto pt-4 border-t border-neutral-100">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div>
                <div className="text-xl font-bold text-forest">{money(price)}</div>
                <div className="text-[10px] text-neutral-500">Incl. 15% NZ GST</div>
              </div>
              <span className="text-[11px] text-moss font-semibold flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-lime animate-pulse" />
                In Stock
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={`/product/${part.slug}`}
                className="btn btn-outline !min-h-10 !px-2 !py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1 hover:border-forest transition-all"
              >
                <span>View Product</span>
                <Arrow />
              </a>

              <button
                type="button"
                onClick={handleAddToCart}
                className={`btn !min-h-10 !px-2 !py-2 text-xs font-semibold rounded-lg justify-center transition-all ${
                  addedAnimation ? "!bg-moss !text-white scale-105" : "btn-dark"
                }`}
              >
                {addedAnimation ? (
                  <span className="flex items-center gap-1">
                    <Icon name="check" size={13} /> Added!
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <Icon name="tools" size={13} className="text-lime" /> Add to Cart
                  </span>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-auto pt-3 border-t border-brand-line/60 bg-brand-50/60 -mx-5 -mb-5 p-4 rounded-b-2xl animate-appear">
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <div>
                <div className="text-base font-bold text-forest leading-tight">
                  {money(price * inCartQty)}
                </div>
                <div className="text-[11px] text-neutral-500 font-medium">
                  {money(price)} each • <span className="text-moss font-bold">{inCartQty} in cart</span>
                </div>
              </div>

              {/* Increase Items System (Stepper) */}
              <div className="flex items-center rounded-lg border border-brand-line bg-white shadow-2xs p-0.5">
                <button
                  type="button"
                  onClick={handleDecrease}
                  className="size-7 rounded-md text-forest font-bold text-base hover:bg-neutral-100 active:scale-90 flex items-center justify-center transition"
                  aria-label="Decrease quantity"
                  title="Decrease quantity"
                >
                  −
                </button>
                <span className="min-w-8 text-center text-xs font-bold text-forest">
                  {inCartQty}
                </span>
                <button
                  type="button"
                  onClick={handleIncrease}
                  className="size-7 rounded-md bg-forest text-white font-bold text-base hover:bg-moss active:scale-90 flex items-center justify-center transition"
                  aria-label="Increase quantity"
                  title="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons: View Cart + View Product */}
            <div className="grid grid-cols-2 gap-2">
              <a
                href="/cart"
                onClick={handleViewCart}
                className="btn !bg-lime hover:!bg-lime/90 !text-forest !min-h-9 !py-1.5 !px-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1 shadow-xs hover:shadow transition-all"
              >
                <Icon name="check" size={13} className="text-forest" />
                <span>View Cart ({inCartQty})</span>
              </a>

              <a
                href={`/product/${part.slug}`}
                className="btn btn-outline bg-white hover:border-forest !min-h-9 !py-1.5 !px-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1 transition-all"
              >
                <span>View Product</span>
                <Arrow />
              </a>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
