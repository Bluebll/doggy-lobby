import Hero from "@/components/sections/Hero"
import TrustBar from "@/components/sections/TrustBar"
import ShopByPet from "@/components/sections/ShopByPet"
import Categories from "@/components/sections/Categories"
import FeaturedProducts from "@/components/sections/FeaturedProducts"
import Statistics from "@/components/sections/Statistics"
import About from "@/components/sections/About"
import Gallery from "@/components/sections/Gallery"
import Reviews from "@/components/sections/Reviews"
import FAQ from "@/components/sections/FAQ"
import Contact from "@/components/sections/Contact"
import { getCategories } from "@/lib/queries/categories"
import { getFeaturedProducts } from "@/lib/queries/products"

export const revalidate = 60

export default async function Home() {
  const [categories, featured] = await Promise.all([
    getCategories(),
    getFeaturedProducts(8),
  ])

  return (
    <main>
      <Hero />
      <TrustBar />
      <ShopByPet />
      <Categories categories={categories} />
      <FeaturedProducts products={featured} />
      <Statistics />
      <About />
      <Gallery />
      <Reviews />
      <FAQ />
      <Contact />
    </main>
  )
}
