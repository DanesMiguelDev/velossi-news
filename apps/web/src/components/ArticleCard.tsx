import Link from "next/link";
import type { Article } from "@/lib/articles";

type ArticleCardProps = {
  article: Article;
};

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="group">
      <Link href={`/artigo/${article.slug}`} className="block">
        <div className="aspect-[16/10] bg-velossi-ink rounded-md mb-3 overflow-hidden transition-opacity group-hover:opacity-90" />

        <span className="velossi-kicker mb-2">{article.category}</span>

        <h3 className="font-serif text-lg font-medium leading-snug mt-2 mb-2 group-hover:text-velossi-tangerine transition-colors">
          {article.title}
        </h3>

        <p className="velossi-meta">
          {article.author ? `Por ${article.author} · ` : ""}
          {article.timeAgo}
        </p>
      </Link>
    </article>
  );
}
