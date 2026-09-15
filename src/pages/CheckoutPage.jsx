import { useState, useRef, useEffect } from "react";
import { useCart } from "../hooks/useCart.js";
import Icon from "../components/ui/Icon.jsx";
import Arrow from "../components/ui/Arrow.jsx";

const money = (val) => new Intl.NumberFormat("en-NZ", { style: "currency", currency: "NZD" }).format(val);
const apiBaseUrl = (import.meta.env.VITE_QMB_API_URL || "https://quotemyblinds.com/api/api/p").replace(/\/+$/, "");
const enquiryApiUrl = `${apiBaseUrl}/enquiry`;
const webApiKey = (import.meta.env.VITE_QMB_WEB_API_KEY || "pmfQCWPkw1q").trim();

export default function CheckoutPage() {
  const { items, subtotal, shipping, clearCart } = useCart();

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    suburb: "",
    city: "",
    postcode: "",
    notes: "",
  });

  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("bank_transfer");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const formOpenedRef = useRef(0);
  useEffect(() => {
    formOpenedRef.current = typeof performance !== "undefined" ? performance.now() : 0;
  }, []);

  if (items.length === 0) {
    return (
      <section className="wrap py-16 text-center">
        <div className="max-w-md mx-auto card p-8 bg-white">
          <h1 className="!text-2xl font-serif text-forest">Your Cart is Empty</h1>
          <p className="mt-2 text-sm text-neutral-600">Please add items to your cart before proceeding to checkout.</p>
          <a href="/parts" className="btn btn-dark mt-6 text-xs inline-flex">
            Return to Blinds Parts Shop <Arrow />
          </a>
        </div>
      </section>
    );
  }

  const shippingCost = deliveryMethod === "rural" ? 12.5 : shipping;
  const finalTotal = Math.round((subtotal + shippingCost) * 100) / 100;
  const finalGst = Math.round(((finalTotal * 3) / 23) * 100) / 100;

  const updateCustomer = (field, val) => setCustomer((prev) => ({ ...prev, [field]: val }));

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage("");

    const openedAt = formOpenedRef.current;
    const elapsed = openedAt > 0 && e.timeStamp ? e.timeStamp - openedAt : 2000;
    if (honeypot || (elapsed > 0 && elapsed < 1200)) {
      await new Promise((res) => setTimeout(res, 500));
      clearCart();
      window.location.href = `/order-confirmation?order_ref=TDC-PARTS-${Math.floor(100000 + Math.random() * 900000)}`;
      return;
    }

    const orderRef = `TDC-${Date.now().toString().slice(-6)}`;
    const fullAddress = `${customer.street}, ${customer.suburb ? customer.suburb + ", " : ""}${customer.city} ${customer.postcode}, New Zealand`;

    const payload = {
      web_api_key: webApiKey,
      website_hp_key: honeypot,
      _sub_time: Math.round(e.timeStamp || 0),
      customer_email: customer.email.trim().toLowerCase(),
      customer_name: customer.name.trim(),
      customer_phone: customer.phone.trim(),
      customer_data: {
        address: fullAddress,
        delivery_method: deliveryMethod === "rural" ? "Rural Tracked Courier" : "Standard Tracked Courier",
        payment_method: paymentMethod,
        notes: customer.notes.trim(),
      },
      enquiry_data: {
        order_type: "parts_ecommerce",
        order_number: orderRef,
        total: finalTotal,
        currency: "NZD",
        windows: items.map((item) => ({
          product: `Parts: ${item.name}`,
          product_name: item.name,
          product_slug: item.slug,
          blinds_type: item.blindType,
          width: item.quantity,
          drop: 1,
          price: Math.round(item.unitPrice * item.quantity * 100) / 100,
        })),
        summary: `E-Commerce Parts Order ${orderRef} - ${items.length} items - Payment: ${paymentMethod}`,
      },
      source_url: window.location.href,
    };

    try {
      const response = await fetch(enquiryApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || `Order submission failed (${response.status})`);
      }

      // Save order receipt for confirmation screen
      const receipt = {
        orderRef,
        customer: { ...customer, fullAddress },
        items,
        subtotal,
        shipping: shippingCost,
        total: finalTotal,
        gst: finalGst,
        paymentMethod,
        date: new Date().toLocaleDateString("en-NZ", { year: "numeric", month: "short", day: "numeric" }),
      };

      try {
        sessionStorage.setItem("tdc_latest_order", JSON.stringify(receipt));
      } catch {}

      clearCart();
      window.location.href = `/order-confirmation?order_ref=${orderRef}`;
    } catch (err) {
      console.error("Checkout submission error:", err);
      setErrorMessage(
        err.message || "We encountered an issue submitting your order. Please review your details and try again."
      );
      setSubmitting(false);
    }
  };

  return (
    <section className="wrap py-10 md:py-14">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-xs text-neutral-500">
        <a href="/" className="hover:text-forest transition">Home</a>
        <span>›</span>
        <a href="/parts" className="hover:text-forest transition">Blinds Parts</a>
        <span>›</span>
        <a href="/cart" className="hover:text-forest transition">Shopping Cart</a>
        <span>›</span>
        <span aria-current="page" className="text-forest font-semibold">Checkout</span>
      </nav>

      {/* Checkout Steps Progress Stepper */}
      <div className="mb-8 rounded-2xl border border-brand-line bg-white p-4 sm:p-5 shadow-xs">
        <div className="flex items-center justify-between max-w-2xl mx-auto text-xs font-semibold">
          {/* Step 1: Completed Cart */}
          <a href="/cart" className="flex items-center gap-2 text-moss hover:underline transition">
            <span className="size-6 rounded-full bg-lime/90 text-forest font-bold flex items-center justify-center text-[11px] shadow-2xs">
              ✓
            </span>
            <span className="font-bold">Shopping Cart</span>
          </a>

          {/* Completed Connector */}
          <div className="h-0.5 flex-1 mx-3 bg-lime hidden sm:block" />

          {/* Step 2: Active Delivery & Details */}
          <div className="flex items-center gap-2 text-forest">
            <span className="size-6 rounded-full bg-forest text-lime font-bold flex items-center justify-center text-[11px] shadow-2xs">
              2
            </span>
            <span className="font-bold">Delivery & Details</span>
          </div>

          {/* Upcoming Connector */}
          <div className="h-0.5 flex-1 mx-3 bg-neutral-200 hidden sm:block" />

          {/* Step 3: Upcoming Confirmation */}
          <div className="flex items-center gap-2 text-neutral-400">
            <span className="size-6 rounded-full bg-neutral-100 border border-neutral-300 font-bold flex items-center justify-center text-[11px]">
              3
            </span>
            <span className="hidden sm:inline">Confirmation</span>
          </div>
        </div>
      </div>

      <h1 className="!text-3xl sm:!text-4xl font-serif text-forest mb-8">Secure Checkout</h1>

      {errorMessage && (
        <div className="mb-6 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-700">
          <strong>Notice:</strong> {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmitOrder} className="grid gap-10 lg:grid-cols-[1fr_420px] items-start">
        {/* Left Column: Form Fields */}
        <div className="space-y-8">
          {/* Honeypot field for bot defense */}
          <input
            type="text"
            name="website_hp_key"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          {/* 1. Customer Contact Details */}
          <div className="card bg-white p-6 sm:p-7 border border-brand-line">
            <div className="flex items-center gap-3 border-b border-neutral-100 pb-3 mb-5">
              <div className="flex size-7 items-center justify-center rounded-full bg-forest text-xs font-bold text-white">
                1
              </div>
              <h2 className="!text-xl font-bold text-forest m-0">Contact Details</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label>
                Full Name *
                <input
                  required
                  type="text"
                  placeholder="e.g. Sarah Jenkins"
                  value={customer.name}
                  onChange={(e) => updateCustomer("name", e.target.value)}
                  autoComplete="name"
                />
              </label>

              <label>
                Phone Number *
                <input
                  required
                  type="tel"
                  placeholder="e.g. 021 555 1234"
                  value={customer.phone}
                  onChange={(e) => updateCustomer("phone", e.target.value)}
                  autoComplete="tel"
                />
              </label>

              <div className="sm:col-span-2">
                <label>
                  Email Address (for order tracking & receipt) *
                  <input
                    required
                    type="email"
                    placeholder="e.g. sarah@example.co.nz"
                    value={customer.email}
                    onChange={(e) => updateCustomer("email", e.target.value)}
                    autoComplete="email"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* 2. New Zealand Delivery Address */}
          <div className="card bg-white p-6 sm:p-7 border border-brand-line">
            <div className="flex items-center gap-3 border-b border-neutral-100 pb-3 mb-5">
              <div className="flex size-7 items-center justify-center rounded-full bg-forest text-xs font-bold text-white">
                2
              </div>
              <h2 className="!text-xl font-bold text-forest m-0">New Zealand Delivery Address</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label>
                  Street Address *
                  <input
                    required
                    type="text"
                    placeholder="e.g. 42 Queen Street"
                    value={customer.street}
                    onChange={(e) => updateCustomer("street", e.target.value)}
                    autoComplete="street-address"
                  />
                </label>
              </div>

              <label>
                Suburb / Area (Optional)
                <input
                  type="text"
                  placeholder="e.g. Ponsonby"
                  value={customer.suburb}
                  onChange={(e) => updateCustomer("suburb", e.target.value)}
                />
              </label>

              <label>
                City / Town *
                <input
                  required
                  type="text"
                  placeholder="e.g. Auckland"
                  value={customer.city}
                  onChange={(e) => updateCustomer("city", e.target.value)}
                />
              </label>

              <label>
                Postcode *
                <input
                  required
                  type="text"
                  placeholder="e.g. 1011"
                  value={customer.postcode}
                  onChange={(e) => updateCustomer("postcode", e.target.value)}
                />
              </label>

              <div className="sm:col-span-2">
                <label>
                  Delivery Instructions (Optional)
                  <textarea
                    rows={2}
                    placeholder="e.g. Leave in safe place on front porch if not home"
                    value={customer.notes}
                    onChange={(e) => updateCustomer("notes", e.target.value)}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* 3. Delivery Method */}
          <div className="card bg-white p-6 sm:p-7 border border-brand-line">
            <div className="flex items-center gap-3 border-b border-neutral-100 pb-3 mb-5">
              <div className="flex size-7 items-center justify-center rounded-full bg-forest text-xs font-bold text-white">
                3
              </div>
              <h2 className="!text-xl font-bold text-forest m-0">Shipping Method</h2>
            </div>

            <div className="space-y-3 text-xs">
              <label className="flex items-center justify-between p-4 rounded-xl border border-neutral-200 cursor-pointer hover:border-moss transition">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="standard"
                    checked={deliveryMethod === "standard"}
                    onChange={() => setDeliveryMethod("standard")}
                    className="!w-auto !min-h-0 accent-forest"
                  />
                  <div>
                    <span className="font-bold text-forest block text-sm">Standard Tracked NZ Courier</span>
                    <span className="text-neutral-500">1–3 business days transit nationwide</span>
                  </div>
                </div>
                <span className="font-bold text-forest text-sm">
                  {shipping === 0 ? <span className="text-moss">FREE</span> : money(8.5)}
                </span>
              </label>

              <label className="flex items-center justify-between p-4 rounded-xl border border-neutral-200 cursor-pointer hover:border-moss transition">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="rural"
                    checked={deliveryMethod === "rural"}
                    onChange={() => setDeliveryMethod("rural")}
                    className="!w-auto !min-h-0 accent-forest"
                  />
                  <div>
                    <span className="font-bold text-forest block text-sm">Rural Delivery Tracked (RD)</span>
                    <span className="text-neutral-500">For rural addresses outside standard courier routes</span>
                  </div>
                </div>
                <span className="font-bold text-forest text-sm">{money(12.5)}</span>
              </label>
            </div>
          </div>

          {/* 4. Payment Selection */}
          <div className="card bg-white p-6 sm:p-7 border border-brand-line">
            <div className="flex items-center gap-3 border-b border-neutral-100 pb-3 mb-5">
              <div className="flex size-7 items-center justify-center rounded-full bg-forest text-xs font-bold text-white">
                4
              </div>
              <h2 className="!text-xl font-bold text-forest m-0">Payment Method</h2>
            </div>

            <div className="space-y-3">
              <label
                className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition ${
                  paymentMethod === "bank_transfer"
                    ? "border-moss bg-brand-50/60 ring-1 ring-moss"
                    : "border-neutral-200 bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank_transfer"
                  checked={paymentMethod === "bank_transfer"}
                  onChange={() => setPaymentMethod("bank_transfer")}
                  className="!w-auto !min-h-0 mt-1 accent-forest"
                />
                <div className="text-xs">
                  <span className="font-bold text-forest block text-sm">Direct Bank Deposit / Internet Banking (NZ)</span>
                  <p className="text-neutral-600 mt-1 leading-relaxed">
                    Place your order now without a credit card. You will receive an instant invoice with our New Zealand bank account number (ANZ) and your unique order reference. Dispatches once payment is verified.
                  </p>
                  <span className="inline-block mt-2 font-semibold text-moss">✓ 0% transaction fees</span>
                </div>
              </label>

              <label
                className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition ${
                  paymentMethod === "card"
                    ? "border-moss bg-brand-50/60 ring-1 ring-moss"
                    : "border-neutral-200 bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                  className="!w-auto !min-h-0 mt-1 accent-forest"
                />
                <div className="text-xs">
                  <span className="font-bold text-forest block text-sm">Credit / Debit Card (Visa, Mastercard, Amex)</span>
                  <p className="text-neutral-600 mt-1 leading-relaxed">
                    Secure card processing. Order confirmation and dispatch initiated immediately.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Place Order */}
        <aside className="card bg-white p-6 border border-brand-line sticky top-6 space-y-5">
          <h3 className="!text-xl font-bold text-forest border-b border-neutral-100 pb-3">
            Your Order ({items.length} {items.length === 1 ? "item" : "items"})
          </h3>

          <div className="divide-y divide-neutral-100 max-h-72 overflow-y-auto pr-1 text-xs">
            {items.map((item) => (
              <div key={item.cartItemId} className="py-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="font-semibold text-forest line-clamp-1">{item.name}</span>
                  <span className="text-neutral-500">
                    Qty: {item.quantity} {item.variantLabel && `• ${item.variantLabel}`}
                  </span>
                </div>
                <span className="font-bold text-forest shrink-0">
                  {money(item.unitPrice * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-xs text-neutral-600 border-t border-neutral-200 pt-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-forest">{money(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-semibold text-forest">
                {shippingCost === 0 ? <strong className="text-moss">FREE</strong> : money(shippingCost)}
              </span>
            </div>
            <div className="flex justify-between text-[11px] text-neutral-400">
              <span>Includes 15% NZ GST</span>
              <span>{money(finalGst)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-forest border-t border-neutral-200 pt-3">
              <span>Total Due</span>
              <span className="text-2xl text-forest">{money(finalTotal)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn btn-dark w-full !py-4 font-semibold text-sm justify-center shadow-lg disabled:opacity-50"
          >
            {submitting ? "Processing Order..." : `Place Order • ${money(finalTotal)}`}
          </button>

          <p className="text-center text-[11px] text-neutral-400 leading-relaxed">
            By placing your order, you agree to The Drapery Cupboard's{" "}
            <a href="/terms" className="underline text-moss">Terms</a> and{" "}
            <a href="/privacy" className="underline text-moss">Privacy Policy</a>.
          </p>

          <div className="pt-2 border-t border-neutral-100 flex items-center justify-center gap-3 text-[11px] text-neutral-500">
            <Icon name="shield" size={16} className="text-moss" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
        </aside>
      </form>
    </section>
  );
}
