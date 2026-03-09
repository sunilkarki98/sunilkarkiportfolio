import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { HiOutlineCube, HiOutlineCode, HiOutlineUserGroup, HiOutlineLightBulb } from "react-icons/hi";

const values = [
    {
        title: "System Design",
        description: "Architecting scalable, secure, and maintainable solutions.",
        icon: HiOutlineCube,
    },
    {
        title: "Clean Code",
        description: "Writing readable, testable code following best practices.",
        icon: HiOutlineCode,
    },
    {
        title: "Agile Leadership",
        description: "Leading sprints, mentoring, and fostering collaboration.",
        icon: HiOutlineUserGroup,
    },
    {
        title: "Product Focus",
        description: "Aligning tech decisions with business goals and user needs.",
        icon: HiOutlineLightBulb,
    },
];

const ValueProposition = () => {
    return (
        <>
            <motion.div variants={textVariant()}>
                <p className={`${styles.sectionSubText}`}>Why hire me</p>
                <h2 className={`${styles.sectionHeadText} text-gradient`}>What I Bring to a Team.</h2>
            </motion.div>

            <div className='mt-8 grid grid-cols-2 md:grid-cols-4 gap-4'>
                {values.map((value, index) => (
                    <div
                        key={value.title}
                        className='p-[1px] rounded-2xl green-pink-gradient shadow-card group'
                    >
                        <div className='bg-tertiary rounded-2xl p-5 h-full flex flex-col items-center text-center group-hover:bg-black-200 transition-colors'>
                            <value.icon className="text-3xl mb-3 text-white" />
                            <h3 className='text-white text-[17px] font-bold mb-1'>{value.title}</h3>
                            <p className="text-white-100/90 text-[14px] leading-relaxed">{value.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default SectionWrapper(ValueProposition, "value");
