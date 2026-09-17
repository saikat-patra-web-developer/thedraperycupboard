import { motion, useReducedMotion } from "motion/react";
import Icon from "../components/ui/Icon.jsx";
import Img from "../components/ui/Image.jsx";
import Arrow from "../components/ui/Arrow.jsx";
import Button from "../components/ui/Button.jsx";
import Heading from "../components/ui/SectionHeading.jsx";
import Hero from "../components/sections/Hero.jsx";
import Cta from "../components/sections/CallToAction.jsx";
import Process from "../components/sections/Process.jsx";
import Coverage from "../components/sections/ServiceCoverage.jsx";
import { EASE_PREMIUM } from "../components/motion/motionVariants.js";

export default function AboutPage() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <Hero
        compact
        label="About The Drapery Cupboard"
        title={
          <>
            Made for Your Space.
            <br />
            Backed by Quality.
          </>
        }
        description="We’re New Zealand’s trusted blinds specialist, delivering premium window furnishings with precision, speed and personalised service."
      >
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.9, ease: EASE_PREMIUM }}
          className="mt-6 flex flex-wrap gap-4"
        >
          <Button to="/products">Explore Our Products</Button>
          <Button outline>Get in Touch</Button>
        </motion.div>
      </Hero>
      <section className="wrap section grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: EASE_PREMIUM }}
        >
          <Heading
            label="Our story"
            title={
              <>
                Proudly New Zealand.
                <br />
                Focused on You.
              </>
            }
          >
            The Drapery Cupboard was founded to make quality window coverings
            accessible. We
            combine quality products with made-to-measure options, fast
            turnaround times and expert support to help you find the right
            blinds for your space.
          </Heading>
          <p className="muted mt-4 max-w-md">
            From our Te Kauwhata, Waikato base, we help homeowners and businesses across New
            Zealand find blinds that are made to measure, built to last and easy
            to use.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: EASE_PREMIUM }}
          className="overflow-hidden rounded-xl"
        >
          <Img
            name="story"
            alt="New Zealand owned and operated, dining room blinds"
            className="w-full rounded-xl transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105"
          />
        </motion.div>
      </section>
      <Process />
      <section className="bg-brand-50">
        <div className="wrap grid items-stretch sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.05fr]">
          <div className="py-10 pr-7 sm:py-12 sm:pr-10 lg:py-16 2xl:py-20 2xl:pr-16">
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: EASE_PREMIUM }}
            >
              <Heading
                label="Our values"
                title={
                  <>
                    The Principles
                    <br />
                    That Guide Us.
                  </>
                }
              />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } },
              }}
              className="mt-6 space-y-5"
            >
              {[
                [
                  "Quality Without Compromise",
                  "Premium materials. Careful craftsmanship.",
                ],
                [
                  "Customer First",
                  "Thoughtful advice and personal support for every customer.",
                ],
                ["Reliability", "On time, every time. You can count on us."],
                [
                  "Personal Service",
                  "We listen to your needs and help you find the right fit.",
                ],
              ].map(([a, b]) => (
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_PREMIUM } },
                  }}
                  className="feature"
                  key={a}
                >
                  <Icon name="leaf" className="text-moss" />
                  <div>
                    <b className="text-sm">{a}</b>
                    <p className="muted !text-sm">{b}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <div className="bg-brand-100 px-7 py-10 sm:px-10 sm:py-12 lg:py-16 2xl:px-16 2xl:py-20">
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: EASE_PREMIUM }}
            >
              <Heading label="Quality & warranty" title="Confidence Built In." />
              <p className="muted my-5">
                We stand behind our blinds with warranties and a commitment to
                quality at every step.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } },
              }}
            >
              {["5 Year Warranty", "Premium Materials", "Tested & Trusted"].map(
                (t) => (
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_PREMIUM } },
                    }}
                    className="feature mb-7"
                    key={t}
                  >
                    <Icon className="text-moss" name="shield" />
                    <div>
                      <b className="text-sm">{t}</b>
                      <p className="muted !text-sm">Quality you can count on.</p>
                    </div>
                  </motion.div>
                ),
              )}
            </motion.div>
          </div>
          <div className="overflow-hidden sm:col-span-2 lg:col-span-1">
            <Img
              name="shutters"
              alt="Quality white plantation shutters"
              className="h-full min-h-80 w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105"
            />
          </div>
        </div>
      </section>
      <Coverage />
      <section className="wrap section grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: EASE_PREMIUM }}
        >
          <Heading
            label="Our people"
            title="Experienced. Approachable. Here to Help."
          >
            Our team has deep industry knowledge and a passion for helping you
            create a space you love.
          </Heading>
        </motion.div>
        {[
          ["Mike Preston", "Founder & Director"],
          ["Sarah McKenzie", "Operations Manager"],
          ["Daniel Vano", "Customer Service Manager"],
        ].map(([n, r], i) => (
          <motion.article
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : i * 0.08, ease: EASE_PREMIUM }}
            whileHover={shouldReduceMotion ? {} : { y: -4 }}
            className="card group transition-shadow duration-300 hover:shadow-lg"
            key={n}
          >
            <div className="overflow-hidden">
              <Img
                name={"team" + (i + 1)}
                alt={n}
                className="aspect-[1.8] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <b className="text-sm transition-colors duration-200 group-hover:text-moss">{n}</b>
              <p className="muted !text-sm">{r}</p>
              <a href="/contact" className="text-link mt-3">
                Get in touch <Arrow />
              </a>
            </div>
          </motion.article>
        ))}
      </section>
      <section className="bg-forest py-10 text-white md:py-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="wrap grid grid-cols-1 gap-6 sm:grid-cols-3"
        >
          {[
            ["250,000+", "Blinds Supplied Across NZ"],
            ["10+", "Years of Experience"],
            ["98%", "Customer Satisfaction Rate"],
          ].map(([n, t]) => (
            <motion.div
              variants={{
                hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_PREMIUM } },
              }}
              className="flex items-center gap-5"
              key={n}
            >
              <Icon name="shield" size={35} className="text-lime" />
              <div>
                <h3 className="!text-3xl">{n}</h3>
                <p className="mt-2 text-sm">{t}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
      <div className="pt-8">
        <Cta />
      </div>
    </>
  );
}
