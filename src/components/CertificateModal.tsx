"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Certificate } from "@/lib/portfolio";
import { useDevice } from "@/hooks/useDevice";


interface CertificateModalProps {
  certificate: Certificate | null;
  onClose: () => void;
}

export default function CertificateModal({ certificate, onClose }: CertificateModalProps) {
  const { isMobile } = useDevice();

  // Handle ESC key for closing the modal
  useEffect(() => {
    if (!certificate) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Lock background scroll when open
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
      {/* Backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#09090b]/90 backdrop-blur-md"
      />

      {/* Modal content container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: "spring", damping: 25, stiffness: 350 }}
        className="relative z-10 flex h-[85vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#121212] shadow-2xl"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/5 bg-[#18181b]/50 px-5 py-4 md:px-6">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-accent font-semibold">
              {certificate.issuer}
            </p>
            <h2 className="mt-0.5 text-base md:text-lg font-semibold text-white truncate max-w-[250px] sm:max-w-md md:max-w-xl">
              {certificate.title}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              href={certificate.pdf}
              className="hidden sm:inline-flex h-9 rounded-lg"
              // Force download
              download
            >
              <span className="flex items-center gap-1.5 text-xs">
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download PDF
              </span>
            </Button>

            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Body / Viewer */}
        <div className="flex-1 overflow-auto bg-[#0a0a0a] p-4 flex items-center justify-center">
          {isMobile ? (
            /* Image fallback for mobile to avoid native PDF iframe rendering bugs */
            <div className="flex flex-col items-center gap-4 w-full max-h-full">
              <div className="relative border border-white/5 rounded-lg overflow-hidden bg-zinc-900 w-full max-w-lg aspect-[4/3]">
                <Image
                  src={certificate.image}
                  alt={certificate.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 512px"
                  className="w-full h-full object-contain"
                />
              </div>
              <Button
                variant="primary"
                size="md"
                href={certificate.pdf}
                className="w-full max-w-xs rounded-full"
                download
              >
                <span className="flex items-center gap-2">
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
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Download PDF Certificate
                </span>
              </Button>
            </div>
          ) : (
            /* Interactive PDF IFrame for Desktop */
            <iframe
              src={`${certificate.pdf}#toolbar=1&navpanes=0`}
              title={certificate.title}
              className="h-full w-full rounded-lg border border-white/5 bg-[#121212]"
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}
