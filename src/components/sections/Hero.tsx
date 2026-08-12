"use client";

import { motion } from "framer-motion";
import { styles } from "@/styles";

const Hero = () => {
  return (
    <section className="relative w-full mx-auto overflow-hidden flex items-center pt-32 pb-16 sm:pt-40 sm:pb-24">
      <div
        className={`w-full max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-3 sm:gap-5 z-10 pointer-events-none`}
      >
        {/* Left vertical line & dot */}
        <div className="flex flex-col justify-center items-center mt-1.5">
          <div className="relative flex justify-center items-center w-6 h-6 rounded-full border border-green-500/30 bg-green-500/10 shadow-[0_0_10px_rgba(34,197,94,0.2)]">
            <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-green-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500 shadow-[0_0_6px_#22c55e]" />
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full bg-surface border border-border shadow-sm cursor-default">
              <span className="text-text-secondary font-semibold tracking-wider uppercase text-[12px]">
                Freelance AI & Full-Stack Engineer
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
            className={`${styles.heroSubText} mt-4 text-text-secondary max-w-3xl font-light leading-relaxed`}
          >
            Stop losing time to manual tasks and slow development cycles. <br className="sm:block hidden" />
            I build <span className="font-semibold text-text-accent">custom AI agents</span>, <span className="font-semibold text-text-accent">automated workflows</span>, and <span className="font-semibold text-text-accent">high-performance web apps</span> that slash your operational costs and scale your business on autopilot.
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