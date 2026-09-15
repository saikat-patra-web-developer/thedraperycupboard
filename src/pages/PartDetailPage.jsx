import { useState } from "react";
import { findPart, parts } from "../data/parts.js";
import { useCart } from "../hooks/useCart.js";
import Icon from "../components/ui/Icon.jsx";
import Arrow from "../components/ui/Arrow.jsx";
import NotFoundPage from "./NotFoundPage.jsx";
import PartCard from "../components/parts/PartCard.jsx";
import Cta from "../components/sections/CallToAction.jsx";
import { contact } from "../data/contact.js";

const money = (val) => new Intl.NumberFormat("en-NZ", { style: "currency", currency: "NZD" }).format(val);

export default function PartDetailPage({ id }) {
  const part = findPart(id);
  const { addItem, items, cartCount } = useCart();

  const [selectedVariant, setSelectedVariant] = useState(part?.variants ? part.variants[0] : null);
  const [selectedPack, setSelectedPack] = useState(part?.packOptions ? part.packOptions[0] : null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("specs");
  const [addedNotice, setAddedNotice] = useState(false);

  const variantKey = selectedVariant?.id || "default";
  const packKey = selectedPack?.id || "default";
  const currentCartItemId = `${part?.id}-${variantKey}-${packKey}`;
  const inCartItem = items.find((item) => item.cartItemId === currentCartItemId);
  const inCartQty = inCartItem ? inCartItem.quantity : 0;

  if (!part) return <NotFoundPage />;

  const currentPrice = Math.round(part.price * (selectedPack?.multiplier || 1) * 100) / 100;
  const totalPrice = Math.round(currentPrice * quantity * 100) / 100;

  const handleAddToCart = () => {
    addItem(part, quantity, selectedVariant, selectedPack, { openDrawer: false });
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3000);
  };

  const handleBuyNow = () => {
    addItem(part, quantity, selectedVariant, selectedPack, { openDrawer: false });
    window.location.assign("/checkout");
  };

  // Find related parts from same category or compatible items
  const relatedParts = parts
    .filter((p) => p.id !== part.id && (p.category === part.category || p.category === "safety"))
    .slice(0, 4);

  return (
    <>
      <section className="wrap py-7 md:py-10">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap gap-2 text-xs text-neutral-500">
          <a href="/" className="hover:text-forest">Home</a>
          <span>›</span>
          <a href="/parts" className="hover:text-forest">Blinds Parts</a>
          <span>›</span>
          <a href={`/parts?category=${part.category}`} className="hover:text-forest capitalize">
            {part.blindType}
          </a>
          <span>›</span>
          <span aria-current="page" className="text-forest font-semibold line-clamp-1 max-w-xs">
            {part.name}
          </span>
        </nav>

        {/* Product Hero Layout */}
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          {/* Left Column: Image and Visual Representation */}
          <div>
            <div className="relative overflow-hidden rounded-2xl border border-brand-line bg-gradient-to-br from-neutral-50 to-brand-50/70 p-8 sm:p-12 flex flex-col items-center justify-center min-h-[360px] sm:min-h-[420px]">
              <span className="absolute left-4 top-4 rounded-lg bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-wider text-moss shadow-xs">
                {part.blindType}
              </span>
              {part.badge && (
                <span className="absolute right-4 top-4 rounded-lg bg-forest px-3 py-1 text-xs font-semibold text-white shadow-xs">
                  {part.badge}
                </span>
              )}

              <div className="size-36 rounded-3xl bg-white shadow-md border border-brand-line flex items-center justify-center p-6 text-moss my-auto">
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
                  size={64}
                />
              </div>

              <div className="w-full mt-auto pt-6 border-t border-neutral-200/60 flex items-center justify-between text-xs text-neutral-600">
                <span className="font-mono">SKU: {part.sku}</span>
                <span className="flex items-center gap-1 text-moss font-semibold">
                  <Icon name="check" size={16} /> Genuine Replacement Part
                </span>
              </div>
            </div>

            {/* Satisfaction Guarantee Callout */}
            <div className="mt-4 rounded-xl border border-brand-line bg-brand-50/80 p-4 text-xs text-neutral-600 flex items-start gap-3">
              <Icon name="shield" size={20} className="text-moss shrink-0 mt-0.5" />
              <div>
                <strong className="text-forest font-semibold block">30-Day NZ Fit Guarantee</strong>
                If this part doesn't match your blind or mechanism, return it within 30 days for a prompt refund or replacement.
              </div>
            </div>
          </div>

          {/* Right Column: Buying Options & Actions */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
              <div className="flex text-amber-400">
                {"★".repeat(Math.floor(part.rating))}
                {part.rating % 1 !== 0 && "★"}
              </div>
              <span className="font-bold text-neutral-800">{part.rating}</span>
              <span>({part.reviewsCount} customer reviews)</span>
              <span>•</span>
              <span className="text-moss font-semibold">In Stock</span>
            </div>

            <h1 className="!text-3xl sm:!text-4xl font-serif text-forest font-normal leading-tight">
              {part.name}
            </h1>

            {/* Price Lockup */}
            <div className="mt-4 pb-5 border-b border-neutral-200 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-forest">{money(currentPrice)}</span>
              <span className="text-xs text-neutral-500">Incl. 15% NZ GST</span>
              {selectedPack?.multiplier > 1 && (
                <span className="rounded bg-lime/20 px-2 py-0.5 text-xs font-semibold text-moss">
                  Multi-pack value
                </span>
              )}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-brand-grey">
              {part.description}
            </p>

            {/* Variant / Option Selector */}
            {part.variants && part.variants.length > 0 && (
              <div className="mt-5 space-y-2">
                <label className="text-xs font-semibold text-neutral-700">
                  Select Option: <span className="font-bold text-forest">{selectedVariant?.label}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {part.variants.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      className={`px-3 py-2 text-xs rounded-lg border transition ${
                        selectedVariant?.id === v.id
                          ? "border-forest bg-forest text-white font-semibold shadow-xs"
                          : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400"
                      }`}
                    >
                      {v.hex && (
                        <span
                          className="inline-block size-3 rounded-full mr-1.5 border border-neutral-300 align-middle"
                          style={{ backgroundColor: v.hex }}
                        />
                      )}
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Pack Option Selector */}
            {part.packOptions && part.packOptions.length > 1 && (
              <div className="mt-5 space-y-2">
                <label className="text-xs font-semibold text-neutral-700">
                  Quantity Pack: <span className="font-bold text-forest">{selectedPack?.label}</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {part.packOptions.map((pkg) => (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedPack(pkg)}
                      className={`p-2.5 text-xs rounded-lg border text-left transition ${
                        selectedPack?.id === pkg.id
                          ? "border-moss bg-brand-50 text-forest font-semibold ring-1 ring-moss"
                          : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300"
                      }`}
                    >
                      <div className="font-bold">{pkg.label}</div>
                      <div className="text-[11px] text-neutral-500 mt-0.5">
                        {money(Math.round(part.price * pkg.multiplier * 100) / 100)} total
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper & Add to Cart */}
            <div className="mt-6 pt-6 border-t border-neutral-200 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                {/* Stepper */}
                <div className="flex items-center rounded-xl border border-neutral-300 bg-white shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-4 py-2.5 text-base font-bold text-neutral-600 hover:bg-neutral-100 active:scale-95 transition rounded-l-xl"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="w-12 text-center text-sm font-bold text-forest">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                    className="px-4 py-2.5 text-base font-bold text-neutral-600 hover:bg-neutral-100 active:scale-95 transition rounded-r-xl"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart / Add More button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="btn btn-dark flex-1 !min-h-12 text-sm font-semibold justify-center shadow-md hover:scale-[1.01] transition"
                >
                  <Icon name="tools" size={16} className="text-lime" />
                  <span>
                    {inCartQty > 0
                      ? `Add More (${quantity}) • ${money(totalPrice)}`
                      : `Add to Cart • ${money(totalPrice)}`}
                  </span>
                </button>
              </div>

              {/* View Cart Button (Direct to Proper Cart Page) */}
              {cartCount > 0 && (
                <a
                  href="/cart"
                  className="btn !bg-lime hover:!bg-lime/90 !text-forest w-full !min-h-11 text-xs font-bold justify-center shadow-xs hover:shadow transition flex items-center gap-2"
                >
                  <Icon name="check" size={16} className="text-forest" />
                  <span>View Cart ({cartCount} {cartCount === 1 ? "item" : "items"})</span>
                  <Arrow />
                </a>
              )}

              {/* Instant Buy Checkout Button */}
              <button
                type="button"
                onClick={handleBuyNow}
                className="btn btn-outline w-full !min-h-11 text-xs font-semibold justify-center shadow-xs"
              >
                Instant Buy & Checkout <Arrow />
              </button>

              {/* Cart Status & Notice Alert */}
              {addedNotice && (
                <div className="rounded-xl bg-lime/20 border border-lime p-3 text-center text-xs font-semibold text-moss animate-appear flex items-center justify-between gap-2">
                  <span>✓ Added {quantity} item(s) to your cart!</span>
                  <a
                    href="/cart"
                    className="underline font-bold text-forest hover:text-moss"
                  >
                    View Cart →
                  </a>
                </div>
              )}

              {inCartQty > 0 && !addedNotice && (
                <div className="rounded-xl bg-brand-50 border border-brand-line p-3 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="size-5 rounded-full bg-lime text-forest font-bold text-[10px] flex items-center justify-center">
                      ✓
                    </span>
                    <span className="text-forest font-medium">
                      <strong className="font-bold">{inCartQty}</strong> of this option currently in your cart.
                    </span>
                  </div>
                  <a
                    href="/cart"
                    className="text-xs font-bold text-moss hover:underline flex items-center gap-1 shrink-0"
                  >
                    View Cart <Arrow />
                  </a>
                </div>
              )}
            </div>

            {/* Delivery Details */}
            <div className="mt-6 rounded-xl border border-neutral-200 bg-neutral-50/60 p-4 space-y-2 text-xs text-neutral-600">
              <div className="flex items-center gap-2">
                <Icon name="truck" size={16} className="text-moss" />
                <span>
                  <strong>Fast NZ Courier Delivery:</strong> $8.50 flat rate nationwide.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="leaf" size={16} className="text-moss" />
                <span>
                  <strong>Free Shipping:</strong> Automatically applied on orders over $75 NZD.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="pin" size={16} className="text-moss" />
                <span>Dispatches from Auckland / Tuakau, New Zealand.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="mt-16">
          <div className="border-b border-neutral-200 flex gap-6" role="tablist">
            {[
              ["specs", "Specifications"],
              ["compatibility", "Compatibility & How to Measure"],
              ["features", "Key Features"],
            ].map(([id, label]) => (
              <button
                key={id}
                role="tab"
                aria-selected={activeTab === id}
                onClick={() => setActiveTab(id)}
                className={`pb-3 text-sm font-bold transition border-b-2 -mb-px ${
                  activeTab === id
                    ? "border-forest text-forest"
                    : "border-transparent text-neutral-400 hover:text-neutral-700"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="py-8">
            {activeTab === "specs" && (
              <div className="grid md:grid-cols-2 gap-6">
                <table className="w-full text-sm border-collapse">
                  <tbody>
                    {part.specifications.map(([key, val]) => (
                      <tr key={key} className="border-b border-neutral-100">
                        <td className="py-3 font-semibold text-forest w-1/3">{key}</td>
                        <td className="py-3 text-neutral-600">{val}</td>
                      </tr>
                    ))}
                    <tr className="border-b border-neutral-100">
                      <td className="py-3 font-semibold text-forest">SKU Reference</td>
                      <td className="py-3 font-mono text-neutral-600">{part.sku}</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold text-forest">Dispatch Location</td>
                      <td className="py-3 text-neutral-600">Tuakau, Waikato / Auckland, New Zealand</td>
                    </tr>
                  </tbody>
                </table>

                <div className="rounded-xl bg-brand-50 p-6">
                  <h3 className="!text-lg font-bold text-forest mb-3">Need Assistance with Sizing?</h3>
                  <p className="text-xs leading-relaxed text-brand-grey mb-4">
                    Send a quick photo of your broken part alongside a ruler or tape measure to our New Zealand team. We will confirm whether this part is a 100% exact match before you order.
                  </p>
                  <a href={contact.emailHref} className="btn btn-dark text-xs !py-2.5">
                    Email Photos for Confirmation <Arrow />
                  </a>
                </div>
              </div>
            )}

            {activeTab === "compatibility" && (
              <div className="space-y-4 text-sm text-neutral-700 max-w-3xl leading-relaxed">
                <h3 className="!text-xl font-bold text-forest">How to Verify Compatibility</h3>
                <p>{part.compatibilityNotes}</p>
                <div className="rounded-xl border border-brand-line bg-white p-5 space-y-3 mt-4">
                  <h4 className="font-bold text-forest text-sm">Step 1: Check your aluminium tube size</h4>
                  <p className="text-xs text-neutral-600">
                    Use a ruler or calliper across the open circular end of your aluminium roller or headrail profile. 38mm tubes measure roughly 1.5 inches across; 32mm tubes measure 1.25 inches across.
                  </p>
                  <h4 className="font-bold text-forest text-sm">Step 2: Inspect the internal tube splines</h4>
                  <p className="text-xs text-neutral-600">
                    Most standard tubes feature internal grooves/ribs that mate with the teeth on this replacement clutch.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "features" && (
              <div className="max-w-2xl">
                <ul className="space-y-3">
                  {part.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3 text-sm text-neutral-700">
                      <Icon name="check" size={18} className="text-moss shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Carousel / Grid */}
        {relatedParts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-neutral-200">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <span className="eyebrow">Frequently Bought Together</span>
                <h2 className="!text-2xl font-serif">Complementary Blinds Parts & Accessories</h2>
              </div>
              <a href="/parts" className="text-link text-xs shrink-0">
                View all parts <Arrow />
              </a>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedParts.map((p) => (
                <PartCard key={p.id} part={p} />
              ))}
            </div>
          </div>
        )}
      </section>

      <Cta />
    </>
  );
}
