"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useDevice } from "@/hooks/useDevice";
import { SparklesCore } from "./ui/SparklesCore";

export default function MagicBackground() {
  const { isMobile, isLowPower } = useDevice();
  const containerRef = useRef<HTMLDivElement>(null);

  // High-performance pointer tracking via CSS variables (zero React re-renders)
  useEffect(() => {
    const container = containerRef.current;
    if (!container || isMobile) return;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      container.style.setProperty("--mouse-x", `${x}px`);
      container.style.setProperty("--mouse-y", `${y}px`);
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [isMobile]);

  // Touch coordinates listener for mobile and tablet drag events
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const rect = container.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const y = e.touches[0].clientY - rect.top;
      
      container.style.setProperty("--mouse-x", `${x}px`);
      container.style.setProperty("--mouse-y", `${y}px`);
    };

    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchstart", handleTouchMove, { passive: true });
    
    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchMove);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-0 h-[100dvh] w-full overflow-hidden bg-[#09090b]"
      style={{
        ["--mouse-x" as any]: "50%",
        ["--mouse-y" as any]: "50%",
      }}
    >
      {/* 1. Base static dot pattern structure */}
      <div 
        className="absolute inset-0 z-0 h-full w-full opacity-[0.16] mix-blend-screen"
        style={{
          backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: isMobile ? "32px 32px" : "24px 24px",
        }}
      />
      
      {/* 2. Interactive Spotlight Dot Grid (illuminates nearby dots around mouse or touch coordinates) */}
      <div 
        className="absolute inset-0 z-0 h-full w-full opacity-[0.55] mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at center, rgba(167,139,250,0.3) 1px, transparent 1px)",
          backgroundSize: isMobile ? "32px 32px" : "24px 24px",
          maskImage: "radial-gradient(circle 180px at var(--mouse-x) var(--mouse-y), black 0%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(circle 180px at var(--mouse-x) var(--mouse-y), black 0%, transparent 100%)",
        }}
      />

      {/* 3. Shimmering Stardust Sparkles Overlay */}
      <div className="absolute inset-0 z-10 h-full w-full mix-blend-screen pointer-events-none">
        <SparklesCore
          id="stardust-bg"
          background="transparent"
          minSize={0.4}
          maxSize={isMobile ? 1.0 : 1.3}
          particleDensity={isMobile ? 55 : 130}
          className="h-full w-full"
          particleColor="#ffffff"
          speed={0.5}
        />
      </div>
      
      {/* 4. Ambient Pulsing Radial Glows */}
      <motion.div
        animate={isMobile ? false : {
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.5, 0.35],
        }}
        transition={isMobile ? { duration: 0 } : {
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`pointer-events-none absolute -top-[10%] left-[10%] rounded-full bg-indigo-600/15 ${
          isMobile ? "h-[250px] w-[250px] blur-[50px] opacity-15" : "h-[600px] w-[600px] blur-[130px]"
        }`}
      />
      
      <motion.div
        animate={isMobile ? false : {
          scale: [1, 1.25, 1],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={isMobile ? { duration: 0 } : {
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.5,
        }}
        className={`pointer-events-none absolute -bottom-[10%] right-[5%] rounded-full bg-violet-600/15 ${
          isMobile ? "h-[300px] w-[300px] blur-[60px] opacity-10" : "h-[700px] w-[700px] blur-[160px]"
        }`}
      />

      {!isMobile && (
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.12, 0.25, 0.12],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4.5,
          }}
          className="pointer-events-none absolute left-[35%] top-[35%] h-[500px] w-[500px] rounded-full bg-fuchsia-600/8 blur-[110px]"
        />
      )}
      
      {/* 5. Vignette overlay for visual framing and maximum text contrast */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#09090b]/85 via-transparent to-[#09090b]/85" />
    </div>
  );
}
