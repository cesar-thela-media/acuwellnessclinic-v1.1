import { QA } from "@/components/site/qa";
import { getDoc } from "@/lib/content";
import { JsonLd, pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

export function generateMetadata() {
  const doc = getDoc("/what-is-acupuncture/q-a");
  if (!doc) return {};
  return pageMetadata(doc);
}

export default function QAPage() {
  const doc = getDoc("/what-is-acupuncture/q-a");
  if (!doc) notFound();
  return (
    <article>
      <JsonLd canonicalPath={doc.canonicalPath} metaTitle={doc.metaTitle} metaDescription={doc.metaDescription} />
      <QA />
    </article>
  );
}
