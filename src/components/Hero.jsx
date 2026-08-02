"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { styles } from "../styles";
import ErrorBoundary from "./ErrorBoundary";

const ComputersCanvas = dynamic(() => import('./canvas/Computers'), {
  ssr: false,
});

const Hero = () => {
  return (
    <section className="relative w-full h-[60vh] sm:h-screen mx-auto overflow-hidden">
      <div
        className={`absolute inset-0 top-[160px] sm:top-[140px] lg:top-[180px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-3 sm:gap-5 z-10`}
      >
        {/* Left vertical line & dot */}
        <div className="flex flex-col justify-center items-center mt-2 sm:mt-5">
          <div className="w-4 h-4 rounded-full bg-[#915EFF]" />
          <div className="w-1 h-48 sm:h-80 violet-gradient" />
        </div>

        {/* Text section */}
        <div className="z-50 mt-1 sm:mt-0">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className={`${styles.heroHeadText}`}>
              <span className="text-white">Hi, I&apos;m </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 uppercase font-bold tracking-tight">Suneel Karki</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`${styles.heroSubText} mt-4 text-white-100 max-w-2xl font-light leading-relaxed`}
          >
            I architect and build <span className="font-semibold text-purple-300">scalable web applications</span>, <br className="sm:block hidden" />
            specializing in <span className="font-semibold text-blue-300">Full-Stack Development</span> and <span className="font-semibold text-green-300">AI Automations</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4 mt-8"
          >
            <a href="#contact" aria-label="Get in Touch" className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:scale-105 transition-transform shadow-lg shadow-purple-500/30">
              Get in Touch
            </a>
            <a href="#work" aria-label="View My Work" className="px-8 py-3 rounded-full border border-white/20 bg-white/5 text-white font-medium hover:bg-white/10 hover:scale-105 transition-all backdrop-blur-sm">
              View My Work
            </a>
          </motion.div>
        </div>
      </div>

      {/* 3D Canvas - Hidden on Mobile */}
      <div className="absolute inset-0 z-0 hidden sm:block">
        <ErrorBoundary>
          <ComputersCanvas />
        </ErrorBoundary>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-5 sm:bottom-10 w-full flex justify-center items-center z-10">
        <a href="#about" aria-label="Scroll to About section">
          <div className="w-[30px] h-[52px] sm:w-[35px] sm:h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-1.5 sm:p-2">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
