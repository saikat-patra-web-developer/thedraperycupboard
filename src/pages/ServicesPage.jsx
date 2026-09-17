import { useEffect } from "react";
import { motion } from "motion/react";
import Icon from "../components/ui/Icon.jsx";
import Img from "../components/ui/Image.jsx";
import Button from "../components/ui/Button.jsx";
import Heading from "../components/ui/SectionHeading.jsx";
import Hero from "../components/sections/Hero.jsx";
import Testimonials from "../components/sections/Testimonials.jsx";
import Cta from "../components/sections/CallToAction.jsx";
import Process from "../components/sections/Process.jsx";
import Coverage from "../components/sections/ServiceCoverage.jsx";
import FadeUp from "../components/motion/FadeUp.jsx";
import { staggerContainer, staggerItem, VIEWPORT_ONCE, EASE_PREMIUM } from "../components/motion/motionVariants.js";
import { services } from "../data/services.js";
import { features } from "../data/features.js";
import { findService } from "../data/servicesData.js";

export default function ServicesPage() {
  useEffect(() => {
    if (typeof window === "undefined" || !window.location.hash) return;
    const targetId = window.location.hash.slice(1);
    const el = document.getElementById(targetId);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }
  }, []);

  return (
    <>
      <Hero
        compact
        image="dining"
        label="Services"
        title={
          <>
            Expert Services.
            <br />
            Beautiful Results.
          </>
        }
        description="From precision installation to ongoing care, our end-to-end services make it easy to enjoy blinds that look amazing and perform perfectly."
      >
        <div className="mt-6 flex flex-wrap gap-4">
          <Button to="/online-quote">Get a Free Quote</Button>
          <Button to="/products" outline>
            Explore Our Products
          </Button>
        </div>
      </Hero>
      <section className="wrap section">
        <FadeUp className="mb-7 text-center">
          <Heading label="Our services" title="Solutions for Every Space" />
        </FadeUp>
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >
          {services.map(([t, id, d, ic, img]) => {
            const sData = findService(id);
            const targetUrl = sData?.canonicalUrl || `/services/${id}`;
            const imageToUse = sData?.image || img || id;

            return (
              <motion.article
                className="card scroll-mt-28 flex flex-col justify-between"
                key={id}
                id={id}
                variants={staggerItem}
                whileHover={{ y: -5, transition: { duration: 0.3, ease: EASE_PREMIUM } }}
              >
                <div>
                  <a href={targetUrl} className="block overflow-hidden">
                    <Img name={imageToUse} alt={t} className="h-44 w-full transition-transform duration-300 hover:scale-105" />
                  </a>
                  <div className="relative p-6 pt-9">
                    <div className="absolute -top-6 flex size-12 items-center justify-center rounded-full bg-forest text-lime shadow-sm">
                      <Icon name={ic} />
                    </div>
                    <h3>
                      <a href={targetUrl} className="hover:text-moss transition-colors">
                        {t}
                      </a>
                    </h3>
                    <p className="muted mt-3 text-sm leading-relaxed">{d}</p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <a
                    href={targetUrl}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-moss hover:underline"
                  >
                    <span>Explore Service</span>
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </section>
      <Process />
      <section className="bg-white">
        <div className="wrap grid items-stretch md:grid-cols-2">
        <div className="py-10 pr-7 sm:py-12 sm:pr-10 lg:py-16 lg:pr-14 2xl:py-20 2xl:pr-20">
          <FadeUp>
            <Heading
              label="Why choose The Drapery Cupboard"
              title={
                <>
                  Quality You Can See.
                  <br />
                  Service You Can Trust.
                </>
              }
            />
          </FadeUp>
          <motion.div
            className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
          >
            {[
              ...features.slice(0, 4),
              [
                "truck",
                "Fast Turnaround",
                "Efficient processes to get your blinds on time",
              ],
              ["shield", "Warranty Backed", "For total peace of mind"],
            ].map(([ic, t, d]) => (
              <motion.div className="feature" key={t} variants={staggerItem}>
                <Icon name={ic} className="text-moss" />
                <div>
                  <b className="text-sm">{t}</b>
                  <p className="muted mt-2 !text-sm">{d}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <FadeUp className="h-full">
          <Img
            name="hero"
            alt="Premium blinds overlooking the coast"
            className="h-full min-h-80 w-full md:min-h-[460px] 2xl:min-h-[540px]"
          />
        </FadeUp>
        </div>
      </section>
      <Coverage />
      <div className="pt-8">
        <Testimonials />
      </div>
      <Cta />
    </>
  );
}
