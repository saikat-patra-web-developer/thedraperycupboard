import { motion, useReducedMotion } from "motion/react";
import Img from "../ui/Image.jsx";
import MaskedHeading from "../motion/MaskedHeading.jsx";
import { EASE_PREMIUM } from "../motion/motionVariants.js";

function Hero({
  label,
  title,
  description,
  children,
  image = "hero",
  video,
  compact = false,
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className={
        "relative isolate overflow-hidden bg-forest text-white " +
        (compact
          ? "min-h-[380px] md:min-h-[430px] 2xl:min-h-[500px]"
          : "min-h-[640px] sm:min-h-[660px] lg:min-h-[700px] 2xl:min-h-[820px]")
      }
    >
      {image && (
        <motion.div
          initial={{ scale: 1 }}
          animate={shouldReduceMotion ? { scale: 1 } : { scale: 1.045 }}
          transition={{ duration: 14, ease: "easeOut" }}
          className="absolute inset-0 z-0 h-full w-full pointer-events-none"
        >
          <Img
            name={image}
            priority
            sizes="100vw"
            className="h-full w-full object-[center_52%]"
            alt="Custom blinds in a light-filled New Zealand home"
          />
        </motion.div>
      )}
      {video && (
        <motion.div
          initial={{ scale: 1 }}
          animate={shouldReduceMotion ? { scale: 1 } : { scale: 1.045 }}
          transition={{ duration: 14, ease: "easeOut" }}
          className="absolute inset-0 z-[1] h-full w-full pointer-events-none"
        >
          <video
            key={video}
            className="h-full w-full object-cover object-[center_52%] motion-reduce:hidden"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          >
            <source src={video} type="video/mp4" />
          </video>
        </motion.div>
      )}
      <div className="hero-shade absolute inset-0 z-10 pointer-events-none" />
      <div
        className={
          "wrap relative z-20 flex min-h-[inherit] items-center " +
          (compact
            ? "py-12 md:py-16"
            : "pb-12 pt-32 sm:pt-36 md:pb-16 md:pt-40")
        }
      >
        <div className="max-w-[560px] 2xl:max-w-[680px]">
          {label && (
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: shouldReduceMotion ? 0 : 0.15,
                ease: EASE_PREMIUM,
              }}
              className="eyebrow !text-lime"
            >
              {label}
            </motion.div>
          )}
          <MaskedHeading
            title={title}
            baseDelay={0.3}
            stagger={0.15}
            duration={0.7}
          />
          {description && (
            <motion.p
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: shouldReduceMotion ? 0 : 0.8,
                ease: EASE_PREMIUM,
              }}
              className="mt-5 max-w-[440px] text-base leading-relaxed text-white/90 2xl:max-w-[540px] 2xl:text-lg"
            >
              {description}
            </motion.p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}

export default Hero;
