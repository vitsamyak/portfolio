"use client";

import { motion } from "framer-motion";
import {
  achievements,
  education,
  objective,
  profile,
  skillGroups,
  softSkills,
} from "@/lib/portfolio";

export default function About() {
  const allSkills = skillGroups.flatMap((g) => g.items);

  return (
    <section
      id="about"
      className="relative border-t border-white/[0.06] bg-transparent px-6 py-32 md:px-12 lg:px-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="mx-auto mb-16 max-w-7xl"
      >
        <motion.div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-accent">
            About Me
          </p>
          <h2 className="mt-4 bg-gradient-to-br from-white to-white/40 bg-clip-text text-4xl font-semibold tracking-tight text-transparent md:text-5xl">
            Computer Engineering student, builder at heart.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/50">{objective}</p>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mx-auto mb-16 grid max-w-7xl gap-6 rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-xl grid-cols-1 sm:grid-cols-2 md:mb-20 md:grid-cols-3 md:gap-8 md:p-8"
      >
        <motion.div>
          <p className="text-xs uppercase tracking-widest text-white/35">Location</p>
          <p className="mt-2 text-sm text-white/70">{profile.location}</p>
        </motion.div>
        <motion.div>
          <p className="text-xs uppercase tracking-widest text-white/35">Languages</p>
          <p className="mt-2 text-sm text-white/70">{profile.languages.join(" · ")}</p>
        </motion.div>
        <motion.div>
          <p className="text-xs uppercase tracking-widest text-white/35">Education</p>
          <p className="mt-2 text-sm text-white/70">{profile.tagline}</p>
        </motion.div>
      </motion.div>

      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:gap-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <h3 className="mb-6 text-lg font-semibold text-white">Education</h3>
          <ul className="space-y-6">
            {education.map((item) => (
              <li
                key={item.degree}
                className="border-l border-white/10 pl-5 transition-colors hover:border-accent/40"
              >
                <p className="font-medium text-white/90">{item.degree}</p>
                <p className="mt-1 text-sm text-white/55">{item.school}</p>
                {item.board && (
                  <p className="text-sm text-white/40">{item.board}</p>
                )}
                <p className="mt-2 text-xs tracking-wide text-white/35">
                  {item.period}
                  {item.note ? ` · ${item.note}` : ""}
                </p>
              </li>
            ))}
          </ul>

          <h3 className="mb-6 mt-12 text-lg font-semibold text-white">Achievements</h3>
          <ul className="space-y-3">
            {achievements.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm leading-relaxed text-white/55"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h3 className="mb-6 text-lg font-semibold text-white">Skills</h3>
          <motion.div className="flex flex-wrap gap-3">
            {allSkills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.05 * index }}
                className="cursor-default rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur-md transition-colors hover:border-accent/30 hover:text-accent"
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>

          <h3 className="mb-6 mt-10 text-lg font-semibold text-white">Soft Skills</h3>
          <motion.div className="flex flex-wrap gap-3">
            {softSkills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.05 * index }}
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/55"
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
