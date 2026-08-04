import { getSupabaseServer } from '@/lib/supabase/server'
import type { Product } from '@/types/domain'

export async function getProducts(limit = 24): Promise<Product[]> {
  const supabase = await getSupabaseServer()
  if (!supabase) return []
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) { console.error('[getProducts]', error.message); return [] }
  return (data ?? []) as Product[]
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  const supabase = await getSupabaseServer()
  if (!supabase) return []
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) { console.error('[getFeaturedProducts]', error.message); return [] }
  return (data ?? []) as Product[]
}

export async function getProductsByCategoryId(categoryId: string, limit = 48): Promise<Product[]> {
  const supabase = await getSupabaseServer()
  if (!supabase) return []
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .eq('category_id', categoryId)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) { console.error('[getProductsByCategoryId]', error.message); return [] }
  return (data ?? []) as Product[]
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await getSupabaseServer()
  if (!supabase) return null
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle()

  if (error) { console.error('[getProductBySlug]', error.message); return null }
  return (data as Product) ?? null
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  if (!product.category_id) return []
  const supabase = await getSupabaseServer()
  if (!supabase) return []
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .eq('category_id', product.category_id)
    .neq('id', product.id)
    .limit(limit)

  if (error) { console.error('[getRelatedProducts]', error.message); return [] }
  return (data ?? []) as Product[]
}
