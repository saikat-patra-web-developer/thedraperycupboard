import { useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useCart } from "../../hooks/useCart.js";
import Icon from "../ui/Icon.jsx";
import Arrow from "../ui/Arrow.jsx";
import Img from "../ui/Image.jsx";
import { EASE_PREMIUM } from "../motion/motionVariants.js";

const money = (val) => new Intl.NumberFormat("en-NZ", { style: "currency", currency: "NZD" }).format(val);

export default function CartNotificationToast() {
  const shouldReduceMotion = useReducedMotion();
  const { lastAddedItem, cartCount, subtotal, isDrawerOpen, dismissLastAddedItem } = useCart();

  useEffect(() => {
    if (!lastAddedItem || isDrawerOpen) return;

    const timer = setTimeout(() => {
      dismissLastAddedItem?.();
    }, 4500);

    return () => clearTimeout(timer);
  }, [lastAddedItem, isDrawerOpen, dismissLastAddedItem]);

  const showToast = Boolean(lastAddedItem && !isDrawerOpen);

  const handleOpenCart = (e) => {
    e.preventDefault();
    dismissLastAddedItem?.();
    window.location.assign("/cart");
  };

  const handleDismiss = () => {
    dismissLastAddedItem?.();
  };

  return (
    <AnimatePresence>
      {showToast && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24, scale: shouldReduceMotion ? 1 : 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 16, scale: shouldReduceMotion ? 1 : 0.96 }}
          transition={{ duration: 0.35, ease: EASE_PREMIUM }}
          className="fixed bottom-5 inset-x-4 sm:inset-x-auto sm:right-6 sm:max-w-md z-40 bg-forest text-white rounded-2xl p-3.5 sm:p-4 shadow-2xl border border-white/15 flex items-center justify-between gap-3 backdrop-blur-md"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="size-11 rounded-xl bg-white border border-white/20 p-1 flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
              {lastAddedItem.image ? (
                <Img
                  name={lastAddedItem.image}
                  alt={lastAddedItem.name}
                  sizes="44px"
                  className="size-full object-contain"
                />
              ) : (
                <Icon name="check" size={20} className="text-moss" />
              )}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate flex items-center gap-1.5">
                <span>Added to Cart!</span>
                <span className="size-1.5 rounded-full bg-lime" />
                <span className="text-lime text-[11px] font-semibold">
                  {cartCount} {cartCount === 1 ? "item" : "items"} ({money(subtotal)})
                </span>
              </div>
              <p className="text-[11px] text-neutral-300 truncate mt-0.5">
                {lastAddedItem.name}
                {lastAddedItem.variantLabel && lastAddedItem.variantLabel !== "Standard"
                  ? ` • ${lastAddedItem.variantLabel}`
                  : ""}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="/cart"
              onClick={handleOpenCart}
              className="btn !bg-lime hover:!bg-lime/90 !text-forest !min-h-8 !py-1 !px-3 text-xs font-bold rounded-lg shadow-sm flex items-center gap-1"
            >
              <span>View Cart</span>
              <Arrow />
            </a>
            <button
              type="button"
              onClick={handleDismiss}
              className="size-7 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 flex items-center justify-center transition"
              aria-label="Dismiss notification"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
