import { DumpPage } from "@/components/site/dump-page";
import { getAllDocs, getDoc } from "@/lib/content";
import { JsonLd, pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string[] }> };

const DESIGNED = new Set([
  "/about-us",
  "/our-team",
  "/testimonials",
  "/treatment-modalities",
  "/contact",
  "/contact/map-directions",
  "/clinic-forms",
  "/what-is-acupuncture",
  "/what-is-acupuncture/what-we-treat",
  "/what-is-acupuncture/first-visit",
  "/what-is-acupuncture/q-a",
]);

export function generateStaticParams() {
  return getAllDocs()
    .filter((d) => d.path !== "/" && !DESIGNED.has(d.path))
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
      <JsonLd canonicalPath={doc.canonicalPath} metaTitle={doc.metaTitle} metaDescription={doc.metaDescription} />
      <DumpPage title={doc.title} html={doc.html} path={doc.path} />
    </article>
  );
}
