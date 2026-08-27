"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { gsap, useGSAP } from "@/lib/gsap";

const IMAGE =
  "/media/wp-content/uploads/2017/04/ACU_009-1024x680.jpg";
const IMAGE_ALT =
  "Practitioner performing cupping therapy on a patient's back";

const HEADING = "Are you ready to feel better?";
const BODY_BEFORE =
  "Whether you're dealing with a significant health issue, not feeling your best, or want to feel even better, we can help. Our care is centered around each individual patient and their specific needs and goals helping you achieve harmonious health! When was the last time you talked with someone about your health and received the personal attention you deserve? ";
const BODY_BOLD = "Schedule your initial consultation with us today!";
const CTA = "Schedule My Consultation";
const QUOTE =
  '"Health is the greatest gift, contentment the greatest wealth, faithfulness the best relationship."';
const ATTRIBUTION = "~Buddha";

export default function GetStarted() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = ref.current;
      if (!section) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
      gsap.from(".cta-line", {
        autoAlpha: 0,
        y: 40,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="home-cta w-full overflow-x-clip bg-cream">
      <div className="flex flex-col items-center gap-10 pt-[var(--site-section-y)]">
        <div className="site-container flex flex-col items-center">
          <div className="cta-line flex max-w-3xl flex-col items-center gap-6 text-center">
            <h2 className="home-section-title font-display text-3xl leading-[1.12] tracking-[-0.01em] text-forest sm:text-4xl md:text-5xl !m-0">
              {HEADING}
            </h2>
            <p className="home-section-copy text-base leading-relaxed text-body md:text-lg !m-0">
              {BODY_BEFORE}
              <strong className="font-semibold text-forest">{BODY_BOLD}</strong>
            </p>
            <a
              className="site-button site-button--primary"
              href={site.booking.header}
              target="_blank"
              rel="noopener noreferrer"
            >
              {CTA}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="cta-line relative w-full">
          <img
            src={IMAGE}
            alt={IMAGE_ALT}
            width={1024}
            height={680}
            loading="lazy"
            className="block aspect-[16/9] w-full object-cover md:aspect-[2/1]"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-forest/65 px-6 py-10 sm:px-10 sm:py-14">
            <figure className="mx-auto max-w-3xl text-center">
              <blockquote className="font-display text-lg leading-snug tracking-tight text-cream sm:text-xl md:text-2xl lg:text-3xl !m-0">
                {QUOTE}
              </blockquote>
              <figcaption className="mt-4 font-heading text-xs font-semibold tracking-[0.14em] text-olive !m-0 sm:text-sm">
                {ATTRIBUTION}
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
