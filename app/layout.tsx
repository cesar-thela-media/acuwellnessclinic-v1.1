import type { Metadata } from "next";
import { Footer } from "@/components/site/footer";
import { GsapRoot } from "@/components/site/gsap-root";
import { Header } from "@/components/site/header";
import { NewsletterPopup } from "@/components/site/newsletter-popup";
import { NeuropathyPopup } from "@/components/site/neuropathy-popup";
import { site } from "@/lib/site";
import "./globals.css";

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
    <html lang="en-US">
      <body>
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
