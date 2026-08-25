import { PageTitle } from "@/components/site/page-primitives";
import { site } from "@/lib/site";

const HEADING = "Kate's  and Aaron's New Patients:";
const BODY =
  "Each patient has access to their own patient portal.  On that portal you can complete your patient paperwork prior to your appointment. You can also check your upcoming appointments, see your personal documents and download documents from the clinic.";

export default function ClinicForms() {
  return (
    <div className="w-full bg-white">
      <div className="site-container site-section flex flex-col gap-8 md:gap-10">
        <PageTitle>Clinic Forms</PageTitle>
        <p className="site-lead whitespace-pre-wrap !m-0">
          {HEADING}
        </p>
        <p className="site-body-copy whitespace-pre-wrap text-body !m-0">
          {BODY}
        </p>
        <div className="site-card max-w-2xl p-6 md:p-8">
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
          <p className="mt-4 text-base leading-relaxed text-body !m-0">
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
      </div>
    </div>
  );
}
