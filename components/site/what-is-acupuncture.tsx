"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const P1 = "Acupuncture is the insertion of very thin, filiform needles into specific points on the body to relieve pain or treat disease.  In the US, acupuncture is the most well-known modality of traditional Chinese medicine.  Here it is most often used to treat pain, however acupuncture promotes healing reactions in the body.  It is a complete medical system capable of treating many conditions beyond pain. It enhances recuperative power and immunity, supporting physical and emotional health, and improving overall function and well-being. It is a safe and effective way to treat a wide variety of medical problems and is extremely complementary to allopathic medicine.";
const P2 = "As a whole, Chinese medicine looks at illness holistically and often sees patterns in a way which is very different from allopathic medicine. Western medicine typically views an illness as it relates to a particular system and often does not link symptoms across systems together. Chinese medicine looks for the relationships between the patient's signs and symptoms and treats the body in a holistic fashion.";
const P_QI = "Qi (pronounced \"chee\") is the energy, or life force, involved in every aspect of the body.  Qi is at the core of Chinese medicine and flows throughout the body.  For the most part, it is common knowledge that our body's function off of energy being transmitted.  In the most simplistic sense this energy is the Qi.  Qi animates the body and protects it from illness, pain and disease. A person's health is influenced by the quality, quantity and balance of Qi.";
const P_MOVE_1 = "Qi flows through specific pathways called meridians. Meridian pathways are like rivers flowing inside the body. This is a very apt parallel since where a river flows, it provides nourishment to the land, plants and people. Similarly, where meridian pathways flow, they bring Qi that provides nourishment to every cell, organ, tissue and muscle in the body.";
const P_MOVE_2 = "Physical and emotional trauma, stress, lack of exercise, overexertion, seasonal changes, poor diet, accidents, or excessive activity are among the many things that can influence the quality, quantity and balance of Qi.  A change or blockage in the flow of Qi can be detrimental to a person's health, limiting vital nourishment to the body, organs and glands.  Think of a rock blocking a river or a kink in a hose.  The water gets dammed up on one side and the things downstream begin to wither.  Our body's act similarly.  Where there is free flow of qi, there is no pain.";
const P_MOVE_3 = "Normally, when a blockage or imbalance occurs, the body easily bounces back, returning to a state of health and well-being. However, when this disruption is prolonged or excessive, or if the body is in a weakened state, illness, pain, or disease can set in.  This is generally based on the resources available in the body to help it repair.";
const P_WORK = "Acupuncture needles inserted at specific points on the body access, redirect, and boost Qi in the meridians helping the body to reach the highest capacity to heal its self. Modern research shows us that our brains recognize when a needle has been inserted and it responds.  There are both local responses and systemic ones involved, both of which encourage the body to begin the healing process. The human body has a vast capacity to heal its self, sometimes all it needs is a little help.  Acupuncture provides a safe,  effective and drug-free therapy needed to bring the body back to balance and health.";
const CALL_1 = "Blockage of the flow of Qi can be detrimental to a person's health and leads to various signs and symptoms or health concerns.";
const CALL_2 = "Acupuncture and Chinese medicine are safe, effective and drug-free therapies that can help address a wide variety of common ailments and problems.";

export function WhatIsAcupuncture() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
      gsap.from(".wia-line", {
        autoAlpha: 0,
        y: 18,
        duration: 1.3,
        stagger: 0.1,
        ease: "power2.out",
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="w-full bg-white">
      <header className="mx-auto w-full max-w-3xl px-6 pb-8 pt-20 sm:px-10 sm:pt-28 lg:px-0">
        <h1 className="wia-line font-heading text-2xl font-semibold tracking-[0.18em] text-charcoal sm:text-3xl">
          What Is Acupuncture?
        </h1>
      </header>

      <div className="wia-line mx-auto w-full max-w-3xl px-6 font-sans text-base leading-8 text-body sm:px-10 lg:px-0">
        <p>
          <img
            src="/media/wp-content/uploads/2011/07/color-meridians.jpg"
            alt=""
            width={181}
            height={186}
            className="mb-4 mr-6 sm:float-left"
          />
          <span className="whitespace-pre-wrap">{P1}</span>
        </p>
        <p className="mt-8 whitespace-pre-wrap">{P2}</p>
      </div>

      <section className="wia-line mt-16 w-full bg-olive/15">
        <div className="mx-auto w-full max-w-3xl px-6 py-10 sm:px-10 sm:py-12 lg:px-0">
          <h2 className="text-center font-heading text-lg font-semibold tracking-[0.12em] text-charcoal sm:text-xl">
            What is Qi?
          </h2>
        </div>
      </section>

      <div className="wia-line mx-auto w-full max-w-3xl px-6 py-12 font-sans text-base leading-8 text-body sm:px-10 lg:px-0">
        <p className="whitespace-pre-wrap">{P_QI}</p>
      </div>

      <section className="wia-line w-full bg-olive/15">
        <div className="mx-auto w-full max-w-3xl px-6 py-10 sm:px-10 sm:py-12 lg:px-0">
          <h2 className="text-center font-heading text-lg font-semibold tracking-[0.12em] text-charcoal sm:text-xl">
            How does Qi move?
          </h2>
        </div>
      </section>

      <div className="wia-line mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-12 font-sans text-base leading-8 text-body sm:px-10 lg:px-0">
        <p className="whitespace-pre-wrap">{P_MOVE_1}</p>
        <p className="whitespace-pre-wrap">{P_MOVE_2}</p>
        <p className="whitespace-pre-wrap">{P_MOVE_3}</p>
        <p className="border-y border-charcoal/20 py-6 text-center font-heading text-lg font-semibold text-charcoal">
          {CALL_1}
        </p>
      </div>

      <section className="wia-line w-full bg-olive/15">
        <div className="mx-auto w-full max-w-3xl px-6 py-10 sm:px-10 sm:py-12 lg:px-0">
          <h2 className="text-center font-heading text-lg font-semibold tracking-[0.12em] text-charcoal sm:text-xl">
            How does Acupuncture Work?
          </h2>
        </div>
      </section>

      <div className="wia-line mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-12 pb-24 font-sans text-base leading-8 text-body sm:px-10 sm:pb-28 lg:px-0">
        <p className="whitespace-pre-wrap">{P_WORK}</p>
        <p className="border-y border-charcoal/20 py-6 text-center font-heading text-lg font-semibold text-charcoal">
          {CALL_2}
        </p>
      </div>
    </div>
  );
}
