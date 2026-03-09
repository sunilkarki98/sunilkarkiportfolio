import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { HiOutlineChatAlt2 } from "react-icons/hi";

const CurrentlyBuilding = () => {
    return (
        <>
            <motion.div variants={textVariant()}>
                <p className={`${styles.sectionSubText}`}>What I'm focused on</p>
                <h2 className={`${styles.sectionHeadText} text-gradient`}>Currently Building.</h2>
            </motion.div>

            <motion.div
                variants={fadeIn("up", "spring", 0.5, 0.75)}
                className='mt-10 w-full bg-black-100 p-8 rounded-3xl border border-white/10 shadow-card flex flex-col md:flex-row gap-8 items-center relative overflow-hidden'
            >
                {/* Animated background glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full filter blur-[80px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full filter blur-[80px] pointer-events-none" />

                <div className="flex-1 z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <span className="text-green-400 font-medium tracking-wider uppercase text-sm">Active Project</span>
                    </div>

                    <h3 className="text-white text-3xl font-bold mb-4">eBizMate</h3>
                    <p className="text-secondary text-lg leading-relaxed mb-6">
                        An AI-powered social automation SaaS for e-commerce brands on TikTok and Meta.
                        It acts as an autonomous sales and support agent, utilizing RAG and intent detection
                        to intelligently reply to DMs and comments, score leads, close orders, and seamlessly
                        escalate complex queries to human agents.
                    </p>

                    <div className="flex flex-wrap gap-3 mb-6">
                        {["AI/LLMs", "RAG", "Intent Detection", "Meta Graph API", "TikTok API", "SaaS"].map((tech) => (
                            <span key={tech} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white-100 text-sm">
                                #{tech}
                            </span>
                        ))}
                    </div>

                    <div className="w-full bg-gray-800 rounded-full h-2 mb-2">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full w-[75%]"></div>
                    </div>
                    <p className="text-right text-xs text-secondary">75% Completed</p>
                </div>

                <div className="flex-1 w-full md:w-1/2 flex justify-center z-10">
                    {/* Placeholder for project image or 3D model */}
                    <div className="w-full max-w-md aspect-video bg-black-200 rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 z-0"></div>
                        <div className="z-10 text-center flex flex-col items-center">
                            <HiOutlineChatAlt2 className="text-5xl mb-2 text-purple-400" />
                            <p className="text-white-100 font-medium font-serif italic tracking-widest opacity-50 group-hover:opacity-100 transition-opacity">IN DEVELOPMENT</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default SectionWrapper(CurrentlyBuilding, "");
