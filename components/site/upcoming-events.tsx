import { CalendarDays } from "lucide-react";
import { PageTitle } from "@/components/site/page-primitives";
import { site } from "@/lib/site";

const CALENDAR_SRC =
  "https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&src=gioqel5mt1r49ebf3rveii6tto%40group.calendar.google.com&color=%23875509&ctz=America%2FChicago";

export default function UpcomingEvents() {
  return (
    <div className="w-full bg-white">
      <div className="site-container site-section--compact">
        <PageTitle className="text-center">Upcoming Events</PageTitle>
        <div className="mt-10 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(16rem,0.7fr)] lg:gap-10">
          <div className="overflow-hidden rounded-2xl border border-forest/10 bg-white shadow-[0_20px_50px_-30px_rgb(56_69_47/0.5)]">
            <iframe
              title="Si Shou upcoming events calendar"
              src={CALENDAR_SRC}
              width="800"
              height="600"
              loading="lazy"
              className="block h-[min(70vh,600px)] min-h-[30rem] w-full border-0"
            />
          </div>
          <aside className="flex min-h-64 flex-col items-center justify-center gap-6 rounded-2xl bg-cream p-7 text-center lg:min-h-0 lg:p-10">
            <img
              src={site.media.logo}
              alt="Si Shou Acupuncture and Wellness"
              width={300}
              height={300}
              className="h-40 w-40 rounded-full object-contain"
            />
            <div className="flex items-center gap-2 font-heading text-xs font-semibold uppercase tracking-[0.16em] text-olive">
              <CalendarDays size={16} aria-hidden="true" />
              <span>Upcoming Events</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
