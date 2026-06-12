"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useDevice } from "@/hooks/useDevice";
import { drawCover } from "@/lib/canvas";
import { FRAME_COUNT } from "@/lib/sequence";

type ScrollyCanvasProps = {
  containerRef: RefObject<HTMLDivElement | null>;
};

export default function ScrollyCanvas({ containerRef }: ScrollyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef(0);
  const [ready, setReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const { isMobile, isTablet, dpr } = useDevice();
  const dimensionsRef = useRef({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const frames = framesRef.current;
    if (!canvas || !frames.length) return;

    const ctx = canvas.getContext("2d");
    const img = frames[index];
    if (!ctx || !img?.complete) return;

    const { width, height } = dimensionsRef.current;
    if (width === 0 || height === 0) return;

    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, width, height);
    drawCover(ctx, img, width, height);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const frames: HTMLImageElement[] = [];
      for (let i = 0; i < FRAME_COUNT; i++) {
        if (cancelled) return;
        const img = await new Promise<HTMLImageElement>((resolve, reject) => {
          const el = new Image();
          el.onload = () => resolve(el);
          el.onerror = reject;
          el.src = `/sequence/frame_${String(i).padStart(2, "0")}_delay-0.067s.png`;
        });
        frames.push(img);
        setLoadProgress(Math.round(((i + 1) / FRAME_COUNT) * 100));
      }
      if (cancelled) return;
      framesRef.current = frames;
      setReady(true);
      renderFrame(0);
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [renderFrame]);

  useEffect(() => {
    let lastWidth = window.innerWidth;
    let lastHeight = window.innerHeight;

    const updateDimensions = (force = false) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const currentWidth = window.innerWidth;
      const currentHeight = window.innerHeight;

      // Only resize if width changed, or height changed significantly (> 120px) to ignore mobile address bar toggle
      const widthChanged = currentWidth !== lastWidth;
      const heightChanged = Math.abs(currentHeight - lastHeight) > 120;

      if (!force && !widthChanged && !heightChanged) {
        return;
      }

      lastWidth = currentWidth;
      lastHeight = currentHeight;

      const rect = canvas.getBoundingClientRect();
      dimensionsRef.current = { width: rect.width, height: rect.height };
      
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      
      renderFrame(frameIndexRef.current);
    };

    updateDimensions(true);
    
    const onResize = () => updateDimensions(false);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [dpr, renderFrame]);

  const rafRef = useRef<number | null>(null);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!ready) return;
    const index = Math.min(
      FRAME_COUNT - 1,
      Math.floor(progress * (FRAME_COUNT - 1))
    );

    if (index !== frameIndexRef.current) {
      if (isMobile || isTablet) {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
          frameIndexRef.current = index;
          renderFrame(index);
        });
      } else {
        frameIndexRef.current = index;
        renderFrame(index);
      }
    }
  });

  return (
    <div className="absolute inset-0 h-full w-full bg-canvas">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-80"
        aria-hidden
      />

      {!ready && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-canvas">
          <motion.div
            className="h-px w-48 overflow-hidden rounded-full bg-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div
              className="h-full bg-accent transition-all duration-300 ease-out"
              style={{ width: `${loadProgress}%` }}
            />
          </motion.div>
          <p className="text-xs font-medium tracking-[0.3em] text-white/40 uppercase">
            Loading sequence {loadProgress}%
          </p>
        </div>
      )}

      {/* Cinematic Vignette */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.8)_100%)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      />

      {/* Smooth, symmetrical cinematic bottom fade (Hides any bottom edge watermarks naturally) */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-full bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
    </div>
  );
}
