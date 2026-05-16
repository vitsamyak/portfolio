"use client";

import { useState, useEffect } from "react";

export type DeviceType = {
  isMobile: boolean;
  isLowPower: boolean;
  isTouch: boolean;
  dpr: number;
};

export function useDevice(): DeviceType {
  const [device, setDevice] = useState<DeviceType>({
    isMobile: false,
    isLowPower: false,
    isTouch: false,
    dpr: 1,
  });

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const isMobile = width < 768;
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      
      // Heuristic for low power: mobile + high DPR or older Android
      const isLowPower = isMobile && (window.devicePixelRatio > 2 || /Android/i.test(navigator.userAgent));
      
      setDevice({
        isMobile,
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
