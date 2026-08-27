import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getDoc } from "@/lib/content";

const HEADING = "RECENT ARTICLES";
const VIEW_ALL = "View All Articles";

/** Paths match live WP / content/posts slugs (trailingSlash: true). */
const posts = [
  {
    href: "/eye-disorders/",
    image: "/media/wp-content/uploads/2020/09/Eyes.jpg",
    date: "June 2, 2022",
    title: "Eye Disorders",
  },
  {
    href: "/acupuncture-and-the-treatment-of-neurological-disorders/",
    image: "/media/wp-content/uploads/2022/05/NeuroPic.jpg",
    date: "May 26, 2022",
    title: "Acupuncture and the Treatment of Neurological Disorders",
  },
  {
    href: "/effects-of-acupuncture-on-alzheimers/",
    image: "/media/wp-content/uploads/2021/06/download.jpg",
    date: "June 2, 2021",
    title: "Effects of Acupuncture on Alzheimer’s",
  },
  {
    href: "/does-acupuncture-hurt/",
    image: "/media/wp-content/uploads/2021/02/Stef-and-Studen.jpg",
    date: "February 10, 2021",
    title: "Does Acupuncture Hurt?",
  },
] as const;

const excerpt = (href: (typeof posts)[number]["href"]) =>
  getDoc(href)?.excerpt ?? "";

const Blog = () => {
  return (
    <section className="home-articles w-full bg-olive">
      <div className="site-container site-section--compact flex flex-col gap-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="home-section-title max-w-md font-display text-2xl leading-[1.12] tracking-[-0.01em] text-cream sm:text-3xl !m-0">
            {HEADING}
          </h2>
          <Link
            href="/blog/"
            className="inline-flex items-center gap-1.5 self-start font-heading text-sm font-semibold text-cream transition-colors hover:text-forest sm:self-auto"
          >
            {VIEW_ALL}
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((post) => (
            <article key={post.href} className="site-card group flex min-w-0 flex-col overflow-hidden">
              <Link href={post.href} className="relative block overflow-hidden">
                <div className="aspect-[16/10] overflow-hidden bg-olive/15">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="!h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Link>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <span className="font-heading text-[11px] font-semibold tracking-wide text-olive">
                  {post.date}
                </span>
                <Link
                  href={post.href}
                  className="font-heading text-base font-semibold leading-snug tracking-tight text-forest"
                >
                  {post.title}
                </Link>
                <div
                  className="line-clamp-3 text-sm leading-relaxed text-body/80 [&_p]:m-0"
                  dangerouslySetInnerHTML={{ __html: excerpt(post.href) }}
                />
                <Link
                  href={post.href}
                  className="mt-auto inline-flex items-center gap-1 pt-1 font-heading text-sm font-semibold text-olive transition-colors hover:text-forest"
                >
                  Read More
                  <ArrowUpRight
                    size={13}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
