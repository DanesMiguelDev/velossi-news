import { getAllArticles } from "@/lib/articles";

const BASE_URL = "https://velossinews.com.br";

export async function GET() {
  const articles = await getAllArticles();

  const items = articles
    .map(
      (a) => `
    <item>
      <title><![CDATA[${a.title}]]></title>
      <link>${BASE_URL}/artigo/${a.slug}</link>
      <guid>${BASE_URL}/artigo/${a.slug}</guid>
      <description><![CDATA[${a.lede ?? ""}]]></description>
      <author>${a.author ?? "Redação Velossi"}</author>
      <category>${a.category}</category>
      ${a.publishedAt ? `<pubDate>${new Date(a.publishedAt).toUTCString()}</pubDate>` : ""}
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
