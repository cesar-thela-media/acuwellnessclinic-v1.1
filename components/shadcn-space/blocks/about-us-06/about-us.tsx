"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const P1 =
  "We are a full service Oriental medicine clinic located in the Oak Hill region of Southwest Austin.  We offer acupuncture, acupressure, tuina (asian bodywork), cupping therapy, herbal medicine, guasha, nutritional support, taichi and qigong. Treating a wide range of both acute and chronic conditions, our natural focus is on pain management, sports medicine, auto-immune disease and facial rejuvenation.";

const P2 =
  "Focusing on prevention and health we will work to alleviate your symptoms while helping your body get back on track to a state of harmonious health so you are able do the things you love.";

const P3 =
  "At the heart of Chinese mythology are four spiritual creatures (Sì Shòu 四獸) -- four celestial emblems -- each guarding a direction on the compass. In China, the four date back to at least the 2nd century BC. Each creature has a corresponding season, color, element, virtue, and other traits.";

const GUARDIANS = [
  { guardian: "Tortoise", direction: "North", season: "Winter", color: "Black", element: "Water" },
  { guardian: "White Tiger", direction: "West", season: "Fall", color: "White", element: "Metal" },
  { guardian: "Red Bird/ Phoenix", direction: "South", season: "Summer", color: "Red", element: "Fire" },
  { guardian: "Dragon", direction: "East", season: "Spring", color: "Blue/Green", element: "Wood" },
] as const;

const COLS = ["Guardian", "Direction", "Season", "Color", "5 Element"] as const;

const AboutUs06 = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
      gsap.from(".about-line", {
        autoAlpha: 0,
        y: 18,
        duration: 1.3,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="w-full bg-white">
      <header className="mx-auto w-full max-w-3xl px-6 pb-8 pt-20 sm:px-10 sm:pt-28 lg:px-0">
        <h1 className="about-line font-heading text-2xl font-semibold tracking-[0.18em] text-charcoal sm:text-3xl">
          About Us
        </h1>
      </header>

      <div className="mx-auto w-full max-w-3xl px-6 sm:px-10 lg:px-0">
        <p className="about-line font-heading text-lg font-semibold text-charcoal">
          <em>
            <strong>What is Sì Shòu Acupuncture and Wellness?</strong>
          </em>
        </p>
      </div>

      <section className="about-line mt-10 w-full bg-olive/15">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-16 font-sans text-base leading-8 text-charcoal sm:px-10 sm:py-20 lg:px-0">
          <p className="whitespace-pre-wrap">{P1}</p>
          <p>{P2}</p>
          <p>{P3}</p>
        </div>
      </section>

      <div className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-10 sm:py-20 lg:px-0">
        <p className="about-line font-heading text-lg font-semibold text-charcoal">
          <em>
            <strong>
              Sì Shòu:{'  '}The 4 Guardians guarding the 4 compass directions
            </strong>
          </em>
        </p>

        <div className="about-line mt-14 overflow-x-auto">
          <table className="w-full min-w-[28rem] border-collapse text-left font-sans text-sm text-charcoal">
            <thead>
              <tr className="border-b border-charcoal/20">
                {COLS.map((label) => (
                  <th key={label} className="py-3 pr-4">
                    <strong>
                      <u>{label}</u>
                    </strong>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {GUARDIANS.map((row) => (
                <tr key={row.guardian} className="border-b border-charcoal/10">
                  <td className="py-3 pr-4">{row.guardian}</td>
                  <td className="py-3 pr-4">{row.direction}</td>
                  <td className="py-3 pr-4">{row.season}</td>
                  <td className="py-3 pr-4">{row.color}</td>
                  <td className="py-3">{row.element}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AboutUs06;
