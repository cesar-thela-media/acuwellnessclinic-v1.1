import { PageTitle, SiteContainer } from "@/components/site/page-primitives";
import { site } from "@/lib/site";

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
  return (
    <div className="w-full bg-white">
      <section className="bg-white">
        <div className="site-container site-section--compact">
          <PageTitle>About Us</PageTitle>
          <p className="site-lead !m-0">
            <strong>What is Sì Shòu Acupuncture and Wellness?</strong>
          </p>
        </div>
      </section>

      <section className="site-band w-full max-w-full overflow-x-clip bg-olive text-white">
        <SiteContainer className="flex flex-col gap-6 md:gap-8">
          <p className="max-w-3xl text-base leading-relaxed text-white/90 md:text-lg whitespace-pre-wrap !m-0">
            {P1}
          </p>
          <p className="max-w-3xl text-base leading-relaxed text-white/90 md:text-lg !m-0">{P2}</p>
        </SiteContainer>
      </section>

      <section className="site-band bg-white">
        <SiteContainer className="flex flex-col gap-12">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
              <img
                src="/media/wp-content/uploads/2017/01/chinese-herbs.jpg"
                alt="Traditional Chinese herbs arranged for wellness care"
                width={1024}
                height={664}
                className="block aspect-[3/2] h-auto w-full rounded-3xl object-cover shadow-[0_24px_60px_-24px_rgb(56_69_47/0.4)]"
              />
            </div>
            <div className="flex min-w-0 flex-col gap-6">
              <p className="site-lead !m-0">
                <strong>
                  Sì Shòu :  The 4 Guardians guarding the 4 compass directions
                </strong>
              </p>
              <p className="max-w-3xl text-base leading-relaxed text-body md:text-lg !m-0">{P3}</p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-charcoal/10">
            <table className="w-full min-w-[28rem] border-collapse text-left text-sm text-charcoal">
              <thead>
                <tr className="border-b border-charcoal/10 bg-charcoal/[0.03]">
                  {COLS.map((label) => (
                    <th key={label} className="px-4 py-3 font-semibold">
                      <strong>
                        <u>{label}</u>
                      </strong>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {GUARDIANS.map((row) => (
                  <tr key={row.guardian} className="border-b border-charcoal/10 last:border-0">
                    <td className="px-4 py-3">{row.guardian}</td>
                    <td className="px-4 py-3">{row.direction}</td>
                    <td className="px-4 py-3">{row.season}</td>
                    <td className="px-4 py-3">{row.color}</td>
                    <td className="px-4 py-3">{row.element}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SiteContainer>
      </section>
    </div>
  );
};

export default AboutUs06;