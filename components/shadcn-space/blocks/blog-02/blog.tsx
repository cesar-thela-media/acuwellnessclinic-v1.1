"use client";

import { useRef } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { gsap, useGSAP } from "@/lib/gsap";

const HEADING = "RECENT ARTICLES";

const posts = [
  {
    href: "/eye-disorders/",
    image: "/media/wp-content/uploads/2020/09/Eyes.jpg",
    date: "June 2, 2022",
    title: "Eye Disorders",
    excerpt:
      "There are hundreds of different eye diseases that lead to vision loss. Degenerative eye diseases, from diabetic retinopathy to age-related macular degeneration, often have no cure while many others are treatable and even preventable. You can assist in your own eye health by following a healthy lifestyle and seeing your Ophthalmologist in conjunction with your […]",
  },
  {
    href: "/acupuncture-and-the-treatment-of-neurological-disorders/",
    image: "/media/wp-content/uploads/2022/05/NeuroPic.jpg",
    date: "May 26, 2022",
    title: "Acupuncture and the Treatment of Neurological Disorders",
    excerpt:
      "Neurological disorders cover a wide swath of health issues, including: traumatic brain injuries and concussions, headaches, Parkinson's disease, strokes, Bell's palsy, Alzheimer's disease, seizures, and MS (just to name a few). According to the World Health Organization, nearly 1 billion people suffer worldwide from some sort of neurological disorder. What most people don't know is that […]",
  },
  {
    href: "/effects-of-acupuncture-on-alzheimers/",
    image: "/media/wp-content/uploads/2021/06/download.jpg",
    date: "June 2, 2021",
    title: "Effects of Acupuncture on Alzheimer’s",
    excerpt:
      "June is Alzheimer’s Awareness Month. Among people over 65 years old, Alzheimer’s is the disease that is found to cause most cases of dementia. Dementia is the loss of cognitive function so severe it interferes with daily life and ranges in severity from the loss of memory, ability to think, reason, plan and can even […]",
  },
  {
    href: "/does-acupuncture-hurt/",
    image: "/media/wp-content/uploads/2021/02/Stef-and-Studen.jpg",
    date: "February 10, 2021",
    title: "Does Acupuncture Hurt?",
    excerpt:
      "This is by far the most commonly asked question by new patients. The quick answer is, it shouldn’t. Kate might not be so willing to allow students to practice on her and we wouldn’t have so many happily returning and referring patients if it hurt! There are hundreds of acupuncture points on the body. […]",
  },
] as const;

const Blog = () => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
      gsap.from(".articles-line", {
        autoAlpha: 0,
        y: 16,
        duration: 1.35,
        stagger: 0.14,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 78%",
          once: true,
        },
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="w-full bg-white py-24 sm:py-32 lg:py-40">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 sm:px-10 lg:px-12">
        <h2 className="articles-line font-heading text-sm font-semibold tracking-[0.22em] text-charcoal">
          {HEADING}
        </h2>
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {posts.map((post) => (
            <Card
              key={post.href}
              className="articles-line border-0 bg-transparent p-0 shadow-none ring-0"
            >
              <CardContent className="flex flex-col gap-5 p-0">
                <Link href={post.href} className="block overflow-hidden">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-olive/20">
                    <img
                      src={post.image}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute bottom-0 left-0 bg-olive px-3 py-1 font-heading text-[11px] tracking-wide text-white">
                      {post.date}
                    </span>
                  </div>
                </Link>
                <Link
                  href={post.href}
                  className="font-heading text-base font-semibold leading-snug text-charcoal"
                >
                  {post.title}
                </Link>
                <p className="font-sans text-sm leading-7 text-body">{post.excerpt}</p>
                <Link
                  href={post.href}
                  className="font-heading text-sm tracking-wide text-olive"
                >
                  Read More
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
