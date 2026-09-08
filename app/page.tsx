import Hero29 from "@/components/shadcn-space/blocks/hero-29/hero";
import GetStarted from "@/components/shadcn-space/blocks/cta-05/cta";
import AboutUs from "@/components/shadcn-space/blocks/about-us-11/about-us";
import Blog from "@/components/shadcn-space/blocks/blog-02/blog";
import { getDoc } from "@/lib/content";
import { JsonLd, pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

export function generateMetadata() {
  const doc = getDoc("/");
  if (!doc) return {};
  return pageMetadata(doc);
}

export default function HomePage() {
  const doc = getDoc("/");
  if (!doc) notFound();
  return (
    <article className="home-page">
      <JsonLd canonicalPath={doc.canonicalPath} metaTitle={doc.metaTitle} metaDescription={doc.metaDescription} />
      <Hero29 />
      <GetStarted />
      <AboutUs />
      <Blog />
    </article>
  );
}
