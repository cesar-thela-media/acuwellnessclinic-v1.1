import { PageTitle } from "@/components/site/page-primitives";

const QUESTION = "What is Sì Shòu Acupuncture and Wellness?";

const P1 =
  "We are a full service Oriental medicine clinic located in the Oak Hill region of Southwest Austin.  We offer acupuncture, acupressure, tuina (asian bodywork), cupping therapy, herbal medicine, guasha, nutritional support, taichi and qigong. Treating a wide range of both acute and chronic conditions, our natural focus is on pain management, sports medicine, auto-immune disease and facial rejuvenation.";

const P2 =
  "Focusing on prevention and health we will work to alleviate your symptoms while helping your body get back on track to a state of harmonious health so you are able do the things you love.";

const GUARDIANS_HEADING =
  "Sì Shòu :  The 4 Guardians guarding the 4 compass directions";

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
  return (
    <div className="w-full bg-white">
      <section className="relative isolate overflow-hidden bg-forest">
        <img
          src="/media/wp-content/uploads/2018/09/reishi-mushroom-tcm.jpg"
          alt=""
          className="absolute inset-0 !h-full w-full object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-forest/90 via-forest/72 to-forest/55"
        />
        <div className="site-container relative flex min-h-[22rem] flex-col justify-end gap-4 py-14 md:min-h-[26rem] md:py-16">
          <PageTitle className="text-white">About Us</PageTitle>
          <p className="max-w-2xl text-lg leading-snug text-white/90 md:text-xl !m-0">
            <em>
              <strong>{QUESTION}</strong>
            </em>
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="site-container site-section grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div className="flex min-w-0 flex-col gap-6">
            <p className="site-body-copy text-body whitespace-pre-wrap !m-0">{P1}</p>
            <p className="site-body-copy text-body !m-0">{P2}</p>
          </div>
          <div className="overflow-hidden rounded-3xl bg-olive/10">
            <img
              src="/media/wp-content/uploads/2017/09/pexels-photo-157310.jpeg"
              alt="Colorful acupuncture meridian illustration"
              className="aspect-[4/3] !h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="site-container site-section flex flex-col gap-10 md:gap-12">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,12rem)_1fr] lg:gap-12">
            <img
              src="/media/wp-content/uploads/2019/02/Artboard-1@sishou.png"
              alt="Sì Shòu emblem"
              width={300}
              height={300}
              className="mx-auto h-28 w-auto object-contain lg:h-32"
            />
            <div className="flex min-w-0 flex-col gap-5">
              <h2 className="site-heading-2 text-forest">
                <em>
                  <strong>{GUARDIANS_HEADING}</strong>
                </em>
              </h2>
              <p className="site-body-copy text-body !m-0">{P3}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {GUARDIANS.map((row) => (
              <article key={row.guardian} className="site-card flex flex-col gap-4 p-6 md:p-7">
                <div>
                  <p className="font-heading text-[11px] font-semibold tracking-[0.14em] text-olive uppercase !m-0">
                    {COLS[0]}
                  </p>
                  <h3 className="mt-1 font-heading text-xl font-semibold tracking-tight text-forest !m-0">
                    {row.guardian}
                  </h3>
                </div>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                  <div>
                    <dt className="font-heading font-semibold text-forest/70">{COLS[1]}</dt>
                    <dd className="mt-0.5 text-body">{row.direction}</dd>
                  </div>
                  <div>
                    <dt className="font-heading font-semibold text-forest/70">{COLS[2]}</dt>
                    <dd className="mt-0.5 text-body">{row.season}</dd>
                  </div>
                  <div>
                    <dt className="font-heading font-semibold text-forest/70">{COLS[3]}</dt>
                    <dd className="mt-0.5 text-body">{row.color}</dd>
                  </div>
                  <div>
                    <dt className="font-heading font-semibold text-forest/70">{COLS[4]}</dt>
                    <dd className="mt-0.5 text-body">{row.element}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs06;
