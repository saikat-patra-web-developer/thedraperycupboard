import { useState, useEffect } from "react";
import { CartContext } from "./cartContextDef.js";

const STORAGE_KEY = "tdc_ecommerce_cart";
const FREE_SHIPPING_THRESHOLD = 75.0;
const STANDARD_SHIPPING_COST = 8.5;

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn("Could not persist cart to localStorage:", e);
    }
  }, [items]);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

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
          image: part.image || null,
        },
      ];
    });

    setLastAddedItem({ ...part, variantLabel, quantity, timestamp: Date.now() });
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
        item.cartItemId === cartItemId ? { ...item, quantity: Math.min(99, Math.max(1, qty)) } : item
      )
    );
  };

  const removeItem = (cartItemId) => {
    setItems((current) => current.filter((item) => item.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setItems([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = Math.round(items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0) * 100) / 100;
  const shipping = items.length === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;
  const total = Math.round((subtotal + shipping) * 100) / 100;
  const gst = Math.round(((total * 3) / 23) * 100) / 100; // 15% NZ GST included in retail total
  const amountUntilFreeShipping = Math.max(0, Math.round((FREE_SHIPPING_THRESHOLD - subtotal) * 100) / 100);

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
