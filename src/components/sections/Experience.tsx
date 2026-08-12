"use client";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import Image from "next/image";

import "react-vertical-timeline-component/style.min.css";

import { experiences } from "@/constants";
import { SectionWrapper } from "@/hoc";
import { Experience as ExperienceType } from "@/types";
import SectionHeader from "@/components/ui/SectionHeader";
import logo from "@/assets/logo.webp";

const ExperienceCard = ({ experience }: { experience: ExperienceType }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "var(--color-surface)",
        color: "var(--color-text-primary)",
      }}
      contentArrowStyle={{ borderRight: "7px solid var(--color-surface)" }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className='flex justify-center items-center w-full h-full'>
          {experience.icon ? (
            <Image
              src={experience.icon}
              alt={experience.company_name}
              className='w-[60%] h-[60%] object-contain'
            />
          ) : (
            <Image
              src={logo}
              alt={experience.company_name}
              className='w-[60%] h-[60%] object-contain'
            />
          )}
        </div>
      }
    >
      <div>
        <h3 className='text-text-primary text-[24px] font-bold text-gradient'>{experience.title}</h3>
        <p
          className='text-text-secondary text-[16px] font-semibold'
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
      </div>

      <ul className='mt-5 list-disc ml-5 space-y-2'>
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className='text-text-secondary text-[14px] pl-1 tracking-wider'
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  return (
    <>
      <SectionHeader subtitle="What I have done so far" title="Work Experience." center />

      <div className='mt-20 flex flex-col'>
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "experience");
