import { cookies } from 'next/headers'
import Link from 'next/link'
import { logoutAction } from './actions'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get('admin_auth')

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      {/* Admin Top Navigation */}
      {authCookie && (
        <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-between items-center py-3 sm:py-0 sm:h-16">
              <Link href="/admin/orders" className="text-xl font-bold tracking-tight text-gray-900 order-1 shrink-0">
                Doggy Lobby Admin
              </Link>
              
              <div className="flex items-center order-2 sm:order-3 shrink-0">
                <form action={logoutAction}>
                  <button type="submit" className="text-gray-500 hover:text-gray-900 text-sm font-medium px-2 sm:px-4 py-2 border border-transparent rounded-md hover:bg-gray-100 transition-colors">
                    Logout
                  </button>
                </form>
              </div>

              <div className="flex space-x-6 sm:space-x-8 mt-3 sm:mt-0 w-full sm:w-auto order-3 sm:order-2 sm:ml-10 sm:mr-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                <Link href="/admin/orders" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                  Orders
                </Link>
                <Link href="/admin/products" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                  Products
                </Link>
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  )
}
