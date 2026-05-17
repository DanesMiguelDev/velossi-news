import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(url, key);

// Tipo que espelha a view articles_with_relations do banco
export type ArticleRow = {
  id: string;
  slug: string;
  title: string;
  lede: string | null;
  body: string | null;
  image_url: string | null;
  tags: string[];
  reading_time: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  category_name: string | null;
  category_slug: string | null;
  author_name: string | null;
  author_slug: string | null;
  author_photo: string | null;
};
