import Icon from "../components/ui/Icon.jsx";
import Arrow from "../components/ui/Arrow.jsx";
import Hero from "../components/sections/Hero.jsx";
import Cta from "../components/sections/CallToAction.jsx";
import Faq from "../components/ui/FaqAccordion.jsx";
import { faqs } from "../data/faqs.js";

export default function ResourcesPage() {
  return (
    <>
      <Hero
        compact
        label="Resources & support"
        title="Expert Advice. Every Step."
        description="Helpful guidance to choose, measure and care for your blinds."
      />
      <section className="wrap section">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            [
              "Measuring Guide",
              "Measure your window width at the top, middle and bottom. Measure the drop on both sides. Note whether you need an inside or outside mount, and confirm all sizes with our team before placing your order.",
            ],
            [
              "Care & Maintenance",
              "Dust blinds regularly with a soft cloth or brush attachment. For fabric blinds, avoid harsh chemicals and soaking. Check the care instructions supplied with your product before spot cleaning.",
            ],
            [
              "Warranty & Delivery",
              "Contact our team with your order reference for warranty support or delivery updates. Warranty coverage and delivery timing depend on the product and your location.",
            ],
          ].map(([t, d]) => (
            <article className="card p-7" key={t}>
              <Icon name="blinds" className="mb-5 text-moss" />
              <h3>{t}</h3>
              <p className="muted mt-4">{d}</p>
              <a href="/contact" className="text-link mt-5">
                Ask our team <Arrow />
              </a>
            </article>
          ))}
        </div>
        <div id="faq" className="mt-9">
          <h2>Frequently Asked Questions</h2>
          <div className="mt-5">
            <Faq items={faqs} />
          </div>
        </div>
      </section>
      <Cta />
    </>
  );
}
