import { PageTitle } from "@/components/site/page-primitives";
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
      <div className="site-container site-section flex flex-col gap-10 md:gap-12">
        <PageTitle>Q & A</PageTitle>
        <p className="site-body-copy whitespace-pre-wrap text-body !m-0">
          {INTRO}
        </p>
        <div className="flex flex-col gap-6">
          {items.map((item) => (
            <section
              key={item.title}
              className="site-card flex flex-col gap-4 overflow-x-auto p-6 md:p-8"
            >
              <h2 className="text-xl font-bold tracking-tight text-charcoal sm:text-2xl !m-0">
                {item.title}
              </h2>
              <div className="prose-wp-read site-reading-measure max-w-none !pb-0 text-base leading-relaxed text-body md:text-lg [&_.ct-inner-content]:!max-w-none [&_.ct-inner-content]:!px-0 [&_.prose-wp]:!max-w-none [&_.prose-wp]:!p-0">
                <WpBody html={item.html} />
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
