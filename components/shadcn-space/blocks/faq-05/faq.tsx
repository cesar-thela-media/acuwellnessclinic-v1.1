import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageTitle } from "@/components/site/page-primitives";

const INTRO =
  "We utilize a wide variety of modalities to treat our patients.  Below is an explanation of each modality. None of these modalities are used every single treatment.   Instead we prefer to work with our patients to determine which treatment options are suitable for their condition and then collaboratively design a treatment plan based on the patient's goals and comfort level with each treatment.  The treatment may include only one modality or several.   Below is a description of the modalities we offer.";

const rows = [
  { name: "Acupuncture", href: "/what-is-acupuncture/", rest: "for details about Acupuncture.", image: "/media/wp-content/uploads/2011/07/color-meridians.jpg", alt: "Colorful acupuncture meridian illustration" },
  { name: "Cupping Therapy", href: "/what-is-cupping-therapy/", rest: "for details about Cupping Therapy.", image: "/media/wp-content/uploads/2017/04/ACU_009-1024x680.jpg", alt: "Glass cups used for cupping therapy" },
  { name: "Electro-stimulation Acupuncture", href: "/what-is-electro-acupuncture/", rest: "for details about E-Stim Acupuncture.", image: "/media/wp-content/uploads/2017/08/hands-2568594_1280.jpg", alt: "Hands receiving acupuncture treatment" },
  { name: "Gua Sha", href: "/what-is-guasha/", rest: "for details about Gua Sha.", image: "/media/wp-content/uploads/2017/01/Guasha-tools.jpg", alt: "Gua sha treatment tools" },
  { name: "Herbal Medicine", href: "/chinese-herbal-medicine/", rest: "for details about Herbal Medicine.", image: "/media/wp-content/uploads/2017/01/chinese-herbs.jpg", alt: "Chinese herbal medicine ingredients" },
  { name: "Moxabustion", href: "/what-is-moxabustion/", rest: "for details about Moxabustion.", image: "/media/wp-content/uploads/2017/01/Moxibustion.jpg", alt: "Moxibustion treatment" },
  { name: "Nutritional Therapy", href: "/what-is-nutritional-therapy/", rest: "for details about Nutritional Therapy.", image: "/media/wp-content/uploads/2017/01/fruits_veggies.jpg", alt: "Fresh fruits and vegetables" },
  { name: "TaiChi and Qigong", href: "/what-is-taichi-and-qigong/", rest: "for details about TaiChi and Qigong.", image: "/media/wp-content/uploads/2017/01/tai-chi-chuan-300x212.jpg", alt: "Tai chi movement" },
  { name: "Tuina (Asian Bodywork)", href: "/what-is-tuina/", rest: "for details about Tuina.", image: "/media/wp-content/uploads/2017/01/Tuina.jpeg", alt: "Tuina Asian bodywork" },
] as const;

export default function FAQ() {
  return (
    <div className="w-full bg-white">
      <div className="site-container site-section--compact flex flex-col gap-10 md:gap-12">
        <div className="max-w-3xl">
          <PageTitle>Treatment Modalities</PageTitle>
          <p className="site-body-copy mt-6 whitespace-pre-wrap text-body !m-0">{INTRO}</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rows.map((row, index) => (
            <article key={row.name} className="site-card group flex min-w-0 flex-col overflow-hidden">
              <Link href={row.href} className="relative block overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden bg-olive/15">
                  <img src={row.image} alt={row.alt} loading={index > 2 ? "lazy" : "eager"} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
              </Link>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <h2 className="font-heading text-xl font-semibold tracking-tight text-forest !m-0">{row.name}</h2>
                <p className="mt-auto text-sm leading-relaxed text-body !m-0">
                  Click <Link href={row.href} className="inline-flex items-center gap-1 font-semibold text-olive underline underline-offset-2 hover:text-forest">here <ArrowUpRight size={13} aria-hidden="true" /></Link> {row.rest}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
