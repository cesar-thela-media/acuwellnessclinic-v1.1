import { PageTitle } from "@/components/site/page-primitives";
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
        <section className="bg-white">
          <div className="site-container site-section flex flex-col gap-10 md:gap-12">
            <PageTitle className="text-center">{TITLE}</PageTitle>
            <article className="site-card mx-auto w-full max-w-3xl p-6 md:p-8">
              <p className="text-base leading-relaxed text-body md:text-lg !m-0">
                <a
                  href={PDF}
                  className="font-medium text-olive underline underline-offset-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Quit Smoking-Meta-analysis
                </a>
              </p>
            </article>
          </div>
        </section>
      </div>
    </article>
  );
}
