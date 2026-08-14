import { getProductBySlug } from '@/lib/queries/products'

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return Response.json({ error: 'Not found' }, { status: 404 })
  }

  return Response.json(product)
}
