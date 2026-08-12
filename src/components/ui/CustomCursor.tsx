"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = ({ disabled = false }: { disabled?: boolean }) => {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Smooth spring for slight lag effect
  const springX = useSpring(cursorX, { stiffness: 300, damping: 30 });
  const springY = useSpring(cursorY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    // Only show custom cursor on desktop
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const updateMousePosition = (e: MouseEvent) => {
      // Directly set motion values - no React re-render!
      cursorX.set(e.clientX - 100);
      cursorY.set(e.clientY - 100);
    };

    const handleMouseOver = (e: MouseEvent) => {
      // Check if hovering over clickable elements
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (isMobile || disabled) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[50] flex items-center justify-center"
      style={{
        x: springX,
        y: springY,
      }}
      animate={{
        scale: isHovering ? 1.2 : 1,
      }}
      transition={{
        scale: { type: "spring", stiffness: 300, damping: 20 },
      }}
    >
      <div
        className="w-[200px] h-[200px] rounded-full"
        style={{
          // Reduced opacity for a softer white light
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 70%)",
        }}
      />
    </motion.div>
  );
};

export default CustomCursor;
