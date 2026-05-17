export type ArticleCategory =
  | "Política"
  | "Tecnologia"
  | "Economia"
  | "Cultura"
  | "Brasil e Mundo";

export type Article = {
  id: string;
  slug: string;
  title: string;
  lede?: string;
  body?: string; // HTML editorial — vira rich text do Supabase depois
  category: ArticleCategory;
  author?: string;
  authorPhoto?: string;
  timeAgo: string;
  publishedAt?: string; // ISO 8601
  imageUrl?: string;
  tags?: string[];
  readingTime?: string;
};

// Manchete + destaques (1 hero + 3 cards)
export const articles: Article[] = [
  {
    id: "1",
    slug: "stf-marco-temporal",
    title: "STF retoma julgamento sobre marco temporal e racha o Congresso",
    lede: "Decisão pode redefinir a disputa por terras indígenas e abrir precedente para outras questões fundiárias em pauta no plenário.",
    body: `<p>O Supremo Tribunal Federal retomou nesta semana o julgamento sobre o marco temporal para demarcação de terras indígenas, provocando uma divisão profunda entre os parlamentares do Congresso Nacional.</p>

<p>A discussão, que se arrasta há anos, ganhou novo fôlego após a apresentação de um voto que pode alterar significativamente a interpretação constitucional sobre o direito dos povos indígenas às suas terras ancestrais.</p>

<h2>O que está em jogo</h2>

<p>O marco temporal é a tese jurídica que defende que os indígenas só têm direito às terras que estavam ocupando em 5 de outubro de 1988, data da promulgação da Constituição Federal. Defensores dos direitos indígenas argumentam que a teoria ignora décadas de expulsões forçadas.</p>

<blockquote>"A Constituição não pode ser usada como instrumento de legitimação de injustiças históricas", afirmou o relator do caso durante a sessão.</blockquote>

<p>O julgamento deve se estender por mais duas sessões, com expectativa de conclusão até o final do mês. O resultado afetará diretamente mais de 200 processos de demarcação em andamento no país.</p>

<h2>Reação do Congresso</h2>

<p>No Legislativo, a expectativa pelo desfecho é grande. Líderes da bancada ruralista já sinalizaram que apresentarão projeto de lei para contornar eventual decisão desfavorável do STF, o que deve acirrar ainda mais o embate entre os poderes.</p>`,
    category: "Política",
    author: "Redação Velossi",
    timeAgo: "há 2 horas",
    publishedAt: "2026-05-17T10:00:00-03:00",
    tags: ["STF", "Marco Temporal", "Terras Indígenas", "Congresso"],
    readingTime: "4 min",
  },
  {
    id: "2",
    slug: "lei-ia-brasil",
    title: "Nova lei de IA no Brasil entra em vigor e regula uso por empresas",
    lede: "Legislação obriga empresas a informar quando conteúdo é gerado por inteligência artificial e cria mecanismos de responsabilização.",
    body: `<p>A nova lei de regulamentação da inteligência artificial entrou em vigor nesta semana, impondo obrigações inéditas a empresas que utilizam sistemas automatizados no Brasil.</p>

<p>Entre as principais exigências, as organizações deverão informar claramente quando o conteúdo foi gerado ou intermediado por IA, além de garantir meios de contestação para decisões automatizadas que afetem direitos dos cidadãos.</p>

<h2>O que muda na prática</h2>

<p>Para o setor financeiro, a lei exige que algoritmos de concessão de crédito sejam auditáveis e que os consumidores possam solicitar revisão humana de decisões negativas. No setor de saúde, diagnósticos assistidos por IA precisam ser validados por profissionais habilitados.</p>

<blockquote>"O Brasil dá um passo importante para garantir que a tecnologia sirva às pessoas, não o contrário", disse a ministra da área durante a cerimônia de entrada em vigor da lei.</blockquote>

<p>Especialistas avaliam a legislação como equilibrada, mas alertam que a capacidade de fiscalização das agências reguladoras ainda precisa ser fortalecida para garantir efetividade.</p>`,
    category: "Tecnologia",
    author: "João Martins",
    timeAgo: "há 4 horas",
    publishedAt: "2026-05-17T08:00:00-03:00",
    tags: ["Inteligência Artificial", "Regulação", "Tecnologia", "Direito Digital"],
    readingTime: "3 min",
  },
  {
    id: "3",
    slug: "selic-julho",
    title: "Selic deve cair em julho, dizem economistas após dados da inflação",
    lede: "IPCA de abril ficou abaixo da expectativa e abre espaço para o Banco Central retomar ciclo de cortes na taxa básica de juros.",
    body: `<p>Os dados de inflação divulgados nesta semana surpreenderam positivamente o mercado financeiro e reacenderam as apostas de que o Banco Central poderá retomar o ciclo de cortes na taxa Selic já em julho.</p>

<p>O IPCA de abril registrou alta de 0,28%, abaixo da mediana das projeções de analistas, que esperavam 0,35%. No acumulado de 12 meses, o índice ficou em 4,1%, ainda acima do teto da meta, mas com trajetória de desaceleração clara.</p>

<h2>O que dizem os economistas</h2>

<p>Para a maioria dos analistas consultados pela Velossi, a combinação de núcleos de inflação em queda e atividade econômica mais fraca do que o esperado no primeiro trimestre cria condições favoráveis para uma redução de 0,25 ponto percentual na próxima reunião do Copom.</p>

<blockquote>"Os dados jogam a favor de um corte em julho, mas o Banco Central vai querer ver mais um número de inflação antes de decidir", avaliou economista de banco privado.</blockquote>

<p>O mercado de juros já precifica com 70% de probabilidade uma queda da Selic em julho, quando a taxa passaria de 10,5% para 10,25% ao ano.</p>`,
    category: "Economia",
    author: "Carla Mendes",
    timeAgo: "há 6 horas",
    publishedAt: "2026-05-17T06:00:00-03:00",
    tags: ["Selic", "Inflação", "Banco Central", "Juros"],
    readingTime: "3 min",
  },
  {
    id: "4",
    slug: "festival-cinema-rio",
    title: "Festival de cinema do Rio anuncia programação com 120 filmes",
    lede: "Evento traz estreias mundiais e retrospectivas de diretores brasileiros. Ingressos gratuitos para sessões nas periferias da cidade.",
    body: `<p>O Festival Internacional de Cinema do Rio de Janeiro divulgou nesta semana a programação completa de sua 28ª edição, com 120 filmes de 45 países exibidos ao longo de dez dias na cidade.</p>

<p>Entre os destaques estão três estreias mundiais de produções brasileiras e uma retrospectiva completa da obra do cineasta Walter Salles, que receberá o prêmio honorário da edição.</p>

<h2>Cinema nas periferias</h2>

<p>Uma das novidades desta edição é o programa "Cinema Fora do Centro", que levará sessões gratuitas a comunidades da Zona Norte e Zona Oeste do Rio. Ao todo, serão 24 exibições em praças e centros culturais de bairros que historicamente têm pouco acesso a eventos culturais de grande porte.</p>

<blockquote>"Queremos que o festival seja da cidade inteira, não apenas do circuito tradicional", afirmou o diretor artístico do evento na coletiva de imprensa.</blockquote>

<p>As inscrições para as sessões gratuitas abrem na próxima segunda-feira pelo site do festival. As sessões pagas têm ingressos a partir de R$ 24,00, com meia-entrada para estudantes e idosos.</p>`,
    category: "Cultura",
    author: "Pedro Almeida",
    timeAgo: "há 4 horas",
    publishedAt: "2026-05-17T08:30:00-03:00",
    tags: ["Cinema", "Festival", "Rio de Janeiro", "Cultura"],
    readingTime: "3 min",
  },
];

// Mais lidas (3 itens — regra do 3)
export const mostRead: Article[] = [
  {
    id: "mr1",
    slug: "cupula-clima",
    title: "Cúpula do clima termina sem acordo sobre redução de emissões",
    lede: "Negociações entre países desenvolvidos e emergentes travaram na discussão sobre financiamento climático.",
    body: `<p>A Cúpula do Clima de Genebra terminou sem o acordo esperado sobre metas de redução de emissões de carbono, frustrando ambientalistas e cientistas que apostavam em avanços concretos na reunião.</p>

<p>As negociações travaram principalmente na discussão sobre o fundo de financiamento climático para países em desenvolvimento, com nações ricas resistindo a comprometer valores mais altos do que os já prometidos.</p>

<h2>O que ficou acordado</h2>

<p>Apesar do impasse nas metas de emissões, os países chegaram a um acordo sobre o monitoramento e verificação de compromissos já assumidos no Acordo de Paris. A medida é considerada importante por especialistas, mas insuficiente diante da urgência da crise climática.</p>

<blockquote>"Saímos daqui com menos do que precisávamos. O tempo está se esgotando", declarou representante de nação insular ameaçada pelo aumento do nível do mar.</blockquote>

<p>A próxima reunião de cúpula está marcada para novembro, quando se espera uma nova tentativa de acordo.</p>`,
    category: "Brasil e Mundo",
    author: "Marina Costa",
    timeAgo: "há 6 horas",
    publishedAt: "2026-05-17T06:30:00-03:00",
    tags: ["Clima", "Meio Ambiente", "ONU", "Acordo de Paris"],
    readingTime: "3 min",
  },
  {
    id: "mr2",
    slug: "petrobras-pre-sal",
    title: "Petrobras anuncia investimento de R$ 14 bi no pré-sal",
    lede: "Recursos serão aplicados na expansão da capacidade de produção na Bacia de Santos nos próximos três anos.",
    body: `<p>A Petrobras anunciou nesta quinta-feira um pacote de investimentos de R$ 14 bilhões para expansão da produção no pré-sal da Bacia de Santos, um dos maiores volumes já comprometidos para a região em um único anúncio.</p>

<p>Os recursos serão aplicados ao longo dos próximos três anos na perfuração de novos poços e na construção de uma plataforma adicional no campo de Búzios, atualmente o maior produtor de petróleo do país.</p>

<h2>Impacto na produção</h2>

<p>Com os novos investimentos, a empresa projeta aumento de 15% na capacidade de extração do campo até 2028. A meta é atingir uma produção média de 800 mil barris por dia apenas em Búzios, superando campos históricos como o de Tupi.</p>

<blockquote>"Este investimento reafirma o compromisso da Petrobras com a soberania energética do Brasil e com a geração de riqueza para o país", disse o presidente da estatal.</blockquote>`,
    category: "Economia",
    author: "Carla Mendes",
    timeAgo: "há 8 horas",
    publishedAt: "2026-05-17T04:00:00-03:00",
    tags: ["Petrobras", "Pré-sal", "Energia", "Investimento"],
    readingTime: "3 min",
  },
  {
    id: "mr3",
    slug: "startup-ia-serie-a",
    title: "Startup brasileira de IA capta US$ 30 mi em série A",
    lede: "Empresa desenvolve modelos de linguagem treinados especificamente para o português brasileiro e sistemas jurídicos nacionais.",
    body: `<p>A Lexia AI, startup brasileira especializada em inteligência artificial para o setor jurídico, anunciou hoje o fechamento de uma rodada série A de US$ 30 milhões, liderada por fundo de venture capital americano com participação de investidores nacionais.</p>

<p>A empresa desenvolveu modelos de linguagem treinados especificamente para o português brasileiro e para as particularidades do sistema jurídico nacional, o que segundo seus fundadores garante performance superior às soluções genéricas importadas.</p>

<h2>O produto</h2>

<p>A plataforma da Lexia automatiza a análise de contratos, a pesquisa de jurisprudência e a redação de peças processuais simples. Atualmente, mais de 300 escritórios de advocacia e três grandes bancos utilizam o serviço no país.</p>

<blockquote>"Construímos algo que os modelos americanos não conseguem fazer bem: entender o direito brasileiro de verdade", disse a CEO da empresa.</blockquote>

<p>Com os recursos captados, a startup planeja expandir para México e Argentina ainda neste ano e dobrar o time de engenharia até dezembro.</p>`,
    category: "Tecnologia",
    author: "João Martins",
    timeAgo: "há 10 horas",
    publishedAt: "2026-05-17T02:00:00-03:00",
    tags: ["Startup", "Inteligência Artificial", "Investimento", "Direito"],
    readingTime: "3 min",
  },
];

// Todos os artigos combinados — usado para rotas de categoria e sitemap
export const allArticles: Article[] = [...articles, ...mostRead];

export function getArticleBySlug(slug: string): Article | undefined {
  return allArticles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: ArticleCategory): Article[] {
  return allArticles.filter((a) => a.category === category);
}

export const categories: ArticleCategory[] = [
  "Política",
  "Tecnologia",
  "Economia",
  "Cultura",
  "Brasil e Mundo",
];

export const categorySlugMap: Record<string, ArticleCategory> = {
  politica: "Política",
  tecnologia: "Tecnologia",
  economia: "Economia",
  cultura: "Cultura",
  "brasil-e-mundo": "Brasil e Mundo",
};

export const categoryToSlug: Record<ArticleCategory, string> = {
  Política: "politica",
  Tecnologia: "tecnologia",
  Economia: "economia",
  Cultura: "cultura",
  "Brasil e Mundo": "brasil-e-mundo",
};
