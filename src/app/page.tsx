import Hero from "@/components/sections/Hero"
import HeroBanners from "@/components/marketing/HeroBanners"
import TrustBar from "@/components/sections/TrustBar"
import ShopByCollection from "@/components/sections/ShopByCollection"
import Statistics from "@/components/sections/Statistics"
import About from "@/components/sections/About"
import Gallery from "@/components/sections/Gallery"
import Reviews from "@/components/sections/Reviews"
import FAQ from "@/components/sections/FAQ"
import Contact from "@/components/sections/Contact"

export const revalidate = 60

export default async function Home() {
  return (
    <main>
      <Hero />
      <HeroBanners />
      <TrustBar />
      <ShopByCollection />
      <Statistics />
      <About />
      <Gallery />
      <Reviews />
      <FAQ />
      <Contact />
    </main>
  )
}
