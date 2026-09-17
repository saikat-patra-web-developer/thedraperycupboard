import { motion, useReducedMotion } from "motion/react";
import Icon from "../ui/Icon.jsx";
import { features } from "../../data/features.js";
import { EASE_PREMIUM } from "../motion/motionVariants.js";

function Features() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="rounded-2xl bg-brand-50 py-8 md:py-10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.07,
            },
          },
        }}
        className="wrap grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-5"
      >
        {features.map(([icon, title, text]) => (
          <motion.div
            variants={{
              hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: shouldReduceMotion ? 0.2 : 0.55,
                  ease: EASE_PREMIUM,
                },
              },
            }}
            className="feature"
            key={title}
          >
            <motion.div
              variants={{
                hidden: { scale: shouldReduceMotion ? 1 : 0.92 },
                visible: {
                  scale: 1,
                  transition: {
                    duration: shouldReduceMotion ? 0.2 : 0.55,
                    ease: EASE_PREMIUM,
                  },
                },
              }}
            >
              <Icon name={icon} size={34} className="text-moss" />
            </motion.div>
            <div>
              <b className="text-sm">{title}</b>
              <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                {text}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default Features;
