import { NextResponse } from "next/server"
import { isAdminRequest } from "@/lib/admin-auth"
import { getSupabaseAdmin } from "@/lib/supabase/admin"

export async function GET() {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false }).limit(200)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ orders: data ?? [] })
}
