"use client";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { services, technologies } from "@/constants";
import { SectionWrapper } from "@/hoc";
import Image from "next/image";
import { fadeIn } from "@/utils/motion";
import { Service } from "@/types";
import SectionHeader from "@/components/ui/SectionHeader";
import GradientCard from "@/components/ui/GradientCard";

const ServiceCard = ({ index, title, icon: Icon, color }: Service & { index: number }) => (
  <motion.div
    variants={fadeIn("right", "tween", index * 0.2, 1)}
    className='w-full'
  >
    <Tilt
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      scale={1.05}
      transitionSpeed={450}
    >
      <GradientCard 
        className="min-h-[160px]" 
        innerClassName="py-5 px-4 flex justify-center items-center flex-col gap-3"
      >
        <div className='w-14 h-14 flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
          <Icon className={`w-full h-full drop-shadow-[0_0_8px_rgba(255,255,255,0.15)] ${color || 'text-accent-soft'}`} />
        </div>
        <h3 className='text-text-primary text-[16px] font-bold text-center leading-tight'>
          {title}
        </h3>
      </GradientCard>
    </Tilt>
  </motion.div>
);

const About = () => {
  return (
    <>
      <SectionHeader subtitle="Introduction" title="Overview." />

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-text-secondary/90 text-[17px] max-w-3xl leading-[28px]'
      >
        You need a technical partner who understands both code and business.
        I help companies ship AI-powered products faster by handling the full stack -
        from architecture to deployment - so you can focus on growth.
        With expertise in AI automation, chatbot development, n8n workflows, and
        full-stack engineering with React and Node.js, I build intelligent, automated
        solutions that solve real-world problems. Let&apos;s work together to bring your ideas to life!
      </motion.p>

      <div className='mt-16 flex flex-col gap-16'>
        <div>
          <h3 className="text-xl font-bold text-text-primary mb-6">What I Do</h3>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3'>
            {services.map((service, index) => (
              <ServiceCard key={service.title} index={index} {...service} />
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-text-primary mb-6">My Arsenal</h3>
          <motion.div
            variants={fadeIn("left", "tween", 0.2, 1)}
            className='flex flex-row flex-wrap gap-4'
          >
            {technologies.map((technology) => (
              <div
                key={technology.name}
                className='w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-surface/50 backdrop-blur-md border border-border flex items-center justify-center hover:scale-110 hover:bg-surface-alt hover:border-border-hover hover:shadow-[0_0_15px_var(--color-accent-glow)] transition-all cursor-pointer group relative'
                title={technology.name}
              >
                <Image
                  src={technology.icon}
                  alt={technology.name}
                  className='w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-lg'
                />
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[11px] text-text-primary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-surface-deep px-2 py-1 rounded-md shadow-sm pointer-events-none z-10 border border-border">
                  {technology.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
