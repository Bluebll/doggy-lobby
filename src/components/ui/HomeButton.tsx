"use client"

import Link from 'next/link'
import { Home } from 'lucide-react'

export default function HomeButton() {
  return (
    <Link 
      href="/"
      className="text-orange-600 mb-4 inline-flex items-center gap-1 relative z-10 hover:underline cursor-pointer min-h-[44px] min-w-[44px] px-2 py-1 bg-white/50 backdrop-blur-sm rounded"
      aria-label="Back to Home"
    >
      <Home size={16} />
      <span>Home</span>
    </Link>
  )
}
