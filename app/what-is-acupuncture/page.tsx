import { WhatIsAcupuncture } from "@/components/site/what-is-acupuncture";
import { getDoc } from "@/lib/content";
import { JsonLd, pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

export function generateMetadata() {
  const doc = getDoc("/what-is-acupuncture");
  if (!doc) return {};
  return pageMetadata(doc);
}

export default function WhatIsAcupuncturePage() {
  const doc = getDoc("/what-is-acupuncture");
  if (!doc) notFound();
  return (
    <article>
      <JsonLd canonicalPath={doc.canonicalPath} metaTitle={doc.metaTitle} metaDescription={doc.metaDescription} />
      <WhatIsAcupuncture />
    </article>
  );
}
