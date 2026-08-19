import ClinicForms from "@/components/shadcn-space/blocks/contact-02/clinic-forms";
import { getDoc } from "@/lib/content";
import { JsonLd, pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

export function generateMetadata() {
  const doc = getDoc("/clinic-forms");
  if (!doc) return {};
  return pageMetadata(doc);
}

export default function ClinicFormsPage() {
  const doc = getDoc("/clinic-forms");
  if (!doc) notFound();
  return (
    <article>
      <JsonLd canonicalPath={doc.canonicalPath} metaTitle={doc.metaTitle} metaDescription={doc.metaDescription} />
      <ClinicForms />
    </article>
  );
}
