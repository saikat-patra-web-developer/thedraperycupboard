import { useCart } from "../hooks/useCart.js";
import Icon from "../components/ui/Icon.jsx";
import Arrow from "../components/ui/Arrow.jsx";
import Cta from "../components/sections/CallToAction.jsx";

const money = (val) => new Intl.NumberFormat("en-NZ", { style: "currency", currency: "NZD" }).format(val);

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    shipping,
    total,
    gst,
    freeShippingThreshold,
    amountUntilFreeShipping,
  } = useCart();

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  if (items.length === 0) {
    return (
      <section className="wrap py-16 md:py-24 text-center">
        <div className="max-w-md mx-auto card p-8 sm:p-12 bg-white">
          <div className="size-20 rounded-full bg-brand-100 mx-auto flex items-center justify-center text-moss">
            <Icon name="tools" size={36} />
          </div>
          <h1 className="!text-3xl font-serif text-forest mt-4">Your Cart is Empty</h1>
          <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
            You don't have any blinds replacement parts or hardware in your shopping cart yet.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <a href="/parts" className="btn btn-dark text-xs justify-center">
              Explore Blinds Parts <Arrow />
            </a>
            <a href="/products" className="btn btn-outline text-xs justify-center">
              View Custom Blinds
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="wrap py-10 md:py-14">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-neutral-500">
          <a href="/" className="hover:text-forest">Home</a>
          <span>›</span>
          <a href="/parts" className="hover:text-forest">Blinds Parts</a>
          <span>›</span>
          <span aria-current="page" className="text-forest font-semibold">Shopping Cart</span>
        </nav>

        <h1 className="!text-3xl sm:!text-4xl font-serif text-forest mb-8">Shopping Cart</h1>

        {/* Free Shipping Alert Bar */}
        <div className="mb-8 rounded-xl border border-brand-line bg-brand-50 p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-semibold text-forest">
            <span>
              {amountUntilFreeShipping > 0 ? (
                <>
                  Add <strong className="text-moss">{money(amountUntilFreeShipping)}</strong> more to unlock{" "}
                  <strong>FREE Tracked NZ Courier Delivery!</strong>
                </>
              ) : (
                <span className="flex items-center gap-1.5 text-moss">
                  <Icon name="check" size={16} /> You qualify for FREE Nationwide Delivery!
                </span>
              )}
            </span>
            <span className="text-neutral-500 font-normal">{progressPercent}% to Free Shipping</span>
          </div>
          <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-neutral-200">
            <div
              className="h-full bg-lime transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_380px] items-start">
          {/* Cart Table */}
          <div className="card overflow-hidden bg-white border border-brand-line">
            <div className="hidden sm:grid grid-cols-[1fr_120px_120px_100px_40px] gap-4 bg-neutral-50 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-neutral-500 border-b border-neutral-200">
              <span>Item</span>
              <span className="text-center">Price</span>
              <span className="text-center">Quantity</span>
              <span className="text-right">Total</span>
              <span />
            </div>

            <div className="divide-y divide-neutral-100">
              {items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="p-5 sm:px-6 sm:py-5 flex flex-col sm:grid sm:grid-cols-[1fr_120px_120px_100px_40px] sm:items-center gap-4"
                >
                  {/* Item Description */}
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="size-16 shrink-0 rounded-lg bg-neutral-100 border border-neutral-200 flex items-center justify-center p-2 text-moss">
                      <Icon name="tools" size={24} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <a
                        href={`/parts/${item.slug}`}
                        className="text-sm font-bold text-forest hover:text-moss transition line-clamp-1"
                      >
                        {item.name}
                      </a>
                      <div className="text-xs text-neutral-500 mt-0.5 space-x-2">
                        <span className="font-mono">SKU: {item.sku}</span>
                        {item.variantLabel && item.variantLabel !== "Standard" && (
                          <span className="text-neutral-700 font-medium">({item.variantLabel})</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Unit Price */}
                  <div className="sm:text-center text-xs text-neutral-600 font-medium">
                    <span className="sm:hidden font-bold text-neutral-700">Unit Price: </span>
                    {money(item.unitPrice)}
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex sm:justify-center">
                    <div className="flex items-center rounded-lg border border-neutral-300 bg-white">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        className="px-2.5 py-1 text-xs text-neutral-600 hover:bg-neutral-100 transition rounded-l-lg"
                      >
                        −
                      </button>
                      <span className="w-9 text-center text-xs font-semibold">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="px-2.5 py-1 text-xs text-neutral-600 hover:bg-neutral-100 transition rounded-r-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Item Subtotal */}
                  <div className="sm:text-right font-bold text-sm text-forest">
                    <span className="sm:hidden text-neutral-600 font-normal text-xs">Total: </span>
                    {money(item.unitPrice * item.quantity)}
                  </div>

                  {/* Delete Button */}
                  <div className="flex sm:justify-end">
                    <button
                      onClick={() => removeItem(item.cartItemId)}
                      className="text-neutral-400 hover:text-red-600 p-1 transition text-lg"
                      title="Remove item from cart"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 sm:p-6 bg-neutral-50 border-t border-neutral-100 flex flex-wrap justify-between items-center gap-3 text-xs">
              <a href="/parts" className="text-link">
                ← Continue Shopping for Parts
              </a>
              <button
                onClick={clearCart}
                className="text-neutral-500 hover:text-red-600 underline"
              >
                Clear Entire Cart
              </button>
            </div>
          </div>

          {/* Order Summary Box */}
          <div className="card bg-white p-6 border border-brand-line space-y-5 sticky top-6">
            <h3 className="!text-xl font-bold text-forest border-b border-neutral-100 pb-3">
              Order Summary
            </h3>

            <div className="space-y-2.5 text-xs text-neutral-600">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-forest">{money(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>NZ Tracked Courier</span>
                <span className="font-semibold text-forest">
                  {shipping === 0 ? (
                    <span className="rounded bg-lime/20 px-2 py-0.5 font-bold text-moss">FREE</span>
                  ) : (
                    money(shipping)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-neutral-400">
                <span>Includes 15% NZ GST</span>
                <span>{money(gst)}</span>
              </div>

              <div className="pt-3 border-t border-neutral-200 flex justify-between items-baseline text-lg font-bold text-forest">
                <span>Total Due</span>
                <span className="text-2xl text-forest">{money(total)}</span>
              </div>
            </div>

            <a
              href="/checkout"
              className="btn btn-dark w-full !py-3.5 font-semibold text-sm justify-center shadow-md block text-center"
            >
              Proceed to Checkout <Arrow />
            </a>

            <div className="pt-2 border-t border-neutral-100 space-y-2 text-[11px] text-neutral-500">
              <div className="flex items-center gap-2">
                <Icon name="truck" size={16} className="text-moss shrink-0" />
                <span>Dispatches next business day from Auckland / Tuakau</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="shield" size={16} className="text-moss shrink-0" />
                <span>30-day money back fit guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="leaf" size={16} className="text-moss shrink-0" />
                <span>100% New Zealand owned and operated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
