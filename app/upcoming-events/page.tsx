import UpcomingEvents from "@/components/site/upcoming-events";
import { getDoc } from "@/lib/content";
import { JsonLd, pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

export function generateMetadata() {
  const doc = getDoc("/upcoming-events");
  if (!doc) return {};
  return pageMetadata(doc);
}

export default function UpcomingEventsPage() {
  const doc = getDoc("/upcoming-events");
  if (!doc) notFound();
  return (
    <article>
      <JsonLd canonicalPath={doc.canonicalPath} metaTitle={doc.metaTitle} metaDescription={doc.metaDescription} />
      <UpcomingEvents />
    </article>
  );
}
