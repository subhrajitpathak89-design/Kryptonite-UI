import type { MetadataRoute } from 'next'
import { catalog } from '@/docs/catalog'
import { absoluteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl('/'), changeFrequency: 'weekly', priority: 1 },
    { url: absoluteUrl('/docs'), changeFrequency: 'weekly', priority: 0.9 },
    { url: absoluteUrl('/community'), changeFrequency: 'daily', priority: 0.6 },
    ...catalog.map((entry) => ({
      url: absoluteUrl(`/docs/${entry.slug}`),
      changeFrequency: 'monthly' as const,
      priority: entry.source === 'kryptonite' ? 0.8 : 0.7,
    })),
  ]
}
