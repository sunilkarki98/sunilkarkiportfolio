"use client";
import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/hoc";
import { fadeIn } from "@/utils/motion";
import { HiOutlineCube, HiOutlineLightningBolt, HiOutlineChatAlt2, HiOutlineTrendingUp } from "react-icons/hi";
import SectionHeader from "@/components/ui/SectionHeader";
import GradientCard from "@/components/ui/GradientCard";

const values = [
    {
        title: "End-to-End Delivery",
        description: "From concept to deployment, I handle the full stack so you don't need multiple developers.",
        icon: HiOutlineCube,
    },
    {
        title: "AI & Automation",
        description: "Integrating smart AI workflows to save your business countless hours of manual work.",
        icon: HiOutlineLightningBolt,
    },
    {
        title: "Clear Communication",
        description: "No confusing jargon. I keep you in the loop with transparent, consistent updates.",
        icon: HiOutlineChatAlt2,
    },
    {
        title: "Business-First",
        description: "I don't just write code-I build solutions designed to drive ROI and growth.",
        icon: HiOutlineTrendingUp,
    },
];

const ValueProposition = () => {
    return (
        <>
            <SectionHeader subtitle="Why Work With Me" title="What Sets Me Apart." />

            <div className='mt-8 grid grid-cols-2 md:grid-cols-4 gap-4'>
                {values.map((value, index) => (
                    <motion.div
                        key={value.title}
                        variants={fadeIn("up", "spring", index * 0.15, 0.75)}
                    >
                        <GradientCard innerClassName="px-6 py-5 lg:px-8 lg:py-6 flex flex-col items-start text-left h-full">
                            <div className="flex flex-row items-center gap-3 mb-3">
                                <value.icon className="text-2xl text-text-primary shrink-0" />
                                <h3 className='text-text-primary text-[17px] font-bold'>{value.title}</h3>
                            </div>
                            <p className="text-text-secondary text-[14px] leading-relaxed">{value.description}</p>
                        </GradientCard>
                    </motion.div>
                ))}
            </div>
        </>
    );
};

export default SectionWrapper(ValueProposition, "value");
