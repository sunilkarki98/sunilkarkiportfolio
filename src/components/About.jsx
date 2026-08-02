"use client";
import Tilt from "react-parallax-tilt";
import Image from "next/image";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { imageSrc } from "../utils/image";

const ServiceCard = ({ index, title, icon: Icon }) => (
  <Tilt
    tiltMaxAngleX={45}
    tiltMaxAngleY={45}
    scale={1.05}
    transitionSpeed={450}
    className='w-full'
  >
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full p-[1px] rounded-[20px] green-pink-gradient shadow-card group cursor-pointer'
    >
      <div
        className='bg-tertiary rounded-[20px] py-5 px-4 min-h-[160px] flex justify-center items-center flex-col gap-3 transition-colors group-hover:bg-black-200'
      >
        {typeof Icon === 'function' || (typeof Icon === 'object' && !Icon.src) ? (
          <div className='w-14 h-14 flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
            <Icon className="w-full h-full text-purple-400 drop-shadow-lg" />
          </div>
        ) : (
          <Image
            src={Icon}
            alt={title}
            className='w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300'
          />
        )}
        <h3 className='text-white text-[16px] font-bold text-center leading-tight'>
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>Introduction</p>
        <h3 className={styles.sectionHeadText}>
          <span className="text-gradient">Overview.</span>
        </h3>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-white-100/90 text-[17px] max-w-3xl leading-[28px]'
      >
        I&apos;m a skilled software developer with expertise in AI automation, AI chatbot and agent development, and low-code solutions using n8n. Along with my AI capabilities, I have strong experience in Full Stack development using TypeScript, JavaScript, React, and Node.js. I&apos;m a quick learner and collaborate closely with clients to create intelligent, automated, and scalable solutions that solve real-world problems. Let&apos;s work together to bring your ideas to life!
      </motion.p>

      <div className='mt-8 grid grid-cols-3 sm:grid-cols-5 gap-3'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
