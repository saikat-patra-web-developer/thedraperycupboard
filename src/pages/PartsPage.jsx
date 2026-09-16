import { useState, useMemo } from "react";
import Hero from "../components/sections/Hero.jsx";
import Cta from "../components/sections/CallToAction.jsx";
import Faq from "../components/ui/FaqAccordion.jsx";
import Icon from "../components/ui/Icon.jsx";
import PartCard from "../components/parts/PartCard.jsx";
import PartFilters from "../components/parts/PartFilters.jsx";
import { getPartsByCategory } from "../data/parts.js";
import { contact } from "../data/contact.js";

const PARTS_FAQS = [
  [
    "How do I know which size roller blind clutch I need?",
    "Measure the outside diameter of your aluminium tube without the fabric. Standard residential blinds in New Zealand use either 32mm (approx 1.25\") or 38mm (approx 1.5\") diameter tubes. For wide commercial or heavy blinds, measure across the tube end.",
  ],
  [
    "Can I replace just the broken mechanism without taking down the whole blind?",
    "Yes! In 95% of cases, you can unclip the blind from its brackets, slide out the broken chain clutch or idler pin, push the new replacement part into the aluminium tube spline, and click the blind straight back into place.",
  ],
  [
    "How fast is dispatch for replacement parts?",
    "Orders placed before 2:00 PM on business days are dispatched same-day via tracked NZ Post Courier from our North Island distribution center. Typical transit time is 1–2 business days across the North Island and 2–3 business days for the South Island.",
  ],
  [
    "Can I convert my manual chain roller blind to motorised?",
    "Yes! Our 25mm Rechargeable Lithium Battery Motor slides directly into your existing 38mm roller tube in place of the manual chain clutch. No wiring or electrician needed.",
  ],
  [
    "What if the part doesn't fit my blind?",
    "We offer a 30-day return policy on all standard parts. If the part doesn't match your blind, contact us with photos of your existing mechanism and we will help you find the correct fitting.",
  ],
];

const normalizeCategory = (cat) => {
  if (!cat) return "all";
  const c = cat.toLowerCase().trim();
  if (c.startsWith("roller")) return "roller";
  if (c.startsWith("venetian")) return "venetian";
  if (c.startsWith("vertical")) return "vertical";
  if (c.startsWith("curtain")) return "curtains";
  if (c.startsWith("motor")) return "motors";
  if (c.startsWith("safe") || c.startsWith("chain")) return "safety";
  return c;
};

export default function PartsPage() {
  const [activeCategory, setActiveCategory] = useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get("category");
      if (cat) return normalizeCategory(cat);
    }
    return "all";
  });

  const [searchQuery, setSearchQuery] = useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      return params.get("search") || params.get("q") || "";
    }
    return "";
  });

  const [sortBy, setSortBy] = useState("featured");

  const handleSelectCategory = (catId) => {
    setActiveCategory(catId);
    if (typeof window !== "undefined" && window.history?.replaceState) {
      const params = new URLSearchParams(window.location.search);
      if (catId === "all") {
        params.delete("category");
      } else {
        params.set("category", catId);
      }
      const query = params.toString();
      const newUrl = window.location.pathname + (query ? `?${query}` : "");
      window.history.replaceState(null, "", newUrl);
    }
  };

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    if (typeof window !== "undefined" && window.history?.replaceState) {
      const params = new URLSearchParams(window.location.search);
      if (!val.trim()) {
        params.delete("search");
        params.delete("q");
      } else {
        params.set("search", val.trim());
      }
      const query = params.toString();
      const newUrl = window.location.pathname + (query ? `?${query}` : "");
      window.history.replaceState(null, "", newUrl);
    }
  };

  const filteredParts = useMemo(() => {
    let result = getPartsByCategory(activeCategory);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.blindType.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Sort
    result = [...result].sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0; // featured default order
    });

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <>
      <Hero
        compact
        image="hero"
        label="Blinds Hardware & Spare Parts"
        title={
          <>
            Replacement Parts.
            <br />
            DIY Repair Made Easy.
          </>
        }
        description="Fix your blinds for a fraction of replacement cost. Genuine clutches, chains, brackets, wands, curtain gliders, and retrofit motorisation kits delivered across New Zealand."
      >
        <div className="mt-7 flex flex-wrap gap-4">
          <a href="#catalog" className="btn">
            Shop All Parts
          </a>
          <a href="/online-quote" className="btn btn-outline">
            Need New Blinds Instead?
          </a>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 border-t border-white/15 pt-6 text-xs">
          <div className="flex items-center gap-2.5">
            <Icon name="truck" size={20} className="text-lime" />
            <span>Fast NZ Courier Dispatch</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Icon name="shield" size={20} className="text-lime" />
            <span>30-Day Fit Guarantee</span>
          </div>
          <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
            <Icon name="leaf" size={20} className="text-lime" />
            <span>Free Shipping Over $75 NZD</span>
          </div>
        </div>
      </Hero>

      {/* Main Catalog Section */}
      <section id="catalog" className="wrap section scroll-mt-6">
        <PartFilters
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalResults={filteredParts.length}
        />

        {/* Product Grid */}
        <div className="mt-8">
          {filteredParts.length === 0 ? (
            <div className="card text-center py-16 px-6 bg-brand-50/50">
              <div className="rounded-full bg-brand-100 p-4 w-16 h-16 mx-auto flex items-center justify-center text-moss">
                <Icon name="tools" size={32} />
              </div>
              <h3 className="mt-4 !text-xl font-bold text-forest">No replacement parts found</h3>
              <p className="mt-2 text-sm text-neutral-500 max-w-md mx-auto">
                We couldn't find any parts matching "{searchQuery}". Try adjusting your search term or browse all categories.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => {
                    handleSearchChange("");
                    handleSelectCategory("all");
                  }}
                  className="btn btn-dark text-xs"
                >
                  Reset All Filters
                </button>
                <a href={contact.emailHref} className="btn btn-outline text-xs">
                  Email a Photo of Your Part
                </a>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredParts.map((part) => (
                <PartCard key={part.id} part={part} />
              ))}
            </div>
          )}
        </div>

        {/* Part Identification Support Banner */}
        <div className="mt-16 rounded-2xl bg-forest p-8 text-white sm:p-10 lg:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-[1.3fr_auto]">
            <div>
              <span className="eyebrow !text-lime">Free Identification Support</span>
              <h2 className="!text-3xl font-serif text-white mt-1">
                Not sure which part fits your blind?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/80 max-w-2xl">
                Take a quick photo of your broken mechanism or bracket with your phone and send it to our New Zealand technicians. We’ll identify the exact model and send you a direct link to order.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1.5">
                  <Icon name="check" size={16} className="text-lime" /> Quick reply within 1 hour
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon name="check" size={16} className="text-lime" /> Fits 99% of NZ brands
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 lg:flex-col shrink-0">
              <a href={contact.emailHref} className="btn !py-3.5 !px-6 text-xs text-center">
                Email Photo to Our Team
              </a>
              <a
                href={contact.phones[0].href}
                className="btn btn-outline !border-white/30 !text-white hover:!bg-white/10 !py-3.5 !px-6 text-xs text-center"
              >
                Call Toll Free {contact.phones[0].label}
              </a>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="mt-16 pt-12 border-t border-neutral-200">
          <div className="mb-6">
            <span className="eyebrow">Help & Advice</span>
            <h2>Frequently Asked Questions About Blinds Repair</h2>
          </div>
          <Faq items={PARTS_FAQS} />
        </div>
      </section>

      <Cta />
    </>
  );
}
