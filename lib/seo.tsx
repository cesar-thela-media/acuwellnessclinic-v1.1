import { site } from "@/lib/site";
import type { ContentDoc } from "@/lib/content";

function cleanText(value: string) {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&hellip;/g, "…")
    .replace(/\s+/g, " ")
    .trim();
}

function descriptionFor(doc: ContentDoc) {
  return doc.metaDescription || cleanText(doc.excerpt) || site.tagline;
}

function localImage(value: string) {
  return value.replace(
    /^https?:\/\/(?:www\.)?acuwellnessclinic\.com\/wp-content\//i,
    "/media/wp-content/",
  );
}

export function pageMetadata(doc: ContentDoc) {
  const path = doc.canonicalPath === "/" ? "/" : `${doc.canonicalPath}/`;
  const url = `${site.url}${path === "/" ? "/" : path}`;
  const image = localImage(doc.image || site.media.logo);
  const description = descriptionFor(doc);
  return {
    title: { absolute: doc.metaTitle || site.titleHome },
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title: doc.metaTitle || site.titleHome,
      description,
      url,
      siteName: site.name,
      locale: "en_US",
      type: "website" as const,
      images: [{ url: image, alt: doc.title || site.name }],
    },
  };
}

export function JsonLd({
  canonicalPath,
  metaTitle,
  metaDescription,
}: {
  canonicalPath: string;
  metaTitle: string;
  metaDescription: string;
}) {
  const path = canonicalPath === "/" ? "/" : `${canonicalPath}/`;
  const url = `${site.url}${path === "/" ? "/" : path}`;
  const description = cleanText(metaDescription) || site.tagline;
  const crumbs = [{ name: "Home", item: `${site.url}/` }];
  if (canonicalPath !== "/") {
    const parts = canonicalPath.split("/").filter(Boolean);
    let acc = "";
    for (const part of parts) {
      acc += `/${part}`;
      crumbs.push({ name: part, item: `${site.url}${acc}/` });
    }
  }

  const graph = [
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: metaTitle,
      description,
      isPartOf: { "@id": `${site.url}/#website` },
      inLanguage: site.inLanguage,
      breadcrumb: { "@id": `${url}#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: c.item,
      })),
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: `${site.url}/`,
      name: site.name,
      description: site.tagline,
      inLanguage: site.inLanguage,
    },
    {
      "@type": ["MedicalClinic", "LocalBusiness"],
      "@id": `${site.url}/#clinic`,
      name: site.legalName,
      url: `${site.url}/`,
      telephone: site.phoneDisplay,
      image: `${site.url}${site.media.logo}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        addressLocality: site.address.city,
        addressRegion: site.address.region,
        postalCode: site.address.postal,
        addressCountry: site.address.country,
      },
      openingHours: site.openingHoursSpec,
      sameAs: [site.social.facebook, site.social.instagram, site.social.reviews],
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}
