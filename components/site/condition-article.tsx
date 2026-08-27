import { PageTitle } from "@/components/site/page-primitives";
import {
  articleHeroUrl,
  campaignHero,
  cleanStockHtml,
  displayTitle,
  extractStockHtml,
  localizeHtml,
} from "@/lib/campaign";

const BODY =
  "campaign-copy max-w-none [&_p]:mb-5 [&_p]:whitespace-pre-wrap [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-body md:[&_p]:text-lg [&_h1]:mb-4 [&_h1]:font-heading [&_h1]:text-2xl [&_h1]:font-semibold [&_h1]:tracking-tight [&_h1]:text-forest [&_h2]:mb-4 [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-forest [&_h3]:mb-3 [&_h3]:font-heading [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-forest [&_h4]:mb-3 [&_h4]:font-heading [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-forest [&_ul]:mb-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ol]:mb-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_li]:text-base [&_li]:leading-relaxed [&_li]:text-body [&_a]:font-medium [&_a]:text-olive [&_a]:underline [&_a]:underline-offset-2 [&_img]:my-6 [&_img]:rounded-[14px] [&_img]:border [&_img]:border-forest/15 [&_img]:!h-auto [&_img]:w-full [&_img]:max-w-full [&_img]:object-cover [&_iframe]:aspect-video [&_iframe]:w-full [&_iframe]:rounded-[14px] [&_iframe]:border-2 [&_iframe]:border-forest/35 [&_strong]:font-semibold [&_em]:not-italic [&_i]:not-italic [&_sup]:text-olive";

export function ConditionArticle({
  title,
  html,
  path,
  image,
}: {
  title: string;
  html: string;
  path: string;
  image?: string;
}) {
  const titleText = displayTitle(title, html, path);
  const stock = cleanStockHtml(localizeHtml(extractStockHtml(html)), titleText);
  const hero = articleHeroUrl(html) || image || campaignHero(path, html);

  return (
    <div className="w-full bg-white">
      <section className="bg-white">
        <div className="site-container site-section flex flex-col gap-10 md:gap-12">
          <PageTitle className="text-center">{titleText}</PageTitle>

          <div className="site-media w-full overflow-hidden">
            <img
              src={hero}
              alt=""
              className="aspect-[2/1] w-full object-cover object-center md:aspect-[21/9]"
            />
          </div>

          <article className="site-card mx-auto w-full max-w-3xl p-6 md:p-8">
            <div className={BODY} dangerouslySetInnerHTML={{ __html: stock }} />
          </article>
        </div>
      </section>
    </div>
  );
}
