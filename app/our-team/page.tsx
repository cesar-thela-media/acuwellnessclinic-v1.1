import Experts from "@/components/shadcn-space/blocks/team-06/team";
import { getDoc } from "@/lib/content";
import { JsonLd, pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

export function generateMetadata() {
  const doc = getDoc("/our-team");
  if (!doc) return {};
  return pageMetadata(doc);
}

export default function OurTeamPage() {
  const doc = getDoc("/our-team");
  if (!doc) notFound();
  return (
    <article>
      <JsonLd canonicalPath={doc.canonicalPath} metaTitle={doc.metaTitle} metaDescription={doc.metaDescription} />
      <Experts />
    </article>
  );
}
