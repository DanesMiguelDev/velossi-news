import { supabase, type ArticleRow } from "./supabase";

export type ArticleCategory =
  | "Política"
  | "Tecnologia"
  | "Economia"
  | "Cultura"
  | "Brasil e Mundo";

export type Article = {
  id: string;
  slug: string;
  title: string;
  lede?: string;
  body?: string;
  category: ArticleCategory;
  author?: string;
  authorPhoto?: string;
  timeAgo: string;
  publishedAt?: string;
  imageUrl?: string;
  tags?: string[];
  readingTime?: string;
};

export const categories: ArticleCategory[] = [
  "Política",
  "Tecnologia",
  "Economia",
  "Cultura",
  "Brasil e Mundo",
];

export const categorySlugMap: Record<string, ArticleCategory> = {
  politica: "Política",
  tecnologia: "Tecnologia",
  economia: "Economia",
  cultura: "Cultura",
  "brasil-e-mundo": "Brasil e Mundo",
};

export const categoryToSlug: Record<ArticleCategory, string> = {
  Política: "politica",
  Tecnologia: "tecnologia",
  Economia: "economia",
  Cultura: "cultura",
  "Brasil e Mundo": "brasil-e-mundo",
};

// ── HELPERS ──────────────────────────────────────────────────

function rowToArticle(row: ArticleRow): Article {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    lede: row.lede ?? undefined,
    body: row.body ?? undefined,
    category: (row.category_name ?? "Brasil e Mundo") as ArticleCategory,
    author: row.author_name ?? "Redação Velossi",
    authorPhoto: row.author_photo ?? undefined,
    timeAgo: row.published_at ? timeAgo(row.published_at) : "",
    publishedAt: row.published_at ?? undefined,
    imageUrl: row.image_url ?? undefined,
    tags: row.tags,
    readingTime: row.reading_time ?? undefined,
  };
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const h = Math.floor(diff / 3_600_000);
  if (h < 1) return "agora mesmo";
  if (h === 1) return "há 1 hora";
  if (h < 24) return `há ${h} horas`;
  const d = Math.floor(h / 24);
  return d === 1 ? "há 1 dia" : `há ${d} dias`;
}

// ── QUERIES ──────────────────────────────────────────────────

export async function getAllArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from("articles_with_relations")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data as ArticleRow[]).map(rowToArticle);
}

export async function getHomeArticles(): Promise<{
  hero: Article;
  featured: Article[];
  mostRead: Article[];
}> {
  const all = await getAllArticles();
  const [hero, ...rest] = all;
  return {
    hero,
    featured: rest.slice(0, 3),   // regra do 3
    mostRead: rest.slice(3, 6),   // regra do 3
  };
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from("articles_with_relations")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error || !data) return null;
  return rowToArticle(data as ArticleRow);
}

export async function getArticlesByCategory(
  category: ArticleCategory
): Promise<Article[]> {
  const { data, error } = await supabase
    .from("articles_with_relations")
    .select("*")
    .eq("published", true)
    .eq("category_name", category)
    .order("published_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data as ArticleRow[]).map(rowToArticle);
}

export async function getRelatedArticles(
  category: ArticleCategory,
  excludeSlug: string
): Promise<Article[]> {
  const { data, error } = await supabase
    .from("articles_with_relations")
    .select("*")
    .eq("published", true)
    .eq("category_name", category)
    .neq("slug", excludeSlug)
    .order("published_at", { ascending: false })
    .limit(3); // regra do 3

  if (error) throw new Error(error.message);
  return (data as ArticleRow[]).map(rowToArticle);
}

export async function getAllSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from("articles")
    .select("slug")
    .eq("published", true);

  if (error) throw new Error(error.message);
  return (data ?? []).map((r: { slug: string }) => r.slug);
}
