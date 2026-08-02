"use client";

import { motion, useScroll } from "framer-motion";

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-blue-500 to-purple-600 origin-left z-[200] rounded-full"
      style={{ scaleX: scrollYProgress, willChange: "transform" }}
    />
  );
};

export default ScrollProgressBar;
