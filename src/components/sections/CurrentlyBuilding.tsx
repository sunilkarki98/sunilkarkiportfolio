"use client";
import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/hoc";
import { fadeIn } from "@/utils/motion";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import SectionHeader from "@/components/ui/SectionHeader";
import StatusPulse from "@/components/ui/StatusPulse";

const CurrentlyBuilding = () => {
    return (
        <>
            <SectionHeader subtitle="What I'm focused on" title="Currently Building." />

            <motion.div
                variants={fadeIn("up", "spring", 0.5, 0.75)}
                className='mt-10 w-full bg-surface-alt p-8 rounded-3xl border border-border shadow-card flex flex-col md:flex-row gap-8 items-center relative overflow-hidden'
            >
                {/* Animated background glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-glow rounded-full filter blur-[80px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-glow rounded-full filter blur-[80px] pointer-events-none" />

                <div className="flex-1 z-10">
                    <div className="mb-4">
                        <StatusPulse label="Active Project" />
                    </div>

                    <h3 className="text-text-primary text-3xl font-bold mb-4">eBizMate</h3>
                    <p className="text-text-secondary text-lg leading-relaxed mb-6">
                        An AI-powered social automation SaaS for e-commerce brands on TikTok and Meta.
                        It acts as an autonomous sales and support agent, utilizing RAG and intent detection
                        to intelligently reply to DMs and comments, score leads, close orders, and seamlessly
                        escalate complex queries to human agents.
                    </p>

                    <div className="flex flex-wrap gap-3 mb-6">
                        {["AI/LLMs", "RAG", "Intent Detection", "Meta Graph API", "TikTok API", "SaaS"].map((tech) => (
                            <span key={tech} className="px-3 py-1 rounded-full bg-white/5 border border-border text-text-secondary text-sm">
                                #{tech}
                            </span>
                        ))}
                    </div>

                    <div className="w-full bg-surface-deep rounded-full h-2 mb-2">
                        <div className="bg-accent h-2 rounded-full w-[75%]"></div>
                    </div>
                    <p className="text-right text-xs text-text-secondary">75% Completed</p>
                </div>

                <div className="flex-1 w-full md:w-1/2 flex justify-center z-10">
                    {/* Placeholder for project image or 3D model */}
                    <div className="w-full max-w-md aspect-video bg-surface-deep rounded-2xl border border-border flex items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-accent-glow z-0"></div>
                        <div className="z-10 text-center flex flex-col items-center">
                            <HiOutlineChatAlt2 className="text-5xl mb-2 text-text-muted" />
                            <p className="text-text-secondary font-medium font-serif italic tracking-widest opacity-50 group-hover:opacity-100 transition-opacity">IN DEVELOPMENT</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default SectionWrapper(CurrentlyBuilding, "");
