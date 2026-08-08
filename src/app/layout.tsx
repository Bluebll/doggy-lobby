import type { Metadata, Viewport } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CustomCursor, AmbientBackground, NoiseOverlay } from "@/components/ui/GlobalEffects";
import { CursorProvider } from "@/components/ui/CursorProvider";
import PublicLayoutElements from "@/components/layout/PublicLayoutElements";
import { Toaster } from "sonner";
import { WHATSAPP_NUMBER } from "@/lib/constants";

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

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "PetStore",
    "name": "Doggy Lobby - Greenfields",
    "image": "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1200&auto=format&fit=crop",
    "@id": "https://doggylobby.in#greenfields",
    "url": "https://doggylobby.in",
    "telephone": `+${WHATSAPP_NUMBER}`,
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2467 Street No 12, Greenfields",
      "addressLocality": "Faridabad",
      "addressRegion": "Haryana",
      "postalCode": "121010",
      "addressCountry": "IN"
    },
    "openingHoursSpecification": [{
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "10:00",
      "closes": "21:00"
    },{
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday", "Sunday"],
      "opens": "09:00",
      "closes": "22:00"
    }]
  },
  {
    "@context": "https://schema.org",
    "@type": "PetStore",
    "name": "Doggy Lobby - Charmwood Branch",
    "image": "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1200&auto=format&fit=crop",
    "@id": "https://doggylobby.in#charmwood",
    "url": "https://doggylobby.in",
    "telephone": `+${WHATSAPP_NUMBER}`,
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Charmwood, Eros Indian Oil, Ibiza Town, Shiv Durga Vihar",
      "addressLocality": "Faridabad",
      "addressRegion": "Haryana",
      "postalCode": "121009",
      "addressCountry": "IN"
    },
    "openingHoursSpecification": [{
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "10:00",
      "closes": "21:00"
    },{
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday", "Sunday"],
      "opens": "09:00",
      "closes": "22:00"
    }]
  }
];

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
            <PublicLayoutElements>
              {children}
            </PublicLayoutElements>
          </SmoothScroll>
          <Toaster position="top-right" duration={2500} />
        </CursorProvider>
      </body>
    </html>
  );
}
