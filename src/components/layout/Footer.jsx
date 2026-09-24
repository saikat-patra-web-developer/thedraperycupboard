import { motion, useReducedMotion } from "motion/react";
import { contact } from "../../data/contact.js";
import Brand from "./Brand.jsx";
import { products } from "../../data/products.js";
import { EASE_PREMIUM } from "../motion/motionVariants.js";

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();

  const colVariant = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: EASE_PREMIUM },
    },
  };

  return (
    <footer className="bg-forest text-white">
      <div className="wrap">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
          className="grid grid-cols-1 items-start gap-x-10 gap-y-10 border-y border-white/20 py-10 sm:grid-cols-2 sm:py-12 lg:grid-cols-[1.05fr_.55fr_1.35fr_.9fr] lg:gap-x-6 xl:grid-cols-[minmax(260px,1.15fr)_minmax(130px,.55fr)_minmax(360px,1.45fr)_minmax(220px,1fr)] xl:gap-x-12"
        >
          <motion.div variants={colVariant} className="sm:col-span-1">
            <Brand footer />
            <p className="mt-5 max-w-72 text-sm leading-7 text-white/70">
              Quality, budget-friendly window coverings tailored to New Zealand homes and commercial spaces.
            </p>
          </motion.div>
          <motion.div variants={colVariant}>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-lime">Explore</h4>
            <div className="flex flex-col gap-3 text-sm text-white/75 [&_a]:w-fit [&_a]:transition-colors [&_a:hover]:text-lime">
              {[
                ["Home", "/"],
                ["Products", "/products"],
                ["Online Shop", "/online-shop"],
                ["Online Quote", "/online-quote"],
                ["About", "/about"],
                ["Services", "/services"],
                ["Projects", "/projects"],
                ["Blog", "/blog"],
                ["Resources & FAQs", "/resources"],
              ].map(([name, url]) => (
                <a key={url} href={url}>{name}</a>
              ))}
            </div>
          </motion.div>
          <motion.div variants={colVariant} className="sm:col-span-1">
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-lime">Our Products</h4>
            <div className="grid grid-cols-2 gap-x-7 gap-y-3 text-sm text-white/75 [&_a]:w-fit [&_a]:transition-colors [&_a:hover]:text-lime">
              {products.map(product => (
                <a key={product.slug} href={"/products/" + product.slug}>{product.name}</a>
              ))}
            </div>
          </motion.div>
          <motion.div variants={colVariant} className="min-w-0">
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-lime">Get in Touch</h4>
            <div className="flex min-w-0 flex-col gap-3 text-sm leading-6 text-white/75 [&_a]:w-fit [&_a]:max-w-full [&_a]:transition-colors [&_a:hover]:text-lime">
              {contact.phones.map(phone => (
                <a key={phone.href} href={phone.href}>
                  <span className="text-lime font-medium">Toll Free: </span>{phone.label}
                </a>
              ))}
              <a className="break-all" href={contact.emailHref}>{contact.email}</a>
              <a href="/contact">{contact.address}</a>
              <a href="/online-quote" className="!text-lime hover:!text-white">Get a Free Quote →</a>
            </div>
          </motion.div>
        </motion.div>
        <div className="flex flex-col gap-4 py-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} The Drapery Cupboard. All rights reserved.</span>
          <div className="flex flex-wrap gap-6 [&_a]:transition-colors [&_a:hover]:text-white">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
