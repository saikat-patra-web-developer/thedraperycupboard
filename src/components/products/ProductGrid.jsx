import { motion, useReducedMotion } from "motion/react";
import Img from "../ui/Image.jsx";
import Arrow from "../ui/Arrow.jsx";
import { products } from "../../data/products.js";
import { EASE_PREMIUM } from "../motion/motionVariants.js";

export default function ProductGrid({ full = false, items = products }) {
  const shouldReduceMotion = useReducedMotion();

  return (
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
      className={"grid gap-5 md:gap-6 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 2xl:gap-7 " + (full ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2")}
    >
      {items.map(product => (
        <motion.a
          key={product.slug}
          href={"/products/" + product.slug}
          variants={{
            hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 28 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: shouldReduceMotion ? 0.2 : 0.6,
                ease: EASE_PREMIUM,
              },
            },
          }}
          whileHover={shouldReduceMotion ? {} : { y: -4 }}
          transition={{ duration: 0.35, ease: EASE_PREMIUM }}
          className={full ? "card group flex h-full flex-col transition-shadow duration-300 hover:shadow-md" : "group transition-all duration-300"}
        >
          <div className="overflow-hidden rounded-md">
            <Img
              name={product.image}
              alt={product.name}
              sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
              className={"product-photo w-full " + (full ? "aspect-[1.35]" : "aspect-[1.65]")}
            />
          </div>
          <div className={full ? "flex flex-1 flex-col px-5 pb-6 pt-5" : "px-1 pt-3"}>
            {full ? <h3 className="!text-2xl">{product.name}</h3> : <b className="text-sm">{product.name}</b>}
            {full ? (
              <>
                <p className="muted mb-6 mt-3 !text-sm">{product.description}</p>
                <span className="btn btn-outline text-xs mt-auto inline-flex items-center gap-1.5 self-start group-hover:border-forest group-hover:text-forest transition">
                  View Product <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"><Arrow /></span>
                </span>
              </>
            ) : (
              <span className="text-xs text-moss font-semibold flex items-center gap-1 mt-1.5 group-hover:underline">
                View Product <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"><Arrow /></span>
              </span>
            )}
          </div>
        </motion.a>
      ))}
    </motion.div>
  );
}
