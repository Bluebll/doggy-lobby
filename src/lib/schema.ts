import { site } from "@/config/site"

export interface BreadcrumbItem { name: string; url: string }

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  }
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: site.heroImage,
    contactPoint: [{
      "@type": "ContactPoint",
      telephone: site.phone,
      contactType: "customer service",
      email: site.email,
      areaServed: site.address.country,
    }],
    sameAs: [site.instagramUrl].filter(Boolean),
  }
}

export function localBusinessJsonLd() {
  return {
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
  }
}

export function productJsonLd(p: {
  name: string; description?: string | null; images?: string[]; sku?: string | null;
  price: number; stock: number; brand?: string; slug: string;
}) {
  const url = `${site.url.replace(/\/$/, '')}/products/${p.slug}`
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description ?? "",
    image: p.images ?? [],
    sku: p.sku ?? undefined,
    brand: { "@type": "Brand", name: p.brand || site.name },
    offers: {
      "@type": "Offer",
      priceCurrency: site.currency,
      price: p.price,
      url,
      availability: p.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  }
}
