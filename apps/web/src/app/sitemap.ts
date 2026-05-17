import type { MetadataRoute } from "next";
import { getAllSlugs, categories, categoryToSlug } from "@/lib/articles";

const BASE_URL = "https://velossinews.com.br";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllSlugs();

  const articleRoutes = slugs.map((slug) => ({
    url: `${BASE_URL}/artigo/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categoryRoutes = categories.map((cat) => ({
    url: `${BASE_URL}/categoria/${categoryToSlug[cat]}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.6,
  }));

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "hourly", priority: 1 },
    ...categoryRoutes,
    ...articleRoutes,
  ];
}
