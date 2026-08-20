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
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-16">
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-charcoal sm:text-5xl md:text-6xl !m-0 text-balance">
            About Us
          </h1>
          <p className="mt-6 max-w-3xl text-lg font-semibold leading-snug text-charcoal md:text-xl !m-0">
            <em>
              <strong>What is Sì Shòu Acupuncture and Wellness?</strong>
            </em>
          </p>
        </div>
      </section>

      <section className="w-full max-w-full overflow-x-clip bg-olive py-12 text-white md:py-20 lg:py-24">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:px-6 md:gap-8 lg:px-16">
          <p className="max-w-3xl text-base leading-relaxed text-white/90 md:text-lg whitespace-pre-wrap !m-0">
            {P1}
          </p>
          <p className="max-w-3xl text-base leading-relaxed text-white/90 md:text-lg !m-0">{P2}</p>
        </div>
      </section>

      <section className="bg-white py-12 md:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
          <p className="max-w-3xl text-lg font-semibold leading-snug text-charcoal md:text-xl !m-0">
            <em>
              <strong>
                Sì Shòu :  The 4 Guardians guarding the 4 compass directions
              </strong>
            </em>
          </p>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-body md:text-lg !m-0">{P3}</p>

          <div className="mt-10 overflow-x-auto rounded-xl border border-charcoal/10">
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
        </div>
      </section>
    </div>
  );
};

export default AboutUs06;
