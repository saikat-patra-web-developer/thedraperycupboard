import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import Hero from "../components/sections/Hero.jsx";
import Button from "../components/ui/Button.jsx";
import ProductGrid from "../components/products/ProductGrid.jsx";
import Cta from "../components/sections/CallToAction.jsx";
import { products } from "../data/products.js";
import { EASE_PREMIUM } from "../components/motion/motionVariants.js";

const CATEGORY_TABS = [
  { id: "all", label: "All Products" },
  { id: "Indoor blinds", label: "Indoor Blinds" },
  { id: "Curtains & soft furnishings", label: "Curtains & Soft Furnishings" },
  { id: "Outdoor & shutters", label: "Outdoor & Shutters" },
  { id: "Smart home & security", label: "Smart Home & Security" },
];

export default function ProductsPage() {
  const shouldReduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts = products.filter((p) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "Outdoor & shutters") {
      return p.category === "Outdoor living" || p.category === "Shutters";
    }
    return p.category === activeCategory;
  });

  const getCount = (catId) => {
    if (catId === "all") return products.length;
    if (catId === "Outdoor & shutters") {
      return products.filter((p) => p.category === "Outdoor living" || p.category === "Shutters").length;
    }
    return products.filter((p) => p.category === catId).length;
  };

  return (
    <>
      <Hero
        compact
        label="Made for your space, inside and out."
        title="Our Products"
        description="Explore our collection of custom blinds, curtains, shutters, pergolas, outdoor shading, and intelligent smart home automation & security solutions. Find the right finish for every space."
      >
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.9, ease: EASE_PREMIUM }}
          className="mt-7 flex flex-wrap gap-4"
        >
          <Button to="/online-quote">Request a Quote</Button>
          <Button to="/services" outline>Explore Our Services</Button>
        </motion.div>
      </Hero>
      <section className="wrap section">
        <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: EASE_PREMIUM }}
          >
            <div className="eyebrow">Our complete collection</div>
            <h2>Possibilities for Every Space.</h2>
          </motion.div>
          <div className="text-sm text-neutral-500 font-medium">
            Showing <strong className="text-forest font-semibold">{filteredProducts.length}</strong> of {products.length} products
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter products by category"
          className="mb-10 flex flex-wrap gap-2 border-b border-black/10 pb-5"
        >
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeCategory === tab.id;
            const count = getCount(tab.id);
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(tab.id)}
                className={`group flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-forest text-white shadow-xs"
                    : "bg-neutral-100 text-neutral-600 hover:bg-brand-50 hover:text-forest border border-transparent"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-neutral-200 text-neutral-600 group-hover:bg-brand-100 group-hover:text-forest"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <ProductGrid full items={filteredProducts} key={activeCategory} />
      </section>
      <Cta />
    </>
  );
}
