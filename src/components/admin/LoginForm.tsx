"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, LogIn } from "lucide-react"
import { getSupabaseBrowser } from "@/lib/supabase/client"

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null); setLoading(true)
    try {
      const supabase = getSupabaseBrowser()
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      router.replace("/admin")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 inline-block">Email</label>
        <input
          type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-2xl bg-[var(--color-brand-gray)] focus:bg-white focus:ring-2 focus:ring-black outline-none text-sm"
          placeholder="admin@example.com"
        />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 inline-block">Password</label>
        <input
          type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-2xl bg-[var(--color-brand-gray)] focus:bg-white focus:ring-2 focus:ring-black outline-none text-sm"
          placeholder="••••••••"
        />
      </div>
      {error && <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-2xl">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-black text-white font-semibold hover:bg-[var(--color-brand-orange)] transition-colors disabled:opacity-70"
      >
        {loading ? <Loader2 size={18} className="animate-spin" /> : <LogIn size={18} />}
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  )
}
