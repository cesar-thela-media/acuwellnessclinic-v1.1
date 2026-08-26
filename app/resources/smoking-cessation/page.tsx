import { PageHero } from "@/components/site/page-primitives";
import { JsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

const TITLE = "Smoking Cessation";
const META = "Smoking Cessation » Si Shou Acupuncture and Wellness, PLLC | Acupuncture in Austin, TX";
const PDF = "/media/wp-content/uploads/2017/02/Quit-Smoking-Meta-analysis.pdf";

export function generateMetadata() {
  return {
    title: { absolute: META },
    alternates: { canonical: `${site.url}/resources/smoking-cessation/` },
  };
}

export default function SmokingCessationPage() {
  return (
    <article>
      <JsonLd canonicalPath="/resources/smoking-cessation" metaTitle={META} metaDescription="" />
      <div className="w-full bg-white">
        <PageHero title={TITLE} image="/media/wp-content/uploads/2017/03/Blog-img-Acupuncture-for-Addiction_640-bw.jpg" />
        <section className="bg-cream">
          <div className="site-container site-section">
            <p className="max-w-3xl text-base leading-relaxed text-body md:text-lg !m-0">
              <a
                href={PDF}
                className="font-medium text-olive underline underline-offset-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Quit Smoking-Meta-analysis
              </a>
            </p>
          </div>
        </section>
      </div>
    </article>
  );
}
