"use client";

import { motion } from "framer-motion";
import { styles } from "@/styles";

const Hero = () => {
  return (
    <section className="relative w-full h-[60vh] sm:h-[80vh] mx-auto overflow-hidden flex items-center">
      <div
        className={`w-full max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-3 sm:gap-5 z-10 pointer-events-none`}
      >
        {/* Left vertical line & dot */}
        <div className="flex flex-col justify-center items-center mt-1.5">
          <div className="relative flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500" />
          </div>
          <div className="w-1 h-48 sm:h-80 violet-gradient" />
        </div>

        {/* Text section */}
        <div className="z-50 mt-1 sm:mt-0 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full bg-surface border border-border shadow-sm cursor-default">
              <span className="text-green-400 font-medium tracking-wider uppercase text-sm">
                Open to Work
              </span>
            </div>

            <h1 className={`${styles.heroHeadText}`}>
              <span className="text-text-primary">Hi, I&apos;m </span>
              <span className="text-gradient uppercase font-bold tracking-tight">Sunil Karki</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`${styles.heroSubText} mt-4 text-text-secondary max-w-2xl font-light leading-relaxed`}
          >
            I help businesses <span className="font-semibold text-text-accent">automate operations</span> and{" "}
            <span className="font-semibold text-text-accent">launch digital products faster</span> <br className="sm:block hidden" />
            with <span className="font-semibold text-text-accent">AI-powered solutions</span> and full-stack engineering.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4 mt-8"
          >
            <a href="#contact" aria-label="Book a free strategy call" className="btn-primary px-8 py-3 rounded-full">
              Book a Free Call
            </a>
            <a href="#work" aria-label="See results I've delivered" className="btn-secondary px-8 py-3 rounded-full">
              See My Results
            </a>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default Hero;