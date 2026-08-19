"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export function InnerShell({
  title,
  children,
  wide,
}: {
  title: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
      gsap.from(".inner-line", {
        autoAlpha: 0,
        y: 18,
        duration: 1.3,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="w-full bg-white">
      <div
        className={cn(
          "mx-auto flex w-full flex-col gap-10 px-6 py-20 sm:px-10 sm:py-28",
          wide ? "max-w-5xl lg:px-12" : "max-w-3xl lg:px-0",
        )}
      >
        <h1 className="inner-line font-heading text-2xl font-semibold tracking-[0.18em] text-charcoal sm:text-3xl">
          {title}
        </h1>
        <div className="inner-line">{children}</div>
      </div>
    </div>
  );
}
