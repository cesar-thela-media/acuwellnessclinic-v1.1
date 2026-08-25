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
    image: "/media/wp-content/uploads/2011/08/Parkinsons.png",
    date: "May 26, 2022",
    title: "Acupuncture and the Treatment of Neurological Disorders",
  },
  {
    href: "/effects-of-acupuncture-on-alzheimers/",
    image: "/media/wp-content/uploads/2018/06/healthy-skin-acupuncture.jpg",
    date: "June 2, 2021",
    title: "Effects of Acupuncture on Alzheimer’s",
  },
  {
    href: "/does-acupuncture-hurt/",
    image: "/media/wp-content/uploads/2017/08/hands-2568594_1280.jpg",
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
      <div className="site-container site-section--compact flex flex-col gap-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
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

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-8">
          <article className="site-card group flex min-w-0 flex-col overflow-hidden lg:col-span-3 lg:flex-row">
            <Link
              href={featured.href}
              className="relative block aspect-[4/3] shrink-0 overflow-hidden lg:aspect-auto lg:w-[55%]"
            >
              <div className="h-full w-full overflow-hidden bg-olive/20">
                <img
                  src={featured.image}
                  alt=""
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <span className="absolute left-3 top-3 rounded-full bg-forest/90 px-3 py-1 font-heading text-[11px] font-semibold tracking-wide text-white backdrop-blur-sm">
                {featured.date}
              </span>
            </Link>
            <div className="flex min-w-0 flex-1 flex-col gap-3 p-6 lg:p-7">
              <Link
                href={featured.href}
                className="font-heading text-2xl font-semibold leading-snug tracking-tight text-forest"
              >
                {featured.title}
              </Link>
              <div
                className="text-sm leading-relaxed text-body [&_h2]:mt-3 [&_h2]:text-base [&_h2]:font-semibold [&_h3]:mt-3 [&_h3]:text-base [&_h3]:font-semibold [&_li]:my-1 [&_p]:m-0 [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5"
                dangerouslySetInnerHTML={{ __html: excerpt(featured.href) }}
              />
              <Link
                href={featured.href}
                className="mt-auto inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-olive transition-colors hover:text-forest"
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

          <div className="flex min-w-0 flex-col gap-4 lg:col-span-2">
            {rest.map((post) => (
              <article
                key={post.href}
                className="site-card group flex min-w-0 flex-1 items-stretch gap-4 overflow-hidden p-3"
              >
                <Link
                  href={post.href}
                  className="relative block h-28 w-28 shrink-0 self-start overflow-hidden rounded-xl bg-olive/20 sm:h-32 sm:w-32"
                >
                  <img
                    src={post.image}
                    alt=""
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col gap-1.5 py-1 pr-3">
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
                    className="line-clamp-2 text-xs leading-relaxed text-body/80 [&_p]:m-0"
                    dangerouslySetInnerHTML={{ __html: excerpt(post.href) }}
                  />
                  <Link
                    href={post.href}
                    className="mt-auto inline-flex items-center gap-1 font-heading text-xs font-semibold text-olive transition-colors hover:text-forest"
                  >
                    Read More
                    <ArrowUpRight
                      size={12}
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;