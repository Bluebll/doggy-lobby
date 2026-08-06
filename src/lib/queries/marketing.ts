import { getSupabaseServer } from '@/lib/supabase/server'

export interface HeroBanner {
  id: string | number;
  image_url: string;
  title: string | null;
  subtitle: string | null;
  cta_text: string | null;
}

export async function getHeroBanners(): Promise<HeroBanner[]> {
  const supabase = await getSupabaseServer()
  if (!supabase) return []
  const { data, error } = await supabase.from('hero_banners').select('*').eq('is_active', true).order('display_order').returns<HeroBanner[]>()
  if (error) return []
  return data || []
}
