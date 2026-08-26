import { PageHero } from "@/components/site/page-primitives";
import { site } from "@/lib/site";

const HEADING = "Kate's  and Aaron's New Patients:";
const BODY =
  "Each patient has access to their own patient portal.  On that portal you can complete your patient paperwork prior to your appointment. You can also check your upcoming appointments, see your personal documents and download documents from the clinic.";

export default function ClinicForms() {
  return (
    <div className="w-full bg-white">
      <PageHero title="Clinic Forms" image="/media/wp-content/uploads/2018/01/BlogImg1.jpg" />

      <section className="bg-cream">
        <div className="site-container site-section flex max-w-3xl flex-col gap-6">
          <p className="text-lg font-semibold leading-snug text-forest md:text-xl !m-0">
            {HEADING}
          </p>
          <p className="whitespace-pre-wrap text-base leading-relaxed text-body md:text-lg !m-0">
            {BODY}
          </p>
          <p className="text-base leading-relaxed text-body !m-0">
            Click{" "}
            <a
              href={site.booking.portal}
              className="font-medium text-olive underline underline-offset-2"
            >
              here to access the patient portal
            </a>
            .
          </p>
          <p className="text-base leading-relaxed text-body !m-0">
            <a
              href={site.media.privacyPdf}
              className="font-medium text-olive underline underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              SSAW Privacy Policy Jan 2017
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
