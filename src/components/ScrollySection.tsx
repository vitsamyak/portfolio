"use client";

import { useRef } from "react";
import ScrollyCanvas from "./ScrollyCanvas";
import Overlay from "./Overlay";

export default function ScrollySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative h-[500vh] w-full bg-[#0a0a0a]">
      <ScrollyCanvas containerRef={containerRef} />
      <Overlay scrollTargetRef={containerRef} />
    </section>
  );
}
