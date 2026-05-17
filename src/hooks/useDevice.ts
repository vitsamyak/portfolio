"use client";

import { useState, useEffect } from "react";

export type DeviceType = {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLowPower: boolean;
  isTouch: boolean;
  dpr: number;
};

export function useDevice(): DeviceType {
  const [device, setDevice] = useState<DeviceType>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isLowPower: false,
    isTouch: false,
    dpr: 1,
  });

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isDesktop = width >= 1024;
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      
      // Smart check for active Data Saver modes on compatible browsers
      const isLowPower = typeof navigator !== "undefined" && 
        ((navigator as any).connection?.saveData === true);
      
      setDevice({
        isMobile,
        isTablet,
        isDesktop,
        isLowPower,
        isTouch,
        dpr: Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2),
      });
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return device;
}
