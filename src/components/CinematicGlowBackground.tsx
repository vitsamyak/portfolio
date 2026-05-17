"use client";

import { motion } from "framer-motion";
import { useDevice } from "@/hooks/useDevice";

type ElegantShapeProps = {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
};

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: ElegantShapeProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={`absolute pointer-events-none ${className || ""}`}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-r to-transparent ${gradient} backdrop-blur-[2px] border-2 border-white/[0.15] shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]`}
        />
      </motion.div>
    </motion.div>
  );
}

export default function CinematicGlowBackground() {
  const { isMobile, isLowPower } = useDevice();
  const renderShapes = !isLowPower; // Enable for mobile, disable only on severe low-power/saving modes

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

      {/* 3. Kokonut UI dual-tone ambient glows (Indigo + Rose) */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.04] via-transparent to-rose-500/[0.04] blur-3xl pointer-events-none" />

      {/* 4. Ambient Lighting (Radial Glows) */}
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

      {/* 5. Kokonut UI Premium Animated Floating Geometric Shapes */}
      {renderShapes && (
        <div className="absolute inset-0 z-0">
          {/* Shape 1: Large Indigo Capsule - Projects top left */}
          <ElegantShape
            delay={0.3}
            width={isMobile ? 260 : 580}
            height={isMobile ? 65 : 130}
            rotate={12}
            gradient="from-indigo-500/[0.15]"
            className="left-[-12%] sm:left-[-8%] md:left-[-4%] top-[12%]"
          />

          {/* Shape 2: Small Cyan Capsule - Projects/About transition top right */}
          <ElegantShape
            delay={0.7}
            width={isMobile ? 120 : 200}
            height={isMobile ? 40 : 60}
            rotate={20}
            gradient="from-cyan-500/[0.15]"
            className="right-[-4%] sm:right-[4%] md:right-[12%] top-[28%]"
          />

          {/* Shape 3: Mid-size Rose Capsule - About middle left */}
          <ElegantShape
            delay={0.5}
            width={isMobile ? 200 : 420}
            height={isMobile ? 50 : 100}
            rotate={-15}
            gradient="from-rose-500/[0.15]"
            className="left-[-2%] sm:left-[2%] md:left-[5%] top-[45%]"
          />

          {/* Shape 4: Large Violet Capsule - About/Contact transition lower right */}
          <ElegantShape
            delay={0.4}
            width={isMobile ? 240 : 480}
            height={isMobile ? 60 : 110}
            rotate={-12}
            gradient="from-violet-500/[0.15]"
            className="right-[-8%] sm:right-[-4%] md:right-[-2%] top-[62%]"
          />

          {/* Shape 5: Medium Amber Capsule - Contact bottom left */}
          <ElegantShape
            delay={0.6}
            width={isMobile ? 140 : 280}
            height={isMobile ? 45 : 70}
            rotate={15}
            gradient="from-amber-500/[0.15]"
            className="left-[4%] sm:left-[8%] md:left-[15%] top-[80%]"
          />

          {/* Shape 6: Small Cyan Capsule - Footer bottom right */}
          <ElegantShape
            delay={0.8}
            width={isMobile ? 100 : 180}
            height={isMobile ? 35 : 50}
            rotate={-25}
            gradient="from-cyan-500/[0.15]"
            className="right-[4%] sm:right-[8%] md:right-[15%] top-[90%]"
          />
        </div>
      )}
    </div>
  );
}
