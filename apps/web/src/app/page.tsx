import ArticleCard from "@/components/ArticleCard";
import { getHomeArticles } from "@/lib/articles";
import Link from "next/link";
import { categoryToSlug } from "@/lib/articles";

export const revalidate = 60; // ISR: revalida a cada 60s

export default async function HomePage() {
  const { hero, featured, mostRead } = await getHomeArticles();

  return (
    <div className="container mx-auto px-6 py-12 max-w-6xl">

      {/* ── BLOCO 1: MANCHETE PRINCIPAL ── */}
      <article className="mb-24">
        <Link href={`/artigo/${hero.slug}`} className="group block">
          <div className="aspect-[16/9] bg-velossi-stone-100 rounded-md mb-6 overflow-hidden transition-opacity group-hover:opacity-90" />
          <Link
            href={`/categoria/${categoryToSlug[hero.category]}`}
            className="velossi-kicker mb-3"
          >
            {hero.category}
          </Link>
          <h1 className="text-4xl md:text-5xl mt-3 mb-3 leading-tight group-hover:text-velossi-tangerine transition-colors">
            {hero.title}
          </h1>
          {hero.lede && (
            <p className="text-lg text-velossi-stone-700 leading-relaxed mb-3 max-w-2xl">
              {hero.lede}
            </p>
          )}
          <p className="velossi-meta">
            Por {hero.author} · {hero.timeAgo}
          </p>
        </Link>
      </article>

      {/* ── BLOCO 2: DESTAQUES (GRID DE 3) ── */}
      <section className="mb-24">
        <h2 className="velossi-section-title mb-6">Em destaque</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {featured.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* ── BLOCO 3: MAIS LIDAS (3 ITENS) ── */}
      <section className="mb-24">
        <h2 className="velossi-section-title mb-6">Mais lidas</h2>
        <ol className="mt-6">
          {mostRead.slice(0, 3).map((article, index) => (
            <li
              key={article.id}
              className="flex gap-6 py-6 border-b border-velossi-stone-100 last:border-b-0"
            >
              <span className="font-serif text-3xl text-velossi-tangerine font-medium leading-none min-w-[3ch]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <Link href={`/artigo/${article.slug}`} className="flex-1 group">
                <span className="velossi-kicker mb-2">{article.category}</span>
                <h3 className="text-base mt-2 mb-1 leading-snug group-hover:text-velossi-tangerine transition-colors">
                  {article.title}
                </h3>
                <p className="velossi-meta">{article.timeAgo}</p>
              </Link>
            </li>
          ))}
        </ol>
      </section>

    </div>
  );
}
