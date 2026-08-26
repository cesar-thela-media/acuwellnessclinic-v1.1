import { PageHero, SectionHeading } from "@/components/site/page-primitives";

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
  return (
    <div className="w-full bg-white">
      <PageHero
        title="What Is Acupuncture?"
        image="/media/wp-content/uploads/2017/10/Blogimg-Positive-Effects-of-Acupuncture.jpg"
      />

      <section className="bg-white">
        <div className="site-container site-section grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div className="flex min-w-0 flex-col gap-6">
            <p className="whitespace-pre-wrap text-base leading-relaxed text-body md:text-lg !m-0">{P1}</p>
            <p className="whitespace-pre-wrap text-base leading-relaxed text-body md:text-lg !m-0">{P2}</p>
          </div>
          <div className="overflow-hidden rounded-3xl bg-olive/10">
            <img
              src="/media/wp-content/uploads/2011/07/color-meridians.jpg"
              alt="Colorful acupuncture meridian illustration"
              className="aspect-[4/3] !h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="site-container site-section flex flex-col gap-6">
          <SectionHeading>What is Qi?</SectionHeading>
          <p className="max-w-3xl whitespace-pre-wrap text-base leading-relaxed text-body md:text-lg !m-0">
            {P_QI}
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="site-container site-section flex flex-col gap-6">
          <SectionHeading>How does Qi move?</SectionHeading>
          <p className="max-w-3xl whitespace-pre-wrap text-base leading-relaxed text-body md:text-lg !m-0">{P_MOVE_1}</p>
          <p className="max-w-3xl whitespace-pre-wrap text-base leading-relaxed text-body md:text-lg !m-0">{P_MOVE_2}</p>
          <p className="max-w-3xl whitespace-pre-wrap text-base leading-relaxed text-body md:text-lg !m-0">{P_MOVE_3}</p>
          <p className="max-w-3xl text-lg font-semibold leading-snug text-forest md:text-xl !m-0">
            {CALL_1}
          </p>
        </div>
      </section>

      <section className="bg-cream">
        <div className="site-container site-section flex flex-col gap-6">
          <SectionHeading>How does Acupuncture Work?</SectionHeading>
          <p className="max-w-3xl whitespace-pre-wrap text-base leading-relaxed text-body md:text-lg !m-0">
            {P_WORK}
          </p>
          <p className="max-w-3xl text-lg font-semibold leading-snug text-forest md:text-xl !m-0">
            {CALL_2}
          </p>
        </div>
      </section>
    </div>
  );
}
