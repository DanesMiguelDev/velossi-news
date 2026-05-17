import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getAllSlugs,
  getArticleBySlug,
  getRelatedArticles,
  categoryToSlug,
} from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.lede,
    openGraph: {
      title: article.title,
      description: article.lede,
      type: "article",
      publishedTime: article.publishedAt,
      authors: article.author ? [article.author] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.lede,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const related = await getRelatedArticles(article.category, article.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.lede,
    author: { "@type": "Person", name: article.author ?? "Redação Velossi" },
    publisher: {
      "@type": "Organization",
      name: "Velossi News",
      url: "https://velossinews.com.br",
    },
    datePublished: article.publishedAt,
    articleSection: article.category,
    keywords: article.tags?.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main>
        {/* ── CABEÇALHO DO ARTIGO ── */}
        <header className="container mx-auto px-6 pt-12 pb-6 max-w-3xl">
          <Link
            href={`/categoria/${categoryToSlug[article.category]}`}
            className="velossi-kicker mb-6 inline-block hover:underline"
          >
            {article.category}
          </Link>

          <h1 className="text-4xl md:text-5xl mt-3 mb-6 leading-tight">
            {article.title}
          </h1>

          {article.lede && (
            <p className="text-xl text-velossi-stone-700 leading-relaxed mb-6 font-sans">
              {article.lede}
            </p>
          )}

          <div className="flex items-center gap-3 py-6 border-t border-b border-velossi-stone-100">
            <div className="w-9 h-9 rounded-full bg-velossi-stone-100 flex-shrink-0" />
            <div>
              <p className="text-sm font-sans font-medium text-velossi-ink">
                {article.author ?? "Redação Velossi"}
              </p>
              <p className="velossi-meta">
                {article.timeAgo}
                {article.readingTime && <> · {article.readingTime} de leitura</>}
              </p>
            </div>
          </div>
        </header>

        {/* ── IMAGEM PRINCIPAL ── */}
        <div className="w-full aspect-[16/9] bg-velossi-stone-100 mb-12" />

        {/* ── CORPO DO ARTIGO ── */}
        <div className="container mx-auto px-6 max-w-[36rem]">
          {article.body ? (
            <div
              className="article-body"
              dangerouslySetInnerHTML={{ __html: article.body }}
            />
          ) : (
            <p className="text-velossi-stone-400 italic">
              Conteúdo completo em breve.
            </p>
          )}

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-12 pt-6 border-t border-velossi-stone-100">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-sans px-3 py-1 rounded-md bg-velossi-tangerine-50 text-velossi-tangerine-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Compartilhamento */}
          <div className="mt-6 pt-6 border-t border-velossi-stone-100">
            <p className="velossi-meta mb-3">Compartilhar</p>
            <div className="flex gap-3">
              {["X (Twitter)", "WhatsApp", "LinkedIn"].map((rede) => (
                <span
                  key={rede}
                  className="text-xs font-sans px-3 py-1 rounded-md border border-velossi-stone-100 text-velossi-stone-700 cursor-pointer hover:border-velossi-tangerine hover:text-velossi-tangerine transition-colors"
                >
                  {rede}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── RELACIONADOS (3 — REGRA DO 3) ── */}
        {related.length > 0 && (
          <section className="container mx-auto px-6 py-24 max-w-6xl border-t border-velossi-stone-100 mt-24">
            <h2 className="velossi-section-title mb-6">Leia também</h2>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              {related.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
