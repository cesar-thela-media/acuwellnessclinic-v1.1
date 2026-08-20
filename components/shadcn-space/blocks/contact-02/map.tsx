const EMBED =
  "https://www.google.com/maps/embed/v1/place?key=REMOVED_GOOGLE_MAPS_KEY&q=si+shou+acupuncture&zoom=14";

export default function MapBand() {
  return (
    <div className="w-full bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-16 sm:px-6 md:gap-12 md:py-24 lg:px-16">
        <h1 className="text-4xl font-bold tracking-tight text-charcoal sm:text-5xl md:text-6xl !m-0 text-balance">
          Map & Directions
        </h1>
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
