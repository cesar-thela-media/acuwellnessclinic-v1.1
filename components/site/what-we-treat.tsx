import Link from "next/link";
import { PageHero } from "@/components/site/page-primitives";
import { getDoc } from "@/lib/content";
import { cn } from "@/lib/utils";

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
      <PageHero
        title="What We Treat"
        image="/media/wp-content/uploads/2019/08/pain.jpg"
      />

      <section className="bg-cream">
        <div className="site-container site-section">
          <p className="max-w-3xl whitespace-pre-wrap text-base leading-relaxed text-body md:text-lg !m-0">
            {INTRO}
          </p>
        </div>
      </section>

      {items.map((item, index) => (
        <section key={item.href} className={index % 2 === 0 ? "bg-white" : "bg-cream"}>
          <article className="site-container site-section grid grid-cols-1 items-start gap-8 md:gap-12 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-16">
            <div
              className={cn(
                "overflow-hidden rounded-3xl bg-olive/10",
                index % 2 === 1 && "lg:order-2",
              )}
            >
              <Link href={item.href} className="block">
                <img
                  src={item.image}
                  alt=""
                  className="aspect-[4/3] !h-full w-full object-cover object-center"
                />
              </Link>
            </div>
            <div
              className={cn(
                "flex min-w-0 flex-col items-start gap-5",
                index % 2 === 1 && "lg:order-1",
              )}
            >
              <Link
                href={item.href}
                className="font-heading text-xl font-semibold tracking-tight text-forest sm:text-2xl !m-0"
              >
                {item.title}
              </Link>
              <div
                className="min-w-0 text-base leading-relaxed text-body [&_h2]:mt-3 [&_h2]:text-lg [&_h2]:font-semibold [&_h3]:mt-3 [&_h3]:text-base [&_h3]:font-semibold [&_li]:my-1 [&_p]:m-0 [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5"
                dangerouslySetInnerHTML={{
                  __html: contentInner(getDoc(item.href)?.html ?? ""),
                }}
              />
              <Link href={item.href} className="text-sm font-medium text-olive hover:text-olive/80">
                Read More
              </Link>
            </div>
          </article>
        </section>
      ))}
    </div>
  );
}
