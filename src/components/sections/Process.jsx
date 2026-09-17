import { motion, useReducedMotion } from "motion/react";
import Icon from "../ui/Icon.jsx";
import Heading from "../ui/SectionHeading.jsx";
import { EASE_PREMIUM } from "../motion/motionVariants.js";

const steps = [
  [
    "headset",
    "Consultation",
    "We listen to your needs and help you choose the perfect solution.",
  ],
  [
    "tools",
    "Measure & Quote",
    "We measure up and provide a clear, no-obligation quote.",
  ],
  [
    "grid",
    "Manufacture",
    "Your blinds are custom made to the highest standards.",
  ],
  [
    "tools",
    "Installation",
    "Our specialists install your blinds with precision and care.",
  ],
  [
    "spark",
    "Enjoy",
    "Sit back and enjoy comfort, style and complete peace of mind.",
  ],
];

function Process() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="wrap section text-center">
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: EASE_PREMIUM }}
      >
        <Heading label="Our process" title="Simple. Seamless. Stress-Free." />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.08,
            },
          },
        }}
        className="mt-10 grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-5"
      >
        {steps.map(([icon, title, description], index) => (
          <motion.div
            variants={{
              hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: shouldReduceMotion ? 0.2 : 0.6,
                  ease: EASE_PREMIUM,
                },
              },
            }}
            whileHover={shouldReduceMotion ? {} : { y: -3 }}
            transition={{ duration: 0.3, ease: EASE_PREMIUM }}
            className="group"
            key={title}
          >
            <motion.span
              variants={{
                hidden: { scale: shouldReduceMotion ? 1 : 0.92 },
                visible: {
                  scale: 1,
                  transition: { duration: 0.5, ease: EASE_PREMIUM },
                },
              }}
              className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full border border-moss/30 bg-white text-moss shadow-xs transition-transform duration-300 group-hover:scale-105"
            >
              <Icon name={icon} />
            </motion.span>
            <b className="text-sm transition-colors duration-200 group-hover:text-moss">
              {index + 1}. {title}
            </b>
            <p className="muted mx-auto mt-2 max-w-48 !text-sm">
              {description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
export default Process;
