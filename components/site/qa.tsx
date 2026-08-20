import { WpBody } from "@/components/site/wp-body";

const INTRO =
  "Some common questions about acupuncture are answered below. Call us if you have other questions or if you are interested in improving your life through acupuncture treatment.";

export type QAItem = {
  title: string;
  html: string;
};

export function QA({ items }: { items: QAItem[] }) {
  return (
    <div className="w-full bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-16 sm:px-6 md:gap-12 md:py-24 lg:px-16">
        <h1 className="text-4xl font-bold tracking-tight text-charcoal sm:text-5xl md:text-6xl !m-0 text-balance">
          Q & A
        </h1>
        <p className="max-w-3xl whitespace-pre-wrap text-base leading-relaxed text-body md:text-lg !m-0">
          {INTRO}
        </p>
        <div className="flex flex-col gap-6">
          {items.map((item) => (
            <section
              key={item.title}
              className="flex flex-col gap-4 overflow-x-auto rounded-xl border border-charcoal/10 bg-white p-6 shadow-sm md:p-8"
            >
              <h2 className="text-xl font-bold tracking-tight text-charcoal sm:text-2xl !m-0">
                {item.title}
              </h2>
              <div className="prose-wp-read max-w-none !pb-0 text-base leading-relaxed text-body md:text-lg [&_.ct-inner-content]:!max-w-none [&_.ct-inner-content]:!px-0 [&_.prose-wp]:!max-w-none [&_.prose-wp]:!p-0">
                <WpBody html={item.html} />
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
