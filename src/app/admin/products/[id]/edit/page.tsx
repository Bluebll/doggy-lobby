import { requireAdminAuth } from '@/lib/utils/admin-auth'
import { getSupabaseAdmin } from '@/lib/supabase/admin'
import ProductForm from '@/components/admin/ProductForm'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminAuth()
  
  const { id } = await params
  const supabase = getSupabaseAdmin()
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !product) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
        <p className="mt-2 text-sm text-gray-700">Update the details for {product.name}</p>
      </div>

      <ProductForm product={product} isEdit={true} />
    </div>
  )
}
