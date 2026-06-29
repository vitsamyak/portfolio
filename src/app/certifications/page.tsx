"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MagicBackground from "@/components/MagicBackground";
import CinematicGlowBackground from "@/components/CinematicGlowBackground";
import CertificateCard from "@/components/CertificateCard";
import CertificateModal from "@/components/CertificateModal";
import { certificates, Certificate } from "@/lib/portfolio";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

export default function CertificationsPage() {
  const [activeCertificate, setActiveCertificate] = useState<Certificate | null>(null);

  return (
    <main className="relative min-h-screen bg-transparent text-white selection:bg-accent/30 selection:text-white">
      {/* 1. Global Interactive Spotlight Background */}
      <MagicBackground />

      <div className="relative z-20">
        {/* 2. Global Soft Film-Grain & Ambient Glow Background */}
        <CinematicGlowBackground />
        
        {/* Darkening top overlay for high navbar contrast */}
        <div className="pointer-events-none absolute left-0 top-0 -z-10 h-64 w-full bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />

        {/* 3. Navigation Header */}
        <Header />

        {/* 4. Page Content */}
        <div className="mx-auto max-w-7xl px-6 pt-32 pb-24 md:pt-40 md:pb-36 md:px-12 lg:px-24 relative z-10">
          
          {/* Header Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16 max-w-3xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
              Credentials
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white drop-shadow-md md:text-5xl lg:text-6xl leading-[1.1] md:leading-[1.05]">
              Certifications & Courses
            </h1>
            <p className="mt-5 text-base md:text-lg text-white/50 max-w-2xl leading-relaxed font-light">
              Academic credentials, technical specializations, and professional courses validating core expertise in Artificial Intelligence, Deep Learning, and Natural Language Processing.
            </p>
          </motion.div>

          {/* Certificates Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
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
        </div>

        {/* 5. Footer */}
        <Footer />
      </div>

      {/* 6. Dynamic Certificate Modal Preview */}
      <AnimatePresence>
        {activeCertificate && (
          <CertificateModal
            certificate={activeCertificate}
            onClose={() => setActiveCertificate(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
