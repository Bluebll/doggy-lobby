import { createClient } from '@supabase/supabase-js'

let supabaseServer: ReturnType<typeof createClient> | null = null

export async function getSupabaseServer() {
  if (supabaseServer) return supabaseServer
  
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!url || !key) return null
  
  supabaseServer = createClient(url, key)
  return supabaseServer
}
