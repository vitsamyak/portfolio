import { profile } from "@/lib/portfolio";

const socialLinks = [
  { label: "LinkedIn", href: profile.linkedin },
  { label: "GitHub", href: profile.github },
  { label: "Email", href: `mailto:${profile.email}` },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-transparent px-6 py-8 md:py-12 md:px-12 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="text-center text-sm text-white/30 sm:text-left">
          © {new Date().getFullYear()} {profile.name}. B.Tech. Computer Engineering ·
          Batch 2029.
        </p>
        <div className="flex gap-6">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={social.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className="text-sm text-white/40 transition-colors hover:text-accent"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
