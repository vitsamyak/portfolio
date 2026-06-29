import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certifications — Samyak Vikas Gedam",
  description:
    "Professional credentials and certificates of Samyak Vikas Gedam — B.Tech. Computer Engineering student.",
};

export default function CertificationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
