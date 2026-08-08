import { requireAdminAuth } from '@/lib/utils/admin-auth'
import ProductImport from '@/components/admin/ProductImport'

export const dynamic = 'force-dynamic'

export default async function AdminImportProductsPage() {
  await requireAdminAuth()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Bulk Product Import</h1>
        <p className="mt-2 text-sm text-gray-700">Upload your product catalogue using Excel or CSV files.</p>
      </div>
      <ProductImport />
    </div>
  )
}
