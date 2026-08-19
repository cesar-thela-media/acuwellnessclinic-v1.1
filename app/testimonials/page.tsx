import Testimonial from "@/components/shadcn-space/blocks/testimonial-13/testimonial";
import { getDoc } from "@/lib/content";
import { JsonLd, pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

export function generateMetadata() {
  const doc = getDoc("/testimonials");
  if (!doc) return {};
  return pageMetadata(doc);
}

export default function TestimonialsPage() {
  const doc = getDoc("/testimonials");
  if (!doc) notFound();
  return (
    <article>
      <JsonLd canonicalPath={doc.canonicalPath} metaTitle={doc.metaTitle} metaDescription={doc.metaDescription} />
      <Testimonial />
    </article>
  );
}
