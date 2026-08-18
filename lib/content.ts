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
const byPath = new Map(docs.map((d) => [d.path, d]));

export function getAllDocs(): ContentDoc[] {
  return docs;
}

export function getDoc(urlPath: string): ContentDoc | undefined {
  const normalized = urlPath === "" || urlPath === "/" ? "/" : `/${urlPath.replace(/^\/|\/$/g, "")}`;
  return byPath.get(normalized);
}

export function getDocsByType(type: string): ContentDoc[] {
  return docs.filter((d) => d.type === type);
}

export function publicPaths(): string[] {
  return docs.map((d) => d.path);
}
