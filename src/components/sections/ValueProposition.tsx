"use client";
import React from "react";
import { motion } from "framer-motion";
import { styles } from "@/styles";
import { SectionWrapper } from "@/hoc";
import { textVariant, fadeIn } from "@/utils/motion";
import { HiOutlineCube, HiOutlineLightningBolt, HiOutlineChatAlt2, HiOutlineTrendingUp } from "react-icons/hi";

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
        description: "I don't just write code—I build solutions designed to drive ROI and growth.",
        icon: HiOutlineTrendingUp,
    },
];

const ValueProposition = () => {
    return (
        <>
            <motion.div variants={textVariant()}>
                <p className={`${styles.sectionSubText}`}>Why Work With Me</p>
                <h2 className={`${styles.sectionHeadText} text-gradient`}>What Sets Me Apart.</h2>
            </motion.div>

            <div className='mt-8 grid grid-cols-2 md:grid-cols-4 gap-4'>
                {values.map((value, index) => (
                    <motion.div
                        key={value.title}
                        variants={fadeIn("up", "spring", index * 0.15, 0.75)}
                        className='p-[1px] rounded-2xl green-pink-gradient shadow-card group'
                    >
                        <div className='bg-tertiary rounded-2xl p-5 h-full flex flex-col items-center text-center group-hover:bg-black-200 transition-colors'>
                            <value.icon className="text-3xl mb-3 text-white" />
                            <h3 className='text-white text-[17px] font-bold mb-1'>{value.title}</h3>
                            <p className="text-white-100/90 text-[14px] leading-relaxed">{value.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </>
    );
};

export default SectionWrapper(ValueProposition, "value");
