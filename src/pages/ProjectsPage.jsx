import { motion } from "motion/react";
import Img from "../components/ui/Image.jsx";
import Arrow from "../components/ui/Arrow.jsx";
import Hero from "../components/sections/Hero.jsx";
import Cta from "../components/sections/CallToAction.jsx";
import { staggerContainer, staggerItem, VIEWPORT_ONCE, EASE_PREMIUM } from "../components/motion/motionVariants.js";

export default function ProjectsPage() {
  return (
    <>
      <Hero
        compact
        label="Projects & inspiration"
        title="Real Spaces. Beautiful Results."
        description="Explore spaces transformed with premium blinds, made for the way you live."
      />
      <motion.section
        className="wrap section grid gap-8 sm:grid-cols-2"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
      >
        {[
          "Modern Coastal Home",
          "Luxury Apartment",
          "Architectural New Build",
          "Contemporary Family Home",
        ].map((t, i) => (
          <motion.article
            className="card overflow-hidden group shadow-sm transition-shadow duration-300 hover:shadow-xl"
            id={"project-" + i}
            key={t}
            variants={staggerItem}
            whileHover={{ y: -6, transition: { duration: 0.35, ease: EASE_PREMIUM } }}
          >
            <div className="overflow-hidden">
              <Img
                name={"project" + (i + 1)}
                alt={t}
                className="aspect-[1.8] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <div className="p-6 sm:p-7">
              <h3 className="group-hover:text-moss transition-colors duration-200">{t}</h3>
              <p className="muted mt-3">
                Natural light, effortless privacy and a finish tailored to the
                space.
              </p>
              <a href="/contact" className="text-link mt-4 inline-flex items-center gap-1.5">
                <span>Discuss a similar project</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  <Arrow />
                </span>
              </a>
            </div>
          </motion.article>
        ))}
      </motion.section>
      <Cta />
    </>
  );
}
