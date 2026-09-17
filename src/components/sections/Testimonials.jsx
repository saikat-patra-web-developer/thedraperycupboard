import { motion, useReducedMotion } from "motion/react";
import { EASE_PREMIUM } from "../motion/motionVariants.js";

function Testimonials() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="wrap pb-12 md:pb-16">
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: EASE_PREMIUM }}
        className="rounded-2xl bg-brand-50 p-5 sm:p-7 lg:p-8"
      >
        <div className="eyebrow text-center">What our customers say</div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid gap-5 md:grid-cols-3"
        >
          {[
            [
              "The Drapery Cupboard are our go-to supplier. Quality products, great pricing and always delivered on time.",
              "Jason R.",
              "Interior Designer, Auckland",
            ],
            [
              "The team are incredibly helpful and knowledgeable.",
              "Sarah T.",
              "Builder, Hamilton",
            ],
            [
              "Consistent quality and service that we can rely on for every project, big or small.",
              "Mike P.",
              "Project Manager, Wellington",
            ],
          ].map(([quote, name, role]) => (
            <motion.article
              variants={{
                hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
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
              className="relative rounded-xl border border-black/5 bg-white/70 p-6 transition-shadow duration-300 hover:shadow-md"
              key={name}
            >
              <span className="absolute right-5 top-2 font-serif text-5xl text-lime">
                “
              </span>
              <p className="muted max-w-[85%] !text-sm">{quote}</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-full bg-brand-100 text-xs">
                  {name[0]}
                </div>
                <div>
                  <b className="text-sm">{name}</b>
                  <p className="text-xs text-neutral-500">{role}</p>
                </div>
                <span
                  aria-label="5 out of 5 stars"
                  className="ml-auto text-sm text-amber-500"
                >
                  ★★★★★
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Testimonials;
