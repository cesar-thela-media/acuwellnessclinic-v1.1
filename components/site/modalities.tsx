import { PageTitle, SectionHeading } from "@/components/site/page-primitives";

type ModalityPageProps = {
  title: string;
  image: string;
  imageAlt: string;
  paragraphs: readonly string[];
  sections?: readonly { heading: string; body: string }[];
};

function ModalityPage({
  title,
  image,
  imageAlt,
  paragraphs,
  sections = [],
}: ModalityPageProps) {
  return (
    <div className="w-full bg-white">
      <section className="bg-white">
        <div className="site-container site-section flex flex-col gap-8 md:gap-12">
          <PageTitle className="text-center">{title}</PageTitle>

          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex min-w-0 flex-col gap-4 sm:gap-5 lg:order-1">
              {paragraphs.map((p) => (
                <p
                  key={p.slice(0, 48)}
                  className="whitespace-pre-wrap text-base leading-relaxed text-body md:text-lg !m-0"
                >
                  {p}
                </p>
              ))}
            </div>
            <div className="site-media order-first w-full lg:order-2">
              <img
                src={image}
                alt={imageAlt}
                className="aspect-[16/10] w-full object-cover object-center sm:aspect-[4/3]"
              />
            </div>
          </div>

          {sections.length ? (
            <div className="grid grid-cols-1 gap-4 md:gap-6">
              {sections.map((section) => (
                <article
                  key={section.heading}
                  className="site-card flex flex-col gap-3 p-5 sm:gap-4 sm:p-6 md:p-8"
                >
                  <SectionHeading>{section.heading}</SectionHeading>
                  <p className="whitespace-pre-wrap text-base leading-relaxed text-body md:text-lg !m-0">
                    {section.body}
                  </p>
                </article>
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}

export function WhatIsCuppingTherapy() {
  return (
    <ModalityPage
      title="What is Cupping Therapy?"
      image="/media/wp-content/uploads/2017/01/Cupping-equip.jpg"
      imageAlt="Glass cups used for cupping therapy"
      paragraphs={[
        'Cupping therapy was popularized recently during the Rio Olympics in 2016 due to the media coverage of both the US Swim team and the US Gymnastics team. Members of both teams were shown with obvious cupping marks on their backs and shoulders. Cupping therapy has a very long history of treatment and is clinically used most commonly for musculoskeletal issues.',
        'Cupping is applied using a "cup" literally, or some other item which allows the practitioner to create a suction to the area in which it is applied. Historically items such as clay bowls or cups were used; even actual horns occasionally. Traditionally fire was used to create the suction. Today however, there are many other options which are not as complex and are quite easy to apply.',
        "Cupping is used to relieve back and neck pains, stiff muscles, anxiety, fatigue, migraines, rheumatism, and even cellulite. The suction and negative pressure provided by cupping can loosen muscles, encourage blood flow, and sedate the nervous system (which makes it an excellent treatment for high blood pressure and stress).",
        "Cupping therapy often leaves marks which can be mistaken for bruises. Since they were not caused by trauma, these are not actually bruises and instead are indicative of an increased blood flow to the area and often are helpful in releasing toxins. Typically the marks resolve after a few days up to a week or two. As the blood flow in the area improves and the muscle function improves, the marks lessen and are simply a slight pinkish red tone. the coloration and appearance of the marks are actually one of the ways the practitioner can diagnose what the underlying problem is that is being treated. Below are photos of some of the cups used to create the suction.",
      ]}
      sections={[
        {
          heading: "Cupping for Facial Rejuvenation",
          body: "This cupping technique eliminates buildup of wastes and fluids in the face and neck. This treatment will increase the circulation to the face and increase nutrients brought to the epidermis as well as enhance absorption of facial topicals. The action is cumulative, especially if the treatments are done 1-2 times per week. Each client will have differing amounts of stagnation, so the perfect number of treatments will vary by patient. This can be a fantastic option a few days prior to a big event such as a wedding or class reunion.",
        },
        {
          heading: "Cupping for Cellulite Reduction",
          body: "Cellulite is that lovely dimpling that many women have on the backs of their thighs and buttocks. It is apparent on a woman's body due to the organizational structure of the fat cells accumulated in those areas. This treatment protocol can help to reduce the appearance of cellulite and smooth out the region, often within just one or two sessions. Additional benefits are increased circulation in the area as well as improved lymph drainage which will help clear toxins from your body. Each client's body will respond differently to the sessions, so the ideal number will vary by patient.",
        },
      ]}
    />
  );
}

export function WhatIsElectroAcupuncture() {
  return (
    <ModalityPage
      title="What is Electro-acupuncture?"
      image="/media/wp-content/uploads/2017/01/estimiilg.jpg"
      imageAlt="Electro-stimulation acupuncture device"
      paragraphs={[
        "Electro-acupuncture is the application of a pulsating electrical current to acupuncture needles. This was originally developed as a way to enhance or replace the need for hand stimulation of the needles. The electro-acupuncture device allows for a more extended treatment, a more accurate level of stimulation and if necessary a stronger treatment.",
        "Electro-acupuncture is most commonly used for neurological or musculoskeletal conditions such as chronic pain, spasms and paralysis. The use of this device can enhance the results in many of these conditions.",
      ]}
    />
  );
}

export function WhatIsGuasha() {
  return (
    <ModalityPage
      title="What is Gua Sha?"
      image="/media/wp-content/uploads/2017/01/Guasha-tools.jpg"
      imageAlt="Gua sha treatment tools"
      paragraphs={[
        'Gua Sha is based on a traditional East Asian medicine healing technique, It is performed by using a tool to "scrape" a specific area of skin which has been lubricated. The end goal of this skin scraping is to intentionally create a transitory(temporary) therapeutic petechia(red dotting) on the skin in that area. These petechia represent an increased blood flow in the area and typically will resolve within a few days.',
        "Clinically, Gua Sha is used in a wide variety of circumstances. Some of the more common uses of Gua Sha include musculoskeletal pain and cold or flu like symptoms.",
        "Gua Sha is contraindicated in cases of open wounds, damaged skin or burns. It is often combined with other modalities to quickly resolve a condition.",
        "There are many tools available to perform Gua Sha. Some of the simplest include a quarter, a bottle cap or a spoon and these are often used in clinic. Below you can see some additions items which may be used in a clinical setting.",
      ]}
    />
  );
}

export function WhatIsMoxabustion() {
  return (
    <ModalityPage
      title="What is Moxabustion?"
      image="/media/wp-content/uploads/2017/01/Moxibustion.jpg"
      imageAlt="Moxibustion treatment"
      paragraphs={[
        "Moxabustion or Moxatherapy is a form of external therapy which uses a plant known as Moxa(Ai Ye). The Moxa is burnt which transmits heat to a particular region of the body. These can be specific points or general regions, depending upon the treatment needed.",
        "Moxa has a long history with some family lineages in China practicing using only Moxa and no adjunct therapies. Moxa is used successfully for a wide range of conditions from arthritis to GI issues to female problems. There are several varaitions on the application of moxa from sticks(see left) to balls or boxes.",
        "Moxa should not be used on the lower abdomen and back of pregnant women. Other forms of heat therapy should be used in cases of severe asthma as well, nor should it be applied around the eyes.",
      ]}
    />
  );
}

export function WhatIsNutritionalTherapy() {
  return (
    <ModalityPage
      title="What is Nutritional Therapy?"
      image="/media/wp-content/uploads/2017/01/fruits_veggies.jpg"
      imageAlt="Fresh fruits and vegetables"
      paragraphs={[
        "Nutritional Therapy in Chinese Medicine is centered around the properties of individual foods. For example certain foods such as dairy, can create phlegm and damp in your body. As your treatment progresses, diet plays a role in your treatment and ultimately your recovery. Since the function of Chinese medicine is to help your body rebalance itself and use its own resources to heal itself, the nutrients that are sustaining that recovering body become critical. When nutrition is poor or is exacerbating the condition, the body does not have the resources available to sustain the healing process. Therefore your diet becomes a focal point in the process.",
      ]}
    />
  );
}

export function WhatIsTaiChiAndQigong() {
  return (
    <ModalityPage
      title="What is TaiChi and Qigong?"
      image="/media/wp-content/uploads/2017/01/tai-chi-chuan.jpg"
      imageAlt="Tai chi movement"
      paragraphs={[
        'TaiChi and Qigong are mind/body exercises which are based in traditional Chinese martial arts. Qigong translates roughly as cultivating the inherent functional essence of the human being. TaiChi translates as "Grand Ultimate" which refers to a natural state of dynamic balance.',
        "Both TaiChi and Qigong have been used extensively for thousands of years for healing, stress management, longevity and meditative purposes. There are hundreds of variations of each form and there is quite a bit of overlap between them.",
        "Modern research supports their healing functions and both are becoming more and more mainstream as word gets out.",
      ]}
    />
  );
}

export function WhatIsTuina() {
  return (
    <ModalityPage
      title="What is Tuina?"
      image="/media/wp-content/uploads/2017/01/Tuina.jpeg"
      imageAlt="Tuina Asian bodywork"
      paragraphs={[
        "Tuina is a method of Chinese bodywork characterized by the smooth gliding or rolling movements of the hands and arms. Through Tui (push) and na (grasp), kneading, pressing, rolling, shaking, and stretching of the body, acupoints are opened and qi flow is realigned in the musculo-tendon meridians.",
        "Tuina techniques are used to treat a wide variety of musculoskeletal and internal organ disorders by opening stagnant meridian channels and encouraging the flow of qi into deficient areas. Tuina utilizes Chinese Medicine theory in assessing energetic and functional disorders. It increases circulation in the area.",
        "Tuina is most commonly performed with clothes on or through a sheet. It can be the sole treatment or used in conjunction with other modalities as necessary and applicable.",
      ]}
    />
  );
}
