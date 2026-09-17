import { motion, useReducedMotion } from "motion/react";
import { EASE_PREMIUM, VIEWPORT_ONCE } from "./motionVariants.js";

export default function FadeUp({
  children,
  className = "",
  delay = 0,
  duration = 0.65,
  y = 24,
  viewport = VIEWPORT_ONCE,
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{
        duration: shouldReduceMotion ? 0.2 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: EASE_PREMIUM,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
