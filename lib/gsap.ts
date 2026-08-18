"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

let registered = false;

export function ensureGsapPlugins() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(useGSAP);
  registered = true;
}

if (typeof window !== "undefined") {
  ensureGsapPlugins();
}

export { gsap, useGSAP };
export default gsap;
