import { getSupabaseServer } from '@/lib/supabase/server'

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await getSupabaseServer()
  if (!supabase) return Response.json({ error: 'Error' }, { status: 500 })
  
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()
  
  return Response.json(product || { error: 'Not found' })
}
