import Link from "next/link";
import { PageTitle } from "@/components/site/page-primitives";

const INTRO =
  "We utilize a wide variety of modalities to treat our patients.  Below is an explanation of each modality. None of these modalities are used every single treatment.   Instead we prefer to work with our patients to determine which treatment options are suitable for their condition and then collaboratively design a treatment plan based on the patient's goals and comfort level with each treatment.  The treatment may include only one modality or several.   Below is a description of the modalities we offer.";

const rows = [
  {
    name: "Acupuncture",
    href: "/what-is-acupuncture/",
    description: "Click here for details about Acupuncture.",
    image: "/media/wp-content/uploads/2018/06/acupuncture-summer.jpg",
    alt: "Acupuncture treatment in warmer months",
  },
  {
    name: "Cupping Therapy",
    href: "/what-is-cupping-therapy/",
    description: "Click here for details about Cupping Therapy.",
    image: "/media/wp-content/uploads/2017/01/Cupping-equip.jpg",
    alt: "Glass cups used for cupping therapy",
  },
  {
    name: "Electro-stimulation Acupuncture",
    href: "/what-is-electro-acupuncture/",
    description: "Click here for details about E-Stim Acupuncture.",
    image: "/media/wp-content/uploads/2017/01/estimiilg.jpg",
    alt: "Electro-stimulation acupuncture device",
  },
  {
    name: "Gua Sha",
    href: "/what-is-guasha/",
    description: "Click here for details about Gua Sha.",
    image: "/media/wp-content/uploads/2017/01/Guasha-tools.jpg",
    alt: "Gua sha treatment tools",
  },
  {
    name: "Herbal Medicine",
    href: "/chinese-herbal-medicine/",
    description: "Click here for details about Herbal Medicine.",
    image: "/media/wp-content/uploads/2017/09/tea-2391081_640.jpg",
    alt: "Herbal tea prepared for treatment",
  },
  {
    name: "Moxabustion",
    href: "/what-is-moxabustion/",
    description: "Click here for details about Moxabustion.",
    image: "/media/wp-content/uploads/2017/01/Moxibustion.jpg",
    alt: "Moxibustion treatment",
  },
  {
    name: "Nutritional Therapy",
    href: "/what-is-nutritional-therapy/",
    description: "Click here for details about Nutritional Therapy.",
    image: "/media/wp-content/uploads/2017/01/fruits_veggies.jpg",
    alt: "Fresh fruits and vegetables",
  },
  {
    name: "TaiChi and Qigong",
    href: "/what-is-taichi-and-qigong/",
    description: "Click here for details about TaiChi and Qigong.",
    image: "/media/wp-content/uploads/2017/01/tai-chi-chuan.jpg",
    alt: "Tai chi movement",
  },
  {
    name: "Tuina (Asian Bodywork)",
    href: "/what-is-tuina/",
    description: "Click here for details about Tuina.",
    image: "/media/wp-content/uploads/2017/01/Tuina.jpeg",
    alt: "Tuina Asian bodywork",
  },
] as const;

function Description({ href, text }: { href: string; text: string }) {
  const parts = text.split("here");
  if (parts.length < 2) return <>{text}</>;
  return (
    <>
      {parts[0]}
      <Link
        href={href}
        className="font-semibold text-olive underline underline-offset-2 transition-colors hover:text-forest"
      >
        here
      </Link>
      {parts.slice(1).join("here")}
    </>
  );
}

export default function FAQ() {
  return (
    <div className="w-full bg-white">
      <section className="bg-white">
        <div className="site-container site-section flex flex-col gap-8 md:gap-12">
          <div className="flex flex-col items-center gap-4 text-center md:gap-5">
            <PageTitle>Treatment Modalities</PageTitle>
            <p className="max-w-3xl whitespace-pre-wrap text-base leading-relaxed text-body md:text-lg !m-0">
              {INTRO}
            </p>
          </div>

          {/* Mobile: stacked cards (table is too wide / hard to read). */}
          <ul className="flex list-none flex-col gap-3 p-0 m-0 md:hidden">
            {rows.map((row, index) => (
              <li key={row.name}>
                <article className="site-card flex gap-3.5 p-4">
                  <Link
                    href={row.href}
                    className="site-media h-16 w-16 shrink-0 overflow-hidden"
                  >
                    <img
                      src={row.image}
                      alt={row.alt}
                      loading={index > 2 ? "lazy" : "eager"}
                      className="!h-full w-full object-cover object-center"
                    />
                  </Link>
                  <div className="flex min-w-0 flex-col gap-1.5">
                    <h2 className="font-heading text-base font-semibold tracking-tight text-forest !m-0">
                      <Link href={row.href} className="!text-forest hover:!text-olive">
                        {row.name}
                      </Link>
                    </h2>
                    <p className="text-sm leading-relaxed text-body !m-0">
                      <Description href={row.href} text={row.description} />
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>

          {/* Desktop / tablet: original two-column table. */}
          <div className="site-table-scroll hidden overflow-hidden rounded-[14px] border border-forest/15 bg-white md:block">
            <table className="w-full min-w-[36rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-forest/15 bg-cream">
                  <th className="px-4 py-4 font-heading text-sm font-semibold tracking-tight text-forest underline decoration-forest/40 underline-offset-4 sm:px-6 sm:text-base">
                    Modality
                  </th>
                  <th className="px-4 py-4 font-heading text-sm font-semibold tracking-tight text-forest underline decoration-forest/40 underline-offset-4 sm:px-6 sm:text-base">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr
                    key={row.name}
                    className={
                      index % 2 === 0
                        ? "border-b border-forest/10 bg-white"
                        : "border-b border-forest/10 bg-cream/60"
                    }
                  >
                    <td className="align-middle px-4 py-4 sm:px-6 sm:py-5">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <Link
                          href={row.href}
                          className="site-media h-14 w-14 shrink-0 overflow-hidden sm:h-16 sm:w-16"
                        >
                          <img
                            src={row.image}
                            alt={row.alt}
                            loading={index > 2 ? "lazy" : "eager"}
                            className="!h-full w-full object-cover object-center"
                          />
                        </Link>
                        <span className="font-heading text-base font-semibold tracking-tight text-forest sm:text-lg">
                          {row.name}
                        </span>
                      </div>
                    </td>
                    <td className="align-middle px-4 py-4 text-base leading-relaxed text-body sm:px-6 sm:py-5 sm:text-lg">
                      <Description href={row.href} text={row.description} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
