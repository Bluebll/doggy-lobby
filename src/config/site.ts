/**
 * Single source of truth for store IDENTITY, CONTACT and SEO.
 * All values are environment-driven — rebrand by editing .env only.
 * Doggy Lobby values are the defaults so nothing breaks in dev.
 */

export const site = {
  name: process.env.NEXT_PUBLIC_STORE_NAME || "Doggy Lobby",
  tagline: process.env.NEXT_PUBLIC_STORE_TAGLINE || "Faridabad's Premium Destination For Happy Pets",
  description:
    process.env.NEXT_PUBLIC_STORE_DESCRIPTION ||
    "Premium food, imported treats, grooming essentials, toys and accessories for every furry family member.",
  url: process.env.NEXT_PUBLIC_STORE_URL || "https://doggylobby.in",
  currency: process.env.NEXT_PUBLIC_STORE_CURRENCY || "INR",
  locale: process.env.NEXT_PUBLIC_STORE_LOCALE || "en_IN",

  // Contact
  phone: process.env.NEXT_PUBLIC_STORE_PHONE || "+919876543210", // E.164 with +
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210", // digits only
  email: process.env.NEXT_PUBLIC_STORE_EMAIL || "hello@doggylobby.in",
  instagram: process.env.NEXT_PUBLIC_STORE_INSTAGRAM || "@doggylobby.in",
  instagramUrl: process.env.NEXT_PUBLIC_STORE_INSTAGRAM_URL || "https://instagram.com/doggylobby.in",

  // Address
  address: {
    line1: process.env.NEXT_PUBLIC_STORE_ADDRESS_LINE1 || "2467, Street No. 12",
    line2: process.env.NEXT_PUBLIC_STORE_ADDRESS_LINE2 || "Greenfields Main Road",
    line3: process.env.NEXT_PUBLIC_STORE_ADDRESS_LINE3 || "Near All 4 Pet Dog Shop",
    city: process.env.NEXT_PUBLIC_STORE_CITY || "Faridabad",
    region: process.env.NEXT_PUBLIC_STORE_REGION || "Haryana",
    country: process.env.NEXT_PUBLIC_STORE_COUNTRY || "IN",
    postalCode: process.env.NEXT_PUBLIC_STORE_POSTAL_CODE || "121001",
  },

  // Geo (for JSON-LD)
  geo: {
    lat: Number(process.env.NEXT_PUBLIC_STORE_LAT || 28.3974),
    lng: Number(process.env.NEXT_PUBLIC_STORE_LNG || 77.3195),
  },

  // Maps embed src (optional)
  mapsEmbedUrl:
    process.env.NEXT_PUBLIC_STORE_MAPS_EMBED ||
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m2!1s0x390cd18b5db586ad%3A0xc665b16f3ea83c07!2sSector%2015%2C%20Faridabad%2C%20Haryana%20121007!5e0!3m2!1sen!2sin!4v1689255678123!5m2!1sen!2sin",
  mapsDirectionsUrl: process.env.NEXT_PUBLIC_STORE_MAPS_DIRECTIONS || "https://maps.google.com",

  // Hero image
  heroImage:
    process.env.NEXT_PUBLIC_HERO_IMAGE ||
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2669&auto=format&fit=crop",

  // SEO keywords
  seoKeywords: (process.env.NEXT_PUBLIC_SEO_KEYWORDS ||
    "Pet Shop,Dog Food,Cat Food,Pet Accessories,Premium Pet Store").split(",").map((s) => s.trim()),

  // Business type (schema.org)
  schemaType: process.env.NEXT_PUBLIC_SCHEMA_TYPE || "PetStore",
  priceRange: process.env.NEXT_PUBLIC_PRICE_RANGE || "$$$",
}

export function fullAddress(): string {
  const a = site.address
  return [a.line1, a.line2, a.line3, `${a.city}, ${a.region} ${a.postalCode}`].filter(Boolean).join(", ")
}

export function telHref(): string {
  return `tel:${site.phone.replace(/[^\d+]/g, "")}`
}

export function waHref(preset?: string): string {
  const num = site.whatsapp.replace(/[^\d]/g, "")
  return preset ? `https://wa.me/${num}?text=${encodeURIComponent(preset)}` : `https://wa.me/${num}`
}
