"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import { gsap, useGSAP } from "@/lib/gsap";

const CHIP = "ACUPUNCTURE IN SOUTH AUSTIN (OAK HILL), TX";
const TITLE = "DO THE THINGS THAT MAKE YOU HAPPY";
const CTA = "Schedule An Appointment";

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
      className="relative w-full overflow-hidden bg-forest"
    >
      <img
        src={site.media.hero}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(44,58,40,0.92) 0%, rgba(44,58,40,0.68) 45%, rgba(44,58,40,0.35) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-7xl flex-col items-start justify-center gap-8 px-6 py-24 sm:px-10 lg:px-16">
        <span className="hero-enter inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 font-heading text-[11px] font-semibold tracking-[0.18em] text-white backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-olive" aria-hidden="true" />
          {CHIP}
        </span>
        <h1 className="hero-enter max-w-4xl font-display text-5xl leading-[1.04] tracking-[-0.01em] text-white sm:text-6xl lg:text-7xl">
          {TITLE}
        </h1>
        <a
          className="hero-enter group inline-flex items-center gap-2 rounded-full bg-olive px-7 py-3.5 font-heading text-sm font-semibold text-forest transition-colors hover:bg-white"
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
      </div>
    </section>
  );
};

export default Hero29;
