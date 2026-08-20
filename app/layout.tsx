import type { Metadata } from "next";
import { Fraunces, Geist, Indie_Flower, Manrope } from "next/font/google";
import { Footer } from "@/components/site/footer";
import { GsapRoot } from "@/components/site/gsap-root";
import { Header } from "@/components/site/header";
import { NewsletterPopup } from "@/components/site/newsletter-popup";
import { NeuropathyPopup } from "@/components/site/neuropathy-popup";
import { site } from "@/lib/site";
import "./globals.css";

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const heading = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const hero = Indie_Flower({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-indie-flower",
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
    <html lang="en-US" className={`${sans.variable} ${heading.variable} ${hero.variable} ${display.variable}`}>
      <body className="font-sans">
        <GsapRoot>
          <Header />
          <main>{children}</main>
          <Footer />
          <NewsletterPopup />
          <NeuropathyPopup />
        </GsapRoot>
      </body>
    </html>
  );
}
