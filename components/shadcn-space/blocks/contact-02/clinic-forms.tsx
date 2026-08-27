import { ArrowUpRight, FileText, LogIn } from "lucide-react";
import { PageTitle } from "@/components/site/page-primitives";
import { site } from "@/lib/site";

const HEADING = "Kate's  and Aaron's New Patients:";
const BODY =
  "Each patient has access to their own patient portal.  On that portal you can complete your patient paperwork prior to your appointment. You can also check your upcoming appointments, see your personal documents and download documents from the clinic.";

export default function ClinicForms() {
  return (
    <div className="w-full bg-white">
      <section className="bg-white">
        <div className="site-container site-section flex flex-col gap-10 md:gap-12">
          <PageTitle className="text-center">Clinic Forms</PageTitle>

          <div className="mx-auto grid w-full max-w-4xl grid-cols-1 items-stretch gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)] lg:gap-8">
            <article className="site-card flex flex-col gap-5 p-6 md:p-8">
              <p className="text-lg font-semibold leading-snug text-forest md:text-xl !m-0">
                {HEADING}
              </p>
              <p className="whitespace-pre-wrap text-base leading-relaxed text-body md:text-lg !m-0">
                {BODY}
              </p>
            </article>

            <div className="flex flex-col gap-5">
              <a
                href={site.booking.portal}
                className="site-card group flex flex-1 flex-col justify-between gap-5 p-6 transition-colors hover:border-olive/40 md:p-7"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-[14px] bg-olive/15 text-forest">
                    <LogIn size={20} aria-hidden="true" />
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="text-olive transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-base leading-relaxed text-body !m-0">
                  Click{" "}
                  <span className="font-semibold text-olive underline underline-offset-2">
                    here to access the patient portal
                  </span>
                  .
                </p>
              </a>

              <a
                href={site.media.privacyPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="site-card group flex flex-1 flex-col justify-between gap-5 p-6 transition-colors hover:border-olive/40 md:p-7"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-[14px] bg-olive/15 text-forest">
                    <FileText size={20} aria-hidden="true" />
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="text-olive transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-base font-semibold leading-relaxed text-olive underline underline-offset-2 !m-0">
                  SSAW Privacy Policy Jan 2017
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
