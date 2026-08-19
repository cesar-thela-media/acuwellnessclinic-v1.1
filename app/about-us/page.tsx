import AboutUs06 from "@/components/shadcn-space/blocks/about-us-06/about-us";
import { getDoc } from "@/lib/content";
import { JsonLd, pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

export function generateMetadata() {
  const doc = getDoc("/about-us");
  if (!doc) return {};
  return pageMetadata(doc);
}

export default function AboutUsPage() {
  const doc = getDoc("/about-us");
  if (!doc) notFound();
  return (
    <article>
      <JsonLd canonicalPath={doc.canonicalPath} metaTitle={doc.metaTitle} metaDescription={doc.metaDescription} />
      <AboutUs06 />
    </article>
  );
}
