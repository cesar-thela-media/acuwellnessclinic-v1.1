import { PageHero } from "@/components/site/page-primitives";
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
      <PageHero
        title="Q & A"
        image="/media/wp-content/uploads/2016/11/Blog-img-Five-Ways-to-Alleviate-Insomnia_640.jpg"
      />

      <section className="bg-cream">
        <div className="site-container site-section">
          <p className="max-w-3xl whitespace-pre-wrap text-base leading-relaxed text-body md:text-lg !m-0">
            {INTRO}
          </p>
        </div>
      </section>

      {items.map((item, index) => (
        <section key={item.title} className={index % 2 === 0 ? "bg-white" : "bg-cream"}>
          <article className="site-container site-section grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-14">
            <h2 className="font-heading text-xl font-semibold tracking-tight text-forest sm:text-2xl !m-0">
              {item.title}
            </h2>
            <div className="prose-wp-read site-reading-measure min-w-0 max-w-none !pb-0 text-base leading-relaxed text-body md:text-lg [&_.ct-inner-content]:!max-w-none [&_.ct-inner-content]:!px-0 [&_.prose-wp]:!max-w-none [&_.prose-wp]:!p-0">
              <WpBody html={item.html} />
            </div>
          </article>
        </section>
      ))}
    </div>
  );
}
