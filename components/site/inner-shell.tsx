"use client";

import { useRef } from "react";
import { PageTitle, SiteContainer } from "@/components/site/page-primitives";
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
      <SiteContainer
        className={cn(
          "site-section--compact flex flex-col gap-10",
          wide ? "site-container--wide" : "site-container--reading",
        )}
      >
        <PageTitle className="inner-line">{title}</PageTitle>
        <div className="inner-line">{children}</div>
      </SiteContainer>
    </div>
  );
}
