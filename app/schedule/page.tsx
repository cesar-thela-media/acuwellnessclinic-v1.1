import { ArrowUpRight } from "lucide-react";
import { PageTitle } from "@/components/site/page-primitives";
import { JsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

const TITLE = "Schedule Online";
const META = "Schedule Online » Si Shou Acupuncture and Wellness, PLLC | Acupuncture in Austin, TX";

export function generateMetadata() {
  return {
    title: { absolute: META },
    alternates: { canonical: `${site.url}/schedule/` },
  };
}

export default function SchedulePage() {
  return (
    <article>
      <JsonLd canonicalPath="/schedule" metaTitle={META} metaDescription="" />
      <div className="w-full bg-white">
        <section className="bg-white">
          <div className="site-container site-section flex flex-col gap-10 md:gap-12">
            <PageTitle className="text-center">{TITLE}</PageTitle>
            <article className="site-card mx-auto flex w-full max-w-3xl flex-col items-center gap-5 p-6 text-center md:p-8">
              <a
                href={site.booking.header}
                target="_blank"
                rel="noopener noreferrer"
                className="site-button site-button--primary"
              >
                Schedule Online
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </article>
          </div>
        </section>
      </div>
    </article>
  );
}
