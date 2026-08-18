import type { MetadataRoute } from "next";
import { publicPaths } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPaths().map((path) => ({
    url: path === "/" ? `${site.url}/` : `${site.url}${path}/`,
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));
}
