"use client";

import React, { useRef, useEffect } from "react";
import { useDevice } from "@/hooks/useDevice";

interface SparklesProps {
  id?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
  speed?: number;
}

export function SparklesCore({
  id = "sparkles",
  background = "transparent",
  minSize = 0.5,
  maxSize = 1.3,
  particleDensity = 160,
  className = "",
  particleColor = "#ffffff",
  speed = 0.8,
}: SparklesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isMobile, isLowPower } = useDevice();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      opacity: number;
      fadeSpeed: number;
      fadeDirection: number;
      speedX: number;
      speedY: number;
    }> = [];

    // Helper to translate hex to rgb safely
    const hexToRgba = (hex: string, alpha: number) => {
      const cleanHex = hex.replace("#", "");
      let r = 255, g = 255, b = 255;
      
      if (cleanHex.length === 3) {
        r = parseInt(cleanHex[0] + cleanHex[0], 16);
        g = parseInt(cleanHex[1] + cleanHex[1], 16);
        b = parseInt(cleanHex[2] + cleanHex[2], 16);
      } else if (cleanHex.length === 6) {
        r = parseInt(cleanHex.substring(0, 2), 16);
        g = parseInt(cleanHex.substring(2, 4), 16);
        b = parseInt(cleanHex.substring(4, 6), 16);
      }
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    // Dynamically calculate particle bounds depending on screen size
    const getParticleCount = (width: number, height: number) => {
      const area = (width * height) / 10000;
      let count = Math.floor(area * (particleDensity / 250));
      
      // Set responsive limits to secure GPU frame rates
      const maxCount = isMobile ? 45 : 120;
      return Math.min(Math.max(count, 12), maxCount);
    };

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const dpr = window.devicePixelRatio || 1;
      const width = parent.clientWidth;
      const height = parent.clientHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      initParticles(width, height);
    };

    const initParticles = (width: number, height: number) => {
      const count = getParticleCount(width, height);
      particles = [];

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * (maxSize - minSize) + minSize,
          opacity: Math.random() * 0.6 + 0.1,
          fadeSpeed: (Math.random() * 0.006 + 0.002) * speed,
          fadeDirection: Math.random() > 0.5 ? 1 : -1,
          speedX: (Math.random() - 0.5) * 0.06 * speed,
          speedY: -(Math.random() * 0.12 + 0.04) * speed, // Floating slowly upwards
        });
      }
    };

    const updateAndDraw = () => {
      if (!canvas || !ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Move particle
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }

        // Shimmer (Twinkle)
        p.opacity += p.fadeSpeed * p.fadeDirection;
        if (p.opacity >= 0.7) {
          p.fadeDirection = -1;
        } else if (p.opacity <= 0.04) {
          p.fadeDirection = 1;
        }

        // Draw particle points with a premium soft glow shadow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(particleColor, p.opacity);
        ctx.shadowBlur = p.size * 2.5;
        ctx.shadowColor = particleColor;
        ctx.fill();
      });

      // Clear shadows for potential next render steps
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(updateAndDraw);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Skip active canvas loop if device is on low-power mode
    if (!isLowPower) {
      animationFrameId = requestAnimationFrame(updateAndDraw);
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [minSize, maxSize, particleDensity, particleColor, speed, isMobile, isLowPower]);

  return (
    <canvas
      id={id}
      ref={canvasRef}
      style={{ background }}
      className={`pointer-events-none block ${className}`}
    />
  );
}
