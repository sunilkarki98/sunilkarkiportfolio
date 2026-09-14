"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import gsap from "gsap";

import { projects } from "@/constants";
import { Container } from "@/components/ui/Container";

const Works = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projects[activeIndex];
  const totalProjects = projects.length;
  
  const contentRef = useRef<HTMLDivElement>(null);

  // Simple fade transition effect when switching projects
  useEffect(() => {
    if (!contentRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
    });
    return () => ctx.revert();
  }, [activeIndex]);

  return (
    <Container as="section" id="work" className="section-padding-x section-padding-y relative z-0">
      
      {/* ── HEADER ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 lg:mb-20 border-b border-border pb-8 gap-8">
        <div className="flex flex-col gap-2 max-w-2xl">
          <span className="text-text-primary/80 text-sm tracking-[0.2em] uppercase font-mono mb-2">
            {`< SELECTED WORK />`}
          </span>
          <h2 className="font-heading font-bold text-text-primary text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight">
            My work.
          </h2>
          <p className="text-text-secondary text-sm sm:text-base font-light mt-2">
            Real products. Real systems. Built with modern technologies to solve actual problems.
          </p>
        </div>
        
        <div className="flex flex-col items-start md:items-end gap-1">
          <span className="serial-number text-lg sm:text-xl text-text-primary">
            {String(activeIndex + 1).padStart(2, "0")} / {String(totalProjects).padStart(2, "0")}
          </span>
          <span className="font-mono text-xs tracking-widest text-text-muted uppercase">
            Projects I’ve built.
          </span>
        </div>
      </div>

      {/* ── 3-COLUMN BROWSER LAYOUT ── */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 w-full min-h-[600px]">
        
        {/* COLUMN 1: PROJECT LIST (Left) */}
        <div className="w-full lg:w-[22%] flex flex-col gap-1 border-b lg:border-b-0 lg:border-r border-border pb-8 lg:pb-0 lg:pr-6">
          {projects.map((project, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={project.name}
                onClick={() => setActiveIndex(index)}
                className={`group flex items-center justify-between w-full py-3 transition-all duration-300 outline-none focus-visible:ring-1 focus-visible:ring-text-primary/30 border-l-2 ${
                  isActive 
                    ? "border-text-primary pl-4 text-text-primary bg-surface/30" 
                    : "border-transparent pl-3 text-text-secondary hover:text-text-primary hover:border-text-muted hover:pl-4"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`font-mono text-xs transition-colors ${
                    isActive ? "text-text-primary" : "text-text-muted group-hover:text-text-primary/70"
                  }`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={`font-heading font-bold text-sm sm:text-base uppercase tracking-widest text-left`}>
                    {project.name}
                  </span>
                </div>
                {isActive && <FiArrowRight className="w-4 h-4 text-text-primary" />}
              </button>
            );
          })}
        </div>

        {/* COLUMN 2: PROJECT PRESENTATION (Center) */}
        <div className="w-full lg:w-[56%] flex flex-col" ref={contentRef}>
          {/* Project Details */}
          <div className="mb-8">
            <h3 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-text-primary uppercase tracking-tight mb-4">
              {activeProject.name}
            </h3>
            <p className="text-text-secondary text-base sm:text-base leading-relaxed font-light max-w-xl mb-6">
              {activeProject.description}
            </p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {activeProject.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="font-mono text-xs tracking-wider text-text-muted uppercase border border-border px-2.5 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-surface border border-border overflow-hidden">
            <Image
              src={activeProject.images[0]}
              alt={activeProject.name}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-top transition-transform duration-700 hover:scale-105"
            />
          </div>
          
          <div className="mt-6">
             <a
                href={activeProject.live_link || activeProject.github_link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs text-text-primary/70 hover:text-text-primary transition-colors uppercase tracking-widest font-mono"
              >
                View Live Project <FiArrowRight className="w-3.5 h-3.5" />
              </a>
          </div>
        </div>

        {/* COLUMN 3: TECH STACK (Right) */}
        <div className="w-full lg:w-[22%] flex flex-col lg:border-l border-border pt-8 lg:pt-0 lg:pl-6">
          <span className="font-mono text-xs tracking-[0.2em] text-text-muted uppercase mb-6 lg:mb-8 border-b border-border pb-3">
            TECH STACK
          </span>
          
          <div className="flex flex-col gap-1">
            {activeProject.stack.map((tech) => {
              const TechIcon = tech.icon;
              return (
                <div 
                  key={tech.name} 
                  className="flex items-center gap-4 py-3 px-2 text-text-secondary hover:text-text-primary transition-colors border-b border-transparent hover:border-border group cursor-default"
                >
                  <TechIcon className="w-4 h-4 text-text-muted group-hover:text-text-primary transition-colors" />
                  <span className="font-mono text-xs uppercase tracking-widest">
                    {tech.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </Container>
  );
};

export default Works;
