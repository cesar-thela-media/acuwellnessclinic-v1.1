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
      <section className="bg-white">
        <div className="site-container site-section flex flex-col gap-8 md:gap-12">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center sm:gap-4">
            <PageTitle>About Us</PageTitle>
            <p className="text-base leading-snug text-forest sm:text-lg md:text-xl !m-0">
              <strong>{QUESTION}</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex min-w-0 flex-col gap-4 sm:gap-6 lg:order-1 lg:py-2">
              <p className="site-body-copy text-body whitespace-pre-wrap !m-0">{P1}</p>
              <p className="site-body-copy text-body !m-0">{P2}</p>
            </div>
            <div className="site-media order-first w-full lg:order-2">
              <img
                src="/media/wp-content/uploads/2017/09/pexels-photo-157310.jpeg"
                alt="Colorful acupuncture meridian illustration"
                width={1280}
                height={720}
                className="aspect-[16/10] w-full object-cover object-center sm:aspect-[4/3]"
              />
            </div>
          </div>

          <article className="site-card flex flex-col gap-6 p-5 sm:gap-8 sm:p-6 md:gap-10 md:p-8">
            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[12.5rem_1fr] lg:gap-12">
              <img
                src="/media/wp-content/uploads/2019/02/Artboard-1@sishou.png"
                alt="Sì Shòu emblem"
                width={2362}
                height={2362}
                className="mx-auto block h-auto w-[12.5rem] max-w-full"
              />
              <div className="flex min-w-0 flex-col gap-5">
                <h2 className="site-heading-2 text-forest">
                  <strong>{GUARDIANS_HEADING}</strong>
                </h2>
                <p className="site-body-copy text-body !m-0">{P3}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {GUARDIANS.map((row) => (
                <div
                  key={row.guardian}
                  className="rounded-[14px] border border-forest/10 bg-cream/50 p-4 sm:p-5 md:p-6"
                >
                  <p className="font-heading text-[11px] font-semibold tracking-[0.14em] text-olive uppercase !m-0">
                    {COLS[0]}
                  </p>
                  <h3 className="mt-1 font-heading text-xl font-semibold tracking-tight text-forest !m-0">
                    {row.guardian}
                  </h3>
                  <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
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
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default AboutUs06;
