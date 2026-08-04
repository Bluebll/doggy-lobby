"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MapPin, Phone, Mail, ArrowUpRight, Star, Send } from "lucide-react"
import { site } from "@/config/site"
import { footerContent, hoursContent } from "@/config/content"

const igPosts = [
  "https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?q=80&w=300&auto=format&fit=crop",
]

const InstagramIcon = ({ className = "", size = 24 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

export default function Footer() {
  const pathname = usePathname()
  if (pathname?.startsWith("/admin")) return null

  const nameParts = site.name.split(" ")
  const firstName = nameParts[0]
  const rest = nameParts.slice(1).join(" ")

  return (
    <footer className="bg-[#0a0a0a] text-white pt-32 pb-24 md:pb-12 overflow-hidden relative selection:bg-[var(--color-brand-orange)] selection:text-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--color-brand-orange)]/10 blur-[150px] rounded-[100%] pointer-events-none -translate-y-1/2"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 pb-24 border-b border-white/10">
          <div>
            <h3 className="font-heading text-4xl md:text-5xl font-extrabold mb-4">{footerContent.newsletterTitle}</h3>
            <p className="text-[#a1a1aa] mb-8 max-w-md text-lg leading-relaxed">{footerContent.newsletterCopy}</p>
            <form className="flex gap-2 max-w-md">
              <input type="email" placeholder="Enter your email" className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white placeholder-white/40 focus:outline-none focus:border-[var(--color-brand-orange)] transition-colors" required />
              <button type="submit" className="interactive bg-white text-black px-6 rounded-full flex items-center justify-center hover:bg-[var(--color-brand-orange)] hover:text-white transition-colors">
                <Send size={18} />
              </button>
            </form>
          </div>

          <div>
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-heading font-bold text-xl flex items-center gap-2">
                <InstagramIcon size={20} className="text-[var(--color-brand-orange)]" />
                {site.instagram}
              </h4>
              <a href={site.instagramUrl} target="_blank" rel="noreferrer" className="text-sm font-semibold text-[#a1a1aa] hover:text-white transition-colors flex items-center gap-1">
                Follow Us <ArrowUpRight size={14} />
              </a>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {igPosts.map((post, i) => (
                <a href={site.instagramUrl} target="_blank" rel="noreferrer" key={i} className="aspect-square rounded-2xl overflow-hidden group relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post} alt={`Instagram post ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <InstagramIcon className="text-white" size={24} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-24">
          <div className="lg:col-span-2">
            <Link href="/" className="text-4xl font-heading font-extrabold tracking-tighter block mb-6 group">
              <span className="text-white">{firstName}</span>
              {rest && <span className="text-gradient group-hover:opacity-80 transition-opacity">&nbsp;{rest}.</span>}
            </Link>
            <p className="text-[#a1a1aa] mb-8 max-w-sm text-lg leading-relaxed">{footerContent.storyLine}</p>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-4 inline-flex">
              <div className="flex gap-1 bg-white/10 p-1.5 rounded-full">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-[var(--color-brand-orange)] text-[var(--color-brand-orange)]" />
                ))}
              </div>
              <div className="text-sm">
                <span className="font-bold text-white">{footerContent.ratingValue}</span>
                <span className="text-[#a1a1aa] ml-2">{footerContent.ratingLabel}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white mb-6">Explore</h4>
            <ul className="space-y-4 text-[#a1a1aa]">
              <li><Link href="/products" className="hover:text-white transition-colors flex items-center gap-1 group">Shop All <ArrowUpRight size={14} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" /></Link></li>
              <li><Link href="/categories" className="hover:text-white transition-colors flex items-center gap-1 group">Categories <ArrowUpRight size={14} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" /></Link></li>
              <li><Link href="#about" className="hover:text-white transition-colors flex items-center gap-1 group">Our Story <ArrowUpRight size={14} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" /></Link></li>
              <li><Link href="#faq" className="hover:text-white transition-colors flex items-center gap-1 group">FAQ <ArrowUpRight size={14} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" /></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white mb-6">Store</h4>
            <ul className="space-y-5 text-[#a1a1aa]">
              <li className="flex items-start gap-3 group">
                <MapPin size={20} className="text-[#a1a1aa] group-hover:text-[var(--color-brand-orange)] transition-colors shrink-0" />
                <span className="group-hover:text-white transition-colors">{site.address.line1},<br />{site.address.city}, {site.address.region} {site.address.postalCode}</span>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone size={20} className="text-[#a1a1aa] group-hover:text-[var(--color-brand-orange)] transition-colors shrink-0" />
                <a href={`tel:${site.phone}`} className="group-hover:text-white transition-colors">{site.phone}</a>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail size={20} className="text-[#a1a1aa] group-hover:text-[var(--color-brand-orange)] transition-colors shrink-0" />
                <a href={`mailto:${site.email}`} className="group-hover:text-white transition-colors">{site.email}</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white mb-6">Hours</h4>
            <ul className="space-y-4 text-[#a1a1aa]">
              {hoursContent.entries.map((h) => (
                <li key={h.label} className="flex justify-between border-b border-white/5 pb-2">
                  <span>{h.label}</span>
                  <span className={h.accent ? "text-[var(--color-brand-orange)] font-semibold" : "text-white"}>{h.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[#71717a] text-sm">
          <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
