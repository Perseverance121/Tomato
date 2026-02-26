import { MetadataRoute } from 'next'
import { getAllLocationSlugs } from '@/lib/locations'
import { getAllPlantSlugs } from '@/lib/plants'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://growsafeguide.com'
  const now = new Date()

  const locationPages: MetadataRoute.Sitemap = getAllLocationSlugs().map(slug => ({
    url: `${base}/last-frost-date/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const plantPages: MetadataRoute.Sitemap = getAllPlantSlugs().map(slug => ({
    url: `${base}/when-to-plant/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    { url: base, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${base}/planting-calendar`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/frost-dates-by-region`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    ...locationPages,
    ...plantPages,
  ]
}
