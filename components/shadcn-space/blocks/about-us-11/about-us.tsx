"use client";

import { useRef } from "react";
import { site } from "@/lib/site";
import { gsap, useGSAP } from "@/lib/gsap";

export default function AboutUs() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
      gsap.from(".video-band-frame", {
        autoAlpha: 0,
        y: 20,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 78%",
          once: true,
        },
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="w-full bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
        <div
          className="video-band-frame relative aspect-video w-full overflow-hidden rounded-md bg-charcoal [&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:h-full [&_iframe]:w-full [&_iframe]:border-0"
          dangerouslySetInnerHTML={{
            __html: `<iframe src="${site.media.youtubeHome}" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`,
          }}
        />
      </div>
    </section>
  );
}
