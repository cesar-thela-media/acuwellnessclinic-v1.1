import { site } from "@/lib/site";

const HEADING = "Kate's  and Aaron's New Patients:";
const BODY =
  "Each patient has access to their own patient portal.  On that portal you can complete your patient paperwork prior to your appointment. You can also check your upcoming appointments, see your personal documents and download documents from the clinic.";

export default function ClinicForms() {
  return (
    <div className="w-full bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-16 sm:px-6 md:gap-10 md:py-24 lg:px-16">
        <h1 className="text-4xl font-bold tracking-tight text-charcoal sm:text-5xl md:text-6xl !m-0 text-balance">
          Clinic Forms
        </h1>
        <p className="max-w-3xl whitespace-pre-wrap text-lg font-semibold leading-snug text-charcoal md:text-xl !m-0">
          {HEADING}
        </p>
        <p className="max-w-3xl whitespace-pre-wrap text-base leading-relaxed text-body md:text-lg !m-0">
          {BODY}
        </p>
        <div className="max-w-2xl rounded-xl border border-charcoal/10 p-6 shadow-sm md:p-8">
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
