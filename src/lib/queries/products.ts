import { getSupabaseServer } from '@/lib/supabase/server'

export interface Product {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  image_urls: string[] | null;
  sale_price?: number | null;
  structured_info?: Record<string, string> | null;
}

export async function queryProducts(filter: { q?: string } = {}) {
  const supabase = await getSupabaseServer()
  if (!supabase) return []
  
  let q = supabase.from('products').select('*').eq('is_active', true)
  
  if (filter.q) {
    const like = `%${filter.q}%`
    q = q.or(`name.ilike.${like},description.ilike.${like}`)
  }
  
  const { data, error } = await q.limit(48).returns<Product[]>()
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
    .returns<Product[]>()
    .maybeSingle()
  
  if (error) return null
  return data
}
