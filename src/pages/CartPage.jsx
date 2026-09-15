import { useState } from "react";
import { useCart } from "../hooks/useCart.js";
import Icon from "../components/ui/Icon.jsx";
import Arrow from "../components/ui/Arrow.jsx";
import Img from "../components/ui/Image.jsx";
import Cta from "../components/sections/CallToAction.jsx";
import { parts } from "../data/parts.js";
import { contact } from "../data/contact.js";

const money = (val) => new Intl.NumberFormat("en-NZ", { style: "currency", currency: "NZD" }).format(val);

const PROMO_CODES = {
  WELCOME10: { code: "WELCOME10", discountPercent: 10, label: "10% Welcome Discount" },
  TRADENZ: { code: "TRADENZ", discountPercent: 15, label: "15% Trade & Commercial Discount" },
  DIYREPAIR: { code: "DIYREPAIR", discountPercent: 10, label: "10% DIY Repair Promo" },
};

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    freeShippingThreshold,
    amountUntilFreeShipping,
    addItem,
  } = useCart();

  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoMessage, setPromoMessage] = useState({ type: "", text: "" });
  const [confirmClear, setConfirmClear] = useState(false);

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  // Discounts & totals calculation
  const discountAmount = appliedPromo
    ? Math.round(subtotal * (appliedPromo.discountPercent / 100) * 100) / 100
    : 0;
  const discountedSubtotal = Math.max(0, Math.round((subtotal - discountAmount) * 100) / 100);
  const shippingCost = items.length === 0 ? 0 : subtotal >= freeShippingThreshold ? 0 : 8.5;
  const totalDue = Math.round((discountedSubtotal + shippingCost) * 100) / 100;
  const gstIncluded = Math.round(((totalDue * 3) / 23) * 100) / 100; // 15% NZ GST included

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const clean = promoInput.trim().toUpperCase();
    if (!clean) return;

    if (PROMO_CODES[clean]) {
      setAppliedPromo(PROMO_CODES[clean]);
      setPromoMessage({
        type: "success",
        text: `✓ Applied ${PROMO_CODES[clean].label} (${PROMO_CODES[clean].discountPercent}% off items)`,
      });
      setPromoInput("");
    } else {
      setPromoMessage({
        type: "error",
        text: "Invalid promo code. Try WELCOME10 for 10% off your order.",
      });
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoMessage({ type: "", text: "" });
  };

  // Recommended add-ons from catalog that are not currently in the cart
  const inCartIds = new Set(items.map((i) => i.id));
  const recommendedAddOns = parts
    .filter((p) => !inCartIds.has(p.id) && (p.category === "safety" || p.price < 15))
    .slice(0, 3);

  if (items.length === 0) {
    return (
      <section className="wrap py-16 md:py-24 text-center">
        <div className="max-w-lg mx-auto card p-8 sm:p-12 bg-white border border-brand-line shadow-sm">
          <div className="size-24 rounded-full bg-brand-50 border-2 border-brand-line/60 mx-auto flex items-center justify-center text-moss shadow-2xs">
            <Icon name="tools" size={42} />
          </div>
          <span className="eyebrow mt-5 text-moss">Your Cart</span>
          <h1 className="!text-3xl sm:!text-4xl font-serif text-forest mt-1">Your Cart is Empty</h1>
          <p className="mt-3 text-sm text-brand-grey leading-relaxed max-w-sm mx-auto">
            You don't have any blinds replacement parts, brackets, or repair hardware in your shopping cart yet.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <a href="/parts" className="btn btn-dark text-xs justify-center shadow-sm">
              <Icon name="tools" size={14} className="text-lime" />
              <span>Browse Blinds Parts</span>
              <Arrow />
            </a>
            <a href="/products" className="btn btn-outline text-xs justify-center">
              View Custom Blinds
            </a>
          </div>

          {/* Quick Categories Bar */}
          <div className="mt-10 pt-8 border-t border-neutral-100 text-left">
            <span className="text-xs font-bold text-forest uppercase tracking-wider block mb-3 text-center sm:text-left">
              Popular Parts Categories
            </span>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
              <a href="/parts" className="px-3 py-1.5 rounded-lg bg-neutral-50 hover:bg-brand-50 border border-neutral-200 text-xs font-semibold text-neutral-700 transition">
                Roller Blinds Hardware
              </a>
              <a href="/parts" className="px-3 py-1.5 rounded-lg bg-neutral-50 hover:bg-brand-50 border border-neutral-200 text-xs font-semibold text-neutral-700 transition">
                Venetian Tilters & Locks
              </a>
              <a href="/parts" className="px-3 py-1.5 rounded-lg bg-neutral-50 hover:bg-brand-50 border border-neutral-200 text-xs font-semibold text-neutral-700 transition">
                Vertical Carriers & Chains
              </a>
              <a href="/parts" className="px-3 py-1.5 rounded-lg bg-neutral-50 hover:bg-brand-50 border border-neutral-200 text-xs font-semibold text-neutral-700 transition">
                Curtain Hooks & Gliders
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="wrap py-8 sm:py-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-xs text-neutral-500">
          <a href="/" className="hover:text-forest transition">Home</a>
          <span>›</span>
          <a href="/parts" className="hover:text-forest transition">Blinds Parts & Hardware</a>
          <span>›</span>
          <span aria-current="page" className="text-forest font-semibold">Shopping Cart</span>
        </nav>

        {/* Checkout Steps Progress Stepper */}
        <div className="mb-8 rounded-2xl border border-brand-line bg-white p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between max-w-2xl mx-auto text-xs font-semibold">
            <div className="flex items-center gap-2 text-forest">
              <span className="size-6 rounded-full bg-forest text-lime font-bold flex items-center justify-center text-[11px] shadow-2xs">
                1
              </span>
              <span className="font-bold">Shopping Cart</span>
            </div>

            <div className="h-0.5 flex-1 mx-3 bg-neutral-200 hidden sm:block" />

            <div className="flex items-center gap-2 text-neutral-400">
              <span className="size-6 rounded-full bg-neutral-100 border border-neutral-300 font-bold flex items-center justify-center text-[11px]">
                2
              </span>
              <span className="hidden sm:inline">Delivery & Details</span>
            </div>

            <div className="h-0.5 flex-1 mx-3 bg-neutral-200 hidden sm:block" />

            <div className="flex items-center gap-2 text-neutral-400">
              <span className="size-6 rounded-full bg-neutral-100 border border-neutral-300 font-bold flex items-center justify-center text-[11px]">
                3
              </span>
              <span className="hidden sm:inline">Confirmation</span>
            </div>
          </div>
        </div>

        {/* Page Title & Item Count */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-6">
          <h1 className="!text-3xl sm:!text-4xl font-serif text-forest">Shopping Cart</h1>
          <span className="text-xs text-neutral-500 font-medium">
            You have <strong className="text-forest font-bold">{items.reduce((s, i) => s + i.quantity, 0)}</strong> item(s) ready for dispatch
          </span>
        </div>

        {/* Interactive Free Shipping Indicator */}
        <div className="mb-8 rounded-2xl border border-brand-line bg-brand-50/80 p-4 sm:p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-semibold text-forest">
            <span className="flex items-center gap-2">
              <Icon name="truck" size={18} className="text-moss shrink-0" />
              {amountUntilFreeShipping > 0 ? (
                <span>
                  Add <strong className="text-moss font-bold">{money(amountUntilFreeShipping)}</strong> more to your order to unlock{" "}
                  <strong className="text-forest font-bold">FREE Tracked NZ Courier Delivery!</strong>
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-moss font-bold">
                  <Icon name="check" size={16} className="text-moss" />
                  Congratulations! You qualify for FREE Nationwide Delivery across New Zealand!
                </span>
              )}
            </span>
            <span className="text-neutral-500 font-medium">{progressPercent}% to Free Shipping</span>
          </div>

          <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-neutral-200">
            <div
              className="h-full bg-lime transition-all duration-500 shadow-xs"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Main Grid: Cart Items on Left + Sticky Summary on Right */}
        <div className="grid gap-8 lg:grid-cols-[1fr_390px] items-start">
          {/* Left Column: Cart Items List */}
          <div className="space-y-4">
            <div className="card overflow-hidden bg-white border border-brand-line shadow-xs">
              {/* Desktop Table Header */}
              <div className="hidden md:grid grid-cols-[1fr_110px_130px_110px_44px] gap-4 bg-neutral-50 px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider text-neutral-500 border-b border-neutral-200">
                <span>Product & Specification</span>
                <span className="text-center">Unit Price</span>
                <span className="text-center">Quantity</span>
                <span className="text-right">Total</span>
                <span className="text-center">Remove</span>
              </div>

              {/* Items Rows */}
              <div className="divide-y divide-neutral-100">
                {items.map((item) => {
                  const lineTotal = Math.round(item.unitPrice * item.quantity * 100) / 100;
                  return (
                    <div
                      key={item.cartItemId}
                      className="p-5 sm:p-6 flex flex-col md:grid md:grid-cols-[1fr_110px_130px_110px_44px] md:items-center gap-4 transition hover:bg-neutral-50/50"
                    >
                      {/* Product Thumbnail & Details */}
                      <div className="flex items-start gap-4 min-w-0">
                        {/* Thumbnail Box with Real WebP Image */}
                        <a
                          href={`/product/${item.slug}`}
                          className="size-20 shrink-0 rounded-xl bg-white border border-neutral-200 flex items-center justify-center p-1.5 shadow-2xs overflow-hidden hover:border-moss transition"
                          title={`View ${item.name}`}
                        >
                          {item.image || item.id ? (
                            <Img
                              name={item.image || item.id}
                              alt={item.name}
                              sizes="80px"
                              className="size-full object-contain"
                            />
                          ) : (
                            <Icon name="tools" size={28} className="text-moss" />
                          )}
                        </a>

                        {/* Title, SKU & Variant Information */}
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-moss bg-brand-50 px-2 py-0.5 rounded border border-brand-line">
                            {item.blindType || "Blinds Hardware"}
                          </span>

                          <h3 className="!text-base font-bold text-forest mt-1 hover:text-moss transition">
                            <a href={`/product/${item.slug}`}>{item.name}</a>
                          </h3>

                          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-neutral-500">
                            <span className="font-mono text-[11px] bg-neutral-100 px-1.5 py-0.5 rounded text-neutral-700">
                              SKU: {item.sku}
                            </span>
                            {item.variantLabel && item.variantLabel !== "Standard" && (
                              <span className="text-neutral-700 font-medium">
                                Option: <strong>{item.variantLabel}</strong>
                              </span>
                            )}
                            <a
                              href={`/product/${item.slug}`}
                              className="text-[11px] font-semibold text-moss hover:text-forest inline-flex items-center gap-1 transition underline"
                            >
                              View Product <Arrow />
                            </a>
                          </div>

                          <div className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-moss">
                            <span className="size-1.5 rounded-full bg-lime animate-pulse" />
                            <span>In Stock — Dispatches Next Business Day</span>
                          </div>
                        </div>
                      </div>

                      {/* Unit Price */}
                      <div className="md:text-center text-xs text-neutral-600 font-medium">
                        <span className="md:hidden font-bold text-neutral-700 mr-1">Unit Price:</span>
                        <span className="font-bold md:font-medium text-forest md:text-neutral-700">
                          {money(item.unitPrice)}
                        </span>
                      </div>

                      {/* Quantity Stepper ("Increase Items System") */}
                      <div className="flex md:justify-center items-center gap-2">
                        <span className="md:hidden font-bold text-xs text-neutral-700 mr-1">Quantity:</span>
                        <div className="flex items-center rounded-xl border border-neutral-300 bg-white shadow-2xs">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                            className="px-3 py-1.5 text-sm font-bold text-forest hover:bg-neutral-100 active:scale-90 transition rounded-l-xl"
                            aria-label={`Decrease quantity of ${item.name}`}
                            title="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="w-10 text-center text-xs font-bold text-forest">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                            className="px-3 py-1.5 text-sm font-bold text-forest hover:bg-neutral-100 active:scale-90 transition rounded-r-xl"
                            aria-label={`Increase quantity of ${item.name}`}
                            title="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Line Item Total */}
                      <div className="md:text-right text-base font-bold text-forest">
                        <span className="md:hidden text-xs text-neutral-500 font-normal mr-1">Item Total: </span>
                        {money(lineTotal)}
                      </div>

                      {/* Remove Button */}
                      <div className="flex md:justify-center">
                        <button
                          type="button"
                          onClick={() => removeItem(item.cartItemId)}
                          className="size-8 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition"
                          aria-label={`Remove ${item.name} from cart`}
                          title="Remove item"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Actions of Table */}
              <div className="p-4 sm:p-5 bg-neutral-50/80 border-t border-neutral-200 flex flex-wrap justify-between items-center gap-3 text-xs">
                <a href="/parts" className="btn btn-outline !min-h-9 !py-1.5 !px-3.5 text-xs font-semibold">
                  ← Continue Shopping for Parts
                </a>

                {confirmClear ? (
                  <div className="flex items-center gap-2">
                    <span className="text-red-600 font-semibold">Are you sure?</span>
                    <button
                      type="button"
                      onClick={() => {
                        clearCart();
                        setConfirmClear(false);
                      }}
                      className="px-2.5 py-1 rounded bg-red-600 text-white font-bold text-xs hover:bg-red-700 transition"
                    >
                      Yes, Clear All
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmClear(false)}
                      className="px-2.5 py-1 rounded bg-neutral-200 text-neutral-700 font-semibold text-xs hover:bg-neutral-300 transition"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmClear(true)}
                    className="text-neutral-500 hover:text-red-600 underline font-medium transition"
                  >
                    Clear Entire Cart
                  </button>
                )}
              </div>
            </div>

            {/* Recommended Add-Ons & Essential Accessories */}
            {recommendedAddOns.length > 0 && (
              <div className="card bg-white p-5 sm:p-6 border border-brand-line shadow-xs">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Icon name="spark" size={18} className="text-moss" />
                    <h3 className="!text-sm font-bold text-forest uppercase tracking-wider m-0">
                      Frequently Bought Together
                    </h3>
                  </div>
                  <span className="text-[11px] text-neutral-500 hidden sm:inline">Add with 1-click</span>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {recommendedAddOns.map((rec) => (
                    <div
                      key={rec.id}
                      className="rounded-xl border border-neutral-200 p-3.5 bg-neutral-50/50 flex flex-col justify-between hover:border-brand-line transition"
                    >
                      <div>
                        <span className="text-[10px] font-bold text-moss uppercase">{rec.blindType}</span>
                        <h4 className="text-xs font-bold text-forest line-clamp-2 mt-0.5">
                          <a href={`/parts/${rec.slug}`} className="hover:text-moss">
                            {rec.name}
                          </a>
                        </h4>
                        <div className="text-xs font-bold text-forest mt-1.5">{money(rec.price)}</div>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          addItem(rec, 1, rec.variants?.[0] || null, rec.packOptions?.[0] || null, {
                            openDrawer: false,
                          })
                        }
                        className="btn btn-dark !min-h-8 !py-1 !px-2.5 text-[11px] font-semibold w-full mt-3 justify-center"
                      >
                        + Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Order Summary (Sticky on Desktop) */}
          <div className="space-y-4 lg:sticky lg:top-8">
            <div className="card bg-white p-6 border border-brand-line shadow-md space-y-5">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <h3 className="!text-xl font-serif text-forest m-0">Order Summary</h3>
                <span className="text-xs font-bold text-moss bg-brand-50 px-2 py-0.5 rounded-full border border-brand-line">
                  {items.reduce((sum, item) => sum + item.quantity, 0)} Items
                </span>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 text-xs text-neutral-600">
                <div className="flex justify-between">
                  <span>Items Subtotal</span>
                  <span className="font-bold text-forest">{money(subtotal)}</span>
                </div>

                {/* Promo Code Discount Line (If Applied) */}
                {appliedPromo && (
                  <div className="flex justify-between text-moss font-semibold bg-lime/10 p-2 rounded-lg border border-lime/30">
                    <span className="flex items-center gap-1">
                      <Icon name="check" size={14} />
                      {appliedPromo.label} ({appliedPromo.discountPercent}% off)
                    </span>
                    <span>-{money(discountAmount)}</span>
                  </div>
                )}

                {/* Shipping Calculation */}
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">Tracked NZ Courier</span>
                    <span className="block text-[10px] text-neutral-400">Standard delivery nationwide</span>
                  </div>
                  <span className="font-bold">
                    {shippingCost === 0 ? (
                      <span className="rounded-md bg-lime/20 border border-lime/40 px-2 py-0.5 font-bold text-moss">
                        FREE
                      </span>
                    ) : (
                      money(shippingCost)
                    )}
                  </span>
                </div>

                {/* GST Notice */}
                <div className="flex justify-between text-[11px] text-neutral-400 pt-1">
                  <span>Included 15% NZ GST</span>
                  <span>{money(gstIncluded)}</span>
                </div>

                {/* Total Line */}
                <div className="pt-4 border-t border-neutral-200 flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-bold text-forest block">Estimated Total</span>
                    <span className="text-[10px] text-neutral-400">All prices in New Zealand Dollars (NZD)</span>
                  </div>
                  <span className="text-2xl font-bold text-forest">{money(totalDue)}</span>
                </div>
              </div>

              {/* Promo Code Voucher Box */}
              <div className="pt-3 border-t border-neutral-100">
                {appliedPromo ? (
                  <div className="flex items-center justify-between text-xs bg-brand-50 p-2.5 rounded-lg border border-brand-line">
                    <span className="font-bold text-moss">{appliedPromo.code} Applied</span>
                    <button
                      type="button"
                      onClick={handleRemovePromo}
                      className="text-neutral-400 hover:text-red-600 font-bold ml-2"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="space-y-2">
                    <label htmlFor="promoCode" className="text-[11px] font-bold text-neutral-600 block">
                      Have a Promo or Trade Code?
                    </label>
                    <div className="flex items-center rounded-xl border border-neutral-300 bg-white p-1 focus-within:border-forest focus-within:ring-1 focus-within:ring-forest transition shadow-2xs">
                      <input
                        id="promoCode"
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="e.g. WELCOME10"
                        className="flex-1 bg-transparent px-3 py-1.5 text-xs font-semibold text-forest uppercase placeholder:normal-case placeholder:font-normal placeholder:text-neutral-400 focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="rounded-lg bg-forest px-4 py-2 text-xs font-bold text-white hover:bg-moss active:scale-95 transition shrink-0 shadow-2xs"
                      >
                        Apply
                      </button>
                    </div>
                  </form>
                )}

                {promoMessage.text && (
                  <p
                    className={`mt-2 text-[11px] font-semibold ${
                      promoMessage.type === "success" ? "text-moss" : "text-red-600"
                    }`}
                  >
                    {promoMessage.text}
                  </p>
                )}
              </div>

              {/* Proceed to Checkout Action */}
              <a
                href="/checkout"
                className="btn btn-dark !w-full !min-h-13 !py-3.5 font-bold text-sm !inline-flex items-center justify-center gap-2.5 shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all"
              >
                <span>Proceed to Checkout</span>
                <Arrow />
              </a>

              {/* Security & Service Guarantee Badges */}
              <div className="pt-3 border-t border-neutral-100 space-y-2 text-[11px] text-neutral-600">
                <div className="flex items-center gap-2.5">
                  <Icon name="truck" size={16} className="text-moss shrink-0" />
                  <span>
                    <strong>Fast Courier Dispatch:</strong> Dispatches next business day from Auckland.
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Icon name="shield" size={16} className="text-moss shrink-0" />
                  <span>
                    <strong>30-Day Fit Guarantee:</strong> Hassle-free exchange if the part doesn't fit.
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Icon name="check" size={16} className="text-moss shrink-0" />
                  <span>
                    <strong>100% NZ Owned:</strong> Locally stocked in New Zealand.
                  </span>
                </div>
              </div>
            </div>

            {/* Need Help Photo Identification Card */}
            <div className="card bg-brand-50/60 p-5 border border-brand-line text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-forest">
                <Icon name="tools" size={16} className="text-moss" />
                <span>Not Sure If This Part Fits?</span>
              </div>
              <p className="text-neutral-600 text-[11px] leading-relaxed">
                Take a photo of your existing blind bracket, chain, or motor mechanism and email it to our team. We'll identify the exact match for you.
              </p>
              <div className="pt-2 flex flex-col gap-1 text-[11px] font-semibold text-moss">
                <a href={`tel:${contact.phoneRaw}`} className="hover:underline flex items-center gap-1.5">
                  <Icon name="phone" size={12} /> {contact.phone}
                </a>
                <a href={`mailto:${contact.email}`} className="hover:underline flex items-center gap-1.5">
                  <Icon name="mail" size={12} /> {contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
