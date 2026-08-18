import { WpBody } from "@/components/site/wp-body";
import { getAllDocs, getDoc } from "@/lib/content";
import { JsonLd, pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string[] }> };

export function generateStaticParams() {
  return getAllDocs()
    .filter((d) => d.path !== "/")
    .map((d) => ({ slug: d.path.replace(/^\//, "").split("/") }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const doc = getDoc(`/${slug.join("/")}`);
  if (!doc) return {};
  return pageMetadata(doc);
}

export default async function CatchAllPage({ params }: Props) {
  const { slug } = await params;
  const doc = getDoc(`/${slug.join("/")}`);
  if (!doc) notFound();
  return (
    <article>
      <JsonLd doc={doc} />
      <WpBody html={doc.html} />
    </article>
  );
}
