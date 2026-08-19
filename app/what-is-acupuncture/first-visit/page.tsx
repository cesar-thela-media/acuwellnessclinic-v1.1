import { FirstVisit } from "@/components/site/first-visit";
import { getDoc } from "@/lib/content";
import { JsonLd, pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

export function generateMetadata() {
  const doc = getDoc("/what-is-acupuncture/first-visit");
  if (!doc) return {};
  return pageMetadata(doc);
}

export default function FirstVisitPage() {
  const doc = getDoc("/what-is-acupuncture/first-visit");
  if (!doc) notFound();
  return (
    <article>
      <JsonLd canonicalPath={doc.canonicalPath} metaTitle={doc.metaTitle} metaDescription={doc.metaDescription} />
      <FirstVisit />
    </article>
  );
}
