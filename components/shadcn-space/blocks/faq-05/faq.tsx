"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";

const INTRO =
  "We utilize a wide variety of modalities to treat our patients.  Below is an explanation of each modality. None of these modalities are used every single treatment.   Instead we prefer to work with our patients to determine which treatment options are suitable for their condition and then collaboratively design a treatment plan based on the patient's goals and comfort level with each treatment.  The treatment may include only one modality or several.   Below is a description of the modalities we offer.";

const rows = [
  { name: "Acupuncture", href: "/what-is-acupuncture/", rest: "for details about Acupuncture." },
  { name: "Cupping Therapy", href: "/what-is-cupping-therapy/", rest: "for details about Cupping Therapy." },
  {
    name: "Electro-stimulation Acupuncture",
    href: "/what-is-electro-acupuncture/",
    rest: "for details about E-Stim Acupuncture.",
  },
  { name: "Gua Sha", href: "/what-is-guasha/", rest: "for details about Gua Sha." },
  { name: "Herbal Medicine", href: "/chinese-herbal-medicine/", rest: "for details about Herbal Medicine." },
  { name: "Moxabustion", href: "/what-is-moxabustion/", rest: "for details about Moxabustion." },
  {
    name: "Nutritional Therapy",
    href: "/what-is-nutritional-therapy/",
    rest: "for details about Nutritional Therapy.",
  },
  { name: "TaiChi and Qigong", href: "/what-is-taichi-and-qigong/", rest: "for details about TaiChi and Qigong." },
  { name: "Tuina (Asian Bodywork)", href: "/what-is-tuina/", rest: "for details about Tuina." },
] as const;

export default function FAQ() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
      gsap.from(".mod-line", {
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
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-6 py-20 sm:px-10 sm:py-28 lg:px-12">
        <h1 className="mod-line font-heading text-2xl font-semibold tracking-[0.18em] text-charcoal sm:text-3xl">
          Treatment Modalities
        </h1>
        <p className="mod-line max-w-3xl whitespace-pre-wrap font-sans text-base leading-8 text-body">
          {INTRO}
        </p>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {rows.map((row) => (
            <article key={row.name} className="mod-line flex flex-col gap-4">
              <h2 className="font-heading text-lg font-semibold text-charcoal">{row.name}</h2>
              <p className="font-sans text-sm leading-7 text-body">
                Click{" "}
                <Link href={row.href} className="text-olive underline">
                  here
                </Link>{" "}
                {row.rest}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
