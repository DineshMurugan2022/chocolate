import type { Variants } from 'framer-motion';

export const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: easeOutExpo } }
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeOutExpo } }
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeOutExpo } }
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: easeOutExpo } }
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: easeOutExpo } }
};

export const stagger = (staggerChildren = 0.12, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } }
});
