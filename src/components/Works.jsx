"use client";
import Tilt from "react-parallax-tilt";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { styles } from "../styles";
import { github, web } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { imageSrc } from "../utils/image";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  images,
  github_link,
  live_link,
}) => {

  const [currentImage, setCurrentImage] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        tiltMaxAngleX={45}
        tiltMaxAngleY={45}
        scale={1}
        transitionSpeed={450}
        className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full'
      >
        <article className="group">
          <div className='relative w-full h-[230px] rounded-2xl overflow-hidden'>
            <Image
              src={images[currentImage]}
              alt={name}
              className='w-full h-full object-cover transition-all duration-500 group-hover:scale-110'
            />

            <div className='absolute inset-0 bg-black/70 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 gap-4'>
              {live_link && (
                <a
                  href={live_link}
                  target='_blank'
                  rel='noreferrer'
                  className='px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-bold hover:scale-105 transition-transform flex items-center gap-2 shadow-lg shadow-purple-500/30'
                >
                  <Image src={web} alt="live" className="w-4 h-4 object-contain brightness-0 invert" />
                  Visit Site
                </a>
              )}
              {github_link && (
                <a
                  href={github_link}
                  target='_blank'
                  rel='noreferrer'
                  className='px-6 py-2.5 bg-black/80 border border-white/20 rounded-full text-white font-bold hover:bg-black hover:scale-105 transition-all flex items-center gap-2 backdrop-blur-md shadow-lg shadow-black/50'
                >
                  <Image src={github} alt="github" className="w-4 h-4 object-contain" />
                  Case Study
                </a>
              )}
            </div>
          </div>

          <div className='mt-5'>
            <h3 className='text-white font-bold text-[24px]'>{name}</h3>
            <p className='mt-2 text-secondary text-[14px]'>{description}</p>
          </div>

          <div className='mt-4 flex flex-wrap gap-2'>
            {tags.map((tag) => (
              <p
                key={`${name}-${tag.name}`}
                className={`text-[14px] ${tag.color}`}
              >
                #{tag.name}
              </p>
            ))}
          </div>
        </article>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>My work</p>
        <h3 className={`${styles.sectionHeadText} text-gradient`}>Projects.</h3>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          Following projects showcase my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos. It reflects my ability to
          solve complex problems, work with different technologies, and manage
          projects effectively.
        </motion.p>
      </div>

      <div className='mt-20 flex flex-wrap gap-7 justify-center'>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "work");
