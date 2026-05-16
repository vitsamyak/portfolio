"use client";

import { useScroll, useMotionValueEvent, motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { profile } from "@/lib/portfolio";

export default function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    if (typeof window !== "undefined") {
      const threshold = window.innerHeight * 3.8;
      setScrolled(y > threshold);
    }
  });

  // Lock scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const navLinks = [
    { name: "Work", href: "#work" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

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
          className="relative z-[60] text-lg font-bold tracking-tight text-white drop-shadow-sm transition-all hover:opacity-80 md:relative absolute left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0"
          onClick={() => setIsOpen(false)}
        >
          {profile.name}
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="group relative text-sm font-medium text-white/50 transition-colors hover:text-white"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-transparent via-accent to-transparent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button
            variant={scrolled ? "primary" : "outline"}
            size="sm"
            className="hidden rounded-full sm:inline-flex"
            href={`mailto:${profile.email}`}
          >
            Contact
          </Button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-[60] flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full bg-white/5 transition-all hover:bg-white/10 md:hidden"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              className="h-0.5 w-5 rounded-full bg-white/70"
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="h-0.5 w-5 rounded-full bg-white/70"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              className="h-0.5 w-5 rounded-full bg-white/70"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#09090b]/98 backdrop-blur-2xl"
          >
            <nav className="flex flex-col items-center gap-10">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-light tracking-[0.1em] text-white/60 transition-colors hover:text-white"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  variant="primary"
                  size="lg"
                  className="mt-4 rounded-full"
                  href={`mailto:${profile.email}`}
                  onClick={() => setIsOpen(false)}
                >
                  Get in touch
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
