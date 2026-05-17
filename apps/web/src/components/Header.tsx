import Link from "next/link";

// Categorias v1 (Velossi Project §6)
const categories = [
  { slug: "politica", label: "Política" },
  { slug: "tecnologia", label: "Tecnologia" },
  { slug: "economia", label: "Economia" },
  { slug: "cultura", label: "Cultura" },
  { slug: "brasil-e-mundo", label: "Brasil e Mundo" },
];

export default function Header() {
  return (
    <header className="border-b border-velossi-stone-100">
      {/* Linha 1 — marca + ações */}
      <div className="container mx-auto px-6 py-6 max-w-6xl flex items-end justify-between">
        <Link href="/" className="block group">
          <h1 className="font-serif text-3xl md:text-4xl font-medium leading-none tracking-tight group-hover:text-velossi-tangerine transition-colors">
            Velossi News
          </h1>
          <p className="velossi-slogan text-sm mt-2 leading-none">
            A verdade sem filtro
          </p>
        </Link>

        <div className="flex gap-6 text-velossi-stone-700">
          <button
            aria-label="Buscar"
            className="hover:text-velossi-tangerine transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>
          <button
            aria-label="Abrir menu"
            className="md:hidden hover:text-velossi-tangerine transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Linha 2 — navegação por categoria */}
      <nav
        className="border-t border-velossi-stone-100"
        aria-label="Navegação principal"
      >
        <div className="container mx-auto px-6 max-w-6xl">
          <ul className="flex gap-6 py-3 overflow-x-auto text-sm font-medium">
            {categories.map((cat) => (
              <li key={cat.slug} className="whitespace-nowrap">
                <Link
                  href={`/categoria/${cat.slug}`}
                  className="hover:text-velossi-tangerine transition-colors"
                >
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
