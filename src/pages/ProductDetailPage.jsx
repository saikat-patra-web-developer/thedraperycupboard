import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import Icon from "../components/ui/Icon.jsx";
import Img from "../components/ui/Image.jsx";
import Button from "../components/ui/Button.jsx";
import Cta from "../components/sections/CallToAction.jsx";
import Faq from "../components/ui/FaqAccordion.jsx";
import ProductGrid from "../components/products/ProductGrid.jsx";
import NotFoundPage from "./NotFoundPage.jsx";
import { findProduct, products } from "../data/products.js";
import { getProductVariations } from "../data/productVariations.js";
import { contact } from "../data/contact.js";
import { EASE_PREMIUM } from "../components/motion/motionVariants.js";
import ProductTypeColorSelector from "../components/products/ProductTypeColorSelector.jsx";

export default function ProductDetailPage({ id }) {
  const shouldReduceMotion = useReducedMotion();
  const product = findProduct(id);
  const initialVariations = product ? getProductVariations(product.slug) : null;
  const initialType = initialVariations?.types?.[0] || null;
  const initialColor = initialType?.colors?.[0] || null;
  const [selectedVariation, setSelectedVariation] = useState(() =>
    initialType && initialColor ? { type: initialType, color: initialColor } : null
  );
  if (!product) return <NotFoundPage />;
  const quoteUrl = selectedVariation?.color
    ? `/online-quote?product=${encodeURIComponent(product.slug)}&type=${encodeURIComponent(selectedVariation.type.id)}&color=${encodeURIComponent(selectedVariation.color.name)}`
    : "/online-quote";
  const photos = product.gallery;
  const image = photos[0];
  const rawRelated = (product.related || []).map(findProduct).filter(Boolean);
  const existingSlugs = new Set([product.slug, ...rawRelated.map((p) => p.slug)]);
  const fallbackCandidates = products.filter((p) => !existingSlugs.has(p.slug));
  const related = [...rawRelated, ...fallbackCandidates].slice(0, 5);

  return <>
    <section className="wrap py-7 md:py-10">
      <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap gap-3 text-sm text-neutral-500">
        <a href="/">Home</a><span>›</span><a href="/products">Products</a><span>›</span><span aria-current="page" className="text-forest">{product.name}</span>
      </nav>
      <div className="grid gap-9 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_PREMIUM }}
          className="min-w-0"
        >
          <div className="relative overflow-hidden rounded-xl">
            <Img name={image} priority sizes="(max-width: 767px) 100vw, 60vw" alt={product.name + " in a styled space"} className="aspect-[1.5] w-full object-cover transition-transform duration-500 hover:scale-102" />
            <span className="absolute left-4 top-4 rounded-lg bg-white/95 px-4 py-2 text-xs font-bold uppercase tracking-wider text-moss">{product.category}</span>
            {selectedVariation?.color && (
              <div className="absolute right-3.5 bottom-3.5 flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-forest shadow-md backdrop-blur-xs border border-black/5">
                <span
                  className="size-3 rounded-full border border-black/10 shadow-2xs shrink-0"
                  style={{ backgroundColor: selectedVariation.color.hex }}
                />
                <span className="truncate max-w-[210px]">
                  {selectedVariation.type.name} · {selectedVariation.color.name}
                </span>
              </div>
            )}
          </div>
          {/* Interactive Blinds Type & Color Selector for all products */}
          <ProductTypeColorSelector
            key={product.slug}
            product={product}
            onSelectionChange={(selection) => setSelectedVariation(selection)}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.15, ease: EASE_PREMIUM }}
          className="py-2"
        >
          <div className="eyebrow">{product.category}</div><h1 className="!text-4xl sm:!text-[42px]">{product.name}</h1>
          <p className="muted mt-5">{product.description}</p>
          <ul className="my-7 space-y-3">{product.benefits.map(benefit => <li key={benefit} className="flex gap-3 text-base"><Icon size={19} className="text-moss shrink-0 mt-0.5" />{benefit}</li>)}</ul>
          <div className="rounded-xl bg-brand-50 p-5"><p className="text-base font-semibold">A quote tailored to your space</p><p className="muted mt-1 !text-sm">Share your measurements and preferences for product options and pricing.</p></div>
          <div className="mt-6 flex flex-wrap gap-3"><Button to={quoteUrl} dark>Get a Free Quote</Button><Button to="/contact" outline>Talk to Our Team</Button></div>
        </motion.div>
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } },
        }}
        className="my-12 grid gap-9 rounded-xl bg-brand-50 p-6 lg:grid-cols-3 lg:p-9"
      >
        {product.options.map(([title,text]) => (
          <motion.div
            variants={{
              hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_PREMIUM } },
            }}
            key={title}
          >
            <Icon name="blinds" className="mb-4 text-moss" />
            <h3 className="!text-xl">{title}</h3>
            <p className="muted mt-3">{text}</p>
          </motion.div>
        ))}
      </motion.div>
      <div className="grid gap-10 pb-12 lg:grid-cols-[1.1fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: EASE_PREMIUM }}
        >
          <div className="eyebrow">Designed around your needs</div><h2>Discover {product.name}</h2><p className="muted mt-5">{product.detail}</p>
          <h3 className="mt-7 !text-xl">Care & Maintenance</h3><p className="muted mt-3">{product.care}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.1, ease: EASE_PREMIUM }}
          className="rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs"
        >
          <h3 className="mb-5">Product at a Glance</h3>
          <dl className="space-y-5">{[["Best suited to",product.bestFor],["Light control",product.light],["Operation",product.movement],["Sizing & availability","Confirmed for your measurements and selected configuration."]].map(([title,text]) => <div key={title}><dt className="text-sm font-semibold text-moss">{title}</dt><dd className="muted mt-1">{text}</dd></div>)}</dl>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: EASE_PREMIUM }}
        className="grid items-start gap-9 border-t border-neutral-200 py-12 lg:grid-cols-[1.6fr_1fr]"
      >
        <div>
          <h2 className="mb-4 !text-3xl">Your Questions, Answered</h2>
          <Faq items={product.faqs} />
        </div>
        <div className="self-start rounded-2xl bg-brand-100 p-6 md:p-7 border border-brand-line/70 shadow-xs lg:sticky lg:top-24">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-moss mb-2">
            <Icon name="spark" size={14} className="text-moss shrink-0" />
            <span>Custom Consultation</span>
          </div>
          <h3 className="!text-xl font-bold text-forest">Let’s Find the Right Fit</h3>
          <p className="muted mt-2 mb-5 !text-sm">
            Tell us about your space and what you want to achieve. We’ll help you choose the right fabric, mounting, and finish tailored to your budget.
          </p>

          <ul className="space-y-3 mb-6 border-y border-brand-line/60 py-4 text-xs font-medium text-forest">
            <li className="flex items-center gap-2.5">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-white text-moss shadow-2xs">
                <Icon name="check" size={11} />
              </span>
              <span>Free on-site laser measure & quote in Auckland</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-white text-moss shadow-2xs">
                <Icon name="tools" size={11} />
              </span>
              <span>Expert installation by experienced specialists</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-white text-moss shadow-2xs">
                <Icon name="shield" size={11} />
              </span>
              <span>Backed by 5-year warranty on mechanics & fabric</span>
            </li>
          </ul>

          <div className="flex flex-col gap-2.5">
            <Button to={quoteUrl} dark className="w-full justify-center">
              Enquire About {product.name}
            </Button>
            <a
              href={contact.phones[0].href}
              className="flex items-center justify-center gap-2 rounded-xl border border-brand-line bg-white/80 py-2.5 text-xs font-bold text-forest hover:bg-white hover:text-moss transition-colors shadow-2xs"
            >
              <Icon name="phone" size={13} className="text-moss" />
              <span>Call {contact.phone} for Quick Advice</span>
            </a>
          </div>

          <p className="mt-3.5 text-center text-[11px] text-neutral-500">
            No obligation • Auckland-wide service & NZ delivery
          </p>
        </div>
      </motion.div>
      <section className="pb-10">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: EASE_PREMIUM }}
        >
          <div className="eyebrow">Explore more</div>
          <h2 className="mb-6">You May Also Like</h2>
        </motion.div>
        <ProductGrid full items={related} columns={5} />
      </section>
    </section>
    <Cta />
  </>;
}
