import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageTitle } from "@/components/site/page-primitives";
import { decodeEntities, displayTitle, localizeHtml } from "@/lib/campaign";
import { getAllDocs } from "@/lib/content";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Post = {
  href: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
};

type Topic = { href: string; label: string; count: number };

const TOPIC_SKIP = new Set([
  "uncategorized",
  "testimonials",
  "healthwellnews",
  "questions-and-answers",
]);

const TOPIC_CHIP_LIMIT = 8;

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

function parseTopics(html: string): Topic[] {
  const topicSource =
    html.includes("widget widget_categories")
      ? html
      : getAllDocs().find((doc) => doc.html.includes("widget widget_categories"))?.html ?? html;
  const block = topicSource.match(/<div class="widget widget_categories">([\s\S]*?)<\/div>\s*<\/div>/i);
  if (!block) return [];
  return [
    ...block[1].matchAll(
      /<a\b[^>]*href=(['"])([^'"]+)\1[^>]*>([\s\S]*?)<\/a>\s*(\([^<]+\))?/gi,
    ),
  ]
    .map((m) => ({
      href: m[2].replace(/\/$/, "") || m[2],
      label: decodeEntities(m[3].replace(/<[^>]+>/g, "").trim()),
      count: Number((m[4] || "").replace(/[^\d]/g, "")) || 0,
    }))
    .filter((item) => item.label && item.href);
}

function parsePager(html: string): string {
  const block = html.match(/<div class='oxy-easy-posts-pages'>([\s\S]*?)<\/div>/);
  return block ? localizeHtml(block[1].trim()) : "";
}

function normalizePath(path: string) {
  return path.replace(/\/$/, "") || "/";
}

function isBlogRoot(path: string) {
  return /^\/blog(\/page\/\d+)?$/.test(normalizePath(path));
}

function topicSlug(href: string) {
  return normalizePath(href).split("/").filter(Boolean).at(-1) || "";
}

function selectTopicChips(topics: Topic[], path: string): Topic[] {
  const active = normalizePath(path);
  const ranked = [...topics]
    .filter((topic) => !TOPIC_SKIP.has(topicSlug(topic.href)))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));

  const chips = ranked.slice(0, TOPIC_CHIP_LIMIT);
  const activeTopic = topics.find((topic) => normalizePath(topic.href) === active);
  if (activeTopic && !chips.some((topic) => normalizePath(topic.href) === active)) {
    chips.push(activeTopic);
  }
  return chips;
}

function BlogCard({ post }: { post: Post }) {
  return (
    <article className="site-card group flex min-w-0 flex-col overflow-hidden">
      {post.image ? (
        <Link href={post.href} className="relative block overflow-hidden">
          <div className="aspect-[16/10] overflow-hidden bg-olive/15">
            <img
              src={post.image}
              alt={post.title}
              className="!h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </Link>
      ) : null}
      <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
        {post.date ? (
          <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-olive !m-0">
            {post.date}
          </p>
        ) : null}
        <h3 className="font-heading text-lg font-semibold leading-snug tracking-tight text-forest !m-0">
          <Link href={post.href} className="!text-forest hover:!text-olive">
            {post.title}
          </Link>
        </h3>
        {post.excerpt ? (
          <div
            className="line-clamp-3 text-sm leading-relaxed text-body/85 [&_p]:m-0"
            dangerouslySetInnerHTML={{ __html: post.excerpt }}
          />
        ) : null}
        <Link
          href={post.href}
          className="mt-auto inline-flex items-center gap-1.5 pt-1 font-heading text-sm font-semibold text-olive transition-colors hover:text-forest"
        >
          Read article
          <ArrowUpRight
            size={14}
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </article>
  );
}

function FeaturedPost({ post }: { post: Post }) {
  return (
    <article className="site-card group overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        {post.image ? (
          <Link href={post.href} className="relative block min-h-[14rem] overflow-hidden lg:min-h-[22rem]">
            <img
              src={post.image}
              alt={post.title}
              className="absolute inset-0 !h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
          </Link>
        ) : null}
        <div className="flex min-w-0 flex-col justify-center gap-4 bg-white p-6 md:p-8 lg:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.16em] text-olive">
              Featured
            </span>
            {post.date ? (
              <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-forest/45">
                {post.date}
              </span>
            ) : null}
          </div>
          <h2 className="font-display text-2xl font-semibold leading-[1.12] tracking-[-0.02em] text-forest sm:text-3xl !m-0">
            <Link href={post.href} className="!text-forest hover:!text-olive">
              {post.title}
            </Link>
          </h2>
          {post.excerpt ? (
            <div
              className="line-clamp-4 text-base leading-relaxed text-body [&_p]:m-0"
              dangerouslySetInnerHTML={{ __html: post.excerpt }}
            />
          ) : null}
          <Link
            href={post.href}
            className="site-button site-button--primary mt-2"
          >
            Read article
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
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
  const chips = selectTopicChips(topics, path);
  const pager = parsePager(html);
  const activePath = normalizePath(path);
  const blogRoot = isBlogRoot(path);
  const [featured, ...rest] = posts;
  const gridPosts = featured ? rest : posts;
  const eyebrow = blogRoot ? site.styledName : "Topics";
  const lead = blogRoot
    ? "Articles from our clinic on acupuncture, Chinese medicine, and everyday wellness."
    : `Browse articles about ${titleText}.`;

  return (
    <div className="w-full bg-white">
      <section className="bg-white">
        <div className="site-container site-section flex flex-col gap-8 md:gap-10">
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.18em] text-olive !m-0">
              {eyebrow}
            </p>
            <PageTitle className="!text-forest">{titleText}</PageTitle>
            <p className="site-lead max-w-2xl font-normal !text-body !m-0">{lead}</p>
          </div>

          {chips.length ? (
            <div
              className="flex max-w-full flex-wrap justify-center gap-2"
              role="navigation"
              aria-label="Article topics"
            >
              <Link
                href="/blog"
                className={cn(
                  "inline-flex h-9 items-center rounded-[14px] border px-3.5 font-heading text-sm font-semibold transition-colors",
                  blogRoot
                    ? "border-forest bg-forest !text-white hover:!text-white"
                    : "border-forest/15 bg-cream !text-forest hover:border-olive hover:!text-olive",
                )}
              >
                All
              </Link>
              {chips.map((topic) => {
                const href = topic.href.endsWith("/") ? topic.href : `${topic.href}/`;
                const active = normalizePath(topic.href) === activePath;
                return (
                  <Link
                    key={topic.href}
                    href={href}
                    className={cn(
                      "inline-flex h-9 max-w-full items-center truncate rounded-[14px] border px-3.5 font-heading text-sm font-semibold transition-colors",
                      active
                        ? "border-forest bg-forest !text-white hover:!text-white"
                        : "border-forest/15 bg-cream !text-forest hover:border-olive hover:!text-olive",
                    )}
                  >
                    {topic.label}
                  </Link>
                );
              })}
            </div>
          ) : null}

          {featured ? <FeaturedPost post={featured} /> : null}

          {gridPosts.length ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {gridPosts.map((post, index) => (
                <BlogCard key={`${post.href}-${index}`} post={post} />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {!posts.length ? (
        <section className="bg-white">
          <div className="site-container site-section">
            <p className="text-body !m-0">No articles found.</p>
          </div>
        </section>
      ) : null}

      {pager ? (
        <section className="border-t border-forest/10 bg-cream">
          <div
            className="site-container flex flex-wrap items-center justify-center gap-1 py-10 text-center font-heading text-sm [&_a]:inline-flex [&_a]:min-h-9 [&_a]:min-w-9 [&_a]:items-center [&_a]:justify-center [&_a]:rounded-[14px] [&_a]:px-3 [&_a]:font-semibold [&_a]:text-olive [&_a]:no-underline hover:[&_a]:bg-white hover:[&_a]:text-forest [&_.current]:inline-flex [&_.current]:min-h-9 [&_.current]:min-w-9 [&_.current]:items-center [&_.current]:justify-center [&_.current]:rounded-[14px] [&_.current]:bg-forest [&_.current]:px-3 [&_.current]:font-semibold [&_.current]:text-white [&_.page-numbers]:mx-0.5"
            dangerouslySetInnerHTML={{ __html: pager }}
          />
        </section>
      ) : null}

      <section className="bg-forest">
        <div className="site-container site-section flex flex-col items-start gap-5 md:flex-row md:items-end md:justify-between md:gap-10">
          <div className="flex max-w-xl flex-col gap-3">
            <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl !m-0">
              Have questions?
            </h2>
            <p className="text-base leading-relaxed text-white/85 !m-0">
              Whether you are curious about acupuncture or ready to book a visit,{" "}
              {site.styledName} is here to help.
            </p>
          </div>
          <Link href="/contact" className="site-button site-button--primary shrink-0">
            Contact us
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
