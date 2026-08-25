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
      <div className="site-container site-section--compact">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="cta-line relative min-w-0">
            <div className="overflow-hidden rounded-3xl bg-forest shadow-[0_24px_60px_-24px_rgb(56_69_47/0.45)]">
              <img
                src={IMAGE}
                alt={IMAGE_ALT}
                width={1024}
                height={680}
                loading="lazy"
                className="block aspect-[3/2] w-full object-cover"
              />
            </div>
            <figure className="relative z-10 mx-4 -mt-16 max-w-[calc(100%-2rem)] rounded-2xl border border-forest/10 bg-white p-6 shadow-[0_20px_45px_-20px_rgb(56_69_47/0.4)] sm:mx-8 sm:-mt-20 sm:p-7">
              <blockquote className="font-display text-lg leading-snug tracking-tight text-forest sm:text-xl !m-0">
                {QUOTE}
              </blockquote>
              <figcaption className="mt-3 font-heading text-xs font-semibold tracking-[0.14em] text-olive !m-0">
                {ATTRIBUTION}
              </figcaption>
            </figure>
          </div>

          <div className="cta-line flex min-w-0 flex-col items-center gap-6 text-center lg:items-start lg:text-left">
            <h2 className="home-section-title max-w-2xl font-display text-4xl leading-[1.1] tracking-[-0.01em] text-forest sm:text-5xl !m-0">
              {HEADING}
            </h2>
            <p className="home-section-copy site-reading-measure text-base leading-relaxed text-body md:text-lg !m-0">
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
      </div>
    </section>
  );
}
