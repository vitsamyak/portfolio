"use client";

import { useRef, useState, useEffect } from "react";
import ScrollyCanvas from "./ScrollyCanvas";
import Overlay from "./Overlay";

export default function ScrollySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section ref={containerRef} className="relative h-[500vh] w-full bg-[#0a0a0a]">
      {mounted && (
        <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
          <ScrollyCanvas containerRef={containerRef} />
          <Overlay scrollTargetRef={containerRef} />
        </div>
      )}
    </section>
  );
}
