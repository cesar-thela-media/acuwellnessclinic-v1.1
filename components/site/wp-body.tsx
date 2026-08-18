import { ContactForm } from "@/components/site/contact-form";

export function WpBody({ html }: { html: string }) {
  const parts = html.split("<!--SITE_CONTACT_FORM-->");
  return (
    <div className="prose-wp">
      {parts.map((part, i) => (
        <div key={i}>
          <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: part }} />
          {i < parts.length - 1 ? <ContactForm /> : null}
        </div>
      ))}
    </div>
  );
}
