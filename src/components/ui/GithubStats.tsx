"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/hoc";
import { fadeIn } from "@/utils/motion";
import SectionHeader from "@/components/ui/SectionHeader";

const GithubStats = () => {
    return (
        <>
            <SectionHeader subtitle="My coding activity" title="GitHub Stats." />

            <motion.div
                variants={fadeIn("up", "spring", 0.3, 0.75)}
                className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                <div className="p-3 bg-surface rounded-2xl border border-border shadow-card flex justify-center overflow-x-auto">
                    <Image
                        src={`https://github-stats-extended.vercel.app/api?username=sunilkarki98&show_icons=true&theme=onedark&hide_border=true&bg_color=151030`}
                        alt="GitHub Stats"
                        width={495}
                        height={195}
                        className="w-full h-auto object-contain"
                        unoptimized
                    />
                </div>

                <div className="p-3 bg-surface rounded-2xl border border-border shadow-card flex justify-center overflow-x-auto">
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
