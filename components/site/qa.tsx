"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";

const INTRO =
  "Some common questions about acupuncture are answered below. Call us if you have other questions or if you are interested in improving your life through acupuncture treatment.";

const items = [
  { title: "Does it hurt?", href: "/apw_qa/does-it-hurt/" },
  { title: "How are acupuncturists educated?", href: "/apw_qa/how-are-acupuncturists-educated/" },
  { title: "How many treatments will I need?", href: "/apw_qa/how-many-treatments-will-i-need/" },
  { title: "How much does it cost?", href: "/apw_qa/how-much-does-it-cost/" },
  { title: "How safe is acupuncture?", href: "/apw_qa/how-safe-is-acupuncture/" },
  { title: "How should I prepare?", href: "/apw_qa/how-should-i-prepare/" },
  { title: "Is acupuncture safe for children?", href: "/apw_qa/is-acupuncture-safe-for-children/" },
  { title: "What can acupuncturists treat?", href: "/apw_qa/what-can-acupuncturists-treat/" },
  { title: "What will my acupuncturist do?", href: "/apw_qa/what-will-my-acupuncturist-do/" },
  { title: "Why did my acupuncturist recommend herbs?", href: "/apw_qa/why-did-my-acupuncturist-recommend-herbs/" },
  { title: "Why do they want to feel my pulse?", href: "/apw_qa/why-do-they-want-to-feel-my-pulse/" },
  { title: "Why do they want to look at my tongue?", href: "/apw_qa/why-do-they-want-to-look-at-my-tongue/" },
  { title: "Will my insurance cover acupuncture?", href: "/apw_qa/will-my-insurance-cover-acupuncture/" },
] as const;

export function QA() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
      gsap.from(".qa-line", {
        autoAlpha: 0,
        y: 16,
        duration: 1.3,
        stagger: 0.06,
        ease: "power2.out",
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="w-full bg-white">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-6 py-20 sm:px-10 sm:py-28 lg:px-0">
        <div className="qa-line flex flex-col gap-6">
          <h1 className="font-heading text-2xl font-semibold tracking-[0.18em] text-charcoal sm:text-3xl">
            Q & A
          </h1>
          <p className="font-sans text-base leading-8 text-body">{INTRO}</p>
        </div>
        <ul className="flex flex-col">
          {items.map((item) => (
            <li key={item.href} className="qa-line border-b border-charcoal/15">
              <Link
                href={item.href}
                className="flex py-6 font-heading text-lg font-semibold text-charcoal transition-colors hover:text-olive sm:text-xl"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
