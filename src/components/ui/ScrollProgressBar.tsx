"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollProgressBar = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(barRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.1,
      },
    });
  });

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 h-[4px] bg-[linear-gradient(to_right,var(--color-gradient-from),var(--color-gradient-to))] origin-left z-[200] rounded-full"
      style={{ scaleX: 0, willChange: "transform" }}
    />
  );
};

export default ScrollProgressBar;
