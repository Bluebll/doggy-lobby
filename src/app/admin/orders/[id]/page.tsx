import { requireAdminAuth } from '@/lib/utils/admin-auth'
import { getSupabaseAdmin } from '@/lib/supabase/admin'
import Link from 'next/link'
import ProductImage from '@/components/admin/ProductImage'
import { revalidatePath } from 'next/cache'

async function updateOrderStatus(formData: FormData) {
  'use server'
  await requireAdminAuth()
  
  const orderId = formData.get('orderId') as string
  const status = formData.get('status') as string
  
  try {
    const supabase = getSupabaseAdmin()
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)
      
    if (error) {
      throw new Error('Database error')
    }
  } catch {
    throw new Error('Failed to update order status. Please try again.')
  }
  
  revalidatePath(`/admin/orders/${orderId}`)
  revalidatePath('/admin/orders')
}

export const dynamic = 'force-dynamic'

export default async function AdminOrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireAdminAuth()

  const { id: orderId } = await params
  const supabase = getSupabaseAdmin()

  // 1. Fetch Order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select('id, order_number, customer_name, customer_phone, customer_address, notes, total_price, status, created_at')
    .eq('id', orderId)
    .single()

  if (orderError || !order) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Order Not Found</h2>
        <p className="text-gray-500 mb-4">The order you are looking for does not exist or an error occurred.</p>
        <Link href="/admin/orders" className="text-blue-600 hover:underline">
          &larr; Back to Orders
        </Link>
      </div>
    )
  }

  // 2. Fetch Order Items
  const { data: orderItems, error: itemsError } = await supabase
    .from('order_items')
    .select('product_id, quantity, price')
    .eq('order_id', order.id)

  if (itemsError) {
    console.error("Error fetching items:", itemsError)
  }

  // 3. Fetch Products for these items
  const productsMap = new Map()
  if (orderItems && orderItems.length > 0) {
    const productIds = orderItems.map((item: { product_id: number }) => item.product_id)
    const { data: products } = await supabase
      .from('products')
      .select('id, name, image_urls')
      .in('id', productIds)

    if (products) {
      products.forEach((p: { id: number; name: string; image_urls?: string[] }) => productsMap.set(p.id, p))
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/admin/orders" className="text-sm text-gray-500 hover:text-black transition-colors">
          &larr; Back to Orders
        </Link>
      </div>

      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
          <p className="mt-2 text-sm text-gray-700">Order Number: <span className="font-bold">{order.order_number}</span></p>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Customer Information</h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{order.customer_name}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Phone</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{order.customer_phone}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Address</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 whitespace-pre-wrap">{order.customer_address || 'Not provided'}</dd>
            </div>
            {order.notes && (
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Notes</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 whitespace-pre-wrap">{order.notes}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Products</h3>
        </div>
        <div className="border-t border-gray-200">
          <ul role="list" className="divide-y divide-gray-200">
            {orderItems?.map((item: { product_id: number; quantity: number; price: number }, idx: number) => {
              const product = productsMap.get(item.product_id)
              return (
                <li key={idx} className="px-4 py-4 sm:px-6 flex items-center">
                  <div className="h-16 w-16 flex-shrink-0 relative rounded-md overflow-hidden bg-gray-100 mr-4">
                    {product?.image_urls?.[0] ? (
                      <ProductImage src={product.image_urls[0]} alt={product.name || 'Product'} />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs text-gray-400">No Img</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{product?.name || `Product ID: ${item.product_id}`}</p>
                    <p className="text-sm text-gray-500 mt-1">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">₹{item.price}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Update Order Status</h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <form action={updateOrderStatus} className="flex items-end gap-4 max-w-sm">
            <input type="hidden" name="orderId" value={order.id} />
            <div className="flex-1">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                id="status"
                name="status"
                key={order.status}
                defaultValue={order.status}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-black focus:border-black sm:text-sm rounded-md border"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:w-auto transition-colors"
            >
              Update
            </button>
          </form>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Order Summary</h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Created Date</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {new Date(order.created_at).toLocaleString('en-IN', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZone: 'Asia/Kolkata'
                })}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  order.status === 'completed' ? 'bg-green-100 text-green-800' :
                  order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {order.status}
                </span>
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-gray-50">
              <dt className="text-sm font-bold text-gray-900">Total Amount</dt>
              <dd className="mt-1 text-sm font-bold text-gray-900 sm:mt-0 sm:col-span-2">₹{order.total_price}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
