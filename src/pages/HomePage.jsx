import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Icon from "../components/ui/Icon.jsx";
import Img from "../components/ui/Image.jsx";
import Arrow from "../components/ui/Arrow.jsx";
import Button from "../components/ui/Button.jsx";
import Heading from "../components/ui/SectionHeading.jsx";
import Hero from "../components/sections/Hero.jsx";
import Features from "../components/sections/Features.jsx";
import ProductGrid from "../components/products/ProductGrid.jsx";
import Testimonials from "../components/sections/Testimonials.jsx";
import Cta from "../components/sections/CallToAction.jsx";
import { EASE_PREMIUM } from "../components/motion/motionVariants.js";

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();
  const aboutRef = useRef(null);
  const { scrollYProgress: aboutScroll } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"],
  });
  const aboutParallax = useTransform(aboutScroll, [0, 1], [-20, 20]);

  return (
    <>
      <Hero
        image={null}
        video="/videos/hero-background.mp4"
        label="New Zealand’s trusted"
        title={
          <>
            Blinds, Curtains &
            <br />
            Outdoor Living.
            <br />
            Made for You
          </>
        }
        description={
          <>
            Premium quality. Custom made. Expert support.
            <br />
            Proudly supplying New Zealand with stylish,
            <br />
            window furnishings and outdoor shading.
          </>
        }
      >
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: shouldReduceMotion ? 0 : 1.0,
            ease: EASE_PREMIUM,
          }}
          className="mt-6 flex flex-wrap gap-4"
        >
          <Button to="/products">Explore Our Range</Button>
          <Button to="/online-quote" outline>
            Get a Free Quote
          </Button>
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
                delayChildren: shouldReduceMotion ? 0 : 1.15,
              },
            },
          }}
          className="mt-9 grid gap-5 sm:grid-cols-3 sm:gap-7"
        >
          {[
            ["leaf", "NZ Owned &", "Operated"],
            ["shield", "Premium Quality", "Guaranteed"],
            ["truck", "Fast, Reliable", "Nationwide Delivery"],
          ].map(([icon, a, b]) => (
            <motion.div
              variants={{
                hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: EASE_PREMIUM,
                  },
                },
              }}
              className="flex items-center gap-3"
              key={a}
            >
              <Icon name={icon} size={25} />
              <span className="text-sm leading-5">
                {a}
                <br />
                {b}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </Hero>
      <section className="wrap section">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: EASE_PREMIUM }}
          >
            <Heading
              label="Our range"
              title="The Right Finish for Every Space"
            />
          </motion.div>
          <a href="/products" className="text-link shrink-0">
            View all products <Arrow />
          </a>
        </div>
        <div className="[&>div>a:nth-child(n+9)]:hidden max-md:[&>div>a:nth-child(n+5)]:hidden md:max-lg:[&>div>a:nth-child(n+7)]:hidden 2xl:[&>div>a:nth-child(n+9)]:block">
          <ProductGrid />
        </div>
      </section>
      <Features />
      <section
        ref={aboutRef}
        className="wrap section grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center 2xl:gap-20 overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: EASE_PREMIUM }}
        >
          <Heading
            label="About The Drapery Cupboard"
            title={
              <>
                Made for Your Space.
                <br />
                Backed by Experience.
              </>
            }
          >
            We’re passionate about helping people improve their homes with
            blinds, curtains, shutters and outdoor shading.
            <br />
            Our focus is simple: premium products, competitive pricing, and
            personalised service from start to finish.
          </Heading>
          <div className="my-6 flex flex-wrap gap-4 text-sm">
            {[
              "NZ Owned & Operated",
              "Made to Measure",
              "Quality You Can Trust",
            ].map((t) => (
              <span className="flex items-center gap-1" key={t}>
                <Icon size={14} className="text-moss" />
                {t}
              </span>
            ))}
          </div>
          <Button to="/about" dark>
            Learn More About Us
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: EASE_PREMIUM }}
          className="relative overflow-hidden rounded-xl h-[280px] sm:h-[360px] 2xl:h-[460px] w-full"
        >
          <motion.div
            style={{ y: shouldReduceMotion ? 0 : aboutParallax }}
            className="relative h-[114%] -top-[7%] w-full"
          >
            <Img
              name="dining"
              alt="Dining room with custom roller blinds overlooking a New Zealand bay"
              className="h-full w-full object-cover rounded-xl"
            />
          </motion.div>
        </motion.div>
      </section>
      <section className="bg-forest py-12 text-white md:py-16">
        <div className="wrap">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: EASE_PREMIUM }}
            >
              <Heading
                label="Projects & inspiration"
                title="Real Spaces. Beautiful Results."
              />
            </motion.div>
            <a className="text-link shrink-0 !text-lime" href="/projects">
              View all projects <Arrow />
            </a>
          </div>
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
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4"
          >
            {[
              "Modern Coastal Home",
              "Luxury Apartment",
              "Architectural New Build",
              "Contemporary Family Home",
            ].map((t, i) => (
              <motion.a
                href={"/projects#project-" + i}
                key={t}
                variants={{
                  hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: shouldReduceMotion ? 0.2 : 0.65,
                      ease: EASE_PREMIUM,
                    },
                  },
                }}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-xl">
                  <Img
                    name={"project" + (i + 1)}
                    alt={t}
                    className="h-[220px] w-full 2xl:h-[280px] object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/15" />
                </div>
                <div className="mt-3 flex justify-between text-sm font-medium transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5">
                  <span>{t}</span>
                  <span className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
                    <Arrow />
                  </span>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>
      <section className="wrap section">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: EASE_PREMIUM }}
          className="text-center"
        >
          <Heading label="Our services" title="More Than Just Blinds" />
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
          className="mt-8 grid grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-4"
        >
          {[
            [
              "tools",
              "Custom Manufacturing",
              "Made to measure for a perfect finish",
            ],
            [
              "leaf",
              "Professional Installation",
              "A precise fit and a beautiful finish",
            ],
            [
              "headset",
              "Technical Advice",
              "Expert guidance for every project",
            ],
            [
              "truck",
              "Nationwide Delivery",
              "Fast, reliable delivery across New Zealand",
            ],
          ].map(([icon, t, d]) => (
            <motion.a
              href="/services"
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
              className="feature group"
              key={t}
            >
              <motion.div
                variants={{
                  hidden: { scale: shouldReduceMotion ? 1 : 0.92 },
                  visible: {
                    scale: 1,
                    transition: { duration: 0.5, ease: EASE_PREMIUM },
                  },
                }}
                className="transition-transform duration-300 group-hover:scale-105"
              >
                <Icon name={icon} className="text-moss" />
              </motion.div>
              <div>
                <b className="text-sm transition-colors duration-200 group-hover:text-moss">
                  {t}
                </b>
                <p className="mt-1 max-w-48 text-sm leading-relaxed text-neutral-600">
                  {d}
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </section>
      <section className="wrap pb-12 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: EASE_PREMIUM }}
          className="rounded-2xl bg-brand-50 border border-brand-line p-8 sm:p-10 lg:p-12"
        >
          <div className="grid gap-8 lg:grid-cols-[1.4fr_auto] items-center">
            <div>
              <span className="eyebrow">DIY Repairs & Spare Parts</span>
              <h2 className="!text-3xl font-serif text-forest">
                Need Replacement Parts for Your Blinds?
              </h2>
              <p className="mt-3 text-sm text-neutral-600 max-w-2xl leading-relaxed">
                Don’t replace the whole blind when a quick fix will do. Shop genuine 32mm & 38mm roller clutches, metal chains, child safety tensioners, venetian wands, vertical weights, and retrofit motorisation kits.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold text-forest">
                <span className="flex items-center gap-1.5">
                  <Icon name="truck" size={16} className="text-moss" /> Fast NZ Courier Dispatch
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon name="shield" size={16} className="text-moss" /> 30-Day Fit Guarantee
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon name="leaf" size={16} className="text-moss" /> Free Delivery Over $75
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <Button to="/online-shop" dark>
                Shop Blinds Parts
              </Button>
            </div>
          </div>
        </motion.div>
      </section>
      <Testimonials />
      <Cta />
    </>
  );
}

