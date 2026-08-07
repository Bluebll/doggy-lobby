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
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link href="/admin/products" className="text-xl font-bold tracking-tight text-gray-900">
                  Doggy Lobby Admin
                </Link>
                <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
                  <Link href="/admin/products" className="border-black text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Products
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <form action={logoutAction}>
                  <button type="submit" className="text-gray-500 hover:text-gray-900 text-sm font-medium px-4 py-2 border border-transparent rounded-md hover:bg-gray-100 transition-colors">
                    Logout
                  </button>
                </form>
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
