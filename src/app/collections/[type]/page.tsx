import { getSupabaseServer } from '@/lib/supabase/server'
import Link from 'next/link'

const collectionNames: Record<string, string> = {
  'dogs': 'Dogs',
  'cats': 'Cats',
  'puppies': 'Puppies',
  'kittens': 'Kittens',
  'other-pets': 'Other Pets',
}

interface CollectionProduct {
  id: string | number;
  slug: string;
  name: string;
  price: number;
  image_urls?: string[] | null;
}

export default async function CollectionPage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  const supabase = await getSupabaseServer()
  if (!supabase) return <div>Error loading collection</div>
  
  const { data: products } = await supabase
    .from('products')
    .select('id, slug, name, price, image_urls')
    .eq('collection', type)
    .eq('is_active', true).returns<CollectionProduct[]>()
  
  const collectionName = collectionNames[type] || type

  return (
    <div className="min-h-screen bg-white pt-40">
      <div className="p-8 max-w-6xl mx-auto">
        <Link href="/" className="text-orange-600 mb-4 inline-block relative z-10 hover:underline">← Back Home</Link>
        <h1 className="text-4xl font-bold mb-8">{collectionName}</h1>
        {!products || products.length === 0 ? (
          <p className="text-gray-600">No products in this collection yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <Link href={`/products/${p.slug}`} key={p.id} className="border rounded-lg p-4 hover:shadow-lg">
                {p.image_urls && p.image_urls.length > 0 ? (
                  <img src={p.image_urls[0]} alt={p.name} className="w-full h-48 object-cover rounded mb-4" />
                ) : (
                  <div className="bg-gray-100 h-48 rounded mb-4"></div>
                )}
                <h2 className="font-bold">{p.name}</h2>
                <p className="text-orange-600 font-bold">₹{p.price}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

