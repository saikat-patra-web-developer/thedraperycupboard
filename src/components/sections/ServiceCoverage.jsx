import { motion, useReducedMotion } from "motion/react";
import Icon from "../ui/Icon.jsx";
import Img from "../ui/Image.jsx";
import Arrow from "../ui/Arrow.jsx";
import Heading from "../ui/SectionHeading.jsx";
import { EASE_PREMIUM } from "../motion/motionVariants.js";

function Coverage() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-brand-50">
      <div className="wrap grid gap-10 py-12 md:py-16 lg:grid-cols-[1fr_1fr_1fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: EASE_PREMIUM }}
        >
          <Heading
            label="Proudly serving New Zealand"
            title="Local Expertise. Nationwide Service."
          >
            From Northland to Southland, our team delivers quality blinds and
            expert service across New Zealand.
          </Heading>
          <a href="/contact" className="text-link mt-5">
            View Service Areas <Arrow />
          </a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: EASE_PREMIUM }}
          className="flex justify-center"
        >
          <Img
            name="map"
            alt="New Zealand service locations"
            className="h-60 w-full object-contain mix-blend-multiply"
          />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.04,
              },
            },
          }}
          className="grid grid-cols-2 gap-4 rounded-xl bg-white p-6 text-sm shadow-sm sm:p-8"
        >
          {[
            "Northland",
            "Auckland",
            "Waikato",
            "Bay of Plenty",
            "Gisborne",
            "Hawke’s Bay",
            "Wellington",
            "Nelson / Tasman",
            "Canterbury",
            "Otago",
            "Southland",
          ].map((t) => (
            <motion.div
              variants={{
                hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 8 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.4, ease: EASE_PREMIUM },
                },
              }}
              className="flex gap-2 items-center"
              key={t}
            >
              <Icon name="pin" size={14} className="text-moss" />
              <span>{t}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Coverage;
