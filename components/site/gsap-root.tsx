"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import { ensureGsapPlugins, gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const TEXT_SELECTOR = [
  "main h1",
  "main h2",
  "main h3",
  "main h4",
  "main p",
  "main li",
  "main dt",
  "main dd",
  "main th",
  "main td",
  "main blockquote",
  "main figcaption",
  "main label",
].join(",");

function collectText(root: HTMLElement) {
  const nodes = Array.from(root.querySelectorAll<HTMLElement>(TEXT_SELECTOR)).filter((el) => {
    if (el.closest("header, footer, nav, [role='dialog']")) return false;
    if (el.closest(".home-hero, .home-cta, .hero-enter, .cta-line, .inner-line, .dump-line")) {
      return false;
    }
    return Boolean(el.textContent?.trim());
  });

  const set = new Set(nodes);
  return nodes.filter((el) => {
    let parent = el.parentElement;
    while (parent && parent !== root) {
      if (set.has(parent)) return false;
      parent = parent.parentElement;
    }
    return true;
  });
}

export function GsapRoot({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      ensureGsapPlugins();
      const root = ref.current;
      if (!root) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const targets = collectText(root);
      if (!targets.length) return;

      ScrollTrigger.batch(targets, {
        start: "top 92%",
        once: true,
        onEnter: (batch) => {
          gsap.from(batch, {
            autoAlpha: 0,
            y: 20,
            duration: 0.8,
            stagger: 0.05,
            ease: "power2.out",
            overwrite: "auto",
          });
        },
      });
    },
    { scope: ref, dependencies: [pathname] },
  );

  return <div ref={ref}>{children}</div>;
}
