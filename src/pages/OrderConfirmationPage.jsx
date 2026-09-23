import { useState } from "react";
import { motion } from "motion/react";
import Icon from "../components/ui/Icon.jsx";
import Arrow from "../components/ui/Arrow.jsx";
import Img from "../components/ui/Image.jsx";
import FadeUp from "../components/motion/FadeUp.jsx";
import { EASE_PREMIUM } from "../components/motion/motionVariants.js";
import { contact } from "../data/contact.js";

const money = (val) => new Intl.NumberFormat("en-NZ", { style: "currency", currency: "NZD" }).format(val);

export default function OrderConfirmationPage() {
  const [order] = useState(() => {
    try {
      const saved =
        typeof window !== "undefined"
          ? sessionStorage.getItem("tdc_latest_order") || localStorage.getItem("tdc_latest_order")
          : null;
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [orderRef] = useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      return params.get("order_ref") || `TDC-${Math.floor(100000 + Math.random() * 900000)}`;
    }
    return `TDC-${Math.floor(100000 + Math.random() * 900000)}`;
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="wrap py-10 md:py-16 max-w-4xl mx-auto">
      {/* Checkout Steps Progress Stepper */}
      <div className="mb-8 rounded-2xl border border-brand-line bg-white p-4 sm:p-5 shadow-xs">
        <div className="flex items-center justify-between max-w-2xl mx-auto text-xs font-semibold">
          {/* Step 1: Completed Cart */}
          <div className="flex items-center gap-2 text-moss">
            <span className="size-6 rounded-full bg-lime/90 text-forest font-bold flex items-center justify-center text-[11px] shadow-2xs">
              ✓
            </span>
            <span className="font-semibold">Shopping Cart</span>
          </div>

          {/* Completed Connector */}
          <div className="h-0.5 flex-1 mx-3 bg-lime hidden sm:block" />

          {/* Step 2: Completed Delivery & Details */}
          <div className="flex items-center gap-2 text-moss">
            <span className="size-6 rounded-full bg-lime/90 text-forest font-bold flex items-center justify-center text-[11px] shadow-2xs">
              ✓
            </span>
            <span className="font-semibold">Delivery & Details</span>
          </div>

          {/* Completed Connector */}
          <div className="h-0.5 flex-1 mx-3 bg-lime hidden sm:block" />

          {/* Step 3: Completed Confirmation */}
          <div className="flex items-center gap-2 text-forest">
            <span className="size-6 rounded-full bg-forest text-lime font-bold flex items-center justify-center text-[11px] shadow-2xs">
              3
            </span>
            <span className="font-bold">Confirmation</span>
          </div>
        </div>
      </div>

      {/* Success Badge */}
      <FadeUp className="card bg-white p-8 sm:p-12 border border-brand-line shadow-sm text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: EASE_PREMIUM }}
          className="size-20 rounded-full bg-lime/20 border-2 border-lime flex items-center justify-center text-moss mx-auto shadow-sm"
        >
          <Icon name="check" size={40} />
        </motion.div>

        <span className="eyebrow mt-5 text-moss">Thank You for Your Order</span>
        <h1 className="!text-3xl sm:!text-4xl font-serif text-forest mt-1">
          Order Successfully Placed!
        </h1>
        <p className="mt-2 text-sm text-neutral-600 max-w-lg mx-auto">
          We’ve received your order for replacement blinds parts. A confirmation receipt has been generated.
        </p>

        <div className="mt-6 inline-flex items-center gap-3 rounded-xl bg-brand-50 border border-brand-line px-5 py-3 text-sm">
          <span className="text-neutral-500 font-medium">Order Reference:</span>
          <span className="font-mono font-bold text-forest text-base">{order?.orderRef || orderRef}</span>
        </div>
      </FadeUp>

      {/* Payment Confirmation Banner if Card */}
      {order?.paymentMethod === "card" && (
        <div className="mt-8 card bg-white p-6 sm:p-8 border border-lime/60 shadow-xs">
          <div className="flex items-start gap-3.5">
            <div className="size-10 rounded-full bg-lime/20 border border-lime flex items-center justify-center text-moss shrink-0 mt-0.5">
              <Icon name="check" size={20} />
            </div>
            <div>
              <h2 className="!text-lg font-bold text-forest m-0">Payment Authorised & Confirmed</h2>
              <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                Your credit / debit card payment was successfully authorised. Your order is registered in our local dispatch queue and will ship via tracked courier next business day.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-[11px] text-neutral-500">
                <span className="flex items-center gap-1 font-semibold text-moss">
                  <Icon name="shield" size={14} /> 256-Bit Encrypted
                </span>
                <span>•</span>
                <span>Payment Status: <strong className="text-moss font-semibold">Authorised / Complete</strong></span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Instructions if Bank Transfer */}
      {(!order || order.paymentMethod === "bank_transfer") && (
        <div className="mt-8 card bg-white p-6 sm:p-8 border-2 border-lime/60 shadow-xs">
          <div className="flex items-center gap-3 border-b border-neutral-200 pb-4 mb-5">
            <Icon name="shield" size={24} className="text-moss" />
            <div>
              <h2 className="!text-xl font-bold text-forest m-0">Direct Bank Transfer Instructions</h2>
              <p className="text-xs text-neutral-500 mt-0.5">Please transfer your order total via NZ Internet Banking</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 bg-brand-50/70 p-5 rounded-xl border border-brand-line">
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-neutral-500 block">Bank</span>
                <strong className="text-sm text-forest">ANZ Bank New Zealand</strong>
              </div>
              <div>
                <span className="text-neutral-500 block">Account Name</span>
                <strong className="text-sm text-forest">The Drapery Cupboard Ltd</strong>
              </div>
              <div>
                <span className="text-neutral-500 block">Account Number</span>
                <strong className="text-sm text-forest font-mono tracking-wide">01-0123-0456789-00</strong>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:border-l sm:border-brand-line sm:pl-6">
              <div>
                <span className="text-neutral-500 block">Amount Due</span>
                <strong className="text-lg text-forest font-bold">
                  {order ? money(order.total) : "Refer to invoice total"}
                </strong>
              </div>
              <div>
                <span className="text-neutral-500 block">Particulars (Your Name)</span>
                <strong className="text-sm text-forest">{order?.customer?.name || "Your Full Name"}</strong>
              </div>
              <div>
                <span className="text-neutral-500 block">Reference (Required)</span>
                <strong className="text-sm text-forest font-mono bg-white px-2 py-0.5 rounded border border-neutral-300 inline-block">
                  {order?.orderRef || orderRef}
                </strong>
              </div>
            </div>
          </div>

          <p className="mt-4 text-xs text-neutral-500 leading-relaxed">
            * Please include your Order Reference ({order?.orderRef || orderRef}) as the reference on your payment so our dispatch team can immediately match and ship your parcel.
          </p>
        </div>
      )}

      {/* Order Item Details Breakdown */}
      {order && (
        <div className="mt-8 card bg-white p-6 sm:p-8 border border-brand-line">
          <h3 className="!text-xl font-bold text-forest border-b border-neutral-100 pb-3 mb-4">
            Items in This Order
          </h3>

          <div className="divide-y divide-neutral-100 text-xs">
            {order.items.map((item) => (
              <div key={item.cartItemId} className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="size-14 rounded-lg bg-neutral-50 border border-neutral-200 p-1 flex items-center justify-center shrink-0 overflow-hidden">
                    <Img
                      name={item.image || item.id}
                      alt={item.name}
                      sizes="56px"
                      className="size-full object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <a
                      href={`/product/${item.slug}`}
                      className="text-forest text-sm font-bold hover:text-moss transition block truncate"
                    >
                      {item.name}
                    </a>
                    <span className="text-neutral-500 text-xs block mt-0.5">
                      SKU: {item.sku} • Qty: {item.quantity} {item.variantLabel && item.variantLabel !== "Standard" && `• ${item.variantLabel}`}
                    </span>
                  </div>
                </div>
                <span className="font-bold text-forest text-sm shrink-0">
                  {money(item.unitPrice * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-200 grid sm:grid-cols-2 gap-6 text-xs">
            <div>
              <span className="font-semibold text-forest block mb-1">Delivery Destination</span>
              <p className="text-neutral-600 leading-relaxed">{order.customer.fullAddress}</p>
              <p className="text-neutral-500 mt-1">Recipient: {order.customer.name} ({order.customer.phone})</p>
              <p className="text-neutral-400 text-[11px] mt-1">
                Method: <strong>{order.deliveryMethod || "Standard Tracked Courier"}</strong>
              </p>
            </div>

            <div className="space-y-1.5 text-right sm:border-l sm:border-neutral-100 sm:pl-6">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold text-forest">{money(order.subtotal)}</span>
              </div>

              {order.discountAmount > 0 && (
                <div className="flex justify-between text-moss font-semibold">
                  <span>Promo Discount ({order.appliedPromo?.code || "Voucher"}):</span>
                  <span>-{money(order.discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Courier Delivery:</span>
                <span className="font-semibold text-forest">
                  {order.shipping === 0 ? <strong className="text-moss">FREE</strong> : money(order.shipping)}
                </span>
              </div>
              <div className="flex justify-between text-neutral-400 text-[11px]">
                <span>Includes 15% NZ GST:</span>
                <span>{money(order.gst)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-forest pt-2 border-t border-neutral-200">
                <span>Total Paid / Due:</span>
                <span>{money(order.total)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Actions and Support */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-3">
          <button onClick={handlePrint} className="btn btn-outline text-xs !py-2.5">
            Print Order Details
          </button>
          <a href="/online-shop" className="btn btn-dark text-xs !py-2.5">
            Continue Shopping <Arrow />
          </a>
        </div>

        <div className="text-xs text-neutral-500">
          Questions about your order? Email{" "}
          <a href={contact.emailHref} className="text-moss underline">
            {contact.email}
          </a>
        </div>
      </div>
    </section>
  );
}
