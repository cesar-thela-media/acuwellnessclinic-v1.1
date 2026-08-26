import { CampaignArticle } from "@/components/site/campaign-article";
import { CampaignBlog } from "@/components/site/campaign-blog";
import { getAllDocs, getDoc } from "@/lib/content";
import { isArchivePath } from "@/lib/campaign";
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
  const seen = new Set<string>();
  const params: { slug: string[] }[] = [];
  for (const doc of getAllDocs()) {
    if (doc.path === "/" || DESIGNED.has(doc.path)) continue;
    const variants = [doc.path];
    try {
      variants.push(decodeURIComponent(doc.path));
    } catch {
      /* keep stored path */
    }
    variants.push(doc.path.replace(/%ef%bb%bf/gi, "").replace(/\uFEFF/g, ""));
    for (const path of variants) {
      if (!path || path === "/") continue;
      const slug = path.replace(/^\//, "").split("/");
      const key = slug.join("/");
      if (seen.has(key)) continue;
      seen.add(key);
      params.push({ slug });
    }
  }
  return params;
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
      {isArchivePath(doc.path, doc.html) ? (
        <CampaignBlog title={doc.title} html={doc.html} path={doc.path} />
      ) : (
        <CampaignArticle title={doc.title} html={doc.html} path={doc.path} />
      )}
    </article>
  );
}
