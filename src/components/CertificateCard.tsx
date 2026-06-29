"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Certificate } from "@/lib/portfolio";
import { useDevice } from "@/hooks/useDevice";

interface CertificateCardProps {
  certificate: Certificate;
  onView: () => void;
}

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function CertificateCard({ certificate, onView }: CertificateCardProps) {
  const { isMobile } = useDevice();

  return (
    <motion.article
      variants={item}
      whileTap={{ scale: 0.98 }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/5 p-5 transition-[border-color,background-color,box-shadow] duration-500 hover:border-white/20 sm:p-6 ${
        isMobile
          ? "bg-white/[0.04]"
          : "bg-white/[0.02] backdrop-blur-xl hover:bg-white/[0.04] hover:shadow-[0_0_60px_-12px_rgba(167,139,250,0.15)]"
      }`}
    >
      {/* Ambient hover glow (Desktop only) */}
      {!isMobile && (
        <motion.div
          className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-accent/15 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
      )}

      {/* Certificate Image Preview Container */}
      <div 
        onClick={onView}
        className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 mb-5 bg-[#18181b] cursor-pointer"
      >
        <Image
          src={certificate.image}
          alt={certificate.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={false}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Hover zoom overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 border border-white/20 text-xs text-white backdrop-blur-md">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <span>View Preview</span>
          </div>
        </div>

        {/* Top-left glassmorphic issuer tag */}
        <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent backdrop-blur-md">
          {certificate.issuer}
        </span>
      </div>

      {/* Title & Metadata */}
      <div className="flex flex-col flex-1">
        <span className="text-[11px] tracking-wider text-white/35 font-medium uppercase mb-1">
          Issued {certificate.issueDate}
        </span>
        <h3 
          onClick={onView}
          className="text-lg font-semibold text-white group-hover:text-accent transition-colors duration-300 line-clamp-2 min-h-[3rem] cursor-pointer"
        >
          {certificate.title}
        </h3>

        {/* Skill Badges */}
        <div className="flex flex-wrap gap-1.5 mt-3 mb-6 min-h-[2.5rem] items-start">
          {certificate.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-white/5 bg-white/[0.03] px-2.5 py-0.5 text-[10px] text-white/50"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-auto flex gap-3">
          <Button
            variant="primary"
            size="sm"
            onClick={onView}
            className="flex-1 text-[11px] h-9"
          >
            View Certificate
          </Button>
          <Button
            variant="outline"
            size="sm"
            href={certificate.verificationLink}
            className="flex-1 text-[11px] h-9 group/btn"
          >
            <span className="flex items-center justify-center gap-1">
              Verify
              <svg
                className="h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </span>
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
