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
    let prevDevice: DeviceType = {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      isLowPower: false,
      isTouch: false,
      dpr: 1,
    };

    const checkDevice = () => {
      const width = window.innerWidth;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isDesktop = width >= 1024;
      const isTouch =
        window.matchMedia("(pointer: coarse)").matches ||
        ("ontouchstart" in window) ||
        (typeof navigator !== "undefined" && navigator.maxTouchPoints > 0);
      
      // Smart check for active Data Saver modes on compatible browsers
      const isLowPower = typeof navigator !== "undefined" && 
        ((navigator as any).connection?.saveData === true);
      
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);

      if (
        prevDevice.isMobile !== isMobile ||
        prevDevice.isTablet !== isTablet ||
        prevDevice.isDesktop !== isDesktop ||
        prevDevice.isLowPower !== isLowPower ||
        prevDevice.isTouch !== isTouch ||
        prevDevice.dpr !== dpr
      ) {
        const nextDevice = {
          isMobile,
          isTablet,
          isDesktop,
          isLowPower,
          isTouch,
          dpr,
        };
        prevDevice = nextDevice;
        setDevice(nextDevice);
      }
    };

    checkDevice();
    window.addEventListener("resize", checkDevice, { passive: true });
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return device;
}
