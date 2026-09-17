import { motion, useReducedMotion } from "motion/react";
import Hero from "../components/sections/Hero.jsx";
import Button from "../components/ui/Button.jsx";
import ProductGrid from "../components/products/ProductGrid.jsx";
import Cta from "../components/sections/CallToAction.jsx";
import { EASE_PREMIUM } from "../components/motion/motionVariants.js";

export default function ProductsPage() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <Hero
        compact
        label="Made for your space, inside and out."
        title="Our Products"
        description="Explore our collection of blinds, curtains, shutters, pergolas and outdoor shades. Find the right finish for every space."
      >
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.9, ease: EASE_PREMIUM }}
          className="mt-7 flex flex-wrap gap-4"
        >
          <Button>Request a Quote</Button>
          <Button to="/services" outline>Explore Our Services</Button>
        </motion.div>
      </Hero>
      <section className="wrap section">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: EASE_PREMIUM }}
          className="mb-8"
        >
          <div className="eyebrow">Our complete collection</div>
          <h2>Possibilities for Every Space.</h2>
        </motion.div>
        <ProductGrid full />
      </section>
      <Cta />
    </>
  );
}
