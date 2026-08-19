import Contact from "@/components/shadcn-space/blocks/contact-02/contact";
import { getDoc } from "@/lib/content";
import { JsonLd, pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

export function generateMetadata() {
  const doc = getDoc("/contact");
  if (!doc) return {};
  return pageMetadata(doc);
}

export default function ContactPage() {
  const doc = getDoc("/contact");
  if (!doc) notFound();
  return (
    <article>
      <JsonLd canonicalPath={doc.canonicalPath} metaTitle={doc.metaTitle} metaDescription={doc.metaDescription} />
      <Contact />
    </article>
  );
}
