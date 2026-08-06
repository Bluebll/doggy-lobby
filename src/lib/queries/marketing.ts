import { getSupabaseServer } from '@/lib/supabase/server'

export async function getHeroBanners() {
  const supabase = await getSupabaseServer()
  if (!supabase) return []
  const { data, error } = await supabase.from('hero_banners').select('*').eq('is_active', true).order('display_order')
  if (error) return []
  return data || []
}
