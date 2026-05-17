import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-velossi-stone-100 mt-24">
      <div className="container mx-auto px-6 py-12 max-w-6xl">

        {/* Grid de 3 colunas — regra do 3 */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <p className="font-serif text-xl font-medium leading-none">
              Velossi News
            </p>
            <p className="velossi-slogan text-sm mt-2 leading-none">
              A verdade sem filtro
            </p>
          </div>

          <div>
            <p className="text-sm font-medium mb-3">Editorial</p>
            <ul className="space-y-3 text-sm text-velossi-stone-700">
              <li>
                <Link href="/sobre" className="hover:text-velossi-tangerine transition-colors">
                  Sobre o Velossi
                </Link>
              </li>
              <li>
                <Link href="/equipe" className="hover:text-velossi-tangerine transition-colors">
                  Equipe
                </Link>
              </li>
              <li>
                <Link href="/principios" className="hover:text-velossi-tangerine transition-colors">
                  Princípios editoriais
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium mb-3">Institucional</p>
            <ul className="space-y-3 text-sm text-velossi-stone-700">
              <li>
                <Link href="/contato" className="hover:text-velossi-tangerine transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/privacidade" className="hover:text-velossi-tangerine transition-colors">
                  Política de privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos" className="hover:text-velossi-tangerine transition-colors">
                  Termos de uso
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-velossi-stone-100 flex justify-between items-center text-xs text-velossi-stone-400">
          <span>© Velossi News {year}</span>
          <span className="velossi-slogan">A verdade sem filtro</span>
        </div>
      </div>
    </footer>
  );
}
