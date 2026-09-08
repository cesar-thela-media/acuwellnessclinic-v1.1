"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import { gsap, useGSAP } from "@/lib/gsap";

const CHIP = "ACUPUNCTURE IN SOUTH AUSTIN (OAK HILL), TX";
const TITLE = "DO THE THINGS THAT MAKE YOU HAPPY";
const CTA = "Schedule An Appointment";
const CTA_SECONDARY = "What We Treat";

const Hero29 = () => {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.defaultMuted = true;
    el.muted = true;
    el.setAttribute("muted", "");
    const tryPlay = () => {
      const play = el.play();
      if (play && typeof play.catch === "function") {
        play.catch(() => {
          /* Autoplay can fail in some embeds; poster/bg remains. */
        });
      }
    };
    tryPlay();
    el.addEventListener("canplay", tryPlay);
    return () => el.removeEventListener("canplay", tryPlay);
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
      style={{ backgroundImage: `url("${site.media.heroPoster}")` }}
    >
      <div className="home-hero-video absolute inset-0 overflow-hidden" aria-hidden="true">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={`${site.media.heroVideo}?v=4`}
          poster={site.media.heroPoster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          controls={false}
          tabIndex={-1}
        />
      </div>

      <div aria-hidden="true" className="home-hero-overlay absolute inset-0 z-[1]" />

      <div className="home-hero-content site-container relative z-10 flex w-full min-w-0 flex-col items-center justify-center text-center">
        <span className="home-hero-eyebrow hero-enter inline-flex max-w-full min-w-0 items-center justify-center gap-2 rounded-[14px] border border-white/30 bg-white/10 px-3 py-1.5 text-center font-heading text-[10px] font-semibold leading-[1.4] tracking-[0.12em] text-white backdrop-blur-sm sm:text-[11px] sm:tracking-[0.18em]">
          <span className="h-1.5 w-1.5 shrink-0 bg-olive" aria-hidden="true" />
          {CHIP}
        </span>
        <p className="hero-enter font-heading text-sm font-semibold tracking-[0.14em] text-white/90 uppercase !m-0 sm:text-base">
          Welcome to Si Shou
        </p>
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
