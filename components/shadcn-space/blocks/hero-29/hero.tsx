"use client";

import { useRef } from "react";
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
        y: 18,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="relative flex min-h-svh w-full flex-col overflow-hidden bg-charcoal"
    >
      <img
        src={site.media.hero}
        alt=""
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: "rgba(138,164,94,0.73)" }}
      />

      <div className="relative z-10 flex min-h-svh flex-1 flex-col justify-center">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-start gap-6 px-6 py-16 sm:gap-8 sm:px-10 lg:px-16">
          <p className="hero-enter font-heading text-xs font-semibold tracking-[0.22em] text-white">
            {CHIP}
          </p>
          <h1 className="hero-enter font-hero max-w-4xl text-[2.35rem] leading-[1.08] text-white sm:text-6xl lg:text-8xl">
            {TITLE}
          </h1>
          <a
            className="hero-enter inline-flex w-fit border border-white px-6 py-2.5 font-heading text-sm tracking-wide text-white transition-opacity hover:opacity-80"
            href={site.booking.header}
            target="_blank"
            rel="noopener noreferrer"
          >
            {CTA}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero29;
