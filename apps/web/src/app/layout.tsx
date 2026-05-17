import type { Metadata } from "next";
import { Lora, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

// Tipografia (regra do 3: serif + sans + serif itálico via mesma família)
const serif = Lora({
  subsets: ["latin"],
  variable: "--font-serif-google",
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans-google",
  display: "swap",
  weight: ["400", "500", "600"],
});

// SEO técnico (não-negociável — Velossi Project §11)
export const metadata: Metadata = {
  title: {
    default: "Velossi News — A Verdade sem Filtro",
    template: "%s · Velossi News",
  },
  description:
    "Jornalismo direto, sem rodeios. Política, Tecnologia, Economia, Cultura e Mundo, com a curadoria do Velossi News.",
  metadataBase: new URL("https://velossinews.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Velossi News — A Verdade sem Filtro",
    description:
      "Jornalismo direto, sem rodeios. Política, Tecnologia, Economia, Cultura e Mundo.",
    url: "https://velossinews.com",
    siteName: "Velossi News",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Velossi News — A Verdade sem Filtro",
    description: "Jornalismo direto, sem rodeios.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${serif.variable} ${sans.variable}`}>
      <body className="min-h-screen flex flex-col bg-velossi-paper text-velossi-ink">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
