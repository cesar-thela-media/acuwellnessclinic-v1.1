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
      <section className="bg-white">
        <div className="site-container site-section flex flex-col gap-10 md:gap-12">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
            <PageTitle>Q & A</PageTitle>
            <p className="whitespace-pre-wrap text-base leading-relaxed text-body md:text-lg !m-0">
              {INTRO}
            </p>
          </div>

          <div className="columns-1 gap-5 md:columns-2 md:gap-6">
            {items.map((item) => (
              <article
                key={item.title}
                className="site-card mb-5 break-inside-avoid p-5 sm:mb-6 sm:p-6"
              >
                <h2 className="font-heading text-lg font-semibold tracking-tight text-forest sm:text-xl !m-0">
                  {item.title}
                </h2>
                <div className="prose-wp-read mt-3 min-w-0 max-w-none !pb-0 text-sm leading-relaxed text-body sm:text-base [&_.ct-inner-content]:!max-w-none [&_.ct-inner-content]:!px-0 [&_.prose-wp]:!max-w-none [&_.prose-wp]:!p-0">
                  <WpBody html={item.html} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
