"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { profile } from "@/lib/portfolio";
import { useState, useRef, FormEvent } from "react";
import emailjs from "@emailjs/browser";

const contactLinks = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, "")}`,
  },
  {
    label: "Location",
    value: profile.location,
    href: null,
  },
];

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const name = formData.get("from_name") as string;
    const email = formData.get("from_email") as string;
    const message = formData.get("message") as string;

    // Basic validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMessage("Please fill in all fields.");
      setStatus("error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        setStatus("error");
        setErrorMessage("EmailJS configuration is missing. Please check your .env.local file and restart the server.");
        return;
      }

      await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        publicKey
      );

      setStatus("success");
      formRef.current.reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error: any) {
      console.error("EmailJS Error:", error);
      const msg = error?.text || error?.message || "Something went wrong.";
      setErrorMessage(`${msg} Please check your EmailJS settings or email me directly.`);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="relative border-t border-white/[0.06] bg-transparent px-6 py-32 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-accent">
            Contact
          </p>
          <h2 className="mt-4 bg-gradient-to-br from-white to-white/40 bg-clip-text text-4xl font-semibold tracking-tight text-transparent md:text-5xl lg:text-6xl">
            Let&apos;s connect.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/45">
            Interested in internships, project collaborations, or just want to say
            hi? Reach out — I&apos;d love to hear from you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-12 grid gap-4 sm:grid-cols-3"
        >
          {contactLinks.map((link) => (
            <div
              key={link.label}
              className="rounded-xl border border-white/5 bg-white/[0.02] px-5 py-4 backdrop-blur-md"
            >
              <p className="text-xs uppercase tracking-widest text-white/35">
                {link.label}
              </p>
              {link.href ? (
                <a
                  href={link.href}
                  className="mt-2 block text-sm text-white/70 transition-colors hover:text-accent"
                >
                  {link.value}
                </a>
              ) : (
                <p className="mt-2 text-sm text-white/70">{link.value}</p>
              )}
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button variant="outline" size="sm" href={profile.linkedin}>
            LinkedIn
          </Button>
          <Button variant="outline" size="sm" href={profile.github}>
            GitHub
          </Button>
          <Button variant="primary" size="sm" href={`mailto:${profile.email}`}>
            Email me
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-16"
        >
          <form
            ref={formRef}
            className="mx-auto flex max-w-xl flex-col gap-6 text-left"
            onSubmit={handleSubmit}
          >
            <motion.div className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm text-white/60">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="from_name"
                  placeholder="Your name"
                  disabled={status === "loading"}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 text-white placeholder:text-white/20 transition-all focus:border-accent focus:bg-white/[0.04] focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-50"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm text-white/60">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="from_email"
                  placeholder="you@example.com"
                  disabled={status === "loading"}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 text-white placeholder:text-white/20 transition-all focus:border-accent focus:bg-white/[0.04] focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-50"
                />
              </div>
            </motion.div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm text-white/60">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell me about an opportunity or project..."
                disabled={status === "loading"}
                className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 text-white placeholder:text-white/20 transition-all focus:border-accent focus:bg-white/[0.04] focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-50"
              />
            </div>

            <div className="flex flex-col gap-4">
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                type="submit"
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </Button>

              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-center text-sm font-medium text-green-400"
                  >
                    Message sent successfully! I&apos;ll get back to you soon.
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-center text-sm font-medium text-red-400"
                  >
                    {errorMessage}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

