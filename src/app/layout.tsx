import type { Metadata, Viewport } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import { CustomCursor, AmbientBackground, NoiseOverlay } from "@/components/ui/GlobalEffects";
import { CursorProvider } from "@/components/ui/CursorProvider";
import CartDrawer from "@/components/cart/CartDrawer";
import { site } from "@/config/site";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: `${site.name} | ${site.tagline}`,
  description: site.description,
  keywords: site.seoKeywords,
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    siteName: site.name,
    images: [{ url: site.heroImage, width: 1200, height: 630, alt: `${site.name} storefront` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": site.schemaType,
  name: site.name,
  image: site.heroImage,
  "@id": site.url,
  url: site.url,
  telephone: site.phone,
  priceRange: site.priceRange,
  address: {
    "@type": "PostalAddress",
    streetAddress: [site.address.line1, site.address.line2, site.address.line3].filter(Boolean).join(", "),
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`${manrope.variable} ${inter.variable} font-sans bg-[var(--background)] text-[var(--foreground)] antialiased overflow-x-hidden`}>
        <CursorProvider>
          <NoiseOverlay />
          <AmbientBackground />
          <CustomCursor />
          <SmoothScroll>
            <Navbar />
            {children}
            <Footer />
            <MobileBottomNav />
          </SmoothScroll>
          <CartDrawer />
        </CursorProvider>
      </body>
    </html>
  );
}
