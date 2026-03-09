import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { HiOutlineSearch, HiOutlineColorSwatch, HiOutlineTerminal, HiOutlineCloudUpload } from "react-icons/hi";

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
            <motion.div variants={textVariant()}>
                <p className={`${styles.sectionSubText} text-center`}>How I build software</p>
                <h2 className={`${styles.sectionHeadText} text-center text-gradient`}>Development Process.</h2>
            </motion.div>

            <div className='mt-8 grid grid-cols-2 md:grid-cols-4 gap-4'>
                {processSteps.map((step, index) => (
                    <div
                        key={step.title}
                        className='p-[1px] rounded-2xl green-pink-gradient shadow-card group'
                    >
                        <div className='bg-tertiary p-5 rounded-2xl h-full group-hover:bg-black-200 transition-colors'>
                            <step.icon className='text-3xl mb-3 text-purple-400' />
                            <div className='flex items-center gap-2 mb-2'>
                                <span className='text-xs text-purple-400 font-mono'>0{index + 1}</span>
                                <div className='h-px flex-1 bg-white/10'></div>
                            </div>
                            <h3 className='text-white text-[18px] font-bold mb-1'>{step.title}</h3>
                            <p className='text-[#c4bfdf] text-[14px] leading-relaxed'>{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default SectionWrapper(Process, "process");
