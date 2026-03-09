import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { styles } from "../styles";

const Tech = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>Technologies I work with</p>
        <h2 className={`${styles.sectionHeadText} text-center text-gradient`}>Tech Stack.</h2>
      </motion.div>

      <motion.div
        variants={fadeIn("up", "spring", 0.3, 0.75)}
        className='mt-10 flex flex-row flex-wrap justify-center gap-5'
      >
        {technologies.map((technology) => (
          <div
            key={technology.name}
            className='w-16 h-16 rounded-xl bg-tertiary border border-white/10 flex items-center justify-center hover:scale-110 hover:border-purple-500/50 transition-all cursor-pointer group relative'
            title={technology.name}
          >
            <img
              src={technology.icon}
              alt={technology.name}
              className='w-10 h-10 object-contain'
            />
            <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] text-secondary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {technology.name}
            </span>
          </div>
        ))}
      </motion.div>
    </>
  );
};

export default SectionWrapper(Tech, "");
