"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { gsap, useGSAP } from "@/lib/gsap";

const HEADING = "Are you ready to feel better?";
const BODY_BEFORE =
  "Whether you're dealing with a significant health issue, not feeling your best, or want to feel even better, we can help. Our care is centered around each individual patient and their specific needs and goals helping you achieve harmonious health! When was the last time you talked with someone about your health and received the personal attention you deserve? ";
const BODY_BOLD = "Schedule your initial consultation with us today!";
const CTA = "Schedule My Consultation";
const QUOTE =
  '"Health is the greatest gift, contentment the greatest wealth, faithfulness the best relationship."';
const ATTRIBUTION = "~Buddha";

export default function GetStarted() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      gsap.from(".stmt-a .stmt-line", {
        autoAlpha: 0,
        y: 22,
        duration: 1.15,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".stmt-a",
          start: "top 75%",
          once: true,
        },
      });

      gsap.from(".stmt-b .stmt-line", {
        autoAlpha: 0,
        y: 18,
        duration: 1.3,
        stagger: 0.22,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".stmt-b",
          start: "top 78%",
          once: true,
        },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref}>
      <section className="stmt-a w-full bg-olive">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-start gap-8 px-6 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-32">
          <h2 className="stmt-line font-heading max-w-3xl text-4xl leading-[1.1] font-semibold text-white sm:text-5xl lg:text-6xl">
            {HEADING}
          </h2>
          <p className="stmt-line font-sans max-w-2xl text-base leading-7 text-white sm:text-lg sm:leading-8">
            {BODY_BEFORE}
            <strong>{BODY_BOLD}</strong>
          </p>
          <a
            className="stmt-line inline-flex items-center gap-2 bg-white px-6 py-3 font-heading text-sm tracking-wide text-charcoal transition-opacity hover:opacity-80"
            href={site.booking.header}
            target="_blank"
            rel="noopener noreferrer"
          >
            {CTA}
            <ArrowRight size={14} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="stmt-b w-full bg-white">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-6 py-24 text-center sm:px-10 sm:py-32 lg:py-40">
          <blockquote className="stmt-line font-hero text-2xl leading-snug text-charcoal sm:text-3xl lg:text-4xl">
            {QUOTE}
          </blockquote>
          <p className="stmt-line font-heading text-sm tracking-wide text-body">{ATTRIBUTION}</p>
        </div>
      </section>
    </div>
  );
}
