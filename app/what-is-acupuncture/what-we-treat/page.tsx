import { WhatWeTreat } from "@/components/site/what-we-treat";
import { getDoc } from "@/lib/content";
import { JsonLd, pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

export function generateMetadata() {
  const doc = getDoc("/what-is-acupuncture/what-we-treat");
  if (!doc) return {};
  return pageMetadata(doc);
}

export default function WhatWeTreatPage() {
  const doc = getDoc("/what-is-acupuncture/what-we-treat");
  if (!doc) notFound();
  return (
    <article>
      <JsonLd canonicalPath={doc.canonicalPath} metaTitle={doc.metaTitle} metaDescription={doc.metaDescription} />
      <WhatWeTreat />
    </article>
  );
}
