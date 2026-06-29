"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CertificateCard from "./CertificateCard";
import CertificateModal from "./CertificateModal";
import { certificates, Certificate } from "@/lib/portfolio";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

export default function Certifications() {
  const [activeCertificate, setActiveCertificate] = useState<Certificate | null>(null);

  return (
    <section
      id="certifications"
      className="relative border-t border-white/[0.06] bg-transparent px-6 py-20 md:py-32 md:px-12 lg:px-24"
    >
      {/* Scroll-animated Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="mb-16 max-w-2xl"
      >
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-accent">
          Certifications
        </p>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white drop-shadow-md md:text-5xl">
          Validated expertise & continuous learning.
        </h2>
        <p className="mt-4 text-lg text-white/45 font-light leading-relaxed">
          Professional credentials, learning paths, and technical specializations in Artificial Intelligence, Deep Learning, and Natural Language Processing.
        </p>
      </motion.div>

      {/* Grid mapping cards from portfolio.ts certificates array */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {certificates.map((cert) => (
          <CertificateCard
            key={cert.title}
            certificate={cert}
            onView={() => setActiveCertificate(cert)}
          />
        ))}
      </motion.div>

      {/* Fullscreen Certificate modal */}
      <AnimatePresence>
        {activeCertificate && (
          <CertificateModal
            certificate={activeCertificate}
            onClose={() => setActiveCertificate(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
