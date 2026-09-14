"use client";
import createGlobe from "cobe";
import { useEffect, useRef } from "react";

export function CobeGlobe({ className = "", size = 20 }: { className?: string; size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 200,
      height: 200,
      phi: 0,
      theta: 0,
      dark: 1, // dark mode
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [1, 1, 1],
      markerColor: [1, 1, 1],
      glowColor: [0.5, 0.5, 0.5],
      markers: [
        // approximate location of Nepal
        { location: [28.3949, 84.124], size: 0.1 },
      ],
    });

    let rafId: number;
    const animate = () => {
      phi += 0.015;
      globe.update({ phi });
      rafId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      globe.destroy();
    };
  }, [size]);

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          contain: "layout paint size",
        }}
      />
    </div>
  );
}
