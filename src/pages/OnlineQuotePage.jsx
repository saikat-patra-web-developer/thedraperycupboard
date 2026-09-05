import { useEffect, useState } from "react";
import { findProduct } from "../data/products.js";
import Img from "../components/ui/Image.jsx";
import Icon from "../components/ui/Icon.jsx";
import Arrow from "../components/ui/Arrow.jsx";
import { contact } from "../data/contact.js";

const money = amount => new Intl.NumberFormat("en-NZ", { style: "currency", currency: "NZD" }).format(amount);
const newWindow = id => ({ id, product: "roller-blinds", width: "", drop: "" });
const priceApiUrl = "https://quotemyblinds.com/api/api/p/price";
const webApiKey = "pmfQCWPkw1q";
const quoteProducts = [
  { slug: "roller-blinds", name: "Roller Blinds", apiType: "roller" },
  { slug: "sunfilter-blinds", name: "Sunfilter Blinds", apiType: "sunfilter" },
  { slug: "vertical-blinds", name: "Vertical Blinds", apiType: "vertical" },
  { slug: "venetian-blinds", name: "Venetian Blinds", apiType: "venetian" },
  { slug: "curtains", name: "Curtains", apiType: "curtains" },
  { slug: "roman-curtains", name: "Roman Curtains", apiType: "roman_curtains" },
  { slug: "zebra-blinds", name: "Zebra Blinds", apiType: "zebra" },
  { slug: "honeycomb-blinds", name: "Honeycomb Blinds", apiType: "honeycomb" },
  { slug: "verishade", name: "Verishade", apiType: "verishade" },
  { slug: "roman-shades", name: "Roman Shades", apiType: "roman_shades" },
  { slug: "shutters", name: "Shutters", apiType: "shutters" },
  { slug: "pergola", name: "Pergola", apiType: "pergola" },
  { slug: "outdoor-shades", name: "Outdoor Shades", apiType: "outdoor" },
];

function hasMeasurements(window) {
  const width = Number(window.width);
  const drop = Number(window.drop);
  return Number.isFinite(width) && Number.isFinite(drop) && width > 0 && drop > 0;
}

function MeasurementGuide() {
  return <section className="rounded-xl border border-[#dedfd7] bg-white p-5 sm:p-6" aria-labelledby="measurement-guide-title">
    <div id="measurement-guide-title" className="flex min-h-11 items-center gap-3 text-sm font-semibold"><Icon name="blinds" size={22} className="text-moss" />How to measure your window</div>
    <div className="mt-5 grid items-center gap-6 border-t border-neutral-100 pt-5 sm:grid-cols-[150px_1fr]">
      <svg viewBox="0 0 180 180" role="img" aria-label="Measure width horizontally and drop vertically" className="mx-auto w-40 text-moss" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M30 45h100v110H30zM35 52h90M35 60h90M35 68h90M35 76h90M35 84h90M35 92h90M80 96v54" />
        <path d="M30 30h100m-94-5-6 5 6 5m88-10 6 5-6 5M148 45v110m-5-104 5-6 5 6m-10 98 5 6 5-6" />
        <text x="80" y="18" textAnchor="middle" fill="currentColor" stroke="none" fontSize="11">WIDTH</text>
        <text x="166" y="100" textAnchor="middle" dominantBaseline="middle" fill="currentColor" stroke="none" fontSize="10" letterSpacing="0.6" transform="rotate(-90 166 100)">DROP</text>
      </svg>
      <div className="space-y-3 text-sm leading-relaxed text-neutral-600"><p><strong className="text-forest">Width:</strong> measure from left to right. <strong className="text-forest">Drop:</strong> measure from top to bottom.</p><p>Enter millimetres: 1,000 mm = 1 metre. Use your approximate dimensions for this estimate; we’ll confirm the final measurements and mounting position before ordering.</p><p className="text-xs">For outdoor products, use the proposed opening dimensions and ask our team to confirm the configuration.</p></div>
    </div>
  </section>;
}

export default function OnlineQuotePage() {
  const [windows, setWindows] = useState([newWindow(1)]);
  const [pricing, setPricing] = useState({});
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "", address: "", note: "" });
  useEffect(() => {
    if (!showEnquiry) return;
    const closeOnEscape = event => {
      if (event.key === "Escape") setShowEnquiry(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [showEnquiry]);
  useEffect(() => {
    const controller = new AbortController();
    const validWindows = windows.filter(hasMeasurements);

    const timer = setTimeout(() => {
      setPricing(current => ({
        ...current,
        ...Object.fromEntries(validWindows.map(window => [window.id, { status: "loading" }])),
      }));
      validWindows.forEach(async window => {
        const product = quoteProducts.find(item => item.slug === window.product);
        const params = new URLSearchParams({
          web_api_key: webApiKey,
          width: window.width,
          drop: window.drop,
          blinds_type: product.apiType,
        });

        try {
          const response = await fetch(`${priceApiUrl}?${params}`, { signal: controller.signal });
          if (!response.ok) throw new Error(`Pricing request failed (${response.status})`);
          const data = await response.json();
          const price = Number(data.price);
          if (!Number.isFinite(price) || price < 0) throw new Error("Invalid pricing response");
          setPricing(current => ({ ...current, [window.id]: { status: "success", total: price } }));
        } catch (error) {
          if (error.name !== "AbortError") {
            setPricing(current => ({ ...current, [window.id]: { status: "error" } }));
          }
        }
      });
    }, 350);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [windows]);
  const results = windows.map(window => pricing[window.id]?.status === "success" ? pricing[window.id] : null);
  const ready = windows.every(window => pricing[window.id]?.status === "success");
  const total = results.reduce((sum, result) => sum + Math.round((result?.total || 0) * 100), 0) / 100;
  function update(id, field, value) {
    setPricing(current => ({ ...current, [id]: { status: "idle" } }));
    setWindows(current => current.map(window => window.id === id ? { ...window, [field]: value } : window));
  }
  function addWindow(copy) {
    setWindows(current => [...current, { ...(copy || newWindow(0)), id: Math.max(...current.map(window => window.id)) + 1 }]);
  }
  function updateCustomer(field, value) {
    setCustomer(current => ({ ...current, [field]: value }));
  }
  const summary = windows.map((window, index) => `${`Window ${index + 1}`}: ${findProduct(window.product).name}, ${window.width} mm wide × ${window.drop} mm drop, estimate ${money(results[index]?.total || 0)}`).join("\n");
  const customerDetails = `Name: ${customer.name}\nEmail: ${customer.email}\nPhone: ${customer.phone}\nAddress: ${customer.address}\nNote: ${customer.note}`;
  const emailHref = `${contact.emailHref}?subject=${encodeURIComponent("Online blinds estimate enquiry")}&body=${encodeURIComponent("Customer details:\n" + customerDetails + "\n\nPlease confirm my blinds estimate:\n\n" + summary + "\n\nEstimated total: " + money(total) + " NZD\nPlease confirm final options, charges and measurements.")}`;

  return <>
    <section className="relative overflow-hidden bg-forest text-white">
      <Img name="dining" alt="Made-to-measure blinds in a light-filled dining room" priority sizes="100vw" className="absolute inset-0 h-full w-full object-[center_55%]" />
      <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/90 to-forest/35" />
      <div className="wrap relative py-10 sm:py-14">
        <div className="eyebrow !text-lime">Your space. Your measurements.</div>
        <h1 className="max-w-xl !text-4xl sm:!text-5xl">Beautiful blinds.<br />A clearer idea of price.</h1>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-white/80">Build your estimate in a few simple steps. Choose your style, add your measurements and see your price instantly.</p>
        <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/90">{["Instant estimate", "Made to measure", "No obligation"].map(text => <span key={text} className="flex items-center gap-2"><Icon size={17} className="text-lime" />{text}</span>)}</div>
      </div>
    </section>
    <section className="wrap py-8 sm:py-12">
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#e2e3da] bg-[#f0f2e9] px-5 py-4">
        <p className="flex items-start gap-3 text-sm leading-relaxed text-neutral-600"><Icon name="shield" size={20} className="text-moss" /><span><strong className="text-forest">Preview pricing.</strong> Custom options such as motorisation, heavy-duty tubes, and fabric quality may affect the price. Our team will confirm your final quote.</span></p>
        <span className="shrink-0 text-sm font-semibold text-moss">All prices in NZD</span>
      </div>
      <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] lg:gap-9">
        <div className="min-w-0 space-y-5">
          <div className="mb-6 flex items-end justify-between gap-4"><div><h2 className="!text-3xl">Let’s find your perfect fit.</h2></div><span className="shrink-0 rounded-full bg-white px-3 py-2 text-xs text-neutral-500">{windows.length} {windows.length === 1 ? 'window' : 'windows'}</span></div>
          {windows.map((window, index) => {
            const result = results[index];
            const product = findProduct(window.product);
            return <fieldset key={window.id} className="min-w-0 overflow-hidden rounded-2xl border border-[#e0e2da] bg-white shadow-[0_3px_18px_#102a2305]">
              <legend className="sr-only">Window {index + 1}</legend>
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 px-5 py-3 sm:px-6"><div className="flex items-center gap-3"><span className="flex size-8 items-center justify-center rounded-full bg-[#edf2e7] text-xs font-bold text-moss">{String(index + 1).padStart(2,'0')}</span><h3 className="!font-sans !text-sm !font-semibold !tracking-normal">{`Window ${index + 1}`}</h3></div><div className="flex items-center gap-3"><button type="button" className="min-h-11 text-xs font-semibold text-moss" onClick={() => addWindow(window)} aria-label={`Duplicate window ${index + 1}`}>Duplicate</button>{windows.length > 1 && <button type="button" className="min-h-11 text-xs text-neutral-500 underline" aria-label={`Remove window ${index + 1}`} onClick={() => setWindows(current => current.filter(item => item.id !== window.id))}>Remove</button>}</div></div>
              <div className="p-5 sm:p-6">
                <div className="grid items-center gap-4 rounded-xl bg-[#f7f7f3] p-3 sm:grid-cols-[100px_minmax(0,1fr)] sm:p-4">
                  <Img name={product.image} alt={product.name} sizes="(max-width: 639px) 100vw, 100px" className="h-36 w-full rounded-lg sm:h-24" />
                  <div className="grid min-w-0 gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(110px,.7fr)_minmax(110px,.7fr)]">
                    <div className="min-w-0"><label htmlFor={`product-${window.id}`} className="font-semibold">Choose your product</label><select id={`product-${window.id}`} className="mt-2 !text-base" value={window.product} onChange={event => update(window.id,'product',event.target.value)}>{quoteProducts.map(item => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select><p className="mt-2 text-xs text-moss">Live product pricing</p></div>
                    {[['width','Width','e.g. 1500'],['drop','Drop / height','e.g. 2000']].map(([field,label,placeholder]) => {
                      const value = Number(window[field]);
                      const invalid = window[field] !== '' && (!Number.isFinite(value) || value <= 0);
                      return <label key={field} htmlFor={`${field}-${window.id}`}>{label} (mm)<input id={`${field}-${window.id}`} aria-invalid={invalid} aria-describedby={invalid ? `error-${field}-${window.id}` : undefined} className="!text-base aria-invalid:border-red-600" type="number" inputMode="decimal" min="0" step="any" value={window[field]} placeholder={placeholder} onChange={event => update(window.id,field,event.target.value)} />{invalid && <span id={`error-${field}-${window.id}`} className="mt-2 block text-xs text-red-700">Enter a measurement greater than zero.</span>}</label>;
                    })}
                    <p className="text-xs leading-relaxed text-neutral-500 md:col-span-3">Includes tube, bottom rail, end caps, brackets, chain, and standard fittings.</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#e9ede3] bg-[#f4f7ef] px-5 py-4 sm:px-6"><div><p className="text-xs font-semibold text-forest">Window estimate</p><p className={`mt-1 text-xs ${pricing[window.id]?.status === 'error' ? 'text-red-700' : 'text-neutral-500'}`}>{pricing[window.id]?.status === 'loading' ? 'Calculating live price…' : pricing[window.id]?.status === 'error' ? 'Price unavailable. Check your connection or measurements.' : result ? `${window.width} × ${window.drop} mm · Live price` : 'Add your measurements to calculate.'}</p></div><span className="text-xl font-semibold tabular-nums text-forest">{pricing[window.id]?.status === 'loading' ? '…' : result ? money(result.total) : '—'}</span></div>
            </fieldset>;
          })}
          <button type="button" className="flex min-h-16 w-full items-center justify-center gap-3 rounded-xl border border-dashed border-moss/40 bg-white px-5 py-4 text-sm font-semibold text-moss transition hover:border-moss hover:bg-[#f0f2e9]" onClick={() => addWindow()}><span className="text-xl" aria-hidden="true">+</span>Add Another Window</button>
          <MeasurementGuide />
        </div>
        <aside className="min-w-0 space-y-5 lg:sticky lg:top-6" aria-label="Quote summary">
          <div className="overflow-hidden rounded-2xl border border-[#dce0d4] bg-white shadow-[0_8px_30px_#102a2308]">
            <div className="bg-forest p-6 text-white sm:p-7"><h2 className="!text-3xl">Quote Summary</h2></div>
            <div className="p-6 sm:p-7">
              <div className="max-h-72 space-y-4 overflow-y-auto pr-1">{windows.map((window,index) => <div key={window.id} className="flex items-start justify-between gap-4 border-b border-neutral-100 pb-4 text-sm"><div className="min-w-0"><p className="break-words font-semibold">{`Window ${index + 1}`}</p><p className="mt-1 text-xs text-neutral-500">{findProduct(window.product).name}</p><p className="mt-1 text-xs text-neutral-500">{results[index] ? `${window.width} × ${window.drop} mm` : 'Measurements needed'}</p></div><span className="shrink-0 font-semibold tabular-nums">{results[index] ? money(results[index].total) : '—'}</span></div>)}</div>
              <div className="py-6" aria-live="polite" aria-atomic="true"><p className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">Estimated total</p><p className="text-4xl font-semibold tracking-tight text-forest tabular-nums">{ready ? money(total) : '—'} <span className="text-xs font-normal tracking-normal text-neutral-500">NZD</span></p><p className="mt-2 text-xs text-neutral-500">{ready ? 'Based on your selected products and measurements.' : 'Complete all measurements to see your total.'}</p></div>
              {ready ? <button className="btn w-full" type="button" onClick={() => setShowEnquiry(true)}>Enquire About This Quote <Arrow /></button> : <button type="button" disabled className="btn w-full cursor-not-allowed opacity-50">Enquire About This Quote <Arrow /></button>}
              <p className="mt-3 text-center text-xs leading-relaxed text-neutral-500">Custom options such as motorisation, heavy-duty tubes, and fabric quality may affect the price. Our team will confirm your final quote.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-xl bg-[#edf0e7] p-5"><Icon name="headset" className="text-moss" /><div><h3 className="!font-sans !text-sm !font-semibold !tracking-normal">A little help from our team?</h3><p className="mt-2 text-xs leading-relaxed text-neutral-600">We can help with product choices and measurements.</p><a href={contact.phones[0].href} className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-moss">{contact.phones[0].label} <Arrow /></a></div></div>
        </aside>
      </div>
    </section>
    {showEnquiry && ready && <div className="fixed inset-0 z-50 flex items-center justify-center bg-forest/70 p-4 backdrop-blur-sm" role="presentation" onMouseDown={() => setShowEnquiry(false)}>
      <div className="max-h-[calc(100vh-2rem)] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="enquiry-title" onMouseDown={event => event.stopPropagation()}>
        <div className="flex items-center justify-between gap-4 border-b border-neutral-100 bg-[#f7f8f4] px-5 py-4 sm:px-6">
          <div><p className="mb-1 text-[10px] font-bold uppercase tracking-[.14em] text-moss">Almost there</p><h2 id="enquiry-title" className="!text-2xl">Confirm your enquiry</h2><p className="mt-1 text-xs text-neutral-500">Tell us where to send your personalised quote.</p></div>
          <button type="button" className="flex size-11 shrink-0 items-center justify-center rounded-full text-2xl text-neutral-500 hover:bg-neutral-100" aria-label="Close enquiry form" onClick={() => setShowEnquiry(false)}>×</button>
        </div>
        <form className="p-5 sm:p-6" onSubmit={event => { event.preventDefault(); window.location.href = emailHref; }}>
          <p className="mb-5 text-xs text-neutral-500"><span className="font-semibold text-forest">*</span> Required information</p>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="font-semibold text-forest">Name <span aria-hidden="true" className="text-moss">*</span><input autoFocus required autoComplete="name" placeholder="Your full name" className="!mt-2 min-h-12 font-normal focus:border-moss focus:outline-none focus:ring-2 focus:ring-lime/30" value={customer.name} onChange={event => updateCustomer('name', event.target.value)} /></label>
            <label className="font-semibold text-forest">Email <span aria-hidden="true" className="text-moss">*</span><input required type="email" autoComplete="email" placeholder="you@example.com" className="!mt-2 min-h-12 font-normal focus:border-moss focus:outline-none focus:ring-2 focus:ring-lime/30" value={customer.email} onChange={event => updateCustomer('email', event.target.value)} /></label>
            <label className="font-semibold text-forest">Phone <span aria-hidden="true" className="text-moss">*</span><input required type="tel" autoComplete="tel" placeholder="e.g. 021 123 4567" className="!mt-2 min-h-12 font-normal focus:border-moss focus:outline-none focus:ring-2 focus:ring-lime/30" value={customer.phone} onChange={event => updateCustomer('phone', event.target.value)} /></label>
            <label className="font-semibold text-forest">Address <span aria-hidden="true" className="text-moss">*</span><input required autoComplete="street-address" placeholder="Installation address" className="!mt-2 min-h-12 font-normal focus:border-moss focus:outline-none focus:ring-2 focus:ring-lime/30" value={customer.address} onChange={event => updateCustomer('address', event.target.value)} /></label>
            <label className="font-semibold text-forest sm:col-span-2"><span className="flex items-center justify-between gap-3"><span>Note</span><span className="text-[10px] font-normal uppercase tracking-wider text-neutral-400">Optional</span></span><textarea rows={3} placeholder="Add access details, preferences, or questions for our team" className="!mt-2 resize-y font-normal focus:border-moss focus:outline-none focus:ring-2 focus:ring-lime/30" value={customer.note} onChange={event => updateCustomer('note', event.target.value)} /></label>
          </div>
          <div className="mt-6 rounded-xl bg-[#f4f7ef] p-4 text-xs leading-relaxed text-neutral-600"><strong className="text-forest">Estimated total: {money(total)} NZD</strong><br />We’ll review your measurements and confirm the final price with you.</div>
          <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
            <button type="button" className="min-h-11 px-5 text-xs font-semibold text-neutral-500 hover:text-forest" onClick={() => setShowEnquiry(false)}>Cancel</button>
            <button className="btn sm:min-w-48" type="submit">Confirm Enquiry <Arrow /></button>
          </div>
        </form>
      </div>
    </div>}
  </>;
}
