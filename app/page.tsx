import { WpBody } from "@/components/site/wp-body";
import { getDoc } from "@/lib/content";
import { JsonLd, pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

export function generateMetadata() {
  const doc = getDoc("/");
  if (!doc) return {};
  return pageMetadata(doc);
}

export default function HomePage() {
  const doc = getDoc("/");
  if (!doc) notFound();
  return (
    <article>
      <JsonLd doc={doc} />
      <WpBody html={doc.html} />
    </article>
  );
}
