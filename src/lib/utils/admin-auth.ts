import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function requireAdminAuth() {
  const cookieStore = await cookies()
  const auth = cookieStore.get('admin_auth')
  if (!auth?.value) {
    redirect('/admin/login')
  }
  return auth.value
}
