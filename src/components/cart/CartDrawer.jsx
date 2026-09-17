import { useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useCart } from "../../hooks/useCart.js";
import Arrow from "../ui/Arrow.jsx";
import Icon from "../ui/Icon.jsx";
import Img from "../ui/Image.jsx";
import { EASE_PREMIUM } from "../motion/motionVariants.js";

const money = (val) => new Intl.NumberFormat("en-NZ", { style: "currency", currency: "NZD" }).format(val);

export default function CartDrawer() {
  const shouldReduceMotion = useReducedMotion();
  const {
    items,
    removeItem,
    updateQuantity,
    cartCount,
    subtotal,
    discountAmount,
    appliedPromo,
    shipping,
    total,
    gst,
    freeShippingThreshold,
    amountUntilFreeShipping,
    isDrawerOpen,
    closeDrawer,
  } = useCart();

  useEffect(() => {
    if (!isDrawerOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeDrawer();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isDrawerOpen, closeDrawer]);

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label="Shopping Cart">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={closeDrawer}
            aria-hidden="true"
          />

          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none">
            <motion.aside
              initial={{ x: shouldReduceMotion ? 0 : "100%", opacity: shouldReduceMotion ? 0 : 1 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: shouldReduceMotion ? 0 : "100%", opacity: shouldReduceMotion ? 0 : 1 }}
              transition={{ duration: shouldReduceMotion ? 0.2 : 0.4, ease: EASE_PREMIUM }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col pointer-events-auto"
            >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4 bg-brand-50">
            <div className="flex items-center gap-2.5">
              <Icon name="tools" size={20} className="text-moss" />
              <h2 className="!text-lg font-bold text-forest m-0">Your Cart</h2>
              <span className="rounded-full bg-forest px-2 py-0.5 text-xs font-semibold text-white">
                {cartCount} {cartCount === 1 ? "item" : "items"}
              </span>
            </div>
            <button
              onClick={closeDrawer}
              className="rounded-full p-2 text-neutral-500 hover:bg-neutral-200 hover:text-forest transition"
              aria-label="Close cart"
            >
              <svg className="size-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="border-b border-brand-line bg-brand-50/70 px-6 py-3">
            <div className="flex items-center justify-between text-xs font-medium">
              {amountUntilFreeShipping > 0 ? (
                <span>
                  Add <strong className="text-forest">{money(amountUntilFreeShipping)}</strong> for{" "}
                  <strong className="text-moss">FREE NZ Courier Delivery</strong>
                </span>
              ) : (
                <span className="flex items-center gap-1.5 font-bold text-moss">
                  <Icon name="check" size={16} className="text-moss" />
                  You've unlocked FREE Nationwide Delivery!
                </span>
              )}
              <span className="text-neutral-500">{progressPercent}%</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-neutral-200">
              <div
                className="h-full bg-lime transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-neutral-100">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center py-12">
                <div className="rounded-full bg-brand-100 p-5 text-moss">
                  <Icon name="tools" size={36} />
                </div>
                <h3 className="mt-4 !text-xl font-bold text-forest">Your cart is empty</h3>
                <p className="mt-2 text-sm text-neutral-500 max-w-xs">
                  Looking for replacement clutches, chains, brackets, wands or curtain gliders?
                </p>
                <a
                  href="/parts"
                  onClick={closeDrawer}
                  className="btn btn-dark mt-6 text-xs !py-2.5 !px-5"
                >
                  Browse Blinds Parts <Arrow />
                </a>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.cartItemId} className="py-4 flex gap-4 items-start">
                  <a
                    href={`/product/${item.slug}`}
                    onClick={closeDrawer}
                    className="size-16 shrink-0 rounded-lg bg-white border border-neutral-200 flex items-center justify-center p-1 shadow-2xs overflow-hidden hover:border-moss transition"
                    title={`View ${item.name}`}
                  >
                    {item.image || item.id ? (
                      <Img
                        name={item.image || item.id}
                        alt={item.name}
                        sizes="64px"
                        className="size-full object-contain"
                      />
                    ) : (
                      <Icon name="tools" size={24} className="text-moss" />
                    )}
                  </a>
                  <div className="flex-1 min-w-0">
                    <a
                      href={`/product/${item.slug}`}
                      onClick={closeDrawer}
                      className="text-sm font-semibold text-forest hover:text-moss line-clamp-1 block"
                    >
                      {item.name}
                    </a>
                    <div className="flex items-center justify-between gap-2 mt-0.5 text-xs text-neutral-500">
                      <span>
                        SKU: <span className="font-mono">{item.sku}</span>
                        {item.variantLabel && item.variantLabel !== "Standard" && (
                          <> • <span className="text-neutral-700 font-medium">{item.variantLabel}</span></>
                        )}
                      </span>
                      <a
                        href={`/product/${item.slug}`}
                        onClick={closeDrawer}
                        className="text-[11px] text-moss hover:underline font-semibold shrink-0"
                      >
                        View Product →
                      </a>
                    </div>
                    <div className="mt-2.5 flex items-center justify-between">
                      {/* Quantity Stepper */}
                      <div className="flex items-center rounded-md border border-neutral-300 bg-white">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="px-2.5 py-1 text-xs text-neutral-600 hover:bg-neutral-100 transition"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-xs font-semibold">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="px-2.5 py-1 text-xs text-neutral-600 hover:bg-neutral-100 transition"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-forest">
                          {money(item.unitPrice * item.quantity)}
                        </span>
                        {item.quantity > 1 && (
                          <span className="block text-[10px] text-neutral-400">
                            {money(item.unitPrice)} each
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.cartItemId)}
                    className="text-neutral-400 hover:text-red-600 p-1 transition"
                    title="Remove item"
                    aria-label={`Remove ${item.name}`}
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer with Checkout Actions */}
          {items.length > 0 && (
            <div className="border-t border-neutral-200 bg-neutral-50 p-6 space-y-3">
              <div className="space-y-1.5 text-xs text-neutral-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-forest">{money(subtotal)}</span>
                </div>
                {appliedPromo && discountAmount > 0 && (
                  <div className="flex justify-between text-moss font-semibold">
                    <span>Discount ({appliedPromo.code}):</span>
                    <span>-{money(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Tracked NZ Courier</span>
                  <span className="font-semibold text-forest">
                    {shipping === 0 ? <strong className="text-moss">FREE</strong> : money(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-neutral-400">
                  <span>Includes 15% NZ GST</span>
                  <span>{money(gst)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-forest pt-2 border-t border-neutral-200">
                  <span>Estimated Total</span>
                  <span>{money(total)}</span>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <a
                  href="/cart"
                  onClick={closeDrawer}
                  className="btn !bg-lime hover:!bg-lime/90 !text-forest w-full !min-h-11 font-bold text-xs shadow-xs flex items-center justify-center gap-2"
                >
                  <Icon name="tools" size={15} className="text-forest" />
                  <span>View Full Cart Page</span>
                  <Arrow />
                </a>
                <a
                  href="/checkout"
                  onClick={closeDrawer}
                  className="btn btn-dark w-full !min-h-11 font-bold text-xs shadow-md flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <Arrow />
                </a>
              </div>

              <div className="pt-2 flex items-center justify-center gap-4 text-[10px] text-neutral-400 uppercase tracking-wider">
                <span className="flex items-center gap-1">
                  <Icon name="truck" size={13} className="text-moss" /> Fast Dispatch
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Icon name="shield" size={13} className="text-moss" /> 30-Day Guarantee
                </span>
              </div>
            </div>
          )}
        </motion.aside>
      </div>
    </div>
  )}
</AnimatePresence>
  );
}
