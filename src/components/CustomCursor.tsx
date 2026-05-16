"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Position motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for the dual-speed effect
  // Inner dot: Precise and responsive
  const dotX = useSpring(mouseX, { stiffness: 800, damping: 45, mass: 0.1 });
  const dotY = useSpring(mouseY, { stiffness: 800, damping: 45, mass: 0.1 });

  // Outer ring: Cinematic lag
  const ringX = useSpring(mouseX, { stiffness: 120, damping: 24, mass: 0.6 });
  const ringY = useSpring(mouseY, { stiffness: 120, damping: 24, mass: 0.6 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable =
        target.closest("a") ||
        target.closest("button") ||
        window.getComputedStyle(target).cursor === "pointer";
      
      setIsHovering(!!isClickable);
    };

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseleave", () => setIsVisible(false));
    window.addEventListener("mouseenter", () => setIsVisible(true));

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        * {
          cursor: none !important;
        }
        a, button, [role="button"] {
          cursor: none !important;
        }
      `,
        }}
      />

      {/* Outer Ring - The Cinematic Follower */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] mix-blend-exclusion"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 56 : 32,
            height: isHovering ? 56 : 32,
            opacity: isHovering ? 0.7 : 0.4,
            borderColor: isHovering ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.3)",
          }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="rounded-full border-[0.5px] backdrop-blur-[1px]"
        />
      </motion.div>

      {/* Inner Dot - The Precise Target */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 0.4 : 1,
            backgroundColor: isHovering ? "rgba(255, 165, 0, 0.8)" : "rgba(255, 255, 255, 1)",
            boxShadow: isHovering 
              ? "0 0 12px rgba(255, 165, 0, 0.6)" 
              : "0 0 8px rgba(255, 255, 255, 0.3)",
          }}
          transition={{ duration: 0.3 }}
          className="h-1.5 w-1.5 rounded-full"
        />
      </motion.div>
    </>
  );
}

