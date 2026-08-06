import { getSupabaseServer } from '@/lib/supabase/server'

export async function queryProducts(filter: any = {}) {
  const supabase = await getSupabaseServer()
  if (!supabase) return []
  
  let q = supabase.from('products').select('*').eq('is_active', true)
  
  if (filter.q) {
    const like = `%${filter.q}%`
    q = q.or(`name.ilike.${like},description.ilike.${like}`)
  }
  
  const { data, error } = await q.limit(48)
  if (error) return []
  return data || []
}

export async function getProductBySlug(slug: string) {
  const supabase = await getSupabaseServer()
  if (!supabase) return null
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle()
  
  if (error) return null
  return data
}
