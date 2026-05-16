import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500"],
  display: "swap",
});

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Samyak Vikas Gedam — Computer Engineering Student",
  description:
    "Portfolio of Samyak Vikas Gedam — B.E. Computer Engineering student at VIT Pune. Projects in web development, IoT, programming and creative software experiences.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL
      ? process.env.NEXT_PUBLIC_SITE_URL
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000"
  ),
  openGraph: {
    title: "Samyak Vikas Gedam — Computer Engineering Student",
    description:
      "Portfolio of Samyak Vikas Gedam — B.E. Computer Engineering student at VIT Pune. Projects in web development, IoT, programming and creative software experiences.",
    url: "/",
    siteName: "Samyak Vikas Gedam Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samyak Vikas Gedam — Computer Engineering Student",
    description:
      "Portfolio of Samyak Vikas Gedam — B.E. Computer Engineering student at VIT Pune. Projects in web development, IoT, programming and creative software experiences.",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
