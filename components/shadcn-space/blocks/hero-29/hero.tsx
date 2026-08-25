"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import { gsap, useGSAP } from "@/lib/gsap";

const CHIP = "ACUPUNCTURE IN SOUTH AUSTIN (OAK HILL), TX";
const TITLE = "DO THE THINGS THAT MAKE YOU HAPPY";
const CTA = "Schedule An Appointment";
const CTA_SECONDARY = "What We Treat";

const Hero29 = () => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
      gsap.from(".hero-enter", {
        autoAlpha: 0,
        y: 22,
        duration: 0.9,
        stagger: 0.14,
        ease: "power3.out",
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="home-hero relative w-full overflow-hidden bg-forest"
      style={{ backgroundImage: `url("${site.media.hero}")` }}
    >
      <div
        aria-hidden="true"
        className="home-hero-overlay absolute inset-0"
      />

      <div className="home-hero-content site-container relative z-10 flex flex-col items-center justify-center text-center">
        <span className="home-hero-eyebrow hero-enter inline-flex max-w-full items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 font-heading text-[11px] font-semibold leading-[1.35] tracking-[0.18em] text-white backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-olive" aria-hidden="true" />
          {CHIP}
        </span>
        <h1 className="home-hero-title hero-enter max-w-4xl font-display text-5xl leading-[1.04] tracking-[-0.01em] text-white sm:text-6xl lg:text-7xl">
          {TITLE}
        </h1>
        <div className="hero-enter flex flex-wrap items-center justify-center gap-3.5">
          <a
            className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-olive px-7 py-3.5 font-heading text-sm font-semibold !text-white transition-colors hover:bg-white hover:!text-forest"
            href={site.booking.header}
            target="_blank"
            rel="noopener noreferrer"
          >
            {CTA}
            <ArrowUpRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
          <Link
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/70 bg-white px-7 py-3.5 font-heading text-sm font-semibold text-forest shadow-sm transition-colors hover:bg-olive hover:text-forest"
            href="/what-is-acupuncture/what-we-treat"
          >
            {CTA_SECONDARY}
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero29;
