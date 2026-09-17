/**
 * Premium Motion for React variants and configuration for The Drapery Cupboard
 * Easing curve [0.22, 1, 0.36, 1] mimics high-end luxury architectural portfolios.
 */

export const EASE_PREMIUM = [0.22, 1, 0.36, 1];

export const VIEWPORT_ONCE = {
  once: true,
  margin: "-40px",
};

export const fadeUpVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: (custom = {}) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom.duration ?? 0.65,
      delay: custom.delay ?? 0,
      ease: EASE_PREMIUM,
    },
  }),
};

export const fadeInVariant = {
  hidden: { opacity: 0 },
  visible: (custom = {}) => ({
    opacity: 1,
    transition: {
      duration: custom.duration ?? 0.6,
      delay: custom.delay ?? 0,
      ease: EASE_PREMIUM,
    },
  }),
};

export const staggerContainerVariant = (staggerChildren = 0.07, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const staggerItemVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE_PREMIUM,
    },
  },
};

export const staggerItem = staggerItemVariant;

export const scaleInVariant = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: (custom = {}) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: custom.duration ?? 0.6,
      delay: custom.delay ?? 0,
      ease: EASE_PREMIUM,
    },
  }),
};
