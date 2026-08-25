import { PageTitle } from "@/components/site/page-primitives";

const MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const EMBED = MAPS_KEY
  ? `https://www.google.com/maps/embed/v1/place?key=${MAPS_KEY}&q=si+shou+acupuncture&zoom=14`
  : "https://www.google.com/maps?q=Si+Shou+Acupuncture+and+Wellness,+Austin,+TX&output=embed";

export default function MapBand() {
  return (
    <div className="w-full bg-white">
      <div className="site-container site-section flex flex-col gap-10 md:gap-12">
        <PageTitle>Map & Directions</PageTitle>
        <p className="max-w-xl text-base leading-relaxed text-body md:text-lg !m-0">
          Sì Shòu Acupuncture and Wellness, PLLC
          <br />
          5424 W US Hwy 290 Service Rd Ste #106
          <br />
          Austin, TX 78735
          <br />
          (512) 387-4002
        </p>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-olive/10 sm:aspect-[21/9]">
          <iframe src={EMBED} className="absolute inset-0 h-full w-full border-0" allowFullScreen />
        </div>
      </div>
    </div>
  );
}
