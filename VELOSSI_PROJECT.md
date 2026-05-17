# Velossi News — Briefing Oficial do Projeto

> **Para qualquer agente de IA que vai trabalhar neste repositório:**
> Leia este arquivo POR INTEIRO antes de propor qualquer mudança de código,
> arquitetura ou design. Ele é a fonte da verdade do projeto.

---

## 1. Identidade

| Campo | Valor |
|---|---|
| **Nome** | Velossi News |
| **Slogan** | A Verdade sem Filtro |
| **Tom** | Jornalismo sério, moderno, sem sensacionalismo |
| **Idioma principal** | Português brasileiro (pt-BR) |
| **Status** | Em construção — primeiro passo de um ecossistema de notícias maior |

---

## 2. Princípio Transversal: A Regra do Três

O **número 3** é uma constante de design intencional em todo o ecossistema Velossi. Sempre que houver escolha entre quantidades, **prefira 3** (ou múltiplos: 6, 9, 12, 24, 48, 96).

Aplicações concretas:

- **Paleta principal**: 3 cores
- **Tipografia**: 3 níveis (serif, sans, serif itálico)
- **Espaçamento**: múltiplos de 3 (`3, 6, 12, 24, 48, 96` px)
- **Border-radius**: `3, 6, 12` px
- **Hierarquia da home**: 3 zonas (Manchete / Destaques / Mais lidas)
- **Grids de destaque**: 3 colunas no desktop
- **Listas de "mais lidas / relacionadas"**: 3 itens
- **Formulários**: no máximo 3 campos por etapa
- **Arquitetura**: 3 camadas (Web / Admin / Mobile)

Se a escolha pela quantidade 3 prejudicar usabilidade num caso específico, sinalize antes de aplicar. Em caso de dúvida, mantenha o 3 e busque alternativa de layout.

---

## 3. Arquitetura Macro

```
┌─────────────────────────────────────────────────────────┐
│                  BACKEND / API                          │
│           PostgreSQL + REST/GraphQL                     │
│         (sugestão de stack: Supabase)                   │
└──────────┬──────────────┬───────────────┬───────────────┘
           │              │               │
     ┌─────▼──────┐ ┌─────▼───────┐ ┌─────▼─────────┐
     │ WEB (v1)   │ │ ADMIN (v1)  │ │ MOBILE (v3)   │
     │ Next.js 15 │ │  Flutter    │ │   Flutter     │
     │ React + TS │ │  (Web/Desk) │ │ (iOS/Android) │
     │  → SEO     │ │ → Publicar  │ │ → Leitura     │
     └────────────┘ └─────────────┘ └───────────────┘
```

**Decisão crítica**: Web pública em **Next.js** (não Flutter) porque sites de notícia vivem de SEO, e Flutter Web renderiza em canvas — Googlebot não indexa. Flutter fica para painel admin e app mobile, onde brilha.

---

## 4. Stack Técnica (recomendada)

### Web (`apps/web`)
- **Framework**: Next.js 15+ com App Router
- **Linguagem**: TypeScript (strict mode)
- **Estilos**: Tailwind CSS v4 + CSS custom para tipografia editorial
- **Fontes**: `next/font` (Google Fonts)
- **Imagens**: `next/image`
- **SEO**: Metadata API + JSON-LD (Article schema) + sitemap dinâmico + RSS
- **Hosting sugerido**: Vercel (free tier + edge SSR)

### Admin (`apps/admin`)
- **Framework**: Flutter (Web ou Desktop, decisão em aberto)
- **Linguagem**: Dart
- **State management**: Riverpod ou BLoC (a definir)
- **Funções v1**: criar/editar/publicar artigos, upload de imagem, gerenciar categorias e autores

### Backend / Banco (`packages/api` ou serviço)
- **Sugestão MVP**: **Supabase** (PostgreSQL + Auth + Storage + Realtime + REST/GraphQL gerado automaticamente)
- **Alternativa**: Node.js (Fastify/Hono) + PostgreSQL + Prisma
- **Critério de escolha**: tempo até MVP vs. controle fino

### Estrutura sugerida de monorepo

```
velossi/
├── apps/
│   ├── web/              # Next.js — site público
│   └── admin/            # Flutter — painel editorial
├── packages/
│   ├── ui/               # design system compartilhado (web)
│   └── types/            # tipos TS gerados do schema da API
├── docs/
│   └── VELOSSI_PROJECT.md  # este arquivo
└── README.md
```

---

## 5. Sistema de Design

### 5.1 Paleta (3 cores)

| Token | Hex | Uso |
|---|---|---|
| `--velossi-ink` | `#0A0A0A` | Texto principal, manchetes, autoridade |
| `--velossi-paper` | `#FFFFFF` | Fundos, respiro, espaço em branco |
| `--velossi-truth` | `#A32D2D` | Acento, categoria, slogan, "verdade sem filtro" |

**Neutros de apoio** (infraestrutura, não contam como "cores da marca"):
- `--velossi-stone-100` `#F5F5F5` (fundos secundários)
- `--velossi-stone-400` `#9C9C9C` (texto muted)
- `--velossi-stone-700` `#3F3F3F` (texto secundário)

Dark mode: inverter ink/paper e ajustar truth para `#E24B4A`.

### 5.2 Tipografia (3 níveis)

| Nível | Família | Uso | Sugestão Google Fonts |
|---|---|---|---|
| **Serif** | `var(--font-serif)` | Manchetes, logo, títulos editoriais | **Source Serif 4** ou **PT Serif** |
| **Sans** | `var(--font-sans)` | Corpo, UI, navegação, metadados | **Inter** ou **IBM Plex Sans** |
| **Serif Italic** | derivado do serif | Slogan, citações, kickers | mesmo serif, estilo itálico |

Escala (em rem, base 16px):

- `h1` manchete principal: `2.5rem` (40px) / line-height 1.1
- `h2` manchete secundária: `1.5rem` (24px) / line-height 1.2
- `h3` título de card: `1.125rem` (18px) / line-height 1.3
- `body` corpo: `1rem` (16px) / line-height 1.7
- `meta` byline/data: `0.75rem` (12px) / line-height 1.4

Pesos usados: **400 regular** e **600 semibold** apenas. Sem italic decorativo (só no slogan e em citações dentro do texto).

### 5.3 Espaçamento

Múltiplos de 3: `3, 6, 12, 24, 48, 96` px (variáveis Tailwind: `0.75, 1.5, 3, 6, 12, 24` em rem).

### 5.4 Border-radius

`3px` (botões pequenos), `6px` (inputs, cards), `12px` (modais, containers grandes).

---

## 6. Categorias Editoriais (v1)

Atualmente 5 categorias (pode ser consolidada em 3 pilares depois):

1. **Política** — política nacional, atualidades, governo, eleições
2. **Tecnologia** — inovação, ciência, IA, startups
3. **Economia** — negócios, mercado, finanças pessoais
4. **Cultura** — entretenimento, cinema, música, comportamento
5. **Brasil & Mundo** — cobertura nacional + internacional

Cada artigo: **uma** categoria principal + tags livres.

---

## 7. Estrutura da Home (MVP)

```
[Cabeçalho]
  Logo "Velossi News" (serif) + slogan "A verdade sem filtro" (serif italic, vermelho)
  Nav horizontal: Política · Tecnologia · Economia · Cultura · Brasil e Mundo
  Ícones: busca, menu mobile

[Bloco 1 — Manchete principal]
  Imagem hero 16:9 + categoria + título serif grande + lede + byline

[Bloco 2 — Destaques (grid de 3 colunas)]
  3 cards: imagem 16:10 + categoria + título serif médio + byline

[Bloco 3 — Mais lidas]
  Lista numerada 01/02/03 com categoria, título e tempo

[Rodapé]
  Copyright + slogan + links (Sobre · Contato · Política de privacidade)
```

---

## 8. Página de Artigo (MVP)

```
[Cabeçalho global — igual à home]

[Cabeçalho do artigo]
  Categoria (vermelho, kicker)
  Título serif grande (h1)
  Lede em sans destacado
  Byline: foto do autor + nome + data + tempo de leitura
  Imagem principal full-width

[Corpo do artigo]
  Tipografia editorial:
    - max-width: 36rem (legibilidade)
    - parágrafos com line-height 1.7
    - intertítulos h2 em serif
    - citações com aspas grandes e fonte serif italic
    - imagens com legenda
    - links em vermelho velossi-truth

[Final do artigo]
  Tags
  3 artigos relacionados (mesma categoria)
  Compartilhamento social

[Rodapé global]
```

---

## 9. Escopo MVP (v1)

**Tem que ter:**

- [ ] Homepage com hero + 3 destaques + 3 mais lidas
- [ ] Página de artigo com tipografia editorial
- [ ] Páginas de categoria (5)
- [ ] Busca simples (por título)
- [ ] Layout responsivo mobile-first
- [ ] SEO técnico completo:
  - Meta tags dinâmicas
  - Open Graph + Twitter Cards
  - Schema.org Article (JSON-LD)
  - Sitemap.xml dinâmico
  - RSS feed
  - robots.txt
- [ ] Performance: Core Web Vitals todos em "Good"
- [ ] Painel admin Flutter:
  - Login
  - CRUD de artigos (com editor rico)
  - Upload de imagem
  - CRUD de categorias e autores
  - Preview do artigo antes de publicar

**Não entra no v1 (vai pra v2/v3):**

- ❌ Newsletter
- ❌ Comentários
- ❌ Dark mode (mas o sistema de tokens já prepara)
- ❌ Personalização
- ❌ Push notifications
- ❌ App mobile (Flutter) — vai pro v3
- ❌ Multimedia avançada (vídeo player, podcast)
- ❌ Paywall ou login de leitor

---

## 10. Roadmap

| Versão | Objetivo | Entregáveis |
|---|---|---|
| **v1** | Velossi News no ar | Web + Admin + 5 categorias + SEO + 1ª publicação |
| **v2** | Engajamento | Newsletter, comentários, dark mode, artigos relacionados, tempo de leitura |
| **v3** | Ecossistema | App mobile Flutter, push notifications, podcast/vídeo, personalização |

---

## 11. Princípios Técnicos Não-Negociáveis

1. **SEO antes de qualquer brilho técnico.** Cada rota nova deve ter meta tags dinâmicas, OG image, JSON-LD. Sem exceção.
2. **Mobile-first.** A maioria dos leitores estará no celular. Todo componente é projetado primeiro pra 360px de largura.
3. **Performance é feature.** Imagens otimizadas via `next/image`, fontes via `next/font` com `display: swap`, sem JavaScript pesado em rotas de leitura.
4. **Acessibilidade básica.** Contraste AA, navegação por teclado, `alt` em toda imagem, landmarks semânticas (`<header>`, `<main>`, `<article>`, `<nav>`).
5. **Conteúdo é o produto.** UI nunca compete com a manchete. Hierarquia tipográfica > ornamento.
6. **A regra do 3.** Já explicada na seção 2.

---

## 12. Como Trabalhar com Este Repositório (instruções para a IA)

1. **Sempre leia este arquivo primeiro** ao iniciar uma sessão neste repositório.
2. Respeite a **regra do 3** ao tomar decisões de design e estrutura.
3. **Não introduza dependências pesadas** sem justificar — projeto de notícia precisa carregar rápido.
4. **Escreva conteúdo de exemplo em pt-BR** (manchetes, ledes, nomes de autor).
5. Antes de mudar arquitetura macro (stack, monorepo, banco), **proponha primeiro num comentário** ou commit message e peça confirmação.
6. **Commits em pt-BR** no imperativo: `adiciona página de artigo`, `corrige meta tags da home`.
7. Quando criar componentes: nomeie em inglês (`ArticleCard`, `CategoryBadge`), mas o conteúdo textual em pt-BR.

---

## 13. Histórico de Decisões

| Data | Decisão | Motivo |
|---|---|---|
| Início | Stack Next.js (web) + Flutter (admin/mobile) | SEO inviável em Flutter Web |
| Início | 5 categorias mantidas | Consolidação em 3 pilares fica para depois |
| Início | Vermelho `#A32D2D` como acento único | Sobriedade jornalística + força do slogan |
| Início | Regra do 3 transversal | Numerologia + bom princípio de design |
| 2026-05-17 | Repositório público no GitHub: `DanesMiguelDev/velossi-news` | Versionamento e memória institucional do projeto |
| 2026-05-17 | `CLAUDE.md` na raiz importa `@VELOSSI_PROJECT.md` | Calibra automaticamente qualquer agente Claude Code ao abrir o repositório |
| 2026-05-17 | Seção 13 como memória institucional viva | Decisões importantes documentadas com data e motivo; agente deve atualizar a cada decisão relevante |

> Adicione novas decisões aqui à medida que o projeto evoluir.

---

**Última atualização:** 2026-05-17 — repositório criado, CLAUDE.md configurado, fluxo de memória institucional estabelecido.
