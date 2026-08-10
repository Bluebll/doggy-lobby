import { getSupabaseServer } from '@/lib/supabase/server'
import Link from 'next/link'
import BackButton from '@/components/ui/BackButton'
import HomeButton from '@/components/ui/HomeButton'
import SafeImage from '@/components/ui/SafeImage'

const collectionNames: Record<string, string> = {
  'dogs': 'Dogs',
  'cats': 'Cats',
  'puppies': 'Puppies',
  'kittens': 'Kittens',
  'other-pets': 'Other Pets',
  'all': 'All Products',
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
  
  let query = supabase
    .from('products')
    .select('id, slug, name, price, image_urls')
    .eq('is_active', true)
    
  if (type !== 'all') {
    query = query.eq('collection', type)
  }
  
  const { data: products } = await query.returns<CollectionProduct[]>()
  
  const collectionName = collectionNames[type] || type

  return (
    <div className="min-h-[100dvh] bg-white pt-40 px-4 md:px-8 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex gap-2 mb-4 relative z-10">
          <BackButton />
          <HomeButton />
        </div>
        <h1 className="text-4xl font-bold mb-8">{collectionName}</h1>
        {!products || products.length === 0 ? (
          <p className="text-gray-600">No products in this collection yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <Link href={`/products/${p.slug}`} key={p.id} className="border rounded-lg p-4 hover:shadow-lg">
                {p.image_urls && p.image_urls.length > 0 ? (
                  <SafeImage src={p.image_urls[0]} alt={p.name} className="w-full h-48 object-contain bg-white rounded mb-4" />
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

