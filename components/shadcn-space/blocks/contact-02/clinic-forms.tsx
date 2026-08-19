"use client";

import { useRef } from "react";
import { site } from "@/lib/site";
import { gsap, useGSAP } from "@/lib/gsap";

const HEADING = "Kate's  and Aaron's New Patients:";
const BODY =
  "Each patient has access to their own patient portal.  On that portal you can complete your patient paperwork prior to your appointment. You can also check your upcoming appointments, see your personal documents and download documents from the clinic.";

export default function ClinicForms() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
      gsap.from(".forms-line", {
        autoAlpha: 0,
        y: 18,
        duration: 1.3,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="w-full bg-white">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-20 sm:px-10 sm:py-28 lg:px-0">
        <h1 className="forms-line font-heading text-2xl font-semibold tracking-[0.18em] text-charcoal sm:text-3xl">
          Clinic Forms
        </h1>
        <p className="forms-line whitespace-pre-wrap font-sans text-base font-semibold leading-8 text-charcoal">
          {HEADING}
        </p>
        <p className="forms-line whitespace-pre-wrap font-sans text-base leading-8 text-body">{BODY}</p>
        <p className="forms-line font-sans text-base leading-8 text-body">
          Click{" "}
          <a href={site.booking.portal} className="text-olive underline">
            here to access the patient portal
          </a>
          .
        </p>
        <p className="forms-line font-sans text-base leading-8 text-body">
          <a
            href={site.media.privacyPdf}
            className="text-olive underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            SSAW Privacy Policy Jan 2017
          </a>
        </p>
      </div>
    </div>
  );
}
