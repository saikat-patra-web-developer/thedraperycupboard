import { useState } from "react";
import Icon from "../components/ui/Icon.jsx";
import Img from "../components/ui/Image.jsx";
import Button from "../components/ui/Button.jsx";
import Cta from "../components/sections/CallToAction.jsx";
import Faq from "../components/ui/FaqAccordion.jsx";
import ProductGrid from "../components/products/ProductGrid.jsx";
import NotFoundPage from "./NotFoundPage.jsx";
import { findProduct } from "../data/products.js";

export default function ProductDetailPage({ id }) {
  const product = findProduct(id);
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  if (!product) return <NotFoundPage />;
  const quoteUrl = "/contact?product=" + encodeURIComponent(product.name);
  const photos = product.gallery;
  const image = photos[selectedPhoto] || photos[0];
  const related = product.related.map(findProduct).filter(Boolean);
  return <>
    <section className="wrap py-7 md:py-10">
      <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap gap-3 text-sm text-neutral-500">
        <a href="/">Home</a><span>›</span><a href="/products">Products</a><span>›</span><span aria-current="page" className="text-forest">{product.name}</span>
      </nav>
      <div className="grid gap-9 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
        <div className="min-w-0">
          <div className="relative overflow-hidden rounded-xl">
            <Img name={image} priority sizes="(max-width: 767px) 100vw, 60vw" alt={product.name + " in a styled space"} className="aspect-[1.5] w-full" />
            <span className="absolute left-4 top-4 rounded-lg bg-white/95 px-4 py-2 text-xs font-bold uppercase tracking-wider text-moss">{product.category}</span>
          </div>
          {photos.length > 1 && <div className="mt-4 flex gap-3 overflow-x-auto" aria-label={product.name + " gallery"}>
            {photos.map((photo,index) => <button key={photo} onClick={() => setSelectedPhoto(index)} aria-label={"View " + product.name + " image " + (index + 1)} aria-pressed={selectedPhoto === index}
              className={"shrink-0 overflow-hidden rounded-lg border-2 " + (selectedPhoto === index ? "border-moss" : "border-transparent")}>
              <Img name={photo} alt="" sizes="96px" className="h-16 w-24" />
            </button>)}
          </div>}
          <p className="mt-3 text-xs text-neutral-500">Illustrative setting. Fabrics, finishes and configurations are selected with your quote.</p>
        </div>
        <div className="py-2">
          <div className="eyebrow">{product.category}</div><h1 className="!text-4xl sm:!text-[42px]">{product.name}</h1>
          <p className="muted mt-5">{product.description}</p>
          <ul className="my-7 space-y-3">{product.benefits.map(benefit => <li key={benefit} className="flex gap-3 text-base"><Icon size={19} className="text-moss" />{benefit}</li>)}</ul>
          <div className="rounded-xl bg-[#eeede7] p-5"><p className="text-base font-semibold">A quote tailored to your space</p><p className="muted mt-1 !text-sm">Share your measurements and preferences for product options and pricing.</p></div>
          <div className="mt-6 flex flex-wrap gap-3"><Button to="/online-quote" dark>Get a Free Quote</Button><Button to="/contact" outline>Talk to Our Team</Button></div>
        </div>
      </div>
      <div className="my-12 grid gap-9 rounded-xl bg-[#f0efeb] p-6 lg:grid-cols-3 lg:p-9">
        {product.options.map(([title,text]) => <div key={title}><Icon name="blinds" className="mb-4 text-moss" /><h3 className="!text-xl">{title}</h3><p className="muted mt-3">{text}</p></div>)}
      </div>
      <div className="grid gap-10 pb-12 lg:grid-cols-[1.1fr_1fr]">
        <div><div className="eyebrow">Designed around your needs</div><h2>Discover {product.name}</h2><p className="muted mt-5">{product.detail}</p>
          <h3 className="mt-7 !text-xl">Care & Maintenance</h3><p className="muted mt-3">{product.care}</p>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-6">
          <h3 className="mb-5">Product at a Glance</h3>
          <dl className="space-y-5">{[["Best suited to",product.bestFor],["Light control",product.light],["Operation",product.movement],["Sizing & availability","Confirmed for your measurements and selected configuration."]].map(([title,text]) => <div key={title}><dt className="text-sm font-semibold text-moss">{title}</dt><dd className="muted mt-1">{text}</dd></div>)}</dl>
        </div>
      </div>
      <div className="grid gap-9 border-t border-neutral-200 py-12 lg:grid-cols-[1.6fr_1fr]">
        <div><h2 className="mb-4 !text-3xl">Your Questions, Answered</h2><Faq items={product.faqs} /></div>
        <div className="rounded-xl bg-[#eeede7] p-7"><h3>Let’s Find the Right Fit</h3><p className="muted my-4">Tell us about your space and what you want to achieve. We’ll help you choose the right product and finish.</p><Button to={quoteUrl}>Enquire About {product.name}</Button></div>
      </div>
      <section className="pb-10"><div className="eyebrow">Explore more</div><h2 className="mb-6">You May Also Like</h2><ProductGrid full items={related} /></section>
    </section>
    <Cta />
  </>;
}
