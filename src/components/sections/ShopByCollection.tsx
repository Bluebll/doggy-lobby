'use client'

import Link from 'next/link'

const collections = [
  { name: 'Dogs', emoji: '🐶', image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=800&auto=format&fit=crop', type: 'dogs' },
  { name: 'Cats', emoji: '🐱', image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500', type: 'cats' },
  { name: 'Puppies', emoji: '🐶', image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500', type: 'puppies' },
  { name: 'Kittens', emoji: '🐱', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800&auto=format&fit=crop', type: 'kittens' },
]

export default function ShopByCollection() {
  return (
    <div id="collections" className="pt-32 pb-20 px-4">
      <h2 className="text-4xl font-bold text-center mb-12">Shop by Collection</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {collections.map((col) => (
          <Link key={col.type} href={`/collections/${col.type}`} aria-label={col.name} className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl block w-full text-left">
            <img src={col.image} alt={col.name} className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute bottom-6 left-6"><h3 className="text-white text-2xl font-bold">{col.name}</h3></div>
          </Link>
        ))}
      </div>
    </div>
  )
}
