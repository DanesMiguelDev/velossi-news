-- ============================================================
-- VELOSSI NEWS — Schema do Banco de Dados
-- Execute este arquivo no SQL Editor do Supabase
-- ============================================================

-- Habilitar extensão para UUID
create extension if not exists "uuid-ossp";

-- ── AUTHORS ──────────────────────────────────────────────────
create table if not exists authors (
  id         uuid primary key default uuid_generate_v4(),
  name       text not null,
  slug       text not null unique,
  bio        text,
  photo_url  text,
  created_at timestamptz default now()
);

-- ── CATEGORIES ───────────────────────────────────────────────
create table if not exists categories (
  id         uuid primary key default uuid_generate_v4(),
  name       text not null unique,
  slug       text not null unique,
  created_at timestamptz default now()
);

insert into categories (name, slug) values
  ('Política',       'politica'),
  ('Tecnologia',     'tecnologia'),
  ('Economia',       'economia'),
  ('Cultura',        'cultura'),
  ('Brasil e Mundo', 'brasil-e-mundo')
on conflict (slug) do nothing;

-- ── ARTICLES ─────────────────────────────────────────────────
create table if not exists articles (
  id           uuid primary key default uuid_generate_v4(),
  slug         text not null unique,
  title        text not null,
  lede         text,
  body         text,                          -- HTML do editor rico
  image_url    text,
  category_id  uuid references categories(id) on delete set null,
  author_id    uuid references authors(id)    on delete set null,
  tags         text[] default '{}',
  reading_time text,
  published    boolean default false,
  published_at timestamptz,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

-- ── TAGS VIEW ────────────────────────────────────────────────
-- View auxiliar para buscas por tag
create or replace view articles_with_relations as
  select
    a.*,
    c.name  as category_name,
    c.slug  as category_slug,
    au.name as author_name,
    au.slug as author_slug,
    au.photo_url as author_photo
  from articles a
  left join categories c  on a.category_id = c.id
  left join authors   au  on a.author_id   = au.id;

-- ── ROW LEVEL SECURITY ───────────────────────────────────────
alter table articles   enable row level security;
alter table authors    enable row level security;
alter table categories enable row level security;

-- Leitura pública apenas para artigos publicados
create policy "artigos publicados são públicos"
  on articles for select
  using (published = true);

-- Leitura pública para autores e categorias
create policy "autores são públicos"
  on authors for select using (true);

create policy "categorias são públicas"
  on categories for select using (true);

-- ── TRIGGER: atualiza updated_at automaticamente ──────────────
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger articles_updated_at
  before update on articles
  for each row execute function set_updated_at();

-- ── SEED: autor padrão ────────────────────────────────────────
insert into authors (name, slug, bio) values
  ('Redação Velossi', 'redacao-velossi', 'Equipe editorial do Velossi News.')
on conflict (slug) do nothing;
