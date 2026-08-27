import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageTitle } from "@/components/site/page-primitives";
import { getDoc } from "@/lib/content";
import { localizeHtml } from "@/lib/campaign";

const INTRO =
  "Below is a list of conditions that we can effectively treat. Click each topic to read more.";

const items = [
  {
    href: "/apw_wwt/asthma/",
    image: "/media/wp-content/uploads/2011/08/Asthma.jpg",
    title: "Asthma",
  },
  {
    href: "/apw_wwt/concussion/",
    image: "/media/wp-content/uploads/2011/08/Concussion.jpg",
    title: "Concussion",
  },
  {
    href: "/apw_wwt/headaches/",
    image: "/media/wp-content/uploads/2011/08/Headache.jpg",
    title: "Headaches",
  },
  {
    href: "/apw_wwt/hypertension/",
    image: "/media/wp-content/uploads/2011/08/Hypertension.jpg",
    title: "Hypertension",
  },
  {
    href: "/apw_wwt/ibs/",
    image: "/media/wp-content/uploads/2011/08/IBS2.jpg",
    title: "IBS",
  },
  {
    href: "/apw_wwt/pain/",
    image: "/media/wp-content/uploads/2011/08/Pain.jpg",
    title: "Pain",
  },
  {
    href: "/apw_wwt/parkinsons/",
    image: "/media/wp-content/uploads/2011/08/Parkinsons.png",
    title: "Parkinson's",
  },
  {
    href: "/apw_wwt/peripheral-neuropathy/",
    image: "/media/wp-content/uploads/2011/08/Peripheral-Neur2.jpeg",
    title: "Peripheral Neuropathy",
  },
  {
    href: "/apw_wwt/stroke/",
    image: "/media/wp-content/uploads/2011/08/Stroke.jpg",
    title: "Stroke",
  },
] as const;

function conditionExcerpt(href: string) {
  const source = getDoc("/what-is-acupuncture/what-we-treat")?.html ?? "";
  const path = href.replace(/\/$/, "");
  const escapedPath = path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = source.match(
    new RegExp(
      `<div class=['"]oxy-post['"][\\s\\S]*?<a class=['"]oxy-post-title['"][^>]*href=['"]${escapedPath}\\/['"][\\s\\S]*?<div class=['"]oxy-post-content['"][^>]*>([\\s\\S]*?)<\\/div>`,
      "i",
    ),
  );
  return localizeHtml(match?.[1]?.trim() ?? "");
}

export function WhatWeTreat() {
  return (
    <div className="w-full bg-white">
      <section className="bg-white">
        <div className="site-container site-section flex flex-col gap-10 md:gap-12">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
            <PageTitle>What We Treat</PageTitle>
            <p className="whitespace-pre-wrap text-base leading-relaxed text-body md:text-lg !m-0">
              {INTRO}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
            {items.map((item, index) => (
              <article
                key={item.href}
                className="site-card group flex min-w-0 flex-col overflow-hidden"
              >
                <Link href={item.href} className="relative block overflow-hidden">
                  <div className="aspect-[16/10] overflow-hidden bg-olive/15">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading={index > 2 ? "lazy" : "eager"}
                      className="!h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>
                <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
                  <Link
                    href={item.href}
                    className="font-heading text-xl font-semibold tracking-tight text-forest !m-0"
                  >
                    {item.title}
                  </Link>
                  <div
                    className="min-w-0 flex-1 text-sm leading-relaxed text-body sm:text-base [&_h2]:mt-3 [&_h2]:text-base [&_h2]:font-semibold [&_h3]:mt-3 [&_h3]:text-sm [&_h3]:font-semibold [&_li]:my-1 [&_p]:m-0 [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5"
                    dangerouslySetInnerHTML={{ __html: conditionExcerpt(item.href) }}
                  />
                  <Link
                    href={item.href}
                    className="mt-auto inline-flex items-center gap-1 pt-1 font-heading text-sm font-semibold text-olive transition-colors hover:text-forest"
                  >
                    Read More
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
