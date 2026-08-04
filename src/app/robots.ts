import type { MetadataRoute } from 'next'
import { site } from '@/config/site'

export default function robots(): MetadataRoute.Robots {
  const base = site.url.replace(/\/$/, '')
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/admin', '/api', '/wishlist'] },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}
