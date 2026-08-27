import { HealthWellNews } from "@/components/site/health-well-news";
import { getDoc } from "@/lib/content";
import { JsonLd, pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

export function generateMetadata() {
  const doc = getDoc("/health-well-news");
  if (!doc) return {};
  return pageMetadata(doc);
}

export default function Page() {
  const doc = getDoc("/health-well-news");
  if (!doc) notFound();
  return (
    <article>
      <JsonLd
        canonicalPath={doc.canonicalPath}
        metaTitle={doc.metaTitle}
        metaDescription={doc.metaDescription}
      />
      <HealthWellNews />
    </article>
  );
}
