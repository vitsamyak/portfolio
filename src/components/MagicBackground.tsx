"use client";

import { motion } from "framer-motion";

export default function MagicBackground() {
  return (
    <div className="fixed inset-0 z-0 h-screen w-full overflow-hidden bg-[#09090b]">
      {/* Dot pattern background */}
      <div 
        className="absolute inset-0 z-0 h-full w-full opacity-40 mix-blend-screen"
        style={{
          backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      
      {/* Animated radial glows */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -top-[20%] left-[20%] h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="pointer-events-none absolute -bottom-[20%] right-[10%] h-[600px] w-[600px] rounded-full bg-violet-600/20 blur-[150px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="pointer-events-none absolute left-[40%] top-[40%] h-[400px] w-[400px] rounded-full bg-fuchsia-600/10 blur-[100px]"
      />
      
      {/* Vignette effect */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#09090b]/80 via-transparent to-[#09090b]/80" />
    </div>
  );
}
