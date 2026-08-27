import { ResourcesVideos } from "@/components/site/resources";
import { getDoc } from "@/lib/content";
import { JsonLd, pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

export function generateMetadata() {
  const doc = getDoc("/resources/videos");
  if (!doc) return {};
  return pageMetadata(doc);
}

export default function ResourcesVideosPage() {
  const doc = getDoc("/resources/videos");
  if (!doc) notFound();
  return (
    <article>
      <JsonLd
        canonicalPath={doc.canonicalPath}
        metaTitle={doc.metaTitle}
        metaDescription={doc.metaDescription}
      />
      <ResourcesVideos />
    </article>
  );
}
