import { getSupabaseServer } from '@/lib/supabase/server'

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await getSupabaseServer()
  if (!supabase) return Response.json({ error: 'Error' }, { status: 500 })
  
  const { data: product } = await supabase
    .from('products')
    .select('id, name, description, price, sale_price, image_urls, is_active, stock, collection, structured_info')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()
  
  if (!product) {
    return Response.json({ error: 'Not found' }, { status: 404 })
  }

  return Response.json(product)
}
