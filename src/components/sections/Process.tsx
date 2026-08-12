"use client";
import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/hoc";
import { fadeIn } from "@/utils/motion";
import { HiOutlineSearch, HiOutlineColorSwatch, HiOutlineTerminal, HiOutlineCloudUpload } from "react-icons/hi";
import SectionHeader from "@/components/ui/SectionHeader";
import GradientCard from "@/components/ui/GradientCard";

const processSteps = [
    {
        title: "Discovery",
        description: "Requirements analysis, scope definition, architecture planning.",
        icon: HiOutlineSearch,
    },
    {
        title: "Design",
        description: "Wireframes, Figma mockups, design systems, and component libraries.",
        icon: HiOutlineColorSwatch,
    },
    {
        title: "Develop",
        description: "Clean, scalable code with CI/CD pipelines and continuous testing.",
        icon: HiOutlineTerminal,
    },
    {
        title: "Deploy",
        description: "Cloud deployment, performance monitoring, and user feedback loops.",
        icon: HiOutlineCloudUpload,
    },
];

const Process = () => {
    return (
        <>
            <SectionHeader subtitle="How I build software" title="Development Process." center />

            <div className='mt-8 grid grid-cols-2 md:grid-cols-4 gap-4'>
                {processSteps.map((step, index) => (
                    <motion.div
                        key={step.title}
                        variants={fadeIn("up", "spring", index * 0.15, 0.75)}
                    >
                        <GradientCard innerClassName="px-6 py-5 lg:px-8 lg:py-6 h-full flex flex-col">
                            <div className='flex items-center gap-2 mb-4 w-full'>
                                <span className='text-[15px] font-bold text-text-muted font-mono'>0{index + 1}</span>
                                <div className='h-px flex-1 bg-border'></div>
                            </div>
                            <div className='flex flex-row items-center gap-3 mb-2'>
                                <step.icon className='text-2xl text-text-primary shrink-0' />
                                <h3 className='text-text-primary text-[17px] font-bold'>{step.title}</h3>
                            </div>
                            <p className='text-text-secondary text-[14px] leading-relaxed'>{step.description}</p>
                        </GradientCard>
                    </motion.div>
                ))}
            </div>
        </>
    );
};

export default SectionWrapper(Process, "process");
