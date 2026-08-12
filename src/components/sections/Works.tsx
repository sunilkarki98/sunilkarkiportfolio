"use client";
import Tilt from "react-parallax-tilt";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import github from "@/assets/github.webp";
import web from "@/assets/web.webp";
import { SectionWrapper } from "@/hoc";
import { projects } from "@/constants";
import { fadeIn } from "@/utils/motion";
import { Project } from "@/types";
import SectionHeader from "@/components/ui/SectionHeader";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  images,
  github_link,
  live_link,
}: Project & { index: number }) => {

  const [currentImage, setCurrentImage] = useState(0);
  const cardRef = useRef(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
          }, 2000);
        } else {
          if (interval) clearInterval(interval);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) observer.observe(cardRef.current);

    return () => {
      if (interval) clearInterval(interval);
      observer.disconnect();
    };
  }, [images.length]);

  return (
    <motion.div ref={cardRef} variants={fadeIn("up", "tween", index * 0.2, 1)}>
      <Tilt
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        scale={1}
        transitionSpeed={450}
        className='bg-surface p-5 rounded-2xl sm:w-[360px] w-full'
      >
        <article className="group">
          <div className='relative w-full h-[230px] rounded-2xl overflow-hidden'>
            <Image
              src={images[currentImage]}
              alt={name}
              className='w-full h-full object-cover transition-all duration-500 group-hover:scale-110'
            />

            <div className='absolute inset-0 bg-bg/70 backdrop-blur-[2px] flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 gap-4'>
              {live_link && (
                <a
                  href={live_link}
                  target='_blank'
                  rel='noreferrer'
                  className='btn-primary px-6 py-2.5 rounded-full gap-2'
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
                  className='btn-secondary bg-surface/80 hover:bg-surface-alt px-6 py-2.5 rounded-full gap-2 shadow-sm'
                >
                  <Image src={github} alt="github" className="w-4 h-4 object-contain" />
                  Case Study
                </a>
              )}
            </div>
          </div>

          <div className='mt-5'>
            <h3 className='text-text-primary font-bold text-[24px]'>{name}</h3>
            <p className='mt-2 text-text-secondary text-[14px]'>{description}</p>
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
      <SectionHeader subtitle="My work" title="Projects." />

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          Each project below is a real-world solution I designed, built, and shipped.
          They demonstrate my ability to solve complex problems, work with different
          technologies, and deliver results that matter to the business.
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
