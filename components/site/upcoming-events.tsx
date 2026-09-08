import { CalendarDays } from "lucide-react";
import { PageTitle } from "@/components/site/page-primitives";
import { site } from "@/lib/site";

const CALENDAR_SRC =
  "https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&src=gioqel5mt1r49ebf3rveii6tto%40group.calendar.google.com&color=%23875509&ctz=America%2FChicago";

export default function UpcomingEvents() {
  return (
    <div className="w-full bg-white">
      <section className="bg-white">
        <div className="site-container site-section flex flex-col gap-10 md:gap-12">
          <div className="flex flex-col items-center gap-3 text-center">
            <PageTitle>Upcoming Events</PageTitle>
            <div className="inline-flex items-center gap-2 font-heading text-xs font-semibold uppercase tracking-[0.16em] text-olive">
              <CalendarDays size={16} aria-hidden="true" />
              <span>Upcoming Events</span>
            </div>
          </div>

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_12.5rem] lg:gap-12">
            <div className="site-media overflow-hidden">
              <iframe
                title="Si Shou upcoming events calendar"
                src={CALENDAR_SRC}
                width="800"
                height="600"
                loading="lazy"
                className="block h-[min(65vh,560px)] min-h-[22rem] w-full border-0 sm:min-h-[28rem] md:min-h-[30rem]"
              />
            </div>
            <aside className="flex flex-col items-center gap-4 lg:items-start">
              <img
                src={site.media.logo}
                alt="Si Shou Acupuncture and Wellness"
                width={2362}
                height={2362}
                className="h-auto w-36 max-w-full object-contain sm:w-[12.5rem]"
              />
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
