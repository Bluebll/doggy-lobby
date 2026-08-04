import { redirect } from 'next/navigation'
import { getSupabaseServer } from '@/lib/supabase/server'
import type { User } from '@supabase/supabase-js'

/** Returns the current user if authenticated AND role === 'admin'. Otherwise null. */
export async function getAdminUser(): Promise<User | null> {
  const supabase = await getSupabaseServer()
  if (!supabase) return null
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const role = (user.user_metadata as { role?: string } | null)?.role
  if (role !== 'admin') return null
  return user
}

/** Server-side guard: redirects to /admin/login if not admin. */
export async function requireAdmin(): Promise<User> {
  const user = await getAdminUser()
  if (!user) redirect('/admin/login')
  return user
}

/** For API routes: returns null if not admin. */
export async function isAdminRequest(): Promise<boolean> {
  const user = await getAdminUser()
  return user !== null
}
