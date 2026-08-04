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

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Doggy Lobby | Faridabad's Premium Destination For Happy Pets",
  description: "Premium food, imported treats, grooming essentials, toys and accessories for every furry family member in Faridabad.",
  keywords: ["Pet Shop Faridabad", "Dog Food Faridabad", "Cat Food Faridabad", "Pet Accessories Faridabad", "Greenfields Pet Store", "Premium Pet Store"],
  authors: [{ name: "Doggy Lobby" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://doggylobby.in",
    title: "Doggy Lobby | Premium Pet Store",
    description: "Faridabad's most luxurious pet store. Curated imported brands, orthopedic beds, and organic treats.",
    siteName: "Doggy Lobby",
    images: [{
      url: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1200&auto=format&fit=crop",
      width: 1200,
      height: 630,
      alt: "Doggy Lobby Storefront",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Doggy Lobby | Faridabad's Premium Pet Store",
    description: "Premium food, imported treats, grooming essentials for pets in Faridabad.",
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "PetStore",
  "name": "Doggy Lobby",
  "image": "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1200&auto=format&fit=crop",
  "@id": "https://doggylobby.in",
  "url": "https://doggylobby.in",
  "telephone": "+919876543210",
  "priceRange": "$$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Sector 15 Market",
    "addressLocality": "Faridabad",
    "addressRegion": "Haryana",
    "postalCode": "121007",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 28.3974,
    "longitude": 77.3195
  },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"
    ],
    "opens": "10:00",
    "closes": "21:00"
  },{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Saturday", "Sunday"
    ],
    "opens": "09:00",
    "closes": "22:00"
  }]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${manrope.variable} ${inter.variable} font-sans bg-[var(--background)] text-[var(--foreground)] antialiased overflow-x-hidden`}
      >
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
