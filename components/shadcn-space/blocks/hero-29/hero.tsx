"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import { gsap, useGSAP } from "@/lib/gsap";

const CHIP = "ACUPUNCTURE IN SOUTH AUSTIN (OAK HILL), TX";
const TITLE = "DO THE THINGS THAT MAKE YOU HAPPY";
const CTA = "Schedule An Appointment";
const CTA_SECONDARY = "What We Treat";

/** Welcome video — cover crop + overlay hide YouTube chrome/captions/end cards. */
const HERO_VIDEO_ID = "S2ewQXzt8oM";
const HERO_VIDEO_SRC =
  `https://www.youtube-nocookie.com/embed/${HERO_VIDEO_ID}` +
  `?autoplay=1&mute=1&controls=0&loop=1&playlist=${HERO_VIDEO_ID}` +
  `&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3` +
  `&cc_load_policy=0&disablekb=1&fs=0`;

const Hero29 = () => {
  const ref = useRef<HTMLElement>(null);
  // Default on so SSR markup includes the embed; client turns it off for reduced-motion.
  const [playVideo, setPlayVideo] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPlayVideo(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

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
      {playVideo ? (
        <div className="home-hero-video absolute inset-0 overflow-hidden" aria-hidden="true">
          <iframe
            src={HERO_VIDEO_SRC}
            title=""
            allow="autoplay; encrypted-media; picture-in-picture"
            tabIndex={-1}
            loading="eager"
          />
        </div>
      ) : null}

      <div aria-hidden="true" className="home-hero-overlay absolute inset-0 z-[1]" />

      <div className="home-hero-content site-container relative z-10 flex w-full min-w-0 flex-col items-center justify-center text-center">
        <span className="home-hero-eyebrow hero-enter inline-flex max-w-full min-w-0 items-center justify-center gap-2 rounded-[14px] border border-white/30 bg-white/10 px-3 py-1.5 text-center font-heading text-[10px] font-semibold leading-[1.4] tracking-[0.12em] text-white backdrop-blur-sm sm:text-[11px] sm:tracking-[0.18em]">
          <span className="h-1.5 w-1.5 shrink-0 bg-olive" aria-hidden="true" />
          {CHIP}
        </span>
        <h1 className="home-hero-title hero-enter w-full max-w-4xl font-display text-[1.75rem] leading-[1.1] font-semibold tracking-[-0.02em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
          {TITLE}
        </h1>
        <div className="hero-enter flex w-full max-w-md flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3.5">
          <a
            className="group inline-flex items-center justify-center gap-2 rounded-[14px] border border-white/70 bg-olive px-6 py-3.5 font-heading text-sm font-semibold !text-white transition-colors hover:bg-white hover:!text-forest"
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
            className="inline-flex items-center justify-center gap-2 rounded-[14px] border border-white bg-white px-6 py-3.5 font-heading text-sm font-semibold text-forest shadow-sm transition-colors hover:border-olive hover:bg-olive hover:text-forest"
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
