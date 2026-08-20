import { QA } from "@/components/site/qa";
import { getDoc } from "@/lib/content";
import { JsonLd, pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

const QA_PATHS = [
  "/apw_qa/does-it-hurt",
  "/apw_qa/how-are-acupuncturists-educated",
  "/apw_qa/how-many-treatments-will-i-need",
  "/apw_qa/how-much-does-it-cost",
  "/apw_qa/how-safe-is-acupuncture",
  "/apw_qa/how-should-i-prepare",
  "/apw_qa/is-acupuncture-safe-for-children",
  "/apw_qa/what-can-acupuncturists-treat",
  "/apw_qa/what-will-my-acupuncturist-do",
  "/apw_qa/why-did-my-acupuncturist-recommend-herbs",
  "/apw_qa/why-do-they-want-to-feel-my-pulse",
  "/apw_qa/why-do-they-want-to-look-at-my-tongue",
  "/apw_qa/will-my-insurance-cover-acupuncture",
] as const;

export function generateMetadata() {
  const doc = getDoc("/what-is-acupuncture/q-a");
  if (!doc) return {};
  return pageMetadata(doc);
}

export default function QAPage() {
  const doc = getDoc("/what-is-acupuncture/q-a");
  if (!doc) notFound();
  const items = QA_PATHS.map((path) => {
    const item = getDoc(path);
    if (!item) return null;
    return { title: item.title, html: item.html };
  }).filter((item): item is { title: string; html: string } => item !== null);
  return (
    <article>
      <JsonLd canonicalPath={doc.canonicalPath} metaTitle={doc.metaTitle} metaDescription={doc.metaDescription} />
      <QA items={items} />
    </article>
  );
}
