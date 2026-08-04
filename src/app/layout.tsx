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
import { organizationJsonLd, localBusinessJsonLd } from "@/lib/schema";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: site.seoKeywords,
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
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
    images: [site.heroImage],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }} />
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
