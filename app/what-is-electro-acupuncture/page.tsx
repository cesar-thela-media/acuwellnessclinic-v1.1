import { WhatIsElectroAcupuncture } from "@/components/site/modalities";
import { getDoc } from "@/lib/content";
import { JsonLd, pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

export function generateMetadata() {
  const doc = getDoc("/what-is-electro-acupuncture");
  if (!doc) return {};
  return pageMetadata(doc);
}

export default function Page() {
  const doc = getDoc("/what-is-electro-acupuncture");
  if (!doc) notFound();
  return (
    <article>
      <JsonLd canonicalPath={doc.canonicalPath} metaTitle={doc.metaTitle} metaDescription={doc.metaDescription} />
      <WhatIsElectroAcupuncture />
    </article>
  );
}
