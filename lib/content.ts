import all from "@/content/all.json";

export type ContentDoc = {
  path: string;
  type: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  canonicalPath: string;
  date: string;
  modified: string;
  excerpt: string;
  image: string;
  html: string;
  categories: number[];
  tags: number[];
  author: number | null;
  count?: number | null;
  schemaTypes: string[];
};

export function replaceLegacyProviderNames(value: string) {
  const urls: string[] = [];
  let out = value.replace(
    /https?:\/\/[^\s"'<>]+|\/(?:media\/)?wp-content\/[^\s"'<>]+/g,
    (url) => {
      urls.push(url);
      return `__CONTENT_URL_${urls.length - 1}__`;
    },
  );
  out = out
    .replace(/Dr\.?\s*Stefanie Dwyer/gi, "Kate Gannon")
    .replace(/Stefanie Dwyer/gi, "Kate Gannon")
    .replace(/Dr\.?\s*Stefanie's/gi, "Kate's")
    .replace(/Dr\.?\s*Stefanie/gi, "Kate")
    .replace(/Stefanie's/gi, "Kate's")
    .replace(/\bStef's\b/gi, "Kate's")
    .replace(/\bStefanie\b/gi, "Kate")
    .replace(/\bStef\b/gi, "Kate");
  return out.replace(/__CONTENT_URL_(\d+)__/g, (_, index) => urls[Number(index)]);
}

const docs = (all as ContentDoc[]).map((doc) => {
  const replaceOwnerCopy = (value: string) =>
    replaceLegacyProviderNames(value).replace(
      /Schedule Appointment with Becky/gi,
      "Schedule Appointment with Aaron",
    );

  return {
    ...doc,
    title: replaceOwnerCopy(doc.title),
    metaTitle: replaceOwnerCopy(doc.metaTitle),
    metaDescription: replaceOwnerCopy(doc.metaDescription),
    excerpt: replaceOwnerCopy(doc.excerpt),
    html: replaceOwnerCopy(doc.html),
  };
});

function pathKeys(path: string): string[] {
  const keys = new Set<string>([path]);
  try {
    keys.add(decodeURIComponent(path));
  } catch {
    /* keep raw */
  }
  const noBom = path.replace(/%ef%bb%bf/gi, "").replace(/\uFEFF/g, "");
  keys.add(noBom);
  keys.add(`${noBom}%ef%bb%bf`);
  keys.add(`${noBom}\uFEFF`);
  return [...keys];
}

const byPath = new Map<string, ContentDoc>();
for (const doc of docs) {
  for (const key of pathKeys(doc.path)) byPath.set(key, doc);
}

export function getAllDocs(): ContentDoc[] {
  return docs;
}

export function getDoc(urlPath: string): ContentDoc | undefined {
  const normalized = urlPath === "" || urlPath === "/" ? "/" : `/${urlPath.replace(/^\/|\/$/g, "")}`;
  const direct = byPath.get(normalized);
  if (direct) return direct;
  try {
    return byPath.get(decodeURIComponent(normalized));
  } catch {
    return undefined;
  }
}

export function getDocsByType(type: string): ContentDoc[] {
  return docs.filter((d) => d.type === type);
}

export function publicPaths(): string[] {
  return docs.map((d) => d.path);
}
