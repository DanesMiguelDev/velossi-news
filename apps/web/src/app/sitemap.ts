import type { MetadataRoute } from "next";
import { allArticles, categories, categoryToSlug } from "@/lib/articles";

const BASE_URL = "https://velossinews.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  const articleRoutes = allArticles.map((article) => ({
    url: `${BASE_URL}/artigo/${article.slug}`,
    lastModified: article.publishedAt ? new Date(article.publishedAt) : new Date(),
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
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1,
    },
    ...categoryRoutes,
    ...articleRoutes,
  ];
}
