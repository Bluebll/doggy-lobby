import Link from "next/link"
import { site } from "@/config/site"

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-6 py-24">
      <div className="max-w-md text-center">
        <p className="text-[var(--color-brand-orange)] font-bold tracking-widest uppercase text-xs mb-4">404</p>
        <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-black mb-4">Page not found.</h1>
        <p className="text-gray-500 mb-8">The page you’re looking for doesn’t exist or has been moved.</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-black text-white font-semibold hover:bg-[var(--color-brand-orange)] transition-colors">Back home</Link>
          <Link href="/products" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[var(--color-brand-gray)] text-black font-semibold hover:bg-black hover:text-white transition-colors">Browse products</Link>
        </div>
        <p className="text-xs text-gray-400 mt-10">{site.name} · Premium products for happy pets</p>
      </div>
    </section>
  )
}
