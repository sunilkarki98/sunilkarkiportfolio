"use client";

import { motion, useScroll } from "framer-motion";

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[4px] bg-[linear-gradient(to_right,var(--color-gradient-from),var(--color-gradient-to))] origin-left z-[200] rounded-full"
      style={{ scaleX: scrollYProgress, willChange: "transform" }}
    />
  );
};

export default ScrollProgressBar;
