import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/page-primitives";
import { cn } from "@/lib/utils";

const INTRO =
  "We utilize a wide variety of modalities to treat our patients.  Below is an explanation of each modality. None of these modalities are used every single treatment.   Instead we prefer to work with our patients to determine which treatment options are suitable for their condition and then collaboratively design a treatment plan based on the patient's goals and comfort level with each treatment.  The treatment may include only one modality or several.   Below is a description of the modalities we offer.";

const rows = [
  { name: "Acupuncture", href: "/what-is-acupuncture/", rest: "for details about Acupuncture.", image: "/media/wp-content/uploads/2018/06/acupuncture-summer.jpg", alt: "Acupuncture treatment in warmer months" },
  { name: "Cupping Therapy", href: "/what-is-cupping-therapy/", rest: "for details about Cupping Therapy.", image: "/media/wp-content/uploads/2017/01/Cupping-equip.jpg", alt: "Glass cups used for cupping therapy" },
  { name: "Electro-stimulation Acupuncture", href: "/what-is-electro-acupuncture/", rest: "for details about E-Stim Acupuncture.", image: "/media/wp-content/uploads/2017/01/estimiilg.jpg", alt: "Electro-stimulation acupuncture device" },
  { name: "Gua Sha", href: "/what-is-guasha/", rest: "for details about Gua Sha.", image: "/media/wp-content/uploads/2017/01/Guasha-tools.jpg", alt: "Gua sha treatment tools" },
  { name: "Herbal Medicine", href: "/chinese-herbal-medicine/", rest: "for details about Herbal Medicine.", image: "/media/wp-content/uploads/2017/09/tea-2391081_640.jpg", alt: "Herbal tea prepared for treatment" },
  { name: "Moxabustion", href: "/what-is-moxabustion/", rest: "for details about Moxabustion.", image: "/media/wp-content/uploads/2017/01/Moxibustion.jpg", alt: "Moxibustion treatment" },
  { name: "Nutritional Therapy", href: "/what-is-nutritional-therapy/", rest: "for details about Nutritional Therapy.", image: "/media/wp-content/uploads/2017/01/fruits_veggies.jpg", alt: "Fresh fruits and vegetables" },
  { name: "TaiChi and Qigong", href: "/what-is-taichi-and-qigong/", rest: "for details about TaiChi and Qigong.", image: "/media/wp-content/uploads/2017/01/tai-chi-chuan.jpg", alt: "Tai chi movement" },
  { name: "Tuina (Asian Bodywork)", href: "/what-is-tuina/", rest: "for details about Tuina.", image: "/media/wp-content/uploads/2017/01/Tuina.jpeg", alt: "Tuina Asian bodywork" },
] as const;

export default function FAQ() {
  return (
    <div className="w-full bg-white">
      <PageHero
        title="Treatment Modalities"
        image="/media/wp-content/uploads/2018/09/acupuncture-hay-fever-tcm.jpg"
      />

      <section className="bg-cream">
        <div className="site-container site-section">
          <p className="max-w-3xl whitespace-pre-wrap text-base leading-relaxed text-body md:text-lg !m-0">
            {INTRO}
          </p>
        </div>
      </section>

      {rows.map((row, index) => (
        <section key={row.name} className={index % 2 === 0 ? "bg-white" : "bg-cream"}>
          <article className="site-container site-section grid grid-cols-1 items-start gap-8 md:gap-12 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-16">
            <div
              className={cn(
                "overflow-hidden rounded-3xl bg-olive/10",
                index % 2 === 1 && "lg:order-2",
              )}
            >
              <Link href={row.href} className="block">
                <img
                  src={row.image}
                  alt={row.alt}
                  loading={index > 1 ? "lazy" : "eager"}
                  className="aspect-[4/3] !h-full w-full object-cover object-center"
                />
              </Link>
            </div>
            <div
              className={cn(
                "flex min-w-0 flex-col items-start gap-5",
                index % 2 === 1 && "lg:order-1",
              )}
            >
              <h2 className="font-heading text-xl font-semibold tracking-tight text-forest sm:text-2xl !m-0">
                {row.name}
              </h2>
              <p className="text-base leading-relaxed text-body md:text-lg !m-0">
                Click{" "}
                <Link
                  href={row.href}
                  className="inline-flex items-center gap-1 font-semibold text-olive underline underline-offset-2 hover:text-forest"
                >
                  here <ArrowUpRight size={13} aria-hidden="true" />
                </Link>{" "}
                {row.rest}
              </p>
            </div>
          </article>
        </section>
      ))}
    </div>
  );
}
