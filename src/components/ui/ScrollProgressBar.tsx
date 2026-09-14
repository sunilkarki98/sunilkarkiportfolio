'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ProgressBar = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!barRef.current) return;

    gsap.set(barRef.current, { scaleX: 0 });

    ScrollTrigger.create({
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      scrub: true,
      onUpdate: (self) => {
        gsap.to(barRef.current, {
          scaleX: self.progress,
          duration: 0.1,
          ease: 'none',
          overwrite: true,
        });
      },
    });
  }, []); // runs once on mount, auto-cleans on unmount

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 h-1 bg-[linear-gradient(to_right,var(--color-gradient-from),var(--color-gradient-to))] origin-left z-50"
    />
  );
};

export default ProgressBar;