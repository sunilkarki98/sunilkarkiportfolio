'use client';
import { motion, useScroll } from 'framer-motion';

const ProgressBar = () => {
  const { scrollYProgress } = useScroll();
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-purple-600 origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

export default ProgressBar;
