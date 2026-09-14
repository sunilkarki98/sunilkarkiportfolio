"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowRight } from "react-icons/fi";

import { services, technologies, techCategories } from "@/constants";
import { TechCategory } from "@/types";
import { Container } from "@/components/ui/Container";
import { decodeText, HERO_LEFT_COMPLETE } from "@/utils/decodeText";

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
    className={`service-row group border-b border-border transition-colors duration-300 cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-text-primary/30 ${isActive ? "bg-surface/40" : "hover:bg-surface/20"
      }`}
  >
    {/* Row Header */}
    <div className="flex items-center justify-between py-5 px-2 sm:px-4">
      <div className="flex items-center gap-4 sm:gap-6">
        <span className="serial-number text-text-primary/80">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h4 className={`font-heading font-bold text-base sm:text-[17px] transition-all duration-300 ${isActive ? "text-text-primary translate-x-1" : "text-text-primary/70 group-hover:text-text-primary group-hover:translate-x-2"
          }`}>
          {service.title}
        </h4>
      </div>
      <FiArrowRight className={`w-4 h-4 text-text-muted transition-all duration-300 ${isActive ? "rotate-90 text-text-primary" : "group-hover:translate-x-1"
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
            className={`tech-item group relative flex flex-col items-center justify-center gap-2 py-4 px-2 border transition-all duration-300 cursor-default ${isHighlighted
              ? "border-border bg-surface/50 opacity-100"
              : "border-transparent bg-transparent opacity-30"
              }`}
          >
            <TechIcon className={`w-6 h-6 transition-all duration-300 ${isHighlighted ? "text-text-primary" : "text-text-muted"
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
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const capsRef = useRef<HTMLSpanElement>(null);
  const tagsRef = useRef<HTMLSpanElement>(null);
  const [activeCapability, setActiveCapability] = useState(0);
  const [techFilter, setTechFilter] = useState<TechCategory | "All">("All");
  const isFirstFilterRender = useRef(true);

  const activeService = services[activeCapability] ?? services[0];
  const highlightedTechs = activeService?.relatedTechs ?? [];

  // ── Entrance animation triggered by Hero left-side completion ──
  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      // Show everything immediately
      gsap.set([
        "[data-about-subtitle]", "[data-about-title]", "[data-about-line]",
        ".about-intro", ".about-meta", ".about-columns",
        ".service-row", ".tech-item",
      ], { opacity: 1, y: 0, x: 0, scale: 1, clipPath: "none" });
      return;
    }

    // Set initial hidden states
    gsap.set("[data-about-subtitle]", { opacity: 0 });
    gsap.set("[data-about-title]", { opacity: 0, y: 12 });
    gsap.set("[data-about-line]", { scaleX: 0 });
    gsap.set(".about-intro", { opacity: 0, y: 20 });
    gsap.set(".about-meta", { opacity: 0, y: 12 });
    gsap.set(".about-columns", { opacity: 0, y: 20 });

    let cleanups: (() => void)[] = [];

    const runSequence = () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Step 1: Decode "Introduction" eyebrow
        tl.add(() => {
          if (subtitleRef.current) {
            const cleanup = decodeText(
              subtitleRef.current,
              "< INTRODUCTION />",
              0.8,
              0.8,
              () => {
                // After decode completes, set to full opacity
                if (subtitleRef.current) {
                  gsap.to(subtitleRef.current, { opacity: 1, duration: 0.3 });
                }
              }
            );
            cleanups.push(cleanup);
          }
        }, 0);

        // Step 2: Horizontal line grows
        tl.to("[data-about-line]", {
          scaleX: 1,
          duration: 0.6,
          ease: "power2.inOut",
        }, 0.5);

        // Step 3: "Overview." title reveals
        tl.to("[data-about-title]", {
          opacity: 1,
          y: 0,
          duration: 0.5,
        }, 0.7);

        // Step 4: Paragraph fades up
        tl.to(".about-intro", {
          opacity: 1,
          y: 0,
          duration: 0.6,
        }, 1.0);

        // Step 5: Metadata row reveals
        tl.to(".about-meta", {
          opacity: 1,
          y: 0,
          duration: 0.5,
        }, 1.3);

        // Metadata 1: '< Capabilities />' decodes
        tl.add(() => {
          if (capsRef.current) {
            cleanups.push(decodeText(capsRef.current, "< CAPABILITIES />", 1.2, 1));
          }
        }, 1.3);

        // Metadata 2: 'BUILD • AUTOMATE • GROW' decodes slightly later
        tl.add(() => {
          if (tagsRef.current) {
            cleanups.push(decodeText(tagsRef.current, "BUILD • AUTOMATE • GROW", 1.5, 1));
          }
        }, 1.7);

        // Step 6: Two-column content reveals
        tl.to(".about-columns", {
          opacity: 1,
          y: 0,
          duration: 0.6,
        }, 1.5);
      }, containerRef);

      cleanups.push(() => ctx.revert());
    };

    // Use ScrollTrigger to reliably start the sequence when the section is in view
    // (A slight delay prevents it from racing the Hero if the user lands at the very top)
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 85%",
      once: true, // Automatically kills the trigger after running once
      onEnter: () => {
        // Only run if not reduced motion
        if (!prefersReduced) {
          setTimeout(runSequence, 300); // 300ms breather
        }
      }
    });

    return () => {
      st.kill();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  // ── Scroll-triggered reveals for service rows and tech grid ──
  useEffect(() => {
    if (!containerRef.current) return;

    const mm = gsap.matchMedia();
    let refreshTimer: ReturnType<typeof setTimeout>;

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        // Service rows — scroll-triggered
        gsap.fromTo(
          ".service-row",
          { opacity: 0, x: -100 },
          {
            opacity: 1, x: 0, duration: 1, stagger: 0.1, ease: "power3.out",
            scrollTrigger: {
              trigger: ".services-container",
              start: "top 80%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );

        // Tech grid items — scroll-triggered
        gsap.fromTo(
          ".tech-item",
          { opacity: 0, scale: 0.40 },
          {
            opacity: 1, scale: 1, duration: 1, stagger: 0.1, ease: "power2.out",
            scrollTrigger: {
              trigger: ".tech-container",
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      }, containerRef);

      refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 300);

      return () => ctx.revert();
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set([".service-row", ".tech-item"], {
        opacity: 1, x: 0, y: 0, scale: 1,
      });
    });

    return () => {
      clearTimeout(refreshTimer);
      mm.revert();
    };
  }, []);

  // Re-play the pop-in animation whenever the tech filter changes.
  useEffect(() => {
    if (isFirstFilterRender.current) {
      isFirstFilterRender.current = false;
      return;
    }

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        ".tech-item",
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.03, ease: "power2.out" }
      );
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(".tech-item", { opacity: 1, scale: 1 });
    });

    return () => mm.revert();
  }, [techFilter]);

  return (
    <Container
      as="section"
      ref={containerRef}
      id="about"
      className="section-padding-x section-padding-y relative z-0 scroll-mt-24"
    >
      {/* ── Section Header (custom, not using SectionHeader to control decode) ── */}
      <div className="mb-12 lg:mb-16">
        <div className="flex flex-col">
          <div className="mb-1">
            <span ref={subtitleRef} data-about-subtitle className="text-text-primary/80 text-sm tracking-[0.2em] uppercase font-mono block" style={{ opacity: 0 }}>{"< INTRODUCTION />"}</span>
          </div>
          <div data-about-line className="w-full h-px bg-border mb-3 origin-left" style={{ transform: "scaleX(0)" }} />
          <h2
            data-about-title
            className="font-heading font-semibold text-text-primary text-4xl sm:text-5xl md:text-6xl tracking-tight leading-none"
            style={{ opacity: 0, transform: "translateY(12px)" }}
          >
            Overview.
          </h2>
        </div>

        <p className="about-intro text-text-secondary text-[16px] sm:text-[18px] leading-[1.8] font-light max-w-3xl mt-6" style={{ opacity: 0, transform: "translateY(20px)" }}>
          I help companies ship <strong className="text-text-primary font-medium">AI-powered products</strong> faster
          through full-stack engineering, AI automation, and intelligent workflows — handling the
          technical complexity so you can focus on growth.
        </p>

        {/* Metadata */}
        <div className="about-meta flex items-center gap-4 mt-6" style={{ opacity: 0, transform: "translateY(12px)" }}>
          <span ref={capsRef} className="serial-number min-w-[125px]">{"< CAPABILITIES />"}</span>
          <span ref={tagsRef} className="font-mono text-xs tracking-[0.3em] text-text-muted uppercase min-w-[300px]">
            BUILD &bull; AUTOMATE &bull; GROW
          </span>
        </div>
      </div>

      {/* ── Two-Column Content ── */}
      <div className="about-columns grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8" style={{ opacity: 0, transform: "translateY(20px)" }}>

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
                  className={`font-mono text-xs sm:text-sm font-medium tracking-widest uppercase px-3 sm:px-4 py-2 transition-all duration-200 outline-none focus-visible:ring-1 focus-visible:ring-text-primary/30 ${techFilter === cat
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
