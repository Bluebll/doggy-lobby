'use server'

import { getSupabaseAdmin } from '@/lib/supabase/admin'
import { generateUniqueSlug } from '@/app/admin/actions'
import { requireAdminAuth } from '@/lib/utils/admin-auth'

export type ProductImportRow = {
  name: string
  description: string
  price: number
  stock: number
  collection: string
  image_urls: string[]
  is_active: boolean
}

export async function bulkImportProductsAction(products: ProductImportRow[]): Promise<{ error?: string, count?: number }> {
  try {
    await requireAdminAuth()
    const supabase = getSupabaseAdmin()
    
    // We need to generate a unique slug for each product.
    // However, if we do it in parallel or in a bulk, we need to be careful about slug collisions within the same batch.
    // To be safe, we will process them sequentially to ensure generateUniqueSlug has correct data.
    // Alternatively, for a truly large batch, we could just rely on generateUniqueSlug and do it sequentially.
    const productsToInsert = []
    
    for (const p of products) {
      const slug = await generateUniqueSlug(p.name)
      productsToInsert.push({
        slug,
        name: p.name,
        description: p.description,
        price: p.price,
        stock: p.stock,
        collection: p.collection,
        image_urls: p.image_urls,
        is_active: p.is_active
      })
    }

    // Now bulk insert
    if (productsToInsert.length > 0) {
      const { error } = await supabase.from('products').insert(productsToInsert)
      if (error) {
        return { error: error.message }
      }
    }

    return { count: productsToInsert.length }
  } catch (err: unknown) {
    const e = err as Error
    return { error: e.message || 'Error importing products' }
  }
}
