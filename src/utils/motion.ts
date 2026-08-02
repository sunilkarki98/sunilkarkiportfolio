import { Variants } from "framer-motion";

export const textVariant = (delay?: number): Variants => {
  return {
    hidden: {
      y: -50,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 1.25,
        bounce: 0.25,
        delay: delay,
      },
    },
  };
};

export const fadeIn = (direction: string, type: string, delay?: number, duration?: number): Variants => {
  return {
    hidden: {
      x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: type as any,
        delay: delay,
        duration: duration || 0.75,
        ease: type === "tween" ? "easeOut" : undefined,
        bounce: type === "spring" ? 0.3 : undefined,
      },
    },
  };
};

export const zoomIn = (delay?: number, duration?: number): Variants => {
  return {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "tween",
        delay: delay,
        duration: duration || 0.75,
        ease: "easeOut",
      },
    },
  };
};

export const slideIn = (direction: string, type: string, delay?: number, duration?: number): Variants => {
  return {
    hidden: {
      x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
      y: direction === "up" ? "-100%" : direction === "down" ? "100%" : 0,
    },
    show: {
      x: 0,
      y: 0,
      transition: {
        type: type as any,
        delay: delay,
        duration: duration || 0.75,
        ease: type === "tween" ? "easeOut" : undefined,
        bounce: type === "spring" ? 0.3 : undefined,
      },
    },
  };
};

export const staggerContainer = (staggerChildren?: number, delayChildren?: number): Variants => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: staggerChildren,
        delayChildren: delayChildren || 0,
      },
    },
  };
};
