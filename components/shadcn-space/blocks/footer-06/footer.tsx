"use client";

import { useRef } from "react";
import { site } from "@/lib/site";
import { gsap, useGSAP } from "@/lib/gsap";

const Footer = () => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
      gsap.from(".footer-line", {
        autoAlpha: 0,
        y: 16,
        duration: 1.2,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: ref },
  );

  return (
    <footer ref={ref} className="w-full bg-charcoal text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-14 px-6 py-20 sm:grid-cols-2 sm:px-10 lg:grid-cols-4 lg:gap-16 lg:px-12 lg:py-24">
        <div className="footer-line">
          <a
            href={`tel:${site.phoneTel}`}
            className="font-heading text-lg tracking-wide text-white"
          >
            {site.phoneDisplay}
          </a>
        </div>

        <div className="footer-line flex flex-col gap-4">
          <h2 className="font-heading text-sm font-semibold tracking-[0.18em] text-white uppercase">
            Booking
          </h2>
          <a
            href={site.booking.footer}
            target="_blank"
            rel="noopener noreferrer"
            className="font-heading text-sm text-olive"
          >
            Schedule Appointment with Kate
          </a>
          <a
            href={site.booking.footer}
            target="_blank"
            rel="noopener noreferrer"
            className="font-heading text-sm text-olive"
          >
            Schedule Appointment with Aaron
          </a>
        </div>

        <div className="footer-line flex flex-col gap-4">
          <h2 className="font-heading text-sm font-semibold tracking-[0.18em] text-white uppercase">
            Hours
          </h2>
          <ul className="font-sans text-sm leading-8 text-white/90">
            {site.hours.map((row) => (
              <li key={row.day}>
                {row.day}: {row.hours}
              </li>
            ))}
          </ul>
        </div>

        <p className="footer-line font-sans text-sm leading-8 text-white/90">
          {site.address.line1}
          <br />
          {site.address.line2}
          <br />
          {site.address.line3}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
