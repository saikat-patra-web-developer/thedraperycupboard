import { useState, useMemo } from "react";
import { findPart, parts } from "../data/parts.js";
import { useCart } from "../hooks/useCart.js";
import Icon from "../components/ui/Icon.jsx";
import Arrow from "../components/ui/Arrow.jsx";
import Img from "../components/ui/Image.jsx";
import NotFoundPage from "./NotFoundPage.jsx";
import PartCard from "../components/parts/PartCard.jsx";
import Cta from "../components/sections/CallToAction.jsx";
import { contact } from "../data/contact.js";

const money = (val) => new Intl.NumberFormat("en-NZ", { style: "currency", currency: "NZD" }).format(val);

export default function ProductViewPage({ id }) {
  // Resolve part by ID or slug prop, or from query params as fallback
  const resolvedId =
    id ||
    (typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("slug") ||
        new URLSearchParams(window.location.search).get("id")
      : null);

  const part = findPart(resolvedId);
  const { addItem, items, cartCount } = useCart();

  const [selectedVariant, setSelectedVariant] = useState(part?.variants ? part.variants[0] : null);
  const [selectedPack, setSelectedPack] = useState(part?.packOptions ? part.packOptions[0] : null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("specs");
  const [activeView, setActiveView] = useState("main");
  const [addedNotice, setAddedNotice] = useState(false);

  // Synchronize variant / pack options if part exists
  const variantKey = selectedVariant?.id || "default";
  const packKey = selectedPack?.id || "default";
  const currentCartItemId = `${part?.id}-${variantKey}-${packKey}`;
  const inCartItem = items.find((item) => item.cartItemId === currentCartItemId);
  const inCartQty = inCartItem ? inCartItem.quantity : 0;

  // Curate related parts for this specific item
  const relatedParts = useMemo(() => {
    if (!part) return [];
    return parts
      .filter((p) => p.id !== part.id && (p.category === part.category || p.category === "safety"))
      .slice(0, 4);
  }, [part]);

  if (!part) return <NotFoundPage />;

  const unitBasePrice = Math.round(part.price * (selectedPack?.multiplier || 1) * 100) / 100;
  const lineTotalPrice = Math.round(unitBasePrice * quantity * 100) / 100;

  const handleAddToCart = () => {
    addItem(part, quantity, selectedVariant, selectedPack, { openDrawer: false });
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3500);
  };

  const handleBuyNow = () => {
    addItem(part, quantity, selectedVariant, selectedPack, { openDrawer: false });
    window.location.assign("/checkout");
  };

  // Mock verified customer reviews with realistic NZ context
  const reviews = [
    {
      name: "Marcus T.",
      city: "Auckland",
      rating: 5,
      date: "2 weeks ago",
      title: "Perfect exact fit, saved hundreds!",
      text: `Saved me having to buy a whole new roller blind. The 38mm clutch slid straight into the aluminium tube and the teeth locked in effortlessly. Very smooth chain operation.`,
    },
    {
      name: "Sarah W.",
      city: "Christchurch",
      rating: 5,
      date: "1 month ago",
      title: "Arrived in 2 days, excellent quality",
      text: `Prompt courier delivery to Canterbury. The Birch finish matched our existing headrail nicely. Robust build quality compared to the brittle plastic original.`,
    },
    {
      name: "David H.",
      city: "Wellington",
      rating: 5,
      date: "2 months ago",
      title: "Super smooth planetary gear",
      text: `Replaced a stiff mechanism on a heavy bedroom blockout. The new unit turns with minimal effort and doesn't slip down overnight. 10/10.`,
    },
  ];

  return (
    <>
      <section className="wrap py-7 md:py-10">
        {/* Navigation & Breadcrumb Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-neutral-500">
            <a href="/" className="hover:text-forest transition">Home</a>
            <span>›</span>
            <a href="/parts" className="hover:text-forest transition">Blinds Parts & Hardware</a>
            <span>›</span>
            <a href={`/parts?category=${part.category}`} className="hover:text-forest capitalize transition">
              {part.blindType}
            </a>
            <span>›</span>
            <span aria-current="page" className="text-forest font-semibold line-clamp-1 max-w-xs">
              {part.name}
            </span>
          </nav>

          <a
            href="/parts"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-moss hover:text-forest transition"
          >
            ← Back to Blinds Parts Shop
          </a>
        </div>

        {/* Product View Hero Layout */}
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14 items-start">
          {/* Left Column: Interactive Product Showcase & Visuals */}
          <div className="space-y-4">
            {/* Primary Visual Stage */}
            <div className="relative overflow-hidden rounded-2xl border border-brand-line bg-gradient-to-br from-neutral-50 via-white to-brand-50/60 p-8 sm:p-12 flex flex-col items-center justify-center min-h-[380px] sm:min-h-[440px] shadow-xs">
              {/* Badges */}
              <div className="absolute left-4 top-4 flex flex-wrap gap-2 z-10">
                <span className="rounded-lg bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-wider text-moss shadow-xs border border-neutral-200/60">
                  {part.blindType}
                </span>
                {part.badge && (
                  <span className="rounded-lg bg-forest px-3 py-1 text-xs font-semibold text-white shadow-xs">
                    {part.badge}
                  </span>
                )}
              </div>

              <div className="absolute right-4 top-4 z-10">
                <span className="rounded-lg bg-lime/90 px-3 py-1 text-xs font-bold text-forest shadow-xs flex items-center gap-1 border border-moss/20">
                  <span className="size-2 rounded-full bg-forest animate-pulse" />
                  In Stock
                </span>
              </div>

              {/* Dynamic View Graphic Rendering */}
              <div className="my-auto flex flex-col items-center justify-center text-center py-6">
                {activeView === "main" && (
                  <div className="w-full max-w-sm mx-auto flex items-center justify-center p-2 sm:p-4 transition-transform duration-300 hover:scale-105">
                    {part.image ? (
                      <Img
                        name={part.image}
                        alt={part.name}
                        priority
                        sizes="(max-width: 1024px) 100vw, 500px"
                        className="max-h-[300px] sm:max-h-[360px] w-full object-contain drop-shadow-md"
                      />
                    ) : (
                      <div className="size-40 sm:size-48 rounded-3xl bg-white shadow-md border border-brand-line flex items-center justify-center p-7 text-moss">
                        <Icon name="tools" size={80} />
                      </div>
                    )}
                  </div>
                )}

                {activeView === "splines" && (
                  <div className="size-40 sm:size-48 rounded-3xl bg-brand-50 shadow-md border-2 border-dashed border-moss flex flex-col items-center justify-center p-4 text-forest transition-all">
                    <Icon name="blinds" size={48} className="text-moss mb-2" />
                    <span className="text-xs font-bold">Standard Tube Ribs</span>
                    <span className="text-[11px] text-neutral-500 mt-1">Keyed Spline Profile</span>
                  </div>
                )}

                {activeView === "dimensions" && (
                  <div className="size-40 sm:size-48 rounded-3xl bg-neutral-900 text-white shadow-md border border-neutral-700 flex flex-col items-center justify-center p-4 transition-all">
                    <span className="text-2xl font-mono font-bold text-lime">
                      {part.specifications.find(([k]) => k.includes("Tube") || k.includes("Compatibility"))?.[1] || "38mm OD"}
                    </span>
                    <span className="text-xs text-neutral-300 mt-1">Universal NZ Fit</span>
                    <span className="text-[10px] text-neutral-400 mt-2">Precision Moulded</span>
                  </div>
                )}

                {activeView === "installed" && (
                  <div className="size-40 sm:size-48 rounded-3xl bg-brand-100/70 border border-brand-line shadow-md flex flex-col items-center justify-center p-4 text-forest transition-all">
                    <Icon name="check" size={54} className="text-moss mb-2" />
                    <span className="text-xs font-bold">Flush Headrail Fit</span>
                    <span className="text-[11px] text-neutral-600 mt-1">Easy Push-Fit</span>
                  </div>
                )}

                <div className="mt-6 text-xs text-neutral-500 font-mono">
                  {activeView === "main" && `SKU: ${part.sku} • Front Elevation`}
                  {activeView === "splines" && `Internal Tube Drive Spline Teeth`}
                  {activeView === "dimensions" && `Measurement Profile: ${part.name}`}
                  {activeView === "installed" && `Ready to Insert into Blind Tube`}
                </div>
              </div>

              {/* View Angle Switcher Tabs */}
              <div className="w-full mt-auto pt-4 border-t border-neutral-200/70 flex items-center justify-between gap-2 overflow-x-auto">
                {[
                  ["main", "Front View"],
                  ["splines", "Splines & Teeth"],
                  ["dimensions", "Dimensions"],
                  ["installed", "Installed Setup"],
                ].map(([vId, vLabel]) => (
                  <button
                    key={vId}
                    type="button"
                    onClick={() => setActiveView(vId)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                      activeView === vId
                        ? "bg-forest text-white shadow-xs"
                        : "bg-white/80 text-neutral-600 hover:bg-white hover:text-forest border border-neutral-200"
                    }`}
                  >
                    {vLabel}
                  </button>
                ))}
              </div>
            </div>

            {/* Satisfaction & Dispatch Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-xl border border-brand-line bg-white p-3 text-center shadow-2xs">
                <Icon name="truck" size={18} className="text-moss mx-auto mb-1" />
                <div className="text-xs font-bold text-forest">$8.50 Tracked</div>
                <div className="text-[10px] text-neutral-500">Free over $75</div>
              </div>
              <div className="rounded-xl border border-brand-line bg-white p-3 text-center shadow-2xs">
                <Icon name="shield" size={18} className="text-moss mx-auto mb-1" />
                <div className="text-xs font-bold text-forest">30-Day Returns</div>
                <div className="text-[10px] text-neutral-500">NZ Fit Guarantee</div>
              </div>
              <div className="rounded-xl border border-brand-line bg-white p-3 text-center shadow-2xs">
                <Icon name="tools" size={18} className="text-moss mx-auto mb-1" />
                <div className="text-xs font-bold text-forest">DIY Ready</div>
                <div className="text-[10px] text-neutral-500">5-Min Install</div>
              </div>
              <div className="rounded-xl border border-brand-line bg-white p-3 text-center shadow-2xs">
                <Icon name="pin" size={18} className="text-moss mx-auto mb-1" />
                <div className="text-xs font-bold text-forest">Te Kauwhata / Waikato</div>
                <div className="text-[10px] text-neutral-500">Fast NZ Dispatch</div>
              </div>
            </div>
          </div>

          {/* Right Column: Buying Box & Configurator */}
          <div className="card bg-white p-6 sm:p-8 border border-brand-line shadow-sm flex flex-col">
            {/* Rating & In-Stock Status */}
            <div className="flex items-center justify-between gap-3 text-xs text-neutral-500 pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400">
                  {"★".repeat(Math.floor(part.rating))}
                  {part.rating % 1 !== 0 && "★"}
                </div>
                <span className="font-bold text-neutral-800">{part.rating}</span>
                <span>({part.reviewsCount} verified reviews)</span>
              </div>
              <span className="text-moss font-semibold flex items-center gap-1">
                <Icon name="check" size={14} /> Genuine Part
              </span>
            </div>

            {/* Product Title */}
            <h1 className="!text-2xl sm:!text-3xl font-serif text-forest font-normal leading-snug mt-3">
              {part.name}
            </h1>

            <p className="mt-2 text-xs text-neutral-500 font-mono">
              SKU: <strong className="text-neutral-700">{part.sku}</strong> • Category: <span className="capitalize">{part.blindType}</span>
            </p>

            {/* Price Lockup */}
            <div className="mt-4 pb-4 border-b border-neutral-100 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-forest">{money(unitBasePrice)}</span>
              <span className="text-xs text-neutral-500">Incl. 15% NZ GST</span>
              {selectedPack?.multiplier > 1 && (
                <span className="rounded bg-lime/30 text-moss px-2 py-0.5 text-xs font-bold">
                  Pack Savings Applied
                </span>
              )}
            </div>

            <p className="mt-4 text-xs leading-relaxed text-brand-grey">
              {part.description}
            </p>

            {/* Variant / Colour Options */}
            {part.variants && part.variants.length > 0 && (
              <div className="mt-5 space-y-2">
                <label className="text-xs font-semibold text-neutral-700 flex justify-between">
                  <span>Finish / Colour:</span>
                  <strong className="text-forest">{selectedVariant?.label}</strong>
                </label>
                <div className="flex flex-wrap gap-2">
                  {part.variants.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      className={`px-3 py-2 text-xs rounded-lg border transition flex items-center gap-1.5 ${
                        selectedVariant?.id === v.id
                          ? "border-forest bg-forest text-white font-semibold shadow-xs"
                          : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400"
                      }`}
                    >
                      {v.hex && (
                        <span
                          className="inline-block size-3 rounded-full border border-neutral-300"
                          style={{ backgroundColor: v.hex }}
                        />
                      )}
                      <span>{v.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Pack Size Selector */}
            {part.packOptions && part.packOptions.length > 1 && (
              <div className="mt-5 space-y-2">
                <label className="text-xs font-semibold text-neutral-700 flex justify-between">
                  <span>Pack Size Options:</span>
                  <strong className="text-moss">{selectedPack?.label}</strong>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {part.packOptions.map((pkg) => (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedPack(pkg)}
                      className={`p-3 text-xs rounded-xl border text-left transition ${
                        selectedPack?.id === pkg.id
                          ? "border-moss bg-brand-50 text-forest font-semibold ring-1 ring-moss shadow-2xs"
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

            {/* Stepper, Add to Cart & Buy Now */}
            <div className="mt-6 pt-5 border-t border-neutral-100 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                {/* Stepper */}
                <div className="flex items-center rounded-xl border border-neutral-300 bg-white shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3.5 py-2.5 text-base font-bold text-neutral-600 hover:bg-neutral-100 active:scale-95 transition rounded-l-xl"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-forest">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                    className="px-3.5 py-2.5 text-base font-bold text-neutral-600 hover:bg-neutral-100 active:scale-95 transition rounded-r-xl"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Primary Add to Cart Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="btn btn-dark flex-1 !min-h-12 text-sm font-semibold justify-center shadow-md hover:scale-[1.01] transition"
                >
                  <Icon name="tools" size={16} className="text-lime" />
                  <span>
                    {inCartQty > 0
                      ? `Add More (${quantity}) • ${money(lineTotalPrice)}`
                      : `Add to Cart • ${money(lineTotalPrice)}`}
                  </span>
                </button>
              </div>

              {/* View Cart Direct Button (Active when cart has items) */}
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

              {/* Buy Now / Instant Checkout */}
              <button
                type="button"
                onClick={handleBuyNow}
                className="btn btn-outline w-full !min-h-11 text-xs font-semibold justify-center shadow-xs"
              >
                Instant Buy & Checkout <Arrow />
              </button>

              {/* Added to Cart Feedback Toast */}
              {addedNotice && (
                <div className="rounded-xl bg-lime/20 border border-lime p-3 text-center text-xs font-semibold text-moss animate-appear flex items-center justify-between gap-2">
                  <span>✓ Added {quantity} item(s) to your cart!</span>
                  <a href="/cart" className="underline font-bold text-forest hover:text-moss">
                    View Cart →
                  </a>
                </div>
              )}

              {/* In-Cart Status Banner */}
              {inCartQty > 0 && !addedNotice && (
                <div className="rounded-xl bg-brand-50 border border-brand-line p-3 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="size-5 rounded-full bg-lime text-forest font-bold text-[10px] flex items-center justify-center">
                      ✓
                    </span>
                    <span className="text-forest font-medium">
                      <strong className="font-bold">{inCartQty}</strong> in your cart.
                    </span>
                  </div>
                  <a href="/cart" className="text-xs font-bold text-moss hover:underline flex items-center gap-1 shrink-0">
                    View Cart <Arrow />
                  </a>
                </div>
              )}
            </div>

            {/* Warehouse Dispatch Note */}
            <div className="mt-5 rounded-xl border border-neutral-100 bg-neutral-50 p-3.5 text-xs text-neutral-600 space-y-1.5">
              <div className="flex items-center gap-2 font-medium text-forest">
                <Icon name="truck" size={15} className="text-moss" />
                <span>Dispatches next business day from North Island Hub</span>
              </div>
              <p className="text-[11px] text-neutral-500">
                Tracked courier tracking link sent immediately upon parcel scan.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="mt-16">
          <div className="border-b border-neutral-200 flex gap-6 overflow-x-auto" role="tablist">
            {[
              ["specs", "Specifications"],
              ["compatibility", "Compatibility & How to Measure"],
              ["diy", "DIY Installation Guide"],
              ["reviews", `Customer Reviews (${part.reviewsCount})`],
            ].map(([tabId, tabLabel]) => (
              <button
                key={tabId}
                role="tab"
                aria-selected={activeTab === tabId}
                onClick={() => setActiveTab(tabId)}
                className={`pb-3 text-sm font-bold transition border-b-2 -mb-px whitespace-nowrap ${
                  activeTab === tabId
                    ? "border-forest text-forest"
                    : "border-transparent text-neutral-400 hover:text-neutral-700"
                }`}
              >
                {tabLabel}
              </button>
            ))}
          </div>

          <div className="py-8">
            {/* Tab 1: Specifications */}
            {activeTab === "specs" && (
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <table className="w-full text-xs border-collapse">
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
                    <tr className="border-b border-neutral-100">
                      <td className="py-3 font-semibold text-forest">Compliance</td>
                      <td className="py-3 text-neutral-600">NZ Child Safety Regulations Compliant</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold text-forest">Dispatch Warehouse</td>
                      <td className="py-3 text-neutral-600">Te Kauwhata, Waikato, New Zealand</td>
                    </tr>
                  </tbody>
                </table>

                <div className="card bg-brand-50/70 p-6 border border-brand-line">
                  <h3 className="!text-base font-bold text-forest mb-2">Key Features</h3>
                  <ul className="space-y-2.5 text-xs text-neutral-700">
                    {part.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2">
                        <Icon name="check" size={15} className="text-moss shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-4 border-t border-neutral-200/60 flex items-center justify-between text-xs">
                    <span className="text-neutral-500">Need sizing confirmation?</span>
                    <a href={contact.emailHref} className="text-moss font-bold hover:underline">
                      Email our technicians →
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Compatibility & Measuring */}
            {activeTab === "compatibility" && (
              <div className="space-y-6 text-xs text-neutral-700 max-w-3xl leading-relaxed">
                <div>
                  <h3 className="!text-lg font-bold text-forest mb-2">How to Verify Compatibility</h3>
                  <p>{part.compatibilityNotes}</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="card bg-white p-5 border border-brand-line shadow-2xs">
                    <div className="size-8 rounded-full bg-brand-100 text-moss font-bold flex items-center justify-center text-sm mb-3">
                      1
                    </div>
                    <strong className="text-forest text-sm block mb-1">Check Tube Outer Diameter (OD)</strong>
                    <p className="text-neutral-600 text-xs">
                      Measure across the metal edge of the open circular tube. 38mm tubes measure approx 1.5 inches; 32mm tubes measure 1.25 inches.
                    </p>
                  </div>

                  <div className="card bg-white p-5 border border-brand-line shadow-2xs">
                    <div className="size-8 rounded-full bg-brand-100 text-moss font-bold flex items-center justify-center text-sm mb-3">
                      2
                    </div>
                    <strong className="text-forest text-sm block mb-1">Inspect Internal Spline Teeth</strong>
                    <p className="text-neutral-600 text-xs">
                      Check inside the tube for extruded ribs. Our replacement clutches feature universal splines matching standard NZ blind tubes.
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-brand-line bg-brand-50/60 p-4 flex items-start gap-3">
                  <Icon name="shield" size={20} className="text-moss shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-forest font-semibold block">30-Day NZ Fit Guarantee</strong>
                    <span className="text-neutral-600 text-xs">
                      If you order this part and find it does not match your blind, return it in original condition for an immediate exchange or refund.
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: DIY Installation Guide */}
            {activeTab === "diy" && (
              <div className="max-w-3xl space-y-6">
                <h3 className="!text-lg font-bold text-forest">DIY 5-Minute Installation Steps</h3>
                <div className="space-y-4">
                  {[
                    {
                      step: "1",
                      title: "Unclip the blind from its mounting brackets",
                      desc: "Roll the blind fabric all the way up, release the idler pin clip or slide the blind out of the wall brackets.",
                    },
                    {
                      step: "2",
                      title: "Extract the broken mechanism",
                      desc: "Firmly pull the old clutch or idler pin straight out from the end of the aluminium roller tube.",
                    },
                    {
                      step: "3",
                      title: "Slide the new replacement part into the tube",
                      desc: "Align the ribs on the clutch body with the internal splines in your aluminium tube, and push firmly until the collar sits flush.",
                    },
                    {
                      step: "4",
                      title: "Click back into place and test operation",
                      desc: "Slide the blind back into the brackets until it clicks securely. Pull the chain or wand to ensure smooth rotation.",
                    },
                  ].map((s) => (
                    <div key={s.step} className="flex gap-4 items-start card bg-white p-4 border border-brand-line">
                      <div className="size-7 rounded-full bg-forest text-lime font-bold flex items-center justify-center text-xs shrink-0">
                        {s.step}
                      </div>
                      <div>
                        <strong className="text-forest text-sm block">{s.title}</strong>
                        <p className="text-neutral-600 text-xs mt-0.5">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: Verified NZ Reviews */}
            {activeTab === "reviews" && (
              <div className="max-w-3xl space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-brand-50 border border-brand-line">
                  <div>
                    <div className="text-3xl font-bold text-forest">{part.rating} / 5.0</div>
                    <div className="flex text-amber-400 text-base mt-1">★★★★★</div>
                    <p className="text-xs text-neutral-500 mt-1">Based on {part.reviewsCount} verified New Zealand customer reviews</p>
                  </div>
                  <div className="text-right">
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-moss border border-brand-line shadow-2xs">
                      100% Verified Purchases
                    </span>
                  </div>
                </div>

                <div className="divide-y divide-neutral-100">
                  {reviews.map((rev) => (
                    <div key={rev.name} className="py-4 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <strong className="text-forest text-xs font-bold">{rev.name}</strong>
                          <span className="text-[11px] text-neutral-400">({rev.city})</span>
                          <span className="rounded bg-lime/20 text-moss px-1.5 py-0.2 text-[10px] font-semibold">
                            Verified Buyer
                          </span>
                        </div>
                        <span className="text-[11px] text-neutral-400">{rev.date}</span>
                      </div>
                      <div className="flex text-amber-400 text-xs">
                        {"★".repeat(rev.rating)}
                      </div>
                      <strong className="text-forest text-xs block">{rev.title}</strong>
                      <p className="text-neutral-600 text-xs leading-relaxed">{rev.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Free Photo Identification Banner */}
        <div className="mt-12 rounded-2xl bg-forest p-8 text-white sm:p-10">
          <div className="grid items-center gap-6 lg:grid-cols-[1.3fr_auto]">
            <div>
              <span className="eyebrow !text-lime">Free Expert Identification</span>
              <h2 className="!text-2xl sm:!text-3xl font-serif text-white mt-1">
                Unsure if this exact part will fit?
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-white/80 max-w-xl">
                Take a quick photo of your broken mechanism beside a ruler and email our technicians. We’ll verify the fitting within 1 hour so you can order with 100% confidence.
              </p>
            </div>
            <a href={contact.emailHref} className="btn bg-lime text-forest font-bold text-xs hover:bg-lime/90 shrink-0">
              Email Photo for Sizing Check <Arrow />
            </a>
          </div>
        </div>

        {/* Frequently Bought Together / Related Parts */}
        {relatedParts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-neutral-200">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <span className="eyebrow">Frequently Bought Together</span>
                <h2 className="!text-2xl font-serif text-forest">Complementary Blinds Parts & Hardware</h2>
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
