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

const docs = all as ContentDoc[];

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
