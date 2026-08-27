import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageTitle } from "@/components/site/page-primitives";
import { getAllDocs } from "@/lib/content";

export function HealthWellNews() {
  const posts = getAllDocs()
    .filter((doc) => doc.type === "apw_hwn")
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title)));

  return (
    <div className="w-full bg-white">
      <section className="bg-white">
        <div className="site-container site-section flex flex-col gap-10 md:gap-12">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
            <PageTitle>Health Well News</PageTitle>
            <Link
              href="/category/healthwellnews/"
              className="inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-olive transition-colors hover:text-forest"
            >
              View all HealthWellNews
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.path}
                href={post.path.endsWith("/") ? post.path : `${post.path}/`}
                className="site-card group flex min-w-0 flex-col gap-3 p-5 transition-colors hover:border-olive/40 sm:p-6"
              >
                {post.date ? (
                  <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-olive !m-0">
                    {post.date}
                  </p>
                ) : null}
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-heading text-lg font-semibold leading-snug tracking-tight text-forest !m-0">
                    {post.title}
                  </h2>
                  <ArrowUpRight
                    size={16}
                    className="mt-1 shrink-0 text-olive transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
