"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { projects } from "@/lib/portfolio";
import { useDevice } from "@/hooks/useDevice";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Projects() {
  const { isMobile, isLowPower } = useDevice();

  return (
    <section
      id="work"
      className="relative bg-transparent px-6 py-32 md:px-12 lg:px-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="mb-16 max-w-2xl"
      >
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-accent">
          Projects
        </p>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white drop-shadow-md md:text-5xl">
          Engineering work that solves real problems.
        </h2>
        <p className="mt-4 text-lg text-white/45">
          Academic and ASEP projects focused on IoT, automation, and practical
          problem-solving.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid gap-6 md:grid-cols-2"
      >
        {projects.map((project) => (
          <motion.article
            key={project.title}
            variants={item}
            whileTap={{ scale: 0.98 }}
            className={`group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-all duration-500 hover:border-white/20 hover:bg-white/[0.04] md:p-8 ${
              isLowPower ? "" : isMobile ? "backdrop-blur-md" : "backdrop-blur-xl hover:shadow-[0_0_60px_-12px_rgba(167,139,250,0.15)]"
            }`}
          >
            {!isMobile && (
              <motion.div
                className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-accent/20 blur-[80px]"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
            )}

            <div className="relative z-10 flex items-start justify-between gap-4">
              <motion.div>
                <p className="text-xs uppercase tracking-widest text-white/40">
                  {project.category}
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-white transition-colors group-hover:text-accent">
                  {project.title}
                </h3>
              </motion.div>
              <span className="shrink-0 text-sm text-white/25">{project.year}</span>
            </div>

            <p className="mt-4 text-base leading-relaxed text-white/50">
              {project.description}
            </p>

            <ul className="mt-4 space-y-2">
              {project.highlights.map((point) => (
                <li
                  key={point}
                  className="flex gap-2 text-sm leading-relaxed text-white/45"
                >
                  <span className="text-accent" aria-hidden>
                    —
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-20 flex flex-col items-center gap-6 sm:flex-row sm:justify-between"
      >
        <p className="text-white/40">
          Open to internships, collaborations, and learning opportunities.
        </p>
        <Button variant="primary" href="#contact">
          Get in touch
        </Button>
      </motion.div>
    </section>
  );
}
