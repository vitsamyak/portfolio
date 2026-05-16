"use client";

import { useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { profile } from "@/lib/portfolio";

export default function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    if (typeof window !== "undefined") {
      const threshold = window.innerHeight * 3.8;
      setScrolled(y > threshold);
    }
  });

  return (
    <header
      className={`fixed z-50 flex w-full transition-all duration-500 ${
        scrolled ? "top-6 px-4" : "top-0"
      }`}
    >
      <div
        className={`relative mx-auto flex w-full items-center justify-between transition-all duration-500 ${
          scrolled
            ? "h-14 w-full max-w-4xl rounded-full border border-white/10 bg-[#09090b] px-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_0_20px_-5px_rgba(167,139,250,0.15)] ring-1 ring-white/5"
            : "h-16 w-full max-w-7xl bg-transparent px-6 md:px-12"
        }`}
      >
        <a
          href="#"
          className="text-lg font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-white/40 transition-all hover:opacity-80"
        >
          {profile.name}
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {["Work", "About", "Contact"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="group relative text-sm font-medium text-white/50 transition-colors hover:text-white"
            >
              {link}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-transparent via-accent to-transparent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <Button
          variant={scrolled ? "primary" : "outline"}
          size="sm"
          className="hidden rounded-full sm:inline-flex"
          href={`mailto:${profile.email}`}
        >
          Contact
        </Button>
      </div>
    </header>
  );
}
