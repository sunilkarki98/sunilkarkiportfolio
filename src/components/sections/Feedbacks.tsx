"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { SectionWrapper } from "@/hoc";
import { fadeIn } from "@/utils/motion";
import { testimonials } from "@/constants";
import { Testimonial } from "@/types";
import SectionHeader from "@/components/ui/SectionHeader";
import { styles } from "@/styles";

const FeedbackCard = ({
  index,
  testimonial,
  name,
  designation,
  company,
  image,
}: Testimonial & { index: number }) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.15, 0.75)}
    className='bg-surface px-6 pb-6 rounded-3xl xs:w-[320px] w-full'
  >
    <p className='text-gradient font-black text-5xl inline-block '>...</p>

    <div className='mt-0'>
      <p className='text-text-primary tracking-wider text-[16px]'>{testimonial}</p>

      <div className='mt-7 flex justify-between items-center gap-1'>
        <div className='flex-1 flex flex-col'>
          <p className='text-text-accent font-medium text-[18px] italic'>
            <span className='text-gradient'>@</span> {name}
          </p>
          <p className='mt-1 text-text-muted uppercase text-[16px]'>
            {designation} of {company}
          </p>
        </div>

        <Image
          src={image}
          alt={`feedback_by-${name}`}
          width={40}
          height={40}
          className='w-10 h-10 rounded-full object-cover'
        />
      </div>
    </div>
  </motion.div>
);

const Feedbacks = () => {
  // Don't render the section if there are no testimonials
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <div className={`mt-12 bg-surface-deep rounded-[20px]`}>
      <div
        className={`bg-surface rounded-2xl ${styles.padding} min-h-[350px]`}
      >
        <SectionHeader subtitle="What others say" title="Testimonials." />
      </div>
      <div className={`-mt-50 pb-14 ${styles.paddingX} flex flex-wrap gap-7`}>
        {testimonials.map((testimonial, index) => (
          <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");
