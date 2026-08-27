import { ResourcesMoreResearch } from "@/components/site/resources";
import { getDoc } from "@/lib/content";
import { JsonLd, pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

export function generateMetadata() {
  const doc = getDoc("/resources/more-research");
  if (!doc) return {};
  return pageMetadata(doc);
}

export default function ResourcesMoreResearchPage() {
  const doc = getDoc("/resources/more-research");
  if (!doc) notFound();
  return (
    <article>
      <JsonLd
        canonicalPath={doc.canonicalPath}
        metaTitle={doc.metaTitle}
        metaDescription={doc.metaDescription}
      />
      <ResourcesMoreResearch />
    </article>
  );
}
