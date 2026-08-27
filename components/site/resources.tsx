import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageTitle, SectionHeading } from "@/components/site/page-primitives";
import { site } from "@/lib/site";

const RESOURCES_INTRO =
  "This page has a variety of resources for your use.  please let us know if you have any questions.  If you have any ideas, we would love to hear from you about them.";

const RESOURCE_LINKS = [
  { label: "Facial Rejuvenation", href: "/resources/facial-rejuvenation/" },
  { label: "More Research", href: "/resources/more-research/" },
  { label: "Patient Resources", href: "/resources/one-pagers/" },
  { label: "Smoking Cessation", href: "/resources/smoking-cessation/" },
  { label: "Videos", href: "/resources/videos/" },
] as const;

const RESEARCH_LINKS = [
  {
    label: "Effect of Facial Cosmetic Acupuncture on Facial Elasticity",
    href: "/media/wp-content/uploads/2017/02/Effect-of-Facial-Cosmetic-Acupuncture-on-Facial-Elasticity.pdf",
  },
  {
    label: "Gut Biome and the Brain",
    href: "/media/wp-content/uploads/2017/02/Gut-Biome-and-the-Brain.pdf",
  },
  {
    label: "NADA Research summary",
    href: "/media/wp-content/uploads/2017/02/NADA-Research-summary.pdf",
  },
  {
    label: "Quit Smoking-Meta-analysis",
    href: "/media/wp-content/uploads/2017/02/Quit-Smoking-Meta-analysis.pdf",
  },
] as const;

const PATIENT_LINKS = [
  {
    label: "Castor Oil Packs",
    href: "/media/wp-content/uploads/2017/02/Castor-Oil-Packs.pdf",
  },
  {
    label: "Ear Seeds and Tacks",
    href: "/media/wp-content/uploads/2017/02/Ear-Seeds-and-Tacks.pdf",
  },
  {
    label: "Ginger Bath",
    href: "/media/wp-content/uploads/2017/02/Ginger-Bath.pdf",
  },
] as const;

const FACIAL_LEAD_1 = "If you want to look and feel your best,";
const FACIAL_LEAD_2 = "then Cosmetic Acupuncture/Cupping is for you!";
const FACIAL_SUB = "For the Face and neck";
const FACIAL_HEAD = "Cosmetic Acupuncture/Cupping";
const FACIAL_BENEFITS_HEAD = "Reported Benefits include:";
const FACIAL_BENEFITS = [
  "Improvement in the fine lines of the face and a diminishing effect on deeper wrinkles",
  "Moisturized, softer skin and a more even skin tone",
  "Improved muscle tone and firmer jaw line, as well as reduction in the beginning of jowls",
  "Reduction or elimination of rosacea and acne",
] as const;
const FACIAL_GENERAL_HEAD = "General health benefits include improvement for:";
const FACIAL_GENERAL = [
  "Insomnia",
  "Hot flashes",
  "Depression",
  "Mild anxiety",
  "Digestive Symptoms",
] as const;
const FACIAL_P1 =
  "In Traditional Chinese Medicine, the state of physical health, emotions and spirit is reflected on the skin, particularly the skin of the face.  You look your best when your healthy inside reflects on your face!";
const FACIAL_P2 =
  "We are trained in several styles of cosmetic acupuncture.  We use relatively superficial needling techniques that increase the Qi and blood flow to the face and can improve the overall production of collagen and elastin.  Since these are based on Traditional Chinese Medicine, we also use acupuncture points on the body to complete the balancing of energy and providing a constitutional treatment concurrently.";
const FACIAL_P3 =
  "In Facial rejuvenation cupping, we use specialized cups that are very gentle for the face.  These very rarely leave marks.  Facial cupping is a great solution if you have an event coming up and need a quick way to brighten your face.  This is a very relaxing treatment that stimulates the skin and increases blood flow in the face.";
const FACIAL_P4 =
  "This results in an overall rejuvenating effect of mind, body and spirit.  Diet, Lifestyle and skin care are also evaluated and addressed.";

function LinkCard({ label, href }: { label: string; href: string }) {
  const external = href.endsWith(".pdf") || href.startsWith("http");
  const className =
    "site-card group flex min-w-0 flex-col gap-3 p-5 transition-colors hover:border-olive/40 sm:p-6";
  const inner = (
    <div className="flex items-start justify-between gap-3">
      <h2 className="font-heading text-lg font-semibold tracking-tight text-forest sm:text-xl !m-0">
        {label}
      </h2>
      <ArrowUpRight
        size={16}
        className="mt-1 shrink-0 text-olive transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </div>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {inner}
    </Link>
  );
}

export function ResourcesHub() {
  return (
    <div className="w-full bg-white">
      <section className="bg-white">
        <div className="site-container site-section flex flex-col gap-10 md:gap-12">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
            <PageTitle>Resources</PageTitle>
            <p className="whitespace-pre-wrap text-base leading-relaxed text-body md:text-lg !m-0">
              {RESOURCES_INTRO}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {RESOURCE_LINKS.map((item) => (
              <LinkCard key={item.href} {...item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function ResourcesVideos() {
  return (
    <div className="w-full bg-white">
      <section className="bg-white">
        <div className="site-container site-section flex flex-col gap-10 md:gap-12">
          <PageTitle className="text-center">Videos</PageTitle>
          <article className="site-card mx-auto flex w-full max-w-4xl flex-col gap-5 p-5 sm:p-6 md:p-8">
            <SectionHeading>Videos</SectionHeading>
            <p className="text-base leading-relaxed text-body md:text-lg !m-0">What is NADA?</p>
            <div className="site-media overflow-hidden">
              <iframe
                title="What is NADA?"
                src={
                  site.media.youtubeVideos.startsWith("//")
                    ? `https:${site.media.youtubeVideos}`
                    : site.media.youtubeVideos
                }
                className="aspect-video w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}

export function ResourcesMoreResearch() {
  return (
    <div className="w-full bg-white">
      <section className="bg-white">
        <div className="site-container site-section flex flex-col gap-10 md:gap-12">
          <PageTitle className="text-center">More Research</PageTitle>
          <div className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-4">
            <p className="text-center font-heading text-lg font-semibold text-forest !m-0">
              More Research
            </p>
            {RESEARCH_LINKS.map((item) => (
              <LinkCard key={item.href} label={item.label} href={item.href} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function ResourcesOnePagers() {
  return (
    <div className="w-full bg-white">
      <section className="bg-white">
        <div className="site-container site-section flex flex-col gap-10 md:gap-12">
          <PageTitle className="text-center">Patient Resources</PageTitle>
          <div className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-4">
            <p className="text-center font-heading text-lg font-semibold text-forest !m-0">
              How To:
            </p>
            {PATIENT_LINKS.map((item) => (
              <LinkCard key={item.href} label={item.label} href={item.href} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function ResourcesFacialRejuvenation() {
  return (
    <div className="w-full bg-white">
      <section className="bg-white">
        <div className="site-container site-section flex flex-col gap-10 md:gap-12">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
            <PageTitle>Facial Rejuvenation</PageTitle>
            <p className="font-heading text-xl font-semibold text-forest sm:text-2xl !m-0">
              {FACIAL_HEAD}
            </p>
            <p className="font-heading text-lg text-forest/80 !m-0">{FACIAL_SUB}</p>
          </div>

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="site-media w-full">
              <img
                src="/media/wp-content/uploads/2017/04/Problem-areas.jpg"
                alt="Facial problem areas illustration for cosmetic acupuncture"
                width={438}
                height={408}
                className="h-auto w-full object-contain"
              />
            </div>
            <div className="flex min-w-0 flex-col gap-4">
              <p className="text-lg font-semibold leading-snug text-forest md:text-xl !m-0">
                {FACIAL_LEAD_1}
              </p>
              <p className="text-lg font-semibold leading-snug text-forest md:text-xl !m-0">
                {FACIAL_LEAD_2}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
            <article className="site-card flex flex-col gap-4 p-6 md:p-8">
              <p className="font-heading text-base font-semibold text-forest !m-0">
                {FACIAL_BENEFITS_HEAD}
              </p>
              <ul className="list-disc space-y-2 pl-6 text-base leading-relaxed text-body">
                {FACIAL_BENEFITS.map((item) => (
                  <li key={item}>
                    {item.includes("rosacea") ? (
                      <>
                        Reduction or elimination of <strong>rosacea</strong> and{" "}
                        <strong>acne</strong>
                      </>
                    ) : (
                      item
                    )}
                  </li>
                ))}
              </ul>
            </article>
            <article className="site-card flex flex-col gap-4 p-6 md:p-8">
              <p className="font-heading text-base font-semibold text-forest !m-0">
                {FACIAL_GENERAL_HEAD}
              </p>
              <ul className="list-disc space-y-2 pl-6 text-base leading-relaxed text-body">
                {FACIAL_GENERAL.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>

          <div className="mx-auto flex max-w-3xl flex-col gap-5">
            <p className="whitespace-pre-wrap text-base leading-relaxed text-body md:text-lg !m-0">
              {FACIAL_P1}
            </p>
            <p className="whitespace-pre-wrap text-base leading-relaxed text-body md:text-lg !m-0">
              {FACIAL_P2}
            </p>
            <p className="whitespace-pre-wrap text-base leading-relaxed text-body md:text-lg !m-0">
              {FACIAL_P3}
            </p>
            <p className="whitespace-pre-wrap text-base leading-relaxed text-body md:text-lg !m-0">
              {FACIAL_P4}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
