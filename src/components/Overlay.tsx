"use client";

import { useEffect, useState, type RefObject } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { scrollNarrative } from "@/lib/portfolio";

type SectionAlign = "center" | "left" | "right";
type SectionLayout = "hero-editorial" | "default";

type Section = {
  id: string;
  fadeIn: number;
  fadeOut: number;
  align: SectionAlign;
  layout?: SectionLayout;
  title: string;
  titleLines?: string[];
  eyebrow?: string;
  subtitle: string;
  parallax: number;
};

const sections: Section[] = scrollNarrative;

const fadeEase = [0.16, 1, 0.3, 1] as const;

type OverlayProps = {
  scrollTargetRef: RefObject<HTMLDivElement | null>;
};

function HeroEditorial({
  section,
  mouseX,
  mouseY,
}: {
  section: Section;
  mouseX: number;
  mouseY: number;
}) {
  const lines = section.titleLines ?? [section.title];
  const parallaxStrength = 10;

  return (
    <div className="grid h-full w-full max-w-[1680px] grid-cols-12 items-center px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20">
      <motion.div
        className="col-span-12 flex flex-col sm:col-span-8 sm:max-w-[22rem] md:col-span-7 md:max-w-[26rem] lg:col-span-5 lg:max-w-[30rem] xl:col-span-4 xl:max-w-[32rem]"
        animate={{
          x: mouseX * parallaxStrength,
          y: mouseY * parallaxStrength * 0.6,
        }}
        transition={{ type: "spring", stiffness: 120, damping: 28 }}
      >
        {section.eyebrow && (
          <motion.p
            className="mb-5 font-sans text-[10px] font-medium uppercase tracking-editorial text-white/40 sm:mb-6 sm:text-[11px]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: fadeEase }}
          >
            {section.eyebrow}
          </motion.p>
        )}

        <h1
          className="font-display hero-title-glow text-[2.75rem] font-light leading-display tracking-luxury text-transparent bg-clip-text bg-gradient-to-br from-white via-white/92 to-white/55 sm:text-6xl md:text-[4.25rem] lg:text-[4.75rem] xl:text-[5.25rem]"
          aria-label={section.title}
        >
          {lines.map((line, i) => (
            <motion.span
              key={line}
              className="block overflow-hidden"
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.1,
                delay: 0.2 + i * 0.12,
                ease: fadeEase,
              }}
            >
              <span className="block">{line}</span>
            </motion.span>
          ))}
        </h1>

        <motion.div
          className="mt-6 h-px w-12 bg-gradient-to-r from-white/50 via-white/20 to-transparent sm:mt-7 md:mt-8 md:w-16"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.55, ease: fadeEase }}
          style={{ originX: 0 }}
        />

        <motion.p
          className="hero-subtitle-glow mt-5 max-w-[16rem] font-sans text-[13px] font-light leading-relaxed tracking-[0.04em] text-white/48 sm:mt-6 sm:max-w-xs sm:text-sm md:mt-7 md:text-[15px] md:leading-[1.65] md:tracking-[0.06em]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.65, ease: fadeEase }}
        >
          {section.subtitle}
        </motion.p>
      </motion.div>
    </div>
  );
}

function NarrativeBlock({
  section,
  mouseX,
  mouseY,
}: {
  section: Section;
  mouseX: number;
  mouseY: number;
}) {
  const lines = section.titleLines ?? section.title.split(" ");
  const useLineBreaks = Boolean(section.titleLines);
  const alignClass =
    section.align === "right"
      ? "col-start-1 col-span-12 sm:col-start-5 sm:col-span-8 lg:col-start-7 lg:col-span-6 items-end text-right ml-auto"
      : "col-start-1 col-span-12 sm:col-span-8 lg:col-span-6 items-start text-left";

  const parallaxX = mouseX * (section.parallax > 0 ? 12 : -12);

  return (
    <motion.div
      className={`col-span-12 flex max-w-xl flex-col ${alignClass}`}
      animate={{
        x: parallaxX,
        y: mouseY * (section.parallax > 0 ? 10 : -10),
      }}
      transition={{ type: "spring", stiffness: 100, damping: 30 }}
    >
      <h2
        className={`font-display hero-title-glow font-light leading-editorial tracking-luxury text-transparent bg-clip-text bg-gradient-to-br from-white via-white/88 to-white/40 ${
          section.align === "right" ? "ml-auto text-right" : ""
        } text-4xl sm:text-5xl md:text-6xl lg:text-[3.75rem]`}
      >
        {useLineBreaks
          ? lines.map((line, i) => (
              <motion.span
                key={line}
                className="block"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  duration: 1,
                  delay: i * 0.1,
                  ease: fadeEase,
                }}
              >
                {line}
              </motion.span>
            ))
          : lines.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                className="mr-[0.18em] inline-block"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  delay: i * 0.08,
                  ease: fadeEase,
                }}
              >
                {word}
              </motion.span>
            ))}
      </h2>

      <motion.p
        className={`hero-subtitle-glow mt-5 font-sans text-sm font-light leading-relaxed tracking-[0.05em] text-white/50 md:mt-6 md:text-base md:tracking-[0.06em] ${
          section.align === "right" ? "ml-auto max-w-sm text-right" : "max-w-md"
        }`}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.35, ease: fadeEase }}
      >
        {section.subtitle}
      </motion.p>
    </motion.div>
  );
}

function OverlaySection({
  section,
  scrollYProgress,
  mouseX,
  mouseY,
}: {
  section: Section;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  mouseX: number;
  mouseY: number;
}) {
  const opacity = useTransform(
    scrollYProgress,
    [section.fadeIn, section.fadeIn + 0.04, section.fadeOut - 0.04, section.fadeOut],
    [section.fadeIn === 0 ? 1 : 0, 1, 1, 0]
  );

  const scrollY = useTransform(
    scrollYProgress,
    [section.fadeIn, section.fadeOut],
    [24 * section.parallax, -24 * section.parallax]
  );

  const isHero = section.layout === "hero-editorial";

  return (
    <motion.div
      style={{ opacity, y: scrollY }}
      className={`absolute inset-0 flex w-full ${
        isHero
          ? "items-center pt-[max(4.5rem,10vh)] sm:pt-0"
          : "flex-col justify-center px-5 sm:px-8 md:px-12"
      }`}
    >
      {isHero ? (
        <HeroEditorial section={section} mouseX={mouseX} mouseY={mouseY} />
      ) : (
        <motion.div
          className={`mx-auto grid w-full max-w-7xl grid-cols-12 ${
            section.align === "right" ? "justify-items-end" : ""
          }`}
        >
          <NarrativeBlock section={section} mouseX={mouseX} mouseY={mouseY} />
        </motion.div>
      )}
    </motion.div>
  );
}

function ScrollHint({
  scrollYProgress,
}: {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12, 0.2], [1, 1, 0]);

  return (
    <motion.div
      style={{ opacity: hintOpacity }}
      className="absolute bottom-10 left-6 z-20 sm:bottom-12 sm:left-10 md:left-16 lg:left-20"
    >
      <span className="font-sans text-[10px] font-medium uppercase tracking-editorial text-white/40">
        Scroll to explore
      </span>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        className="mt-3 h-8 w-px bg-gradient-to-b from-white/45 to-transparent"
      />
    </motion.div>
  );
}

export default function Overlay({ scrollTargetRef }: OverlayProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const { scrollYProgress } = useScroll({
    target: scrollTargetRef,
    offset: ["start start", "end end"],
  });

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-10 h-screen w-full"
      aria-label="Scroll narrative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {sections.map((section) => (
        <OverlaySection
          key={section.id}
          section={section}
          scrollYProgress={scrollYProgress}
          mouseX={mousePos.x}
          mouseY={mousePos.y}
        />
      ))}
      <ScrollHint scrollYProgress={scrollYProgress} />
    </motion.div>
  );
}
