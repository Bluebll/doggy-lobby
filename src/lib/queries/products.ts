import { getSupabaseServer } from '@/lib/supabase/server'
import type { Product } from '@/types/domain'

export interface ProductFilter {
  q?: string
  categoryId?: string
  brand?: string
  min?: number
  max?: number
  sort?: 'new' | 'price_asc' | 'price_desc' | 'name_asc'
  limit?: number
}

export async function queryProducts(filter: ProductFilter = {}): Promise<Product[]> {
  const supabase = await getSupabaseServer()
  if (!supabase) return []
  let q = supabase.from('products').select('*').eq('is_active', true)

  if (filter.categoryId) q = q.eq('category_id', filter.categoryId)
  if (filter.brand) q = q.eq('attributes->>brand', filter.brand)
  if (typeof filter.min === 'number' && !Number.isNaN(filter.min)) q = q.gte('price', filter.min)
  if (typeof filter.max === 'number' && !Number.isNaN(filter.max)) q = q.lte('price', filter.max)
  if (filter.q) {
    const like = `%${filter.q}%`
    q = q.or(`name.ilike.${like},description.ilike.${like}`)
  }

  switch (filter.sort) {
    case 'price_asc': q = q.order('price', { ascending: true }); break
    case 'price_desc': q = q.order('price', { ascending: false }); break
    case 'name_asc': q = q.order('name', { ascending: true }); break
    default: q = q.order('created_at', { ascending: false })
  }

  q = q.limit(filter.limit ?? 48)

  const { data, error } = await q
  if (error) { console.error('[queryProducts]', error.message); return [] }
  return (data ?? []) as Product[]
}

export async function getProducts(limit = 24): Promise<Product[]> {
  return queryProducts({ limit })
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
  return queryProducts({ categoryId, limit })
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

/** Distinct brand values from products.attributes.brand. */
export async function getBrands(categoryId?: string): Promise<string[]> {
  const supabase = await getSupabaseServer()
  if (!supabase) return []
  let q = supabase.from('products').select('attributes').eq('is_active', true)
  if (categoryId) q = q.eq('category_id', categoryId)
  const { data, error } = await q
  if (error) return []
  const set = new Set<string>()
  for (const row of data ?? []) {
    const b = (row.attributes as { brand?: string })?.brand
    if (b) set.add(b)
  }
  return Array.from(set).sort()
}

export async function getPriceRange(categoryId?: string): Promise<{ min: number; max: number }> {
  const supabase = await getSupabaseServer()
  if (!supabase) return { min: 0, max: 10000 }
  let q = supabase.from('products').select('price').eq('is_active', true)
  if (categoryId) q = q.eq('category_id', categoryId)
  const { data, error } = await q
  if (error || !data || data.length === 0) return { min: 0, max: 10000 }
  const prices = data.map((r) => Number(r.price))
  return { min: Math.floor(Math.min(...prices)), max: Math.ceil(Math.max(...prices)) }
}
