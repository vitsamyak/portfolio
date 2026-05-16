"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function MagicBackground() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="fixed inset-0 z-0 h-screen w-full overflow-hidden bg-[#09090b]">
      {/* Dot pattern background */}
      <div 
        className="absolute inset-0 z-0 h-full w-full opacity-40 mix-blend-screen"
        style={{
          backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: isMobile ? "32px 32px" : "24px 24px",
        }}
      />
      
      {/* Animated radial glows - Simplified for mobile */}
      <motion.div
        animate={isMobile ? { opacity: [0.2, 0.3, 0.2] } : {
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: isMobile ? 4 : 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`pointer-events-none absolute -top-[10%] left-[10%] rounded-full bg-indigo-600/20 ${
          isMobile ? "h-[300px] w-[300px] blur-[60px]" : "h-[500px] w-[500px] blur-[120px]"
        }`}
      />
      <motion.div
        animate={isMobile ? { opacity: [0.1, 0.2, 0.1] } : {
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: isMobile ? 5 : 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className={`pointer-events-none absolute -bottom-[10%] right-[5%] rounded-full bg-violet-600/20 ${
          isMobile ? "h-[400px] w-[400px] blur-[80px]" : "h-[600px] w-[600px] blur-[150px]"
        }`}
      />
      {!isMobile && (
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
      )}
      
      {/* Vignette effect */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#09090b]/80 via-transparent to-[#09090b]/80" />
    </div>
  );
}
