import { useState, useEffect } from "react";
import { CartContext } from "./cartContextDef.js";
import { validatePromoCode } from "../data/promoCodes.js";

const STORAGE_KEY_ITEMS = "tdc_ecommerce_cart";
const STORAGE_KEY_PROMO = "tdc_ecommerce_promo";
const FREE_SHIPPING_THRESHOLD = 75.0;
const STANDARD_SHIPPING_COST = 8.5;

export function CartProvider({ children }) {
  // 1. Items State
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ITEMS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 2. Applied Promo State (Persisted across Cart and Checkout)
  const [appliedPromo, setAppliedPromo] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROMO);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState(null);

  // Sync Items to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(items));
    } catch (e) {
      console.warn("Could not persist cart to localStorage:", e);
    }
  }, [items]);

  // Sync Promo to localStorage
  useEffect(() => {
    try {
      if (appliedPromo) {
        localStorage.setItem(STORAGE_KEY_PROMO, JSON.stringify(appliedPromo));
      } else {
        localStorage.removeItem(STORAGE_KEY_PROMO);
      }
    } catch {}
  }, [appliedPromo]);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  // Add Item to Cart
  const addItem = (
    part,
    quantity = 1,
    variant = null,
    packOption = null,
    options = {}
  ) => {
    const { openDrawer = false } = options;
    const multiplier = packOption?.multiplier || 1;
    const unitPrice = Math.round(part.price * multiplier * 100) / 100;
    const variantKey = variant?.id || "default";
    const packKey = packOption?.id || "default";
    const cartItemId = `${part.id}-${variantKey}-${packKey}`;

    const variantLabel = [
      variant?.label || variant?.name || "",
      packOption?.label || "",
    ]
      .filter(Boolean)
      .join(" • ");

    const finalImage = part.image || part.id;

    setItems((current) => {
      const existingIndex = current.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...current];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: Math.min(99, updated[existingIndex].quantity + quantity),
        };
        return updated;
      }
      return [
        ...current,
        {
          cartItemId,
          id: part.id,
          slug: part.slug,
          name: part.name,
          sku: part.sku,
          category: part.category,
          blindType: part.blindType,
          unitPrice,
          quantity: Math.min(99, Math.max(1, quantity)),
          variant: variant ? { id: variant.id, label: variant.label, hex: variant.hex } : null,
          packOption: packOption ? { id: packOption.id, label: packOption.label } : null,
          variantLabel: variantLabel || "Standard",
          image: finalImage,
        },
      ];
    });

    setLastAddedItem({
      ...part,
      image: finalImage,
      variantLabel,
      quantity,
      timestamp: Date.now(),
    });

    if (openDrawer) {
      setIsDrawerOpen(true);
    }
  };

  const dismissLastAddedItem = () => setLastAddedItem(null);

  const getItemQuantity = (partId, variantId = null, packId = null) => {
    const vKey = variantId || "default";
    const pKey = packId || "default";
    const targetId = `${partId}-${vKey}-${pKey}`;
    const item = items.find((i) => i.cartItemId === targetId);
    return item ? item.quantity : 0;
  };

  const updateQuantity = (cartItemId, newQty) => {
    const qty = Number(newQty);
    if (!Number.isFinite(qty) || qty <= 0) {
      removeItem(cartItemId);
      return;
    }
    setItems((current) =>
      current.map((item) =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: Math.min(99, Math.max(1, qty)) }
          : item
      )
    );
  };

  const removeItem = (cartItemId) => {
    setItems((current) => current.filter((item) => item.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setItems([]);
    setAppliedPromo(null);
    try {
      localStorage.removeItem(STORAGE_KEY_ITEMS);
      localStorage.removeItem(STORAGE_KEY_PROMO);
    } catch {}
  };

  // Promo Code Actions
  const applyPromo = (codeString) => {
    const result = validatePromoCode(codeString, subtotal);
    if (result.valid) {
      setAppliedPromo(result.promo);
      return { success: true, message: `✓ Applied ${result.promo.label}` };
    }
    return { success: false, message: result.error };
  };

  const removePromo = () => {
    setAppliedPromo(null);
  };

  // Live Calculations (All NZ Currency Standard, Rounded to 2 Decimals)
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = Math.round(items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0) * 100) / 100;

  // Dynamic Discount Amount
  let discountAmount = 0;
  if (appliedPromo) {
    if (appliedPromo.discountPercent > 0) {
      discountAmount = Math.round(subtotal * (appliedPromo.discountPercent / 100) * 100) / 100;
    } else if (appliedPromo.discountFixed > 0) {
      discountAmount = Math.min(subtotal, appliedPromo.discountFixed);
    }
  }

  const discountedSubtotal = Math.max(0, Math.round((subtotal - discountAmount) * 100) / 100);
  const shipping = items.length === 0 ? 0 : discountedSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;
  const total = Math.round((discountedSubtotal + shipping) * 100) / 100;
  const gst = Math.round(((total * 3) / 23) * 100) / 100; // 15% NZ GST included
  const amountUntilFreeShipping = Math.max(0, Math.round((FREE_SHIPPING_THRESHOLD - discountedSubtotal) * 100) / 100);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        discountAmount,
        discountedSubtotal,
        appliedPromo,
        applyPromo,
        removePromo,
        shipping,
        total,
        gst,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        amountUntilFreeShipping,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        lastAddedItem,
        dismissLastAddedItem,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
