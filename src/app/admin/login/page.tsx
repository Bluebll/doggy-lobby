import { STORE_NAME } from "@/lib/constants"
import LoginForm from "@/components/admin/LoginForm"

export const metadata = { title: "Admin login" }

export default function AdminLoginPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[var(--color-brand-gray)] px-6 py-24">
      <div className="w-full max-w-md bg-white rounded-[var(--radius-3xl)] shadow-2xl p-8 md:p-10">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-heading font-extrabold">A</div>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">{STORE_NAME} · Admin</span>
          </div>
          <h1 className="font-heading text-3xl font-extrabold text-black">Welcome back.</h1>
          <p className="text-gray-500 mt-2 text-sm">Sign in to manage your store.</p>
        </div>
        <LoginForm />
      </div>
    </section>
  )
}
