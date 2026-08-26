import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getDoc } from "@/lib/content";

const HEADING = "RECENT ARTICLES";
const VIEW_ALL = "View All Articles";

const posts = [
  {
    href: "/eye-disorders/",
    image: "/media/wp-content/uploads/2017/06/Blogimg-Eyes-Red-or-Inflamed.jpg",
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
    image: "/media/wp-content/uploads/2018/04/young-woman-2699780_640.jpg",
    date: "June 2, 2021",
    title: "Effects of Acupuncture on Alzheimer’s",
  },
  {
    href: "/does-acupuncture-hurt/",
    image: "/media/wp-content/uploads/2017/08/7ccb42c82fc0e75901527fa38ae48b54.jpg",
    date: "February 10, 2021",
    title: "Does Acupuncture Hurt?",
  },
] as const;

const excerpt = (href: (typeof posts)[number]["href"]) =>
  getDoc(href)?.excerpt ?? "";

const Blog = () => {
  const [featured, ...rest] = posts;

  return (
    <section className="home-articles w-full bg-cream">
      <div className="site-container site-section--compact flex flex-col gap-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="home-section-title max-w-md font-display text-3xl leading-[1.12] tracking-[-0.01em] text-forest sm:text-4xl !m-0">
            {HEADING}
          </h2>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 self-start font-heading text-sm font-semibold text-olive transition-colors hover:text-forest sm:self-auto"
          >
            {VIEW_ALL}
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>

        <article className="site-card group overflow-hidden">
          <Link href={featured.href} className="relative block overflow-hidden">
            <div className="aspect-[16/9] overflow-hidden bg-olive/15 sm:aspect-[2/1]">
              <img
                src={featured.image}
                alt={featured.title}
                className="!h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <span className="absolute left-4 top-4 rounded-full bg-forest/90 px-3 py-1 font-heading text-[11px] font-semibold tracking-wide text-white backdrop-blur-sm">
              {featured.date}
            </span>
          </Link>
          <div className="flex flex-col gap-3 p-5 sm:p-6 md:max-w-3xl md:p-7">
            <Link
              href={featured.href}
              className="font-heading text-2xl font-semibold leading-snug tracking-tight text-forest sm:text-[1.75rem]"
            >
              {featured.title}
            </Link>
            <div
              className="text-sm leading-relaxed text-body [&_h2]:mt-3 [&_h2]:text-base [&_h2]:font-semibold [&_h3]:mt-3 [&_h3]:text-base [&_h3]:font-semibold [&_li]:my-1 [&_p]:m-0 [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5"
              dangerouslySetInnerHTML={{ __html: excerpt(featured.href) }}
            />
            <Link
              href={featured.href}
              className="inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-olive transition-colors hover:text-forest"
            >
              Read More
              <ArrowUpRight
                size={14}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </article>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {rest.map((post) => (
            <article
              key={post.href}
              className="site-card group flex min-w-0 flex-col overflow-hidden"
            >
              <Link href={post.href} className="relative block overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden bg-olive/15">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="!h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Link>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <span className="font-heading text-[11px] font-semibold tracking-wide text-olive">
                  {post.date}
                </span>
                <Link
                  href={post.href}
                  className="font-heading text-lg font-semibold leading-snug tracking-tight text-forest"
                >
                  {post.title}
                </Link>
                <div
                  className="text-sm leading-relaxed text-body/80 [&_p]:m-0"
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