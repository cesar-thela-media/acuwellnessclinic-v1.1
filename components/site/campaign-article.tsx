import { PageTitle } from "@/components/site/page-primitives";
import {
  cleanStockHtml,
  decodeEntities,
  displayTitle,
  extractStockHtml,
  localizeHtml,
} from "@/lib/campaign";
import { getAllDocs, getDoc } from "@/lib/content";

type Topic = { href: string; label: string; count: string };

function parseTopics(html: string, path: string): { heading: string; items: Topic[] } | null {
  const sourceDoc = getDoc(path);
  const topicSource =
    html.includes("widget widget_categories")
      ? html
      : sourceDoc && ["post", "apw_hwn", "apw_qa"].includes(sourceDoc.type)
        ? getAllDocs().find((doc) => doc.html.includes("widget widget_categories"))?.html ?? html
        : html;
  const block = topicSource.match(/<div class="widget widget_categories">([\s\S]*?)<\/div>\s*<\/div>/i);
  if (!block) return null;
  const heading = block[1].match(/<h2[^>]*>([\s\S]*?)<\/h2>/i)?.[1]?.replace(/<[^>]+>/g, "").trim() || "Topics";
  const items = [
    ...block[1].matchAll(
      /<a\b[^>]*href=(['"])([^'"]+)\1[^>]*>([\s\S]*?)<\/a>\s*(\([^<]+\))?/gi,
    ),
  ].map((m) => ({
    href: m[2],
    label: decodeEntities(m[3].replace(/<[^>]+>/g, "").trim()),
    count: (m[4] || "").trim(),
  }));
  if (!items.length) return null;
  return { heading, items };
}

function parseRelated(html: string): { heading: string; items: { href: string; label: string }[] } | null {
  const headingMatch = html.match(/<h1[^>]*id="headline-63-2956"[^>]*>([\s\S]*?)<\/h1>/i);
  if (!headingMatch) return null;
  const heading = headingMatch[1].replace(/<[^>]+>/g, "").trim();
  const grid = html.slice(html.indexOf(headingMatch[0]));
  const items = [...grid.matchAll(/<a class='oxy-post-title' href='([^']+)'>([\s\S]*?)<\/a>/gi)].map((m) => ({
    href: m[1],
    label: m[2].replace(/<[^>]+>/g, "").trim(),
  }));
  if (!items.length) return null;
  return { heading, items };
}

function splitSections(stock: string): string[] {
  if (!stock.trim()) return [];
  const parts = stock.split(/(?=<h2\b)/i).map((part) => part.trim()).filter(Boolean);
  return parts.length ? parts : [stock];
}

const BODY =
  "campaign-copy max-w-3xl [&_p]:mb-5 [&_p]:whitespace-pre-wrap [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-body md:[&_p]:text-lg [&_h1]:mb-4 [&_h1]:font-heading [&_h1]:text-2xl [&_h1]:font-semibold [&_h1]:tracking-tight [&_h1]:text-forest [&_h2]:mb-4 [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-forest [&_h3]:mb-3 [&_h3]:font-heading [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-forest [&_h4]:mb-3 [&_h4]:font-heading [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-forest [&_ul]:mb-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ol]:mb-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_li]:text-base [&_li]:leading-relaxed [&_li]:text-body [&_a]:font-medium [&_a]:text-olive [&_a]:underline [&_a]:underline-offset-2 [&_img]:my-6 [&_img]:rounded-[14px] [&_img]:border [&_img]:border-forest/15 [&_img]:!h-auto [&_img]:w-full [&_img]:max-w-full [&_img]:object-cover [&_iframe]:aspect-video [&_iframe]:w-full [&_iframe]:rounded-[14px] [&_iframe]:border-2 [&_iframe]:border-forest/35 [&_strong]:font-semibold [&_em]:not-italic [&_i]:not-italic";

export function CampaignArticle({
  title,
  html,
  path,
}: {
  title: string;
  html: string;
  path: string;
}) {
  const titleText = displayTitle(title, html, path);
  const stock = cleanStockHtml(localizeHtml(extractStockHtml(html)), titleText);
  const sections = splitSections(stock);
  const topics = parseTopics(html, path);
  const related = parseRelated(html);

  return (
    <div className="w-full bg-white">
      <section className="bg-white">
        <div className="site-container site-section flex flex-col gap-10 md:gap-12">
          <PageTitle className="text-center">{titleText}</PageTitle>

          <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 md:gap-10">
            {sections.map((section, index) => (
              <div
                key={index}
                className={BODY}
                dangerouslySetInnerHTML={{ __html: section }}
              />
            ))}
          </div>

          {related ? (
            <div className="flex flex-col gap-6">
              <h2 className="text-center font-heading text-2xl font-semibold tracking-tight text-forest !m-0">
                {related.heading}
              </h2>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 !m-0 !list-none !p-0">
                {related.items.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="font-medium text-olive underline underline-offset-2">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {topics ? (
            <div className="site-card flex flex-col gap-6 p-6 md:p-8">
              <h2 className="font-heading text-2xl font-semibold tracking-tight text-forest !m-0">
                {topics.heading}
              </h2>
              <ul className="columns-1 gap-x-10 sm:columns-2 lg:columns-3 !m-0 !list-none !p-0">
                {topics.items.map((item) => (
                  <li key={item.href} className="mb-2 break-inside-avoid">
                    <a href={item.href} className="font-medium text-olive underline underline-offset-2">
                      {item.label}
                    </a>
                    {item.count ? <span className="text-body"> {item.count}</span> : null}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
