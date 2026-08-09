"use client"

import Link from 'next/link'
import { Home } from 'lucide-react'

export default function HomeButton() {
  return (
    <Link 
      href="/"
      className="inline-flex items-center justify-center gap-2 relative z-10 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-50 transition-colors cursor-pointer px-4 py-2 rounded-full border border-gray-200 shadow-sm bg-white"
      aria-label="Back to Home"
    >
      <Home size={16} />
      <span>Home</span>
    </Link>
  )
}
