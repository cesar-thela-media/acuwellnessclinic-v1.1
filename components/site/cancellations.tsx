import { PageTitle, SectionHeading } from "@/components/site/page-primitives";

const INTRO =
  "We all know that life happens and schedules can change, but please understand that in fairness to our practitioners, staff and patients, we have established the following Cancellation and Lateness Policy.";

const LATE_ARRIVALS_1 =
  "We will try to accommodate late patients up to 15 minutes after their scheduled treatment time, but they may be asked to wait, or their treatment may be cut short in order to treat on-time patients.";
const LATE_ARRIVALS_2 = "Patients more than 15 minutes late are considered cancelled.";

const CANCEL_INTRO = "Cancellations are divided into early and late categories.";
const EARLY =
  "Early cancellations are those that occur more than 24 hours before your appointment time. There is no charge for early cancellations. Please cancel online whenever possible. If you cannot cancel online, any call, email or voicemail that arrives before the 24 hour window will be considered an early cancellation.";
const LATE =
  "Late cancellations occur within the 24 hour window (less than 24 hours) before your scheduled appointment time, and are charged a $25 no show fee. These appointments cannot be cancelled online.";
const LATE_HOWTO =
  "You must call, leave a voicemail or email us directly to late cancel an appointment.";
const COURTESY =
  "Please note: As a courtesy, late cancelled appointments can be rescheduled, without charge, for any available same day appointment with any practitioner.";

const EXAMPLE_INTRO = "An Example:";
const EXAMPLE_1 = "You have an on Wednesday at 12 noon with Kate.";
const EXAMPLE_2 = "An early cancellation is anytime before 12 noon on Tuesday.";
const EXAMPLE_3 =
  "A late cancellation is anytime after 12 noon on Tuesday (within the 24 hour window)";
const EXAMPLE_4 =
  "You call Wednesday at 9am (within the 24 hour window) and there is a 10AM with Kate and 3PM with Colleen available. You can take either of those appointments without incurring further charges.";

export function CancellationsLateArrivals() {
  return (
    <div className="w-full bg-white">
      <section className="bg-white">
        <div className="site-container site-section flex flex-col gap-10 md:gap-12">
          <PageTitle className="text-center">Cancellations and Late Arrivals</PageTitle>

          <p className="mx-auto max-w-3xl whitespace-pre-wrap text-center text-base leading-relaxed text-body md:text-lg !m-0">
            {INTRO}
          </p>

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="flex min-w-0 flex-col gap-5">
              <article className="site-card flex flex-col gap-4 p-6 md:p-8">
                <SectionHeading>Late Arrivals</SectionHeading>
                <p className="whitespace-pre-wrap text-base leading-relaxed text-body md:text-lg !m-0">
                  {LATE_ARRIVALS_1}
                </p>
                <p className="whitespace-pre-wrap text-base leading-relaxed text-body md:text-lg !m-0">
                  {LATE_ARRIVALS_2}
                </p>
              </article>

              <article className="site-card flex flex-col gap-4 p-6 md:p-8">
                <SectionHeading>Cancellations</SectionHeading>
                <p className="whitespace-pre-wrap text-base leading-relaxed text-body md:text-lg !m-0">
                  {CANCEL_INTRO}
                </p>
                <p className="whitespace-pre-wrap text-base leading-relaxed text-body md:text-lg !m-0">
                  {EARLY}
                </p>
                <p className="whitespace-pre-wrap text-base leading-relaxed text-body md:text-lg !m-0">
                  {LATE}
                </p>
                <p className="whitespace-pre-wrap text-base leading-relaxed text-body md:text-lg !m-0">
                  {LATE_HOWTO}
                </p>
                <p className="border-l-2 border-olive pl-4 text-base font-semibold leading-snug text-forest md:text-lg !m-0">
                  {COURTESY}
                </p>
              </article>
            </div>

            <div className="flex min-w-0 flex-col gap-5">
              <div className="site-media w-full">
                <img
                  src="/media/wp-content/uploads/2017/01/time.jpg"
                  alt=""
                  width={509}
                  height={339}
                  className="aspect-[4/3] w-full object-cover object-center"
                />
              </div>
              <article className="site-card flex flex-col gap-4 p-6 md:p-8">
                <SectionHeading>{EXAMPLE_INTRO}</SectionHeading>
                <p className="whitespace-pre-wrap text-base leading-relaxed text-body md:text-lg !m-0">
                  {EXAMPLE_1}
                </p>
                <p className="whitespace-pre-wrap text-base leading-relaxed text-body md:text-lg !m-0">
                  {EXAMPLE_2}
                </p>
                <p className="whitespace-pre-wrap text-base leading-relaxed text-body md:text-lg !m-0">
                  {EXAMPLE_3}
                </p>
                <p className="whitespace-pre-wrap text-base leading-relaxed text-body md:text-lg !m-0">
                  {EXAMPLE_4}
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
