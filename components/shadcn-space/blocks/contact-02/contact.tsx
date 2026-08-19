"use client";

import { useRef } from "react";
import { ContactForm } from "@/components/site/contact-form";
import { site } from "@/lib/site";
import { gsap, useGSAP } from "@/lib/gsap";

const BOOK = site.booking.footer;

const Contact = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
      gsap.from(".contact-line", {
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
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-16 px-6 py-20 sm:px-10 sm:py-28 lg:px-12">
        <h1 className="contact-line font-heading text-2xl font-semibold tracking-[0.18em] text-charcoal sm:text-3xl">
          Contact
        </h1>

        <div className="contact-line grid grid-cols-1 gap-10 sm:grid-cols-2">
          <div className="flex flex-col items-start gap-4">
            <img
              src="/media/wp-content/uploads/2026/08/Gannon-AOMASept2022-R-150x150.jpeg"
              alt=""
              width={150}
              height={150}
              className="h-36 w-36 object-cover"
            />
            <a
              href={BOOK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex bg-olive px-4 py-2 font-heading text-sm text-white"
            >
              Schedule Appointment With Kate
            </a>
          </div>
          <div className="flex flex-col items-start gap-4">
            <img
              src="/media/wp-content/uploads/2023/03/unnamed-150x150.jpg"
              alt=""
              width={150}
              height={150}
              className="h-36 w-36 object-cover"
            />
            <a
              href={BOOK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex bg-olive px-4 py-2 font-heading text-sm text-white"
            >
              Schedule Appointment With Aaron
            </a>
          </div>
        </div>

        <p className="contact-line font-sans text-base leading-7 text-body">
          If you prefer to send us a message, please complete the form below and we will get back to
          you within 24 hours.
        </p>

        <div className="contact-line">
          <ContactForm />
        </div>

        <p className="contact-line font-sans text-sm leading-7 text-body">
          Disclaimer: Please refrain from submitting any individually identifiable health
          information through this form. Any health information submitted through this form is the
          sole responsibility of that person. No liability will fall on the website owner or its
          supplier. For more information about HIPAA please visit{" "}
          <a
            href="http://www.hhs.gov/ocr/privacy/"
            className="text-olive underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            http://www.hhs.gov/ocr/privacy/
          </a>
        </p>
      </div>
    </div>
  );
};

export default Contact;
