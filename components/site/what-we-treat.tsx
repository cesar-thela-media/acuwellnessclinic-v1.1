import Link from "next/link";
import { PageTitle } from "@/components/site/page-primitives";
import { getDoc } from "@/lib/content";

const INTRO =
  "Below is a list of conditions that we can effectively treat. Click each topic to read more.";

function contentInner(html: string): string {
  if (!html) return "";
  const i = html.indexOf("oxy-stock-content-styles");
  if (i === -1) return "";
  const start = html.indexOf(">", i) + 1;
  if (start <= i) return "";
  let depth = 1;
  const re = /<span\b|<\/span>/g;
  re.lastIndex = start;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    if (m[0] === "</span>") {
      depth--;
      if (depth === 0) return html.slice(start, m.index);
    } else {
      depth++;
    }
  }
  return html.slice(start);
}

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

export function WhatWeTreat() {
  return (
    <div className="w-full bg-white">
      <div className="site-container site-section flex flex-col gap-10 md:gap-12">
        <PageTitle>What We Treat</PageTitle>
        <p className="site-body-copy whitespace-pre-wrap text-body !m-0">
          {INTRO}
        </p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {items.map((item) => (
            <article
              key={item.href}
              className="site-card group flex min-w-0 flex-col gap-4 p-5 md:p-6"
            >
              <Link href={item.href} className="relative block overflow-hidden rounded-xl">
                <div className="aspect-[4/3] w-full overflow-hidden bg-olive/20">
                  <img
                    src={item.image}
                    alt=""
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Link>
              <Link
                href={item.href}
                className="text-lg font-semibold leading-snug tracking-tight text-charcoal"
              >
                {item.title}
              </Link>
              <div
                className="min-w-0 text-sm leading-relaxed text-body [&_h2]:mt-3 [&_h2]:text-base [&_h2]:font-semibold [&_h3]:mt-3 [&_h3]:text-base [&_h3]:font-semibold [&_li]:my-1 [&_p]:m-0 [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5"
                dangerouslySetInnerHTML={{
                  __html: contentInner(getDoc(item.href)?.html ?? ""),
                }}
              />
              <Link href={item.href} className="text-sm font-medium text-olive hover:text-olive/80">
                Read More
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
