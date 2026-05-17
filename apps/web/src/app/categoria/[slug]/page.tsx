import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  categories,
  categorySlugMap,
  categoryToSlug,
  getArticlesByCategory,
} from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return categories.map((cat) => ({ slug: categoryToSlug[cat] }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = categorySlugMap[slug];
  if (!category) return {};

  return {
    title: `${category} — Velossi News`,
    description: `As últimas notícias de ${category} no Velossi News. A verdade sem filtro.`,
    openGraph: {
      title: `${category} — Velossi News`,
      description: `As últimas notícias de ${category} no Velossi News.`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = categorySlugMap[slug];
  if (!category) notFound();

  const categoryArticles = getArticlesByCategory(category);

  return (
    <main className="container mx-auto px-6 py-12 max-w-6xl">
      {/* ── CABEÇALHO DA CATEGORIA ── */}
      <header className="mb-12 pb-6 border-b border-velossi-stone-100">
        <span className="velossi-kicker mb-3 block">{category}</span>
        <h1 className="text-5xl md:text-6xl leading-tight">
          {category}
        </h1>
        <p className="velossi-meta mt-3">
          {categoryArticles.length} artigo{categoryArticles.length !== 1 ? "s" : ""}
        </p>
      </header>

      {/* ── LISTA DE ARTIGOS EM GRID DE 3 ── */}
      {categoryArticles.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-6">
          {categoryArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <p className="text-velossi-stone-400 font-sans">
          Nenhum artigo nesta categoria ainda.
        </p>
      )}
    </main>
  );
}
