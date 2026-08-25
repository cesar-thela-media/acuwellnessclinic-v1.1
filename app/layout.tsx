import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { Footer } from "@/components/site/footer";
import { GsapRoot } from "@/components/site/gsap-root";
import { Header } from "@/components/site/header";
import { NewsletterPopup } from "@/components/site/newsletter-popup";
import { NeuropathyPopup } from "@/components/site/neuropathy-popup";
import { site } from "@/lib/site";
import "./globals.css";

const heading = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.titleHome,
    template: "%s",
  },
  description: site.tagline,
  robots: { index: true, follow: true },
  icons: { icon: "/icon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${heading.variable} ${display.variable}`}>
      <body className="font-sans">
        <GsapRoot>
          <Header />
          <main>{children}</main>
          <Footer />
          {/* Popups disabled 2026-08-22 (owner decision: annoying on localhost). Re-enable before launch (Phase 3). */}
          {/* <NewsletterPopup /> */}
          {/* <NeuropathyPopup /> */}
        </GsapRoot>
      </body>
    </html>
  );
}
