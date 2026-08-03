"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { styles } from "@/styles";
import { SectionWrapper } from "@/hoc";
import { textVariant, fadeIn } from "@/utils/motion";

const GithubStats = () => {
    return (
        <>
            <motion.div variants={textVariant()}>
                <p className={`${styles.sectionSubText}`}>My coding activity</p>
                <h2 className={`${styles.sectionHeadText} text-gradient`}>GitHub Stats.</h2>
            </motion.div>

            <motion.div
                variants={fadeIn("up", "spring", 0.3, 0.75)}
                className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                <div className="p-3 bg-tertiary rounded-2xl border border-white/10 shadow-card flex justify-center overflow-x-auto">
                    <Image
                        src={`https://github-stats-extended.vercel.app/api?username=sunilkarki98&show_icons=true&theme=onedark&hide_border=true&bg_color=151030`}
                        alt="GitHub Stats"
                        width={495}
                        height={195}
                        className="w-full h-auto object-contain"
                        unoptimized
                    />
                </div>

                <div className="p-3 bg-tertiary rounded-2xl border border-white/10 shadow-card flex justify-center overflow-x-auto">
                    <Image
                        src={`https://github-readme-streak-stats.herokuapp.com/?user=sunilkarki98&theme=onedark&hide_border=true&background=151030`}
                        alt="GitHub Streak"
                        width={495}
                        height={195}
                        className="w-full h-auto object-contain"
                        unoptimized
                    />
                </div>
            </motion.div>
        </>
    );
};

export default SectionWrapper(GithubStats, "github");
