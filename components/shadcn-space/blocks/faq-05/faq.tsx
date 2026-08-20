import Link from "next/link";

const INTRO =
  "We utilize a wide variety of modalities to treat our patients.  Below is an explanation of each modality. None of these modalities are used every single treatment.   Instead we prefer to work with our patients to determine which treatment options are suitable for their condition and then collaboratively design a treatment plan based on the patient's goals and comfort level with each treatment.  The treatment may include only one modality or several.   Below is a description of the modalities we offer.";

const rows = [
  { name: "Acupuncture", href: "/what-is-acupuncture/", rest: "for details about Acupuncture." },
  { name: "Cupping Therapy", href: "/what-is-cupping-therapy/", rest: "for details about Cupping Therapy." },
  {
    name: "Electro-stimulation Acupuncture",
    href: "/what-is-electro-acupuncture/",
    rest: "for details about E-Stim Acupuncture.",
  },
  { name: "Gua Sha", href: "/what-is-guasha/", rest: "for details about Gua Sha." },
  { name: "Herbal Medicine", href: "/chinese-herbal-medicine/", rest: "for details about Herbal Medicine." },
  { name: "Moxabustion", href: "/what-is-moxabustion/", rest: "for details about Moxabustion." },
  {
    name: "Nutritional Therapy",
    href: "/what-is-nutritional-therapy/",
    rest: "for details about Nutritional Therapy.",
  },
  { name: "TaiChi and Qigong", href: "/what-is-taichi-and-qigong/", rest: "for details about TaiChi and Qigong." },
  { name: "Tuina (Asian Bodywork)", href: "/what-is-tuina/", rest: "for details about Tuina." },
] as const;

export default function FAQ() {
  return (
    <div className="w-full bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-16 sm:px-6 md:gap-12 md:py-24 lg:px-16">
        <h1 className="text-4xl font-bold tracking-tight text-charcoal sm:text-5xl md:text-6xl !m-0 text-balance">
          Treatment Modalities
        </h1>
        <p className="max-w-3xl whitespace-pre-wrap text-base leading-relaxed text-body md:text-lg !m-0">
          {INTRO}
        </p>
        <div className="flex gap-8 text-sm text-charcoal">
          <p className="!m-0">
            <strong>
              <u>Modality</u>
            </strong>
          </p>
          <p className="!m-0">
            <strong>
              <u>Description</u>
            </strong>
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rows.map((row) => (
            <article
              key={row.name}
              className="flex flex-col gap-3 rounded-xl border border-charcoal/10 bg-white p-6 shadow-sm"
            >
              <h2 className="text-lg font-bold tracking-tight text-charcoal !m-0">{row.name}</h2>
              <p className="text-sm leading-relaxed text-body !m-0">
                Click{" "}
                <Link href={row.href} className="font-medium text-olive underline underline-offset-2">
                  here
                </Link>{" "}
                {row.rest}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
