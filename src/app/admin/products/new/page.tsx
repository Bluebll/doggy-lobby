import { requireAdminAuth } from '@/lib/utils/admin-auth'
import ProductForm from '@/components/admin/ProductForm'

export const dynamic = 'force-dynamic'

export default async function NewProductPage() {
  await requireAdminAuth()

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
        <p className="mt-2 text-sm text-gray-700">Fill in the details below to add a new product to your store.</p>
      </div>

      <ProductForm />
    </div>
  )
}
