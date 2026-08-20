import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";

const HEADING = "Are you ready to feel better?";
const BODY_BEFORE =
  "Whether you're dealing with a significant health issue, not feeling your best, or want to feel even better, we can help. Our care is centered around each individual patient and their specific needs and goals helping you achieve harmonious health! When was the last time you talked with someone about your health and received the personal attention you deserve? ";
const BODY_BOLD = "Schedule your initial consultation with us today!";
const CTA = "Schedule My Consultation";
const QUOTE =
  '"Health is the greatest gift, contentment the greatest wealth, faithfulness the best relationship."';
const ATTRIBUTION = "~Buddha";

export default function GetStarted() {
  return (
    <div>
      <section className="w-full overflow-x-clip bg-white">
        <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 md:py-28 lg:px-16 lg:py-32">
          <div className="flex max-w-3xl flex-col gap-8">
            <p className="font-display text-lg italic text-olive !m-0" aria-hidden="true">
              02
            </p>
            <h2 className="max-w-3xl font-display text-4xl leading-[1.1] tracking-[-0.01em] text-forest sm:text-5xl lg:text-6xl !m-0">
              {HEADING}
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-body md:text-lg !m-0">
              {BODY_BEFORE}
              <strong className="font-semibold text-forest">{BODY_BOLD}</strong>
            </p>
            <a
              className="inline-flex h-11 items-center gap-1.5 rounded-full bg-olive px-5 font-heading text-sm font-semibold text-forest transition-colors hover:bg-forest hover:text-white"
              href={site.booking.header}
              target="_blank"
              rel="noopener noreferrer"
            >
              {CTA}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="w-full bg-cream">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-6 py-20 text-center md:py-28 lg:py-32">
          <span className="font-display text-5xl leading-none text-olive/50 !m-0" aria-hidden="true">
            &ldquo;
          </span>
          <blockquote className="font-display text-2xl leading-snug font-medium tracking-tight text-forest sm:text-3xl lg:text-4xl !m-0">
            {QUOTE}
          </blockquote>
          <p className="font-heading text-sm font-semibold tracking-[0.14em] text-forest/60 !m-0">{ATTRIBUTION}</p>
        </div>
      </section>
    </div>
  );
}
