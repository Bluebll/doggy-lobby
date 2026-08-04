"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { LayoutDashboard, Package, Tags, Receipt, LogOut, Menu, X } from "lucide-react"
import { getSupabaseBrowser } from "@/lib/supabase/client"
import { STORE_NAME } from "@/lib/constants"

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: Tags },
  { href: "/admin/orders", label: "Orders", icon: Receipt },
]

export default function AdminShell({
  email,
  children,
}: {
  email: string
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  const active = (href: string) => href === "/admin" ? pathname === "/admin" : pathname?.startsWith(href)

  const logout = async () => {
    const supabase = getSupabaseBrowser()
    await supabase.auth.signOut()
    router.replace("/admin/login")
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-[var(--color-brand-gray)]">
      {/* Sidebar (desktop) */}
      <aside className="hidden md:flex fixed inset-y-0 left-0 w-64 bg-black text-white flex-col z-40">
        <div className="px-6 py-6 border-b border-white/10">
          <p className="text-xs font-bold uppercase tracking-widest text-white/50">Admin</p>
          <h2 className="font-heading text-xl font-extrabold">{STORE_NAME}</h2>
        </div>
        <nav className="flex-1 px-3 py-6 space-y-1">
          {NAV.map((n) => {
            const Icon = n.icon
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  active(n.href) ? "bg-white text-black" : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={16} />
                {n.label}
              </Link>
            )
          })}
        </nav>
        <div className="px-4 py-5 border-t border-white/10">
          <p className="text-xs text-white/50 truncate mb-3">{email}</p>
          <button onClick={logout} className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-sm font-semibold">
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="md:hidden sticky top-0 z-40 bg-black text-white px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">Admin</p>
          <h2 className="font-heading text-base font-extrabold">{STORE_NAME}</h2>
        </div>
        <button onClick={() => setMobileOpen(true)} aria-label="Open menu" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
          <Menu size={18} />
        </button>
      </header>
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-[100] bg-black text-white p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-xl font-extrabold">{STORE_NAME}</h2>
            <button onClick={() => setMobileOpen(false)} aria-label="Close" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
              <X size={18} />
            </button>
          </div>
          <nav className="space-y-2">
            {NAV.map((n) => {
              const Icon = n.icon
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                    active(n.href) ? "bg-white text-black" : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  {n.label}
                </Link>
              )
            })}
          </nav>
          <button onClick={logout} className="mt-8 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-white/10 text-sm font-semibold">
            <LogOut size={14} /> Sign out
          </button>
        </div>
      )}

      {/* Main content */}
      <main className="md:pl-64">
        <div className="px-4 md:px-8 py-6 md:py-10 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  )
}
