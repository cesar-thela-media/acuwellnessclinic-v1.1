import { CalendarDays } from "lucide-react";
import { PageHero } from "@/components/site/page-primitives";
import { site } from "@/lib/site";

const CALENDAR_SRC =
  "https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&src=gioqel5mt1r49ebf3rveii6tto%40group.calendar.google.com&color=%23875509&ctz=America%2FChicago";

export default function UpcomingEvents() {
  return (
    <div className="w-full bg-white">
      <PageHero
        title="Upcoming Events"
        image="/media/wp-content/uploads/2018/06/summer-meditation.jpg"
      />

      <section className="bg-white">
        <div className="site-container site-section grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,18rem)] lg:gap-14">
          <div className="overflow-hidden rounded-3xl bg-olive/10">
            <iframe
              title="Si Shou upcoming events calendar"
              src={CALENDAR_SRC}
              width="800"
              height="600"
              loading="lazy"
              className="block h-[min(70vh,600px)] min-h-[30rem] w-full border-0"
            />
          </div>
          <aside className="flex flex-col items-start gap-6">
            <img
              src={site.media.logo}
              alt="Si Shou Acupuncture and Wellness"
              width={300}
              height={300}
              className="h-40 w-40 object-contain"
            />
            <div className="flex items-center gap-2 font-heading text-xs font-semibold uppercase tracking-[0.16em] text-olive">
              <CalendarDays size={16} aria-hidden="true" />
              <span>Upcoming Events</span>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
