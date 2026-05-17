import { allArticles } from "@/lib/articles";

const BASE_URL = "https://velossinews.com.br";

export async function GET() {
  const items = allArticles
    .sort((a, b) => {
      const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return dateB - dateA;
    })
    .map(
      (article) => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${BASE_URL}/artigo/${article.slug}</link>
      <guid>${BASE_URL}/artigo/${article.slug}</guid>
      <description><![CDATA[${article.lede ?? ""}]]></description>
      <author>${article.author ?? "Redação Velossi"}</author>
      <category>${article.category}</category>
      ${article.publishedAt ? `<pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>` : ""}
    </item>`
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Velossi News</title>
    <link>${BASE_URL}</link>
    <description>A Verdade sem Filtro</description>
    <language>pt-BR</language>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
