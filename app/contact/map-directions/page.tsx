import MapBand from "@/components/shadcn-space/blocks/contact-02/map";
import { getDoc } from "@/lib/content";
import { JsonLd, pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

export function generateMetadata() {
  const doc = getDoc("/contact/map-directions");
  if (!doc) return {};
  return pageMetadata(doc);
}

export default function MapDirectionsPage() {
  const doc = getDoc("/contact/map-directions");
  if (!doc) notFound();
  return (
    <article>
      <JsonLd canonicalPath={doc.canonicalPath} metaTitle={doc.metaTitle} metaDescription={doc.metaDescription} />
      <MapBand />
    </article>
  );
}
