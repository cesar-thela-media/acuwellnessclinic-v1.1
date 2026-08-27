import { PageTitle } from "@/components/site/page-primitives";

const MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const EMBED = MAPS_KEY
  ? `https://www.google.com/maps/embed/v1/place?key=${MAPS_KEY}&q=si+shou+acupuncture&zoom=14`
  : "https://www.google.com/maps?q=Si+Shou+Acupuncture+and+Wellness,+Austin,+TX&output=embed";

export default function MapBand() {
  return (
    <div className="w-full bg-white">
      <section className="bg-white">
        <div className="site-container site-section flex flex-col gap-10 md:gap-12">
          <PageTitle className="text-center">Map & Directions</PageTitle>

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="site-card p-6 md:p-8">
              <p className="text-base leading-relaxed text-body md:text-lg !m-0">
                Sì Shòu Acupuncture and Wellness, PLLC
                <br />
                5424 W US Hwy 290 Service Rd Ste #106
                <br />
                Austin, TX 78735
                <br />
                (512) 387-4002
              </p>
            </div>
            <div className="site-media relative aspect-[4/3] w-full sm:aspect-[16/10]">
              <iframe
                src={EMBED}
                title="Si Shou Acupuncture and Wellness map"
                className="absolute inset-0 h-full w-full border-0"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
