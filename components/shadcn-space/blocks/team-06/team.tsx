"use client";

import { useRef } from "react";
import { site } from "@/lib/site";
import { gsap, useGSAP } from "@/lib/gsap";

const BOOK = site.booking.header;

const members = [
  {
    name: "Kate Gannon",
    image: "/media/wp-content/uploads/2026/08/Gannon-AOMASept2022-R.jpeg",
    srcSet: undefined as string | undefined,
    sizes: undefined as string | undefined,
    cta: "Schedule Appointment With Kate",
    bio: "Like many, Kate came to acupuncture after a host of health issues her allopathic doctors could not resolve. She now strives to close that gap for others who are feeling stuck, having tried everything. Kate’s favorite thing about Chinese medicine is when the patient is surprised by how they feel, having forgotten that our bodies really can return to a state of feeling normal + good.\nTX Acu License#\u00A0AC02276",
  },
  {
    name: "Megan McFarland, L.Ac., M.Ac. CHM, Dipl. O.M. (NCCAOM)®",
    image: "/media/wp-content/uploads/2023/03/IMG_5837-300x300.jpg",
    srcSet:
      "/media/wp-content/uploads/2023/03/IMG_5837-300x300.jpg 300w, /media/wp-content/uploads/2023/03/IMG_5837-150x150.jpg 150w",
    sizes: "300px",
    cta: "Schedule Appointment With Megan",
    bio: "Hi, I'm Megan McFarland, LAc., M.Ac. CHM. I am a Texas Medical Board Licensed Acupuncturist, NCCAOM Diplomate, Chinese Herbalist and Certified Clinical Western Herbalist. Born and raised in Southwest Austin, I received my four-year Master’s in Acupuncture with a Specialization in Chinese Herbal Medicine from Southwest Acupuncture College in Santa Fe, New Mexico, and my certificate in Clinical Western Herbalism from the Wildflower School of Botanical Medicine in Austin, Texas. I have additionally studied Master Tung style acupuncture in Chengdu, China with Dr. Lin Zheng Tai and reflexology and gua sha in Shaoguan, China. I have studied bioregional and folk herbalism with various teachers around the United States since 2012.\n\nHaving spent over a decade organic farming and practicing natural medicine, I see good nutrition, supplementation, exercise, herbs and bodywork as foundational for health. I believe that vibrant health is our basic human condition, but sometimes that condition becomes obscured when we stop living our lives within a healthy and supportive environment in tune with our bodies’ daily needs. Life will undoubtedly put challenges on our path, but when we build resiliance through robust health, we can bend instead of break. As a practitioner, I am an advocate for your choice to be well and see my role as one helpful resource within your healthcare team.\n\nLet’s work together to get you feeling wonderful and at peace.",
  },
  {
    name: "Aaron Occhino, MAcCH, LAc, DIP. OM (NCCAOM)",
    image: "/media/wp-content/uploads/2024/03/aaron.jpg",
    srcSet:
      "/media/wp-content/uploads/2024/03/aaron.jpg 1483w, /media/wp-content/uploads/2024/03/aaron-284x300.jpg 284w, /media/wp-content/uploads/2024/03/aaron-970x1024.jpg 970w, /media/wp-content/uploads/2024/03/aaron-768x811.jpg 768w, /media/wp-content/uploads/2024/03/aaron-1455x1536.jpg 1455w",
    sizes: "(max-width: 1483px) 100vw, 1483px",
    cta: "Schedule Appointment With Aaron",
    bio: "My name is Aaron Occhino. I was born and raised a desert rat in Phoenix, Arizona. I grew up riding dirt bikes, hiking, playing basketball, and hanging outdoors with my family. Growing up I had persistent rashes, and was placed on and off of prescription medications to try and alleviate my skin discomfort. I was frustrated that it never seemed to fix the problem.\nIn my adulthood, I started thinking more about finding other solutions. Shortly after moving to Austin, Texas in 2016, I began pursuing natural medicine in order to heal my skin. I was working with a Traditional Chinese Medicine practitioner for a few months and saw  fantastic results. I became absolutely hooked on all things Chinese Medicine.\n\nHaving my own health issues has created a desire within me to help people find their root cause healing. I’m motivated by challenging the current paradigm of modern health with more traditional and holistic lenses. I’m led with compassion for my patients, and seek to find the right balance that leads to healing in my treatments.\n\nI went to Arizona State University; where I received a Bachelor’s Degree in Interdisciplinary Studies, with concentrations in Communications and Spanish. I love languages, the arts, and music. If you find me outside of the clinic, I’ll be playing guitar, grilling/cooking, or spending time in nature with my family and dogs.\n\nHippocrates suggested that “all disease begins in the gut,” and that has become my motto. I am motivated to help correct all things gut-related, in addition to other internal medicine diseases. I’m passionate about discussing nutrition with my patients, and creating treatment plans. I also specialize in neurological conditions, eye disorders, and autoimmunity.\nI graduated from AOMA with a Masters in Acupuncture with a specialty in Chinese Herbal Medicine. The healing tools I use at the clinic are Acupuncture, Gua Sha, Cupping, Dry needling, Medical Qi Gong, Chinese Herbs and nutritional therapy.\n\nTx Acu License# AC02101",
  },
] as const;

const Experts = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
      gsap.from(".team-line", {
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
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-24 px-6 py-20 sm:px-10 sm:py-28 lg:px-12">
        <h1 className="team-line font-heading text-2xl font-semibold tracking-[0.18em] text-charcoal sm:text-3xl">
          Our Team
        </h1>
        {members.map((member) => (
          <article
            key={member.name}
            className="team-line grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr] lg:gap-16"
          >
            <img
              src={member.image}
              srcSet={member.srcSet}
              sizes={member.sizes}
              alt=""
              className="aspect-[3/4] w-full max-w-xs object-cover"
            />
            <div className="flex flex-col items-start gap-6">
              <h1 className="bio_head font-heading text-xl font-semibold text-charcoal sm:text-2xl">
                {member.name}
              </h1>
              <a
                href={BOOK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex bg-olive px-4 py-2 font-heading text-sm text-white"
              >
                {member.cta}
              </a>
              <p className="whitespace-pre-wrap font-sans text-base leading-8 text-body">
                {member.bio}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Experts;
