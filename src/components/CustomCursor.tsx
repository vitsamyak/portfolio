"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useDevice } from "@/hooks/useDevice";

export default function CustomCursor() {
  const { isMobile, isTablet, isTouch } = useDevice();
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Position motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for precise, responsive tracking
  const dotX = useSpring(mouseX, { stiffness: 1000, damping: 50, mass: 0.08 });
  const dotY = useSpring(mouseY, { stiffness: 1000, damping: 50, mass: 0.08 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || isMobile || isTablet || isTouch) return;

    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const isClickable =
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[role="button"]') ||
        target.closest('input[type="submit"]') ||
        target.closest('input[type="button"]') ||
        target.closest(".clickable");
      
      setIsHovering(!!isClickable);
    };

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseleave", () => setIsVisible(false));
    window.addEventListener("mouseenter", () => setIsVisible(true));

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mounted, isMobile, isTablet, isTouch, mouseX, mouseY, isVisible]);

  if (!mounted || isMobile || isTablet || isTouch || !isVisible) return null;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        * {
          cursor: none !important;
        }
        a, button, [role="button"], .clickable {
          cursor: none !important;
        }
      `,
        }}
      />

      {/* Precise Target Dot */}
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
            scale: isHovering ? 2.2 : 1,
            backgroundColor: isHovering ? "rgba(167, 139, 250, 0.95)" : "rgba(255, 255, 255, 1)",
          }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="h-1.5 w-1.5 rounded-full shadow-[0_0_6px_rgba(255,255,255,0.3)]"
        />
      </motion.div>
    </>
  );
}

