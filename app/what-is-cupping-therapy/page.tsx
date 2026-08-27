import { WhatIsCuppingTherapy } from "@/components/site/modalities";
import { getDoc } from "@/lib/content";
import { JsonLd, pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

export function generateMetadata() {
  const doc = getDoc("/what-is-cupping-therapy");
  if (!doc) return {};
  return pageMetadata(doc);
}

export default function Page() {
  const doc = getDoc("/what-is-cupping-therapy");
  if (!doc) notFound();
  return (
    <article>
      <JsonLd canonicalPath={doc.canonicalPath} metaTitle={doc.metaTitle} metaDescription={doc.metaDescription} />
      <WhatIsCuppingTherapy />
    </article>
  );
}
