"use client";

import { motion } from "framer-motion";
import { useDevice } from "@/hooks/useDevice";

export default function CinematicGlowBackground() {
  const { isMobile, isLowPower } = useDevice();
  const renderShapes = !isMobile && !isLowPower;

  return (
    <div className="absolute inset-0 -z-10 w-full overflow-hidden bg-transparent">
      {/* 1. Subtle film-grain noise overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 h-full w-full opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 2. Soft dot grid pattern for tech/engineering feel (fades as we go down) */}
      <div
        className="absolute inset-0 z-0 h-full w-full opacity-[0.12] mix-blend-screen"
        style={{
          backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* 3. Ambient Lighting (Radial Glows) */}
      {/* Top Left Deep Blue Glow */}
      <div 
        className="pointer-events-none absolute left-[-10%] top-[8%] h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.12)_0%,rgba(37,99,235,0)_70%)] blur-[120px]" 
      />
      
      {/* Mid Right Soft Amber/Orange Glow */}
      <div 
        className="pointer-events-none absolute right-[-10%] top-[35%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.06)_0%,rgba(249,115,22,0)_70%)] blur-[140px]" 
      />
      
      {/* Lower Left Subtle Cyan/Blue Glow */}
      <div 
        className="pointer-events-none absolute left-[-5%] bottom-[25%] h-[900px] w-[900px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.06)_0%,rgba(6,182,212,0)_70%)] blur-[120px]" 
      />
      
      {/* Footer Area Deep Warm Orange Glow */}
      <div 
        className="pointer-events-none absolute right-[5%] bottom-[2%] h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle,rgba(234,88,12,0.06)_0%,rgba(234,88,12,0)_70%)] blur-[100px]" 
      />

      {/* 4. Layered Floating 3D Capsules (Hidden on mobile for fluid performance) */}
      {renderShapes && (
        <div className="absolute inset-0 z-0">
          {/* Capsule 1: Large, slow float, upper-left area */}
          <motion.div
            animate={{
              y: [0, -35, 0],
              x: [0, 15, 0],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-[6%] top-[12%] h-[420px] w-[130px] rotate-[22deg] rounded-full border border-white/[0.04] bg-gradient-to-b from-white/[0.015] to-white/[0.001] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_20px_40px_-20px_rgba(0,0,0,0.6)] backdrop-blur-[12px]"
          />

          {/* Capsule 2: Medium-right, alternate float */}
          <motion.div
            animate={{
              y: [0, 45, 0],
              x: [0, -20, 0],
            }}
            transition={{
              duration: 26,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute right-[8%] top-[30%] h-[350px] w-[110px] rotate-[22deg] rounded-full border border-white/[0.03] bg-gradient-to-b from-white/[0.012] to-white/[0.001] shadow-[inset_0_1px_1px_rgba(255,255,255,0.04),0_15px_35px_-15px_rgba(0,0,0,0.6)] backdrop-blur-[9px]"
          />

          {/* Capsule 3: Smaller, deep background layer, left-mid */}
          <motion.div
            animate={{
              y: [0, -25, 0],
              x: [0, -12, 0],
            }}
            transition={{
              duration: 19,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4,
            }}
            className="absolute left-[12%] top-[50%] h-[220px] w-[80px] rotate-[22deg] rounded-full border border-white/[0.02] bg-white/[0.006] opacity-70 shadow-[0_12px_24px_rgba(0,0,0,0.5)] backdrop-blur-[6px]"
          />

          {/* Capsule 4: Large, contact area */}
          <motion.div
            animate={{
              y: [0, -40, 0],
              x: [0, 25, 0],
            }}
            transition={{
              duration: 24,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute right-[6%] top-[65%] h-[400px] w-[120px] rotate-[22deg] rounded-full border border-white/[0.04] bg-gradient-to-b from-white/[0.01] to-white/[0.001] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_20px_40px_-20px_rgba(0,0,0,0.6)] backdrop-blur-[11px]"
          />
        </div>
      )}
    </div>
  );
}
