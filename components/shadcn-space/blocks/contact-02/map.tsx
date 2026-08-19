"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const EMBED =
  "https://www.google.com/maps/embed/v1/place?key=REMOVED_GOOGLE_MAPS_KEY&q=si+shou+acupuncture&zoom=14";

export default function MapBand() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
      gsap.from(".map-line", {
        autoAlpha: 0,
        y: 18,
        duration: 1.3,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="w-full bg-white">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-20 sm:px-10 sm:py-28 lg:px-12">
        <h1 className="map-line font-heading text-2xl font-semibold tracking-[0.18em] text-charcoal sm:text-3xl">
          Map & Directions
        </h1>
        <p className="map-line font-sans text-base leading-8 text-body">
          Sì Shòu Acupuncture and Wellness, PLLC
          <br />
          5424 W US Hwy 290 Service Rd Ste #106
          <br />
          Austin, TX 78735
          <br />
          (512) 387-4002
        </p>
      </div>
      <div className="map-line relative aspect-[4/3] w-full bg-olive/10 sm:aspect-[21/9]">
        <iframe src={EMBED} className="absolute inset-0 h-full w-full border-0" allowFullScreen />
      </div>
    </div>
  );
}
