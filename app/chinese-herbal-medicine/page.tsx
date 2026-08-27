import { ChineseHerbalMedicine } from "@/components/site/chinese-herbal-medicine";
import { getDoc } from "@/lib/content";
import { JsonLd, pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

export function generateMetadata() {
  const doc = getDoc("/chinese-herbal-medicine");
  if (!doc) return {};
  return pageMetadata(doc);
}

export default function ChineseHerbalMedicinePage() {
  const doc = getDoc("/chinese-herbal-medicine");
  if (!doc) notFound();
  return (
    <article>
      <JsonLd
        canonicalPath={doc.canonicalPath}
        metaTitle={doc.metaTitle}
        metaDescription={doc.metaDescription}
      />
      <ChineseHerbalMedicine />
    </article>
  );
}
