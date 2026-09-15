/**
 * Valid promotional discount codes for The Drapery Cupboard E-Commerce Storefront
 */
export const PROMO_CODES = {
  WELCOME10: {
    code: "WELCOME10",
    discountPercent: 10,
    label: "10% Welcome Discount",
    description: "10% off all blinds replacement parts and hardware",
  },
  TRADE15: {
    code: "TRADE15",
    discountPercent: 15,
    label: "15% Trade Contractor Discount",
    description: "15% off for NZ trade professionals and builders",
  },
  DIYREPAIR: {
    code: "DIYREPAIR",
    discountPercent: 10,
    label: "10% DIY Repair Promo",
    description: "10% off DIY blind mechanism replacements",
  },
  FREESHIP: {
    code: "FREESHIP",
    discountFixed: 8.5,
    discountPercent: 0,
    label: "Free NZ Courier Delivery",
    description: "$8.50 discount covering nationwide tracked courier",
  },
};

/**
 * Validate and calculate promo discount
 */
export function validatePromoCode(rawCode, subtotal) {
  if (!rawCode || typeof rawCode !== "string") {
    return { valid: false, error: "Please enter a valid coupon or promo code." };
  }

  const code = rawCode.trim().toUpperCase();
  const promo = PROMO_CODES[code];

  if (!promo) {
    return {
      valid: false,
      error: "Invalid promo code. Try WELCOME10 for 10% off your order.",
    };
  }

  let discountAmount = 0;
  if (promo.discountPercent > 0) {
    discountAmount = Math.round(subtotal * (promo.discountPercent / 100) * 100) / 100;
  } else if (promo.discountFixed > 0) {
    discountAmount = Math.min(subtotal, promo.discountFixed);
  }

  return {
    valid: true,
    promo: {
      ...promo,
      discountAmount,
    },
  };
}
