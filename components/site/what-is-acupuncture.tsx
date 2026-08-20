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
      <section className="bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-16">
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-charcoal sm:text-5xl md:text-6xl !m-0 text-balance">
            What Is Acupuncture?
          </h1>
        </div>
      </section>

      <section className="bg-white pb-12 md:pb-20 lg:pb-24">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:px-6 md:gap-8 lg:px-16">
          <div className="max-w-3xl">
            <img
              src="/media/wp-content/uploads/2011/07/color-meridians.jpg"
              alt=""
              width={181}
              height={186}
              className="mb-4 mr-6 rounded-xl sm:float-left"
            />
            <p className="text-base leading-relaxed text-body md:text-lg whitespace-pre-wrap !m-0">{P1}</p>
          </div>
          <p className="max-w-3xl text-base leading-relaxed text-body md:text-lg whitespace-pre-wrap !m-0">{P2}</p>
        </div>
      </section>

      <section className="w-full max-w-full overflow-x-clip bg-olive py-12 text-white md:py-20 lg:py-24">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:px-6 md:gap-8 lg:px-16">
          <h2 className="max-w-4xl text-3xl font-bold tracking-tight text-white sm:text-4xl !m-0 text-balance">
            What is Qi?
          </h2>
          <p className="max-w-3xl text-base leading-relaxed text-white/90 md:text-lg whitespace-pre-wrap !m-0">
            {P_QI}
          </p>
        </div>
      </section>

      <section className="bg-white py-12 md:py-20 lg:py-24">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:px-6 md:gap-8 lg:px-16">
          <h2 className="max-w-4xl text-3xl font-bold tracking-tight text-charcoal sm:text-4xl !m-0 text-balance">
            How does Qi move?
          </h2>
          <p className="max-w-3xl text-base leading-relaxed text-body md:text-lg whitespace-pre-wrap !m-0">{P_MOVE_1}</p>
          <p className="max-w-3xl text-base leading-relaxed text-body md:text-lg whitespace-pre-wrap !m-0">{P_MOVE_2}</p>
          <p className="max-w-3xl text-base leading-relaxed text-body md:text-lg whitespace-pre-wrap !m-0">{P_MOVE_3}</p>
          <p className="max-w-3xl rounded-xl border border-charcoal/10 p-6 text-lg font-semibold leading-snug text-charcoal shadow-sm md:p-8 md:text-xl !m-0">
            {CALL_1}
          </p>
        </div>
      </section>

      <section className="w-full max-w-full overflow-x-clip bg-olive py-12 text-white md:py-20 lg:py-24">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:px-6 md:gap-8 lg:px-16">
          <h2 className="max-w-4xl text-3xl font-bold tracking-tight text-white sm:text-4xl !m-0 text-balance">
            How does Acupuncture Work?
          </h2>
          <p className="max-w-3xl text-base leading-relaxed text-white/90 md:text-lg whitespace-pre-wrap !m-0">
            {P_WORK}
          </p>
          <p className="max-w-3xl rounded-xl border border-white/20 bg-white/10 p-6 text-lg font-semibold leading-snug text-white shadow-sm md:p-8 md:text-xl !m-0">
            {CALL_2}
          </p>
        </div>
      </section>
    </div>
  );
}
