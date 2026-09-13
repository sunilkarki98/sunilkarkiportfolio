"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowRight } from "react-icons/fi";

import { services, technologies, techCategories } from "@/constants";
import { TechCategory } from "@/types";
import SectionHeader from "@/components/ui/SectionHeader";
import { Container } from "@/components/ui/Container";

gsap.registerPlugin(ScrollTrigger);

// ─── Workflow Visualizer ──────────────────────────────────
const WorkflowVisualizer = ({ steps }: { steps: string[] }) => (
  <div className="flex items-center gap-0 flex-wrap mt-6">
    {steps.map((step, i) => (
      <div key={step} className="flex items-center">
        <div className="px-3 py-1.5 border border-border bg-surface/50 font-mono text-xs tracking-wider text-text-primary uppercase">
          {step}
        </div>
        {i < steps.length - 1 && (
          <div className="w-6 h-px bg-border flex-none" />
        )}
      </div>
    ))}
  </div>
);

// ─── Capability Row ───────────────────────────────────────
const CapabilityRow = ({
  service,
  index,
  isActive,
  onActivate,
}: {
  service: (typeof services)[0];
  index: number;
  isActive: boolean;
  onActivate: () => void;
}) => (
  <div
    role="button"
    tabIndex={0}
    onClick={onActivate}
    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onActivate(); } }}
    className={`service-row group border-b border-border transition-colors duration-300 cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-text-primary/30 ${
      isActive ? "bg-surface/40" : "hover:bg-surface/20"
    }`}
  >
    {/* Row Header */}
    <div className="flex items-center justify-between py-5 px-2 sm:px-4">
      <div className="flex items-center gap-4 sm:gap-6">
        <span className="serial-number text-text-primary/80">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h4 className={`font-heading font-bold text-base sm:text-[17px] transition-all duration-300 ${
          isActive ? "text-text-primary translate-x-1" : "text-text-primary/70 group-hover:text-text-primary group-hover:translate-x-2"
        }`}>
          {service.title}
        </h4>
      </div>
      <FiArrowRight className={`w-4 h-4 text-text-muted transition-all duration-300 ${
        isActive ? "rotate-90 text-text-primary" : "group-hover:translate-x-1"
      }`} />
    </div>

    {/* Expanded Content */}
    <div
      className="overflow-hidden transition-all duration-500 ease-in-out"
      style={{ maxHeight: isActive ? "400px" : "0px", opacity: isActive ? 1 : 0 }}
    >
      <div className="px-4 sm:px-6 pb-6 pt-1 ml-8 sm:ml-12 border-l border-border">
        <p className="text-text-secondary text-sm leading-relaxed mb-4 max-w-lg">
          {service.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-2">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs tracking-wider text-text-muted uppercase border border-border px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Workflow */}
        <WorkflowVisualizer steps={service.workflow} />

        {/* Link */}
        <a
          href="#work"
          className="inline-flex items-center gap-2 text-xs text-text-primary/70 hover:text-text-primary transition-colors uppercase tracking-widest font-mono mt-5"
        >
          View related work <FiArrowRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  </div>
);

// ─── Technology Grid ──────────────────────────────────────
const TechGrid = ({
  activeFilter,
  highlightedTechs,
}: {
  activeFilter: TechCategory | "All";
  highlightedTechs: string[];
}) => {
  const filtered = useMemo(
    () => activeFilter === "All" ? technologies : technologies.filter((t) => t.category === activeFilter),
    [activeFilter]
  );

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-2">
      {filtered.map((tech) => {
        const isHighlighted = highlightedTechs.length === 0 || highlightedTechs.includes(tech.name);
        const TechIcon = tech.icon;

        return (
          <div
            key={tech.name}
            className={`tech-item group relative flex flex-col items-center justify-center gap-2 py-4 px-2 border transition-all duration-300 cursor-default ${
              isHighlighted
                ? "border-border bg-surface/50 opacity-100"
                : "border-transparent bg-transparent opacity-30"
            }`}
          >
            <TechIcon className={`w-6 h-6 transition-all duration-300 ${
              isHighlighted ? "text-text-primary" : "text-text-muted"
            }`} />
            <span className="font-mono text-xs text-text-muted uppercase tracking-wider text-center leading-tight">
              {tech.name}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────
const About = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [activeCapability, setActiveCapability] = useState(0);
  const [techFilter, setTechFilter] = useState<TechCategory | "All">("All");

  const activeService = services[activeCapability];
  const highlightedTechs = activeService.relatedTechs;

  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Intro reveal
      gsap.fromTo(
        ".about-intro",
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".about-intro", start: "top 85%" },
        }
      );

      // Service rows staggered reveal
      gsap.fromTo(
        ".service-row",
        { opacity: 0, x: -15 },
        {
          opacity: 1, x: 0, duration: 0.6, stagger: 0.08, ease: "power2.out",
          scrollTrigger: { trigger: ".services-container", start: "top 80%" },
        }
      );

      // Tech grid staggered reveal
      gsap.fromTo(
        ".tech-item",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1, scale: 1, duration: 0.4, stagger: 0.03, ease: "power2.out",
          scrollTrigger: { trigger: ".tech-container", start: "top 85%" },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Container as="section" ref={containerRef} id="about" className="section-padding-x section-padding-y relative z-0">

      {/* ── Section Header ── */}
      <div className="mb-12 lg:mb-16">
        <SectionHeader subtitle="Introduction" title="Overview." center={false} />

        <p className="about-intro text-text-secondary text-[16px] sm:text-[18px] leading-[1.8] font-light max-w-3xl mt-6">
          I help companies ship <strong className="text-text-primary font-medium">AI-powered products</strong> faster
          through full-stack engineering, AI automation, and intelligent workflows — handling the
          technical complexity so you can focus on growth.
        </p>

        {/* Metadata */}
        <div className="flex items-center gap-4 mt-6">
          <span className="serial-number">{"{"} Capabilities {"}"}</span>
          <span className="font-mono text-xs tracking-[0.3em] text-text-muted uppercase">
            Build &bull; Automate &bull; Grow
          </span>
        </div>
      </div>

      {/* ── Two-Column Content ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

        {/* LEFT: What I Do — Capability Explorer */}
        <div className="lg:col-span-7">
          <div className="services-container flex flex-col">
            <h3 className="font-heading font-semibold text-text-primary text-lg sm:text-xl mb-6 uppercase tracking-widest">
              What I Do
            </h3>
            <div className="flex flex-col border-t border-border">
              {services.map((service, index) => (
                <CapabilityRow
                  key={service.title}
                  service={service}
                  index={index}
                  isActive={activeCapability === index}
                  onActivate={() => setActiveCapability(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: My Arsenal — Technology System */}
        <div className="lg:col-span-5">
          <div className="tech-container flex flex-col lg:sticky lg:top-24">
            <h3 className="font-heading font-semibold text-text-primary text-lg sm:text-xl mb-6 uppercase tracking-widest">
              My Arsenal
            </h3>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-1 mb-6 border-b border-border pb-3">
              {techCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setTechFilter(cat)}
                  className={`font-mono text-xs sm:text-sm font-medium tracking-widest uppercase px-3 sm:px-4 py-2 transition-all duration-200 outline-none focus-visible:ring-1 focus-visible:ring-text-primary/30 ${
                    techFilter === cat
                      ? "text-text-primary bg-surface border border-border"
                      : "text-text-muted hover:text-text-primary border border-transparent"
                  }`}
                >
                  {cat === "AI & Automation" ? "AI & Infra" : cat}
                </button>
              ))}
            </div>

            {/* Grid */}
            <TechGrid activeFilter={techFilter} highlightedTechs={highlightedTechs} />
          </div>
        </div>

      </div>
    </Container>
  );
};

export default About;
