import { getSupabaseServer } from '@/lib/supabase/server'
import type { Category } from '@/types/domain'

export async function getCategories(): Promise<Category[]> {
  const supabase = await getSupabaseServer()
  if (!supabase) return []
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('[getCategories]', error.message)
    return []
  }
  return (data ?? []) as Category[]
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const supabase = await getSupabaseServer()
  if (!supabase) return null
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle()

  if (error) {
    console.error('[getCategoryBySlug]', error.message)
    return null
  }
  return (data as Category) ?? null
}
