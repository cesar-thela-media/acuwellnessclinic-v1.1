import FAQ from "@/components/shadcn-space/blocks/faq-05/faq";
import { getDoc } from "@/lib/content";
import { JsonLd, pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

export function generateMetadata() {
  const doc = getDoc("/treatment-modalities");
  if (!doc) return {};
  return pageMetadata(doc);
}

export default function TreatmentModalitiesPage() {
  const doc = getDoc("/treatment-modalities");
  if (!doc) notFound();
  return (
    <article>
      <JsonLd canonicalPath={doc.canonicalPath} metaTitle={doc.metaTitle} metaDescription={doc.metaDescription} />
      <FAQ />
    </article>
  );
}
