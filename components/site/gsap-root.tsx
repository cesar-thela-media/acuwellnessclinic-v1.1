"use client";

import { useRef } from "react";
import { ensureGsapPlugins, useGSAP } from "@/lib/gsap";

export function GsapRoot({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      ensureGsapPlugins();
    },
    { scope: ref },
  );
  return <div ref={ref}>{children}</div>;
}
