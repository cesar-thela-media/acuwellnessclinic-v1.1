import { PageHero } from "@/components/site/page-primitives";
import { campaignHero, decodeEntities, displayTitle, localizeHtml } from "@/lib/campaign";
import { cn } from "@/lib/utils";

type Post = {
  href: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
};

type Topic = { href: string; label: string; count: string };

function parsePosts(html: string): Post[] {
  const chunks = html.split(/<div class='oxy-post'>/).slice(1);
  return chunks
    .map((chunk) => {
      const titleMatch = chunk.match(/<a class='oxy-post-title' href='([^']+)'>([\s\S]*?)<\/a>/);
      if (!titleMatch) return null;
      const image = chunk.match(/background-image:\s*url\(([^)]+)\)/i)?.[1]?.replace(/['"]/g, "") || "";
      const excerpt = chunk.match(/<div class='oxy-post-content'>\s*([\s\S]*?)<\/div>/)?.[1] || "";
      return {
        href: titleMatch[1],
        title: decodeEntities(titleMatch[2].replace(/<[^>]+>/g, "").trim()),
        date: (chunk.match(/oxy-post-image-date-overlay[^>]*>\s*([^<]+)/)?.[1] || "").trim(),
        image: localizeHtml(image),
        excerpt: localizeHtml(excerpt.trim()),
      };
    })
    .filter((post): post is Post => Boolean(post?.title));
}

function parseTopics(html: string): { heading: string; items: Topic[] } | null {
  const block = html.match(/<div class="widget widget_categories">([\s\S]*?)<\/div>\s*<\/div>/i);
  if (!block) return null;
  const heading = block[1].match(/<h2[^>]*>([\s\S]*?)<\/h2>/i)?.[1]?.replace(/<[^>]+>/g, "").trim() || "Topics";
  const items = [...block[1].matchAll(/<a href="([^"]+)">([\s\S]*?)<\/a>\s*(\([^<]+\))?/gi)].map((m) => ({
    href: m[1],
    label: decodeEntities(m[2].replace(/<[^>]+>/g, "").trim()),
    count: (m[3] || "").trim(),
  }));
  if (!items.length) return null;
  return { heading, items };
}

function parsePager(html: string): string {
  const block = html.match(/<div class='oxy-easy-posts-pages'>([\s\S]*?)<\/div>/);
  return block ? localizeHtml(block[1].trim()) : "";
}

export function CampaignBlog({
  title,
  html,
  path,
}: {
  title: string;
  html: string;
  path: string;
}) {
  const titleText = displayTitle(title, html, path);
  const posts = parsePosts(html);
  const topics = parseTopics(html);
  const pager = parsePager(html);

  return (
    <div className="w-full bg-white">
      <PageHero title={titleText} image={campaignHero(path, html)} />

      {posts.map((post, index) => (
        <section key={`${post.href}-${index}`} className={index % 2 === 0 ? "bg-white" : "bg-cream"}>
          <article className="site-container site-section grid grid-cols-1 items-start gap-8 md:gap-12 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-16">
            {post.image ? (
              <a
                href={post.href}
                className={cn(
                  "overflow-hidden rounded-3xl bg-olive/10",
                  index % 2 === 1 && "lg:order-2",
                )}
              >
                <img
                  src={post.image}
                  alt=""
                  className="aspect-[4/3] !h-full w-full object-cover object-center"
                />
              </a>
            ) : null}
            <div
              className={cn(
                "flex min-w-0 flex-col items-start gap-4",
                index % 2 === 1 && "lg:order-1",
              )}
            >
              {post.date ? (
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-olive !m-0">
                  {post.date}
                </p>
              ) : null}
              <h2 className="font-heading text-xl font-semibold tracking-tight text-forest sm:text-2xl !m-0">
                <a href={post.href}>{post.title}</a>
              </h2>
              {post.excerpt ? (
                <div
                  className="text-base leading-relaxed text-body [&_p]:m-0 [&_p]:whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: post.excerpt }}
                />
              ) : null}
            </div>
          </article>
        </section>
      ))}

      {pager ? (
        <section className="bg-cream">
          <div
            className="site-container py-10 [&_a]:font-medium [&_a]:text-olive [&_a]:underline [&_a]:underline-offset-2 [&_.current]:font-semibold [&_.current]:text-forest [&_.page-numbers]:mx-1.5"
            dangerouslySetInnerHTML={{ __html: pager }}
          />
        </section>
      ) : null}

      {topics ? (
        <section className="bg-white">
          <div className="site-container site-section flex flex-col gap-6">
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
        </section>
      ) : null}
    </div>
  );
}
