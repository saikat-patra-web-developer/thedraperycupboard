import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE_PREMIUM } from "./motionVariants.js";

/**
 * Extracts line elements from a title prop which may be a string, React element, or array.
 */
function extractLines(title) {
  if (!title) return [];
  if (typeof title === "string") {
    return title.split("\n").filter(Boolean);
  }
  if (Array.isArray(title)) {
    return title.filter((c) => c && c.type !== "br");
  }
  if (React.isValidElement(title) && title.props && title.props.children) {
    const children = Array.isArray(title.props.children)
      ? title.props.children
      : [title.props.children];
    return children.filter((c) => c && c.type !== "br");
  }
  return [title];
}

export default function MaskedHeading({
  title,
  baseDelay = 0.3,
  stagger = 0.15,
  duration = 0.7,
  className = "",
  as: Component = "h1",
}) {
  const shouldReduceMotion = useReducedMotion();
  const lines = extractLines(title);

  return (
    <Component className={className}>
      {lines.map((line, index) => {
        const delay = baseDelay + index * stagger;
        return (
          <span key={index} className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{
                y: shouldReduceMotion ? 0 : "100%",
                opacity: shouldReduceMotion ? 0 : 1,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              transition={{
                duration: shouldReduceMotion ? 0.3 : duration,
                delay: shouldReduceMotion ? 0 : delay,
                ease: EASE_PREMIUM,
              }}
            >
              {line}
            </motion.span>
          </span>
        );
      })}
    </Component>
  );
}
