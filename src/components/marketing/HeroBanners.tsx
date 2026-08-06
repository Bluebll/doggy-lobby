import { getHeroBanners } from '@/lib/queries/marketing'

export default async function HeroBanners() {
  const banners = await getHeroBanners()
  if (!banners.length) return null

  return (
    <div className="relative w-full overflow-hidden">
      {banners.map((banner) => (
        <div key={banner.id} className="relative h-96 bg-gray-100">
          <img src={banner.image_url} alt={banner.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center p-8">
            {banner.title && <h1 className="text-5xl font-bold text-white mb-2">{banner.title}</h1>}
            {banner.subtitle && <p className="text-xl text-white/90">{banner.subtitle}</p>}
            {banner.cta_text && <button className="mt-6 bg-orange-600 text-white px-8 py-3 rounded-lg">{banner.cta_text}</button>}
          </div>
        </div>
      ))}
    </div>
  )
}
