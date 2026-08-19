"use client";

import { useRef } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { gsap, useGSAP } from "@/lib/gsap";

const INTRO =
  "Below is a list of conditions that we can effectively treat. Click each topic to read more.";

const items = [
  {
    href: "/apw_wwt/asthma/",
    image: "/media/wp-content/uploads/2011/08/Asthma.jpg",
    title: "Asthma",
    excerpt: "Asthma is a respiratory disease and chronic inflammatory disorder that affects 339 million people[1] around the world, with more cases of the disease being found each year. A condition that can affect both children and adults; there are a variety of types of asthma. The most common types are occupational asthma (contracted by those working […]",
  },
  {
    href: "/apw_wwt/concussion/",
    image: "/media/wp-content/uploads/2011/08/Concussion.jpg",
    title: "Concussion",
    excerpt: "A Concussion is the most common and least severe of traumatic brain injuries (TBIs). In 2013, some form of TBI, including concussions, led to the hospitalization, emergency department visit or death of nearly 3 million Americans. Usually caused by a sudden direct blow to the head, those suffering from a concussion report blurred vision, headache, […]",
  },
  {
    href: "/apw_wwt/headaches/",
    image: "/media/wp-content/uploads/2011/08/Headache.jpg",
    title: "Headaches",
    excerpt: "Headaches are a common medical condition that can affect those of all ages around the world. Headaches are categorized into two main types: primary headaches and secondary headaches. Primary headaches can be caused by overactivity, changes in chemical activity, and problems with muscles, nerves, or blood vessels. Examples of primary headaches are tension headaches (TTH), […]",
  },
  {
    href: "/apw_wwt/hypertension/",
    image: "/media/wp-content/uploads/2011/08/Hypertension.jpg",
    title: "Hypertension",
    excerpt: "Hypertension-related diseases are among the leading causes of mortality in the world. About one out in three adults in the United States suffer from high blood pressure, which can lead to many life-threatening problems including heart attacks, stroke, kidney disease, and metabolic disorders. Acupuncture can help by offering natural and pain-free methods to help manage […]",
  },
  {
    href: "/apw_wwt/ibs/",
    image: "/media/wp-content/uploads/2011/08/IBS2.jpg",
    title: "IBS",
    excerpt: "Irritable Bowel Syndrome (IBS) is a common condition, of which approximately 15%[1] of the population of the US suffer. Affecting the large intestine it can be extremely uncomfortable, resulting in abdominal pain, gas, bloating, constipation or diarrhea and cramping. IBS is typically a diagnosis by elimination.  Once all other ailments have been ruled out, IBS is […]",
  },
  {
    href: "/apw_wwt/pain/",
    image: "/media/wp-content/uploads/2011/08/Pain.jpg",
    title: "Pain",
    excerpt: "Chinese medicine has been used for several thousand years and incorporates several modalities including acupuncture and Chinese herbal medicine.  It is practiced successfully for both acute and chronic pain management and can be a viable alternative to opioids and other prescription pain medication. What is Pain? Pain is defined as uncomfortable and unpleasant physical feelings […]",
  },
  {
    href: "/apw_wwt/parkinsons/",
    image: "/media/wp-content/uploads/2011/08/Parkinsons.png",
    title: "Parkinson's",
    excerpt: "Parkinson’s disease (PD) is the second-most-common chronic neurodegenerative disease. More than one-million people in the United States are affected by this disease, and doctors diagnose as many as 60,000 new cases each year. Parkinson’s is a progressive disorder of the central nervous system that mainly affects movement, including: tremors, impaired posture, shuffling, difficulty swallowing, fainting, […]",
  },
  {
    href: "/apw_wwt/peripheral-neuropathy/",
    image: "/media/wp-content/uploads/2011/08/Peripheral-Neur2.jpeg",
    title: "Peripheral Neuropathy",
    excerpt: "Peripheral Neuropathy is a condition that affects the peripheral nervous system, which transmits information from the brain and spinal cord to every other part of the body. The syndrome includes symptoms of numbness, tingling, sensitivity to touch, burning pain, and muscle weakness and atrophy of the arms and legs. Peripheral neuropathy is usually secondary to […]",
  },
  {
    href: "/apw_wwt/stroke/",
    image: "/media/wp-content/uploads/2011/08/Stroke.jpg",
    title: "Stroke",
    excerpt: "Strokes are the leading cause of cerebral and physical long term-disability within the United States. A stroke occurs when a blood vessel that carries oxygen and nutrients to the brain is either blocked by a clot or ruptures.  Loss of oxygen to the brain causes brain cells to die; resulting in physical, emotional, and/or cognitive […]",
  },
] as const;

export function WhatWeTreat() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
      gsap.from(".wwt-line", {
        autoAlpha: 0,
        y: 16,
        duration: 1.35,
        stagger: 0.1,
        ease: "power2.out",
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="w-full bg-white py-20 sm:py-28">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 sm:px-10 lg:px-12">
        <div className="wwt-line mx-auto flex max-w-3xl flex-col gap-6">
          <h1 className="font-heading text-2xl font-semibold tracking-[0.18em] text-charcoal sm:text-3xl">
            What We Treat
          </h1>
          <p className="font-sans text-base leading-8 text-body">{INTRO}</p>
        </div>
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {items.map((item) => (
            <Card
              key={item.href}
              className="wwt-line border-0 bg-transparent p-0 shadow-none ring-0"
            >
              <CardContent className="flex flex-col gap-5 p-0">
                <Link href={item.href} className="block overflow-hidden">
                  <div
                    className="aspect-[4/3] w-full bg-olive/20 bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                </Link>
                <Link
                  href={item.href}
                  className="font-heading text-base font-semibold leading-snug text-charcoal"
                >
                  {item.title}
                </Link>
                <p className="whitespace-pre-wrap font-sans text-sm leading-7 text-body">
                  {item.excerpt}
                </p>
                <Link
                  href={item.href}
                  className="font-heading text-sm tracking-wide text-olive"
                >
                  Read More
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
