"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiGlobe } from "react-icons/fi";
// ── Decoding Effect ──────────────────────────────────────
// Rapidly cycles through random characters before settling
// on the final word — creates a "system boot" feeling.
const GLITCH_CHARS = "01!@#$%&?XYZABCDEF{}[]<>/\\|";

function decodeText(
  el: HTMLElement,
  finalText: string,
  duration = 0.8,
  targetOpacity = 0.18,
  onComplete?: () => void
) {
  // Cancel any existing decode animation on this element
  if ((el as any)._decodeRaf) {
    cancelAnimationFrame((el as any)._decodeRaf);
  }

  const length = finalText.length;
  const durationMs = duration * 1000;
  const scrambleInterval = 80; // Slower, more deliberate character cycling
  let lastScrambleTime = 0;
  let startTime: number | null = null;

  // Make visible and set first scrambled frame SYNCHRONOUSLY
  el.style.opacity = String(targetOpacity);
  el.textContent = finalText
    .split("")
    .map(() => GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)])
    .join("");

  function tick(timestamp: number) {
    if (startTime === null) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / durationMs, 1);

    // Ease-out for smooth deceleration: characters lock in faster at the end
    const easedProgress = 1 - Math.pow(1 - progress, 2);
    const revealedCount = Math.floor(easedProgress * length);

    // Only update text content at the scramble interval to keep the glitch aesthetic
    if (timestamp - lastScrambleTime >= scrambleInterval || progress >= 1) {
      lastScrambleTime = timestamp;

      if (progress >= 1) {
        el.textContent = finalText;
        onComplete?.();
        return;
      }

      el.textContent = finalText
        .split("")
        .map((char, i) => {
          if (i < revealedCount) return char;
          return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        })
        .join("");
    }

    const raf = requestAnimationFrame(tick);
    (el as any)._decodeRaf = raf;
  }

  const raf = requestAnimationFrame(tick);
  (el as any)._decodeRaf = raf;
  return () => cancelAnimationFrame((el as any)._decodeRaf);
}

// ── Magnetic Physics ─────────────────────────────────────
// Each word is attracted towards the cursor when it hovers
// over the right-side field. Uses GSAP for spring-like easing.
function useMagnetic(containerRef: React.RefObject<HTMLDivElement | null>) {
  const magneticEls = useRef<HTMLElement[]>([]);
  const isActive = useRef(true);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current || !isActive.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      // Mouse position relative to container center
      const mouseX = e.clientX - containerRect.left - containerRect.width / 2;
      const mouseY = e.clientY - containerRect.top - containerRect.height / 2;

      magneticEls.current.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const elCenterX =
          rect.left + rect.width / 2 - containerRect.left - containerRect.width / 2;
        const elCenterY =
          rect.top + rect.height / 2 - containerRect.top - containerRect.height / 2;

        // Distance from mouse to element center
        const distX = mouseX - elCenterX;
        const distY = mouseY - elCenterY;
        const dist = Math.sqrt(distX * distX + distY * distY);

        // Attraction strength — closer = stronger pull
        const maxPull = 18; // reduced max pull for subtlety
        const radius = 150; // Much smaller radius so only the hovered word reacts
        const strength = Math.max(0, 1 - dist / radius);
        const pullX = distX * strength * 0.12;
        const pullY = distY * strength * 0.12;

        gsap.to(el, {
          x: Math.min(maxPull, Math.max(-maxPull, pullX)),
          y: Math.min(maxPull, Math.max(-maxPull, pullY)),
          duration: 1.2,
          ease: "power3.out",
          overwrite: "auto",
        });

        // Opacity boost based on proximity
        const opacityBoost = 0.18 + strength * 0.37;
        gsap.to(el, {
          opacity: opacityBoost,
          duration: 0.8,
          ease: "power2.out",
          overwrite: false,
        });
      });
    },
    [containerRef]
  );

  const handleMouseLeave = useCallback(() => {
    // Spring back to origin
    magneticEls.current.forEach((el) => {
      gsap.to(el, {
        x: 0,
        y: 0,
        opacity: 0.18,
        duration: 1.5,
        ease: "elastic.out(1, 0.6)",
        overwrite: "auto",
      });
    });
  }, []);

  const register = useCallback((el: HTMLElement | null) => {
    if (el && !magneticEls.current.includes(el)) {
      magneticEls.current.push(el);
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [containerRef, handleMouseMove, handleMouseLeave]);

  return { register, setActive: (v: boolean) => (isActive.current = v) };
}

// ── Hero Component ───────────────────────────────────────
const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const rightFieldRef = useRef<HTMLDivElement>(null);
  const decodeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const { register: registerMagnetic, setActive: setMagneticActive } =
    useMagnetic(rightFieldRef);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Reduced motion: reveal everything instantly
    if (prefersReducedMotion) {
      sectionRef.current?.querySelectorAll("[data-hero]").forEach((el) => {
        (el as HTMLElement).style.opacity = "1";
        (el as HTMLElement).style.transform = "none";
        (el as HTMLElement).style.clipPath = "none";
      });
      setMagneticActive(true);
      return;
    }

    // Disable magnetic until entrance completes
    setMagneticActive(false);
    const cleanups: (() => void)[] = [];

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Start everything simultaneously at time 0
      
      // 1 → Left side sequential entrance, all rooted at 0
      tl.to(".hero-status", { opacity: 1, scale: 1, duration: 0.5 }, 0);
      tl.to(".hero-axis", { scaleY: 1, duration: 1, ease: "power2.inOut" }, 0.2);
      tl.to(".hero-role", { opacity: 1, y: 0, duration: 0.5 }, 0.3);
      tl.to(".hero-name-line", {
          clipPath: "inset(0 0 0% 0)",
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.inOut",
        }, 0.2);
      tl.to(".hero-copy", { opacity: 1, y: 0, duration: 0.5 }, 0.6);
      tl.to(".hero-cta", { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 }, 0.8);

      // 2 → Right side decode also starts exactly at time 0
      tl.add(() => {
        const words = ["AI", "AUTOMATION", "SOFTWARE"];
        const durations = [1.6, 1.6, 1.6];
        const opacities = [0.18, 0.15, 0.16];
        const staggerDelays = [0, 600, 1200]; // 0ms delay for the first word!

        // Also grab all the wrapper rows so we can fade them in one by one
        const rows = document.querySelectorAll(".hero-editorial");

        decodeRefs.current.forEach((el, i) => {
          if (el) {
            const timer = setTimeout(() => {
              // Fade in this specific row exactly when its text starts decoding
              if (rows[i]) {
                gsap.to(rows[i], {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  ease: "power2.out",
                });
              }

              const cleanup = decodeText(
                el,
                words[i],
                durations[i],
                opacities[i],
                () => {
                  if (i === words.length - 1) {
                    setMagneticActive(true);
                    // Fade in the final metadata row after everything finishes
                    if (rows[3]) {
                      gsap.to(rows[3], {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: "power2.out",
                      });
                      
                      const meta1 = rows[3].querySelector(".meta-decode-1") as HTMLElement;
                      const meta2 = rows[3].querySelector(".meta-decode-2") as HTMLElement;
                      
                      if (meta1) {
                        const cleanup1 = decodeText(meta1, "BASED IN NEPAL", 0.8, 1, () => {
                          if (sectionRef.current) gsap.to(sectionRef.current.querySelector(".meta-icon-1"), { opacity: 1, duration: 0.4 });
                        });
                        cleanups.push(cleanup1);
                      }
                      if (meta2) {
                        // Start the second metadata decode simultaneously or slightly after
                        setTimeout(() => {
                          const cleanup2 = decodeText(meta2, "AVAILABLE WORLDWIDE", 1.0, 1, () => {
                            if (sectionRef.current) gsap.to(sectionRef.current.querySelector(".meta-icon-2"), { opacity: 1, duration: 0.4 });
                          });
                          cleanups.push(cleanup2);
                        }, 200);
                      }
                    }
                  }
                }
              );
              cleanups.push(cleanup);
            }, staggerDelays[i]);
            cleanups.push(() => clearTimeout(timer));
          }
        });
      }, 0); // Start at absolute 0 time!



      // Scroll parallax — subtle depth between left and right
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          if (!sectionRef.current) return;
          const leftContent = sectionRef.current.querySelector(".hero-left-content");
          const rightContent = sectionRef.current.querySelector(".hero-right-content");
          
          const p = self.progress;
          if (leftContent) {
            gsap.set(leftContent, {
              y: p * -50,
              opacity: 1 - p * 0.5,
            });
          }
          if (rightContent) {
            gsap.set(rightContent, {
              y: p * -25,
              opacity: 1 - p * 0.3,
            });
          }
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      cleanups.forEach((fn) => fn());
    };
  }, [setMagneticActive]);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto section-padding-x flex flex-col lg:flex-row items-start pt-32 sm:pt-40 pb-0 gap-12 lg:gap-0">

        {/* ── LEFT COLUMN ── */}
        <div className="hero-left-content relative flex items-start gap-5 sm:gap-6 lg:w-[55%] z-10">
          {/* Axis */}
          <div className="flex flex-col items-center shrink-0 pt-0.5">
            <div
              className="hero-status relative flex justify-center items-center w-3 h-3"
              style={{ opacity: 0, transform: "scale(0)" }}
              data-hero
            >
              <span className="absolute inline-flex h-3 w-3 rounded-full bg-green-500/20" />
              <span className="relative inline-flex rounded-full h-[5px] w-[5px] bg-green-500 shadow-[0_0_4px_rgba(34,197,94,0.4)]" />
            </div>

            <div
              className="hero-axis relative w-px bg-border mt-1.5"
              style={{
                height: "clamp(200px, 38vh, 360px)",
                transformOrigin: "top",
                transform: "scaleY(0)",
              }}
              data-hero
            >
              <div className="absolute top-1/4 right-full w-[3px] h-px bg-text-muted/20" style={{ marginRight: 1 }} />
              <div className="absolute top-1/2 right-full w-[5px] h-px bg-text-muted/20" style={{ marginRight: 1 }} />
              <div className="absolute top-3/4 right-full w-[3px] h-px bg-text-muted/20" style={{ marginRight: 1 }} />
            </div>
          </div>

          {/* Text content */}
          <div className="flex flex-col">
            <span
              className="hero-role text-text-muted text-[11px] sm:text-[12px] font-medium tracking-[0.2em] uppercase mb-5 sm:mb-6"
              style={{ opacity: 0, transform: "translateY(8px)" }}
              data-hero
            >
              Software Engineer
            </span>

            <h1 className="font-heading font-black tracking-[-0.03em] leading-[0.88]">
              <span
                className="hero-name-line block text-text-primary whitespace-nowrap"
                style={{
                  fontSize: "clamp(2.8rem, 6.5vw, 5.2rem)",
                  clipPath: "inset(0 0 100% 0)",
                }}
                data-hero
              >
                <span className="text-transparent" style={{ WebkitTextStroke: "1.5px var(--color-text-primary)" }}>SUNIL</span> KARKI
              </span>
            </h1>

            <p
              className="hero-copy text-text-secondary text-[15px] sm:text-base lg:text-[17px] font-normal leading-relaxed mt-5 sm:mt-6 max-w-[26rem]"
              style={{ opacity: 0, transform: "translateY(12px)" }}
              data-hero
            >
              I build AI‑powered software, automation systems, and high‑performance web applications.
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4 mt-7 sm:mt-8">
              <a
                href="#contact"
                aria-label="Book a free strategy call"
                className="hero-cta btn-primary px-7 sm:px-8 py-3 rounded-full"
                style={{ opacity: 0, transform: "translateY(10px)" }}
                data-hero
              >
                Book a Free Call
              </a>
              <a
                href="#work"
                aria-label="See results I've delivered"
                className="hero-cta btn-secondary px-7 sm:px-8 py-3 rounded-full"
                style={{ opacity: 0, transform: "translateY(10px)" }}
                data-hero
              >
                See My Results
              </a>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN (Desktop) ── */}
        <div
          ref={rightFieldRef}
          className="hero-right-content lg:w-[45%] relative lg:self-center hidden lg:block cursor-crosshair"
        >
          <div className="flex flex-col items-end text-right select-none">
            {/* Row 1: 001 — AI */}
            <div
              className="hero-editorial flex items-baseline gap-3"
              style={{ opacity: 0, transform: "translateY(16px)" }}
              data-hero
            >
              <span
                className="text-text-muted/80 text-[11px] tracking-[0.15em] cursor-crosshair"
                style={{ fontFamily: "monospace" }}
                onMouseEnter={(e) => decodeText(e.currentTarget, "001", 0.4, 0.8)}
              >
                001
              </span>
              <span className="w-6 h-px bg-border inline-block -translate-y-0.5" />
              <span
                ref={(el) => {
                  decodeRefs.current[0] = el;
                  if (el) registerMagnetic(el);
                }}
                className="font-heading font-black leading-[0.85] tracking-[-0.02em] whitespace-nowrap will-change-transform"
                style={{
                  fontSize: "clamp(3.5rem, 8vw, 7rem)",
                  opacity: 0,
                  color: "var(--color-text-primary)",
                }}
              >
                {"\u00A0\u00A0"}
              </span>
            </div>

            {/* Row 2: 002 — AUTOMATION */}
            <div
              className="hero-editorial flex items-baseline gap-3 -mt-1 xl:-mt-2"
              style={{ opacity: 0, transform: "translateY(16px)" }}
              data-hero
            >
              <span
                className="text-text-muted/80 text-[11px] tracking-[0.15em] cursor-crosshair"
                style={{ fontFamily: "monospace" }}
                onMouseEnter={(e) => decodeText(e.currentTarget, "002", 0.4, 0.8)}
              >
                002
              </span>
              <span className="w-10 h-px bg-border inline-block -translate-y-0.5" />
              <span
                ref={(el) => {
                  decodeRefs.current[1] = el;
                  if (el) registerMagnetic(el);
                }}
                className="font-heading font-black leading-[0.9] tracking-[-0.01em] whitespace-nowrap will-change-transform"
                style={{
                  fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
                  opacity: 0,
                  color: "var(--color-text-primary)",
                }}
              >
                {"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}
              </span>
            </div>

            {/* Row 3: 003 — SOFTWARE */}
            <div
              className="hero-editorial flex items-baseline gap-3 -mt-0.5 xl:-mt-1"
              style={{ opacity: 0, transform: "translateY(16px)" }}
              data-hero
            >
              <span
                className="text-text-muted/80 text-[11px] tracking-[0.15em] cursor-crosshair"
                style={{ fontFamily: "monospace" }}
                onMouseEnter={(e) => decodeText(e.currentTarget, "003", 0.4, 0.8)}
              >
                003
              </span>
              <span className="w-14 h-px bg-border inline-block -translate-y-0.5" />
              <span
                ref={(el) => {
                  decodeRefs.current[2] = el;
                  if (el) registerMagnetic(el);
                }}
                className="font-heading font-black leading-[0.85] tracking-[-0.02em] whitespace-nowrap will-change-transform"
                style={{
                  fontSize: "clamp(2.8rem, 6vw, 5rem)",
                  opacity: 0,
                  color: "var(--color-text-primary)",
                }}
              >
                {"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}
              </span>
            </div>

            {/* Row 4: Metadata — BASED IN NEPAL · AVAILABLE WORLDWIDE */}
            <div
              className="hero-editorial flex items-center gap-4 mt-6 xl:mt-8"
              style={{ opacity: 0, transform: "translateY(16px)" }}
              data-hero
            >
              <span className="w-12 h-px bg-border" />
              <span
                className="text-text-secondary text-[12px] tracking-[0.18em] uppercase flex items-center"
                style={{ fontFamily: "monospace" }}
              >
                <span 
                  className="flex items-center gap-2 cursor-crosshair transition-all duration-300 hover:text-text-primary group"
                  onMouseEnter={(e) => {
                    const icon = e.currentTarget.querySelector(".meta-icon-1");
                    if (icon) gsap.to(icon, { opacity: 0, duration: 0.1 });
                    decodeText(e.currentTarget.querySelector('.meta-decode-1') as HTMLElement, "BASED IN NEPAL", 0.4, 1, () => {
                      if (icon) gsap.to(icon, { opacity: 1, duration: 0.3 });
                    });
                  }}
                >
                  <span className="meta-decode-1 inline-block min-w-[125px]" style={{ opacity: 0 }}>BASED IN NEPAL</span>
                  <span className="meta-icon-1 text-[14px] group-hover:scale-110 transition-transform opacity-0">🇳🇵</span>
                </span>
                
                <span className="mx-4 opacity-30 text-border">|</span>
                
                <span 
                  className="flex items-center gap-2 cursor-crosshair transition-all duration-300 hover:text-text-primary group"
                  onMouseEnter={(e) => {
                    const icon = e.currentTarget.querySelector(".meta-icon-2");
                    if (icon) gsap.to(icon, { opacity: 0, duration: 0.1 });
                    decodeText(e.currentTarget.querySelector('.meta-decode-2') as HTMLElement, "AVAILABLE WORLDWIDE", 0.5, 1, () => {
                      if (icon) gsap.to(icon, { opacity: 1, duration: 0.3 });
                    });
                  }}
                >
                  <span className="meta-decode-2 inline-block min-w-[175px]" style={{ opacity: 0 }}>AVAILABLE WORLDWIDE</span>
                  <FiGlobe className="meta-icon-2 w-3.5 h-3.5 group-hover:rotate-12 transition-transform opacity-0" />
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* ── Mobile metadata ── */}
        <div className="hero-right-content lg:hidden w-full mt-2 select-none">
          <div className="flex items-center gap-3 ml-8 sm:ml-9">
            <span className="w-6 h-px bg-border" />
            <span
              className="hero-editorial text-text-muted/30 text-[10px] tracking-[0.18em] uppercase"
              style={{ opacity: 0, fontFamily: "monospace" }}
              data-hero
            >
              AI · Automation · Software
            </span>
            <span className="flex-1 h-px bg-border/50" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;