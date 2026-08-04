import type { MetadataRoute } from 'next'
import { site } from '@/config/site'
import { getSupabaseServer } from '@/lib/supabase/server'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = site.url.replace(/\/$/, '')
  const now = new Date()
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/products`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/categories`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/wishlist`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ]

  const supabase = await getSupabaseServer()
  if (!supabase) return staticRoutes

  const [{ data: prods }, { data: cats }] = await Promise.all([
    supabase.from('products').select('slug,updated_at').eq('is_active', true),
    supabase.from('categories').select('slug,updated_at').eq('is_active', true),
  ])

  const productRoutes: MetadataRoute.Sitemap = (prods ?? []).map((p) => ({
    url: `${base}/products/${p.slug}`,
    lastModified: new Date(p.updated_at as string),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))
  const categoryRoutes: MetadataRoute.Sitemap = (cats ?? []).map((c) => ({
    url: `${base}/categories/${c.slug}`,
    lastModified: new Date(c.updated_at as string),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...categoryRoutes, ...productRoutes]
}
