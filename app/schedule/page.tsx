import { PageHero } from "@/components/site/page-primitives";
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
        <PageHero title={TITLE} image="/media/wp-content/uploads/2018/02/BlogHead_2.jpg" />
        <section className="bg-cream">
          <div className="site-container site-section flex flex-col items-start gap-5">
            <a
              href={site.booking.header}
              target="_blank"
              rel="noopener noreferrer"
              className="site-button site-button--primary"
            >
              Schedule An Appointment
            </a>
            <a
              href={site.booking.footer}
              target="_blank"
              rel="noopener noreferrer"
              className="site-button site-button--primary"
            >
              Schedule with Kate
            </a>
            <a
              href={site.booking.footer}
              target="_blank"
              rel="noopener noreferrer"
              className="site-button site-button--primary"
            >
              Schedule with Aaron
            </a>
          </div>
        </section>
      </div>
    </article>
  );
}
