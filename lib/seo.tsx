import { site } from "@/lib/site";
import type { ContentDoc } from "@/lib/content";

export function pageMetadata(doc: ContentDoc) {
  const path = doc.canonicalPath === "/" ? "/" : `${doc.canonicalPath}/`;
  const url = `${site.url}${path === "/" ? "/" : path}`;
  const image = doc.image || site.media.logo;
  return {
    title: { absolute: doc.metaTitle || site.titleHome },
    description: doc.metaDescription || undefined,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title: doc.metaTitle || site.titleHome,
      description: doc.metaDescription || site.tagline,
      url,
      siteName: site.name,
      locale: "en_US",
      type: "website" as const,
      images: [{ url: image, alt: doc.title || site.name }],
    },
  };
}

export function JsonLd({ doc }: { doc: ContentDoc }) {
  const path = doc.canonicalPath === "/" ? "/" : `${doc.canonicalPath}/`;
  const url = `${site.url}${path === "/" ? "/" : path}`;
  const crumbs = [{ name: "Home", item: `${site.url}/` }];
  if (doc.canonicalPath !== "/") {
    const parts = doc.canonicalPath.split("/").filter(Boolean);
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
      name: doc.metaTitle,
      description: doc.metaDescription,
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
      image: site.media.logo,
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
