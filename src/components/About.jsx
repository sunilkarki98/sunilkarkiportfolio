import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => (
  <div
    className='p-[1px] rounded-2xl green-pink-gradient shadow-card group'
  >
    <div
      className='bg-tertiary rounded-2xl py-4 px-4 min-h-[160px] flex justify-center items-center flex-col gap-3 group-hover:bg-black-200 transition-colors'
    >
      <img
        src={icon}
        alt='web-development'
        className='w-10 h-10 object-contain'
      />
      <h3 className='bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent text-[15px] font-bold text-center leading-tight'>
        {title}
      </h3>
    </div>
  </div>
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
        I'm a skilled software developer with expertise in AI automation, AI chatbot and agent development, and low-code solutions using n8n. Along with my AI capabilities, I have strong experience in Full Stack development using TypeScript, JavaScript, React, and Node.js. I'm a quick learner and collaborate closely with clients to create intelligent, automated, and scalable solutions that solve real-world problems. Let's work together to bring your ideas to life!
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
