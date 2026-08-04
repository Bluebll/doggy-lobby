import Link from "next/link"
import WishlistPageClient from "@/components/wishlist/WishlistPageClient"
import { site } from "@/config/site"

export const metadata = {
  title: `Wishlist | ${site.name}`,
  description: `Your saved products at ${site.name}.`,
}

export default function WishlistPage() {
  return (
    <section className="pt-32 md:pt-40 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-6">
        <nav className="text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-black font-medium">Wishlist</span>
        </nav>

        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[2px] bg-[var(--color-brand-orange)]"></div>
            <h2 className="text-[var(--color-brand-orange)] font-bold tracking-widest uppercase text-xs">Saved</h2>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-black leading-tight">Wishlist</h1>
        </div>

        <WishlistPageClient />
      </div>
    </section>
  )
}
