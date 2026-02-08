import { MetadataRoute } from 'next'
import { translations } from '@/lib/translations';
 
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';
  
  const serviceKeys = Object.keys(translations.fi.services);
  
  const servicePages = serviceKeys
    .filter(key => typeof translations.fi.services[key as keyof typeof translations.fi.services] === 'object')
    .map(key => ({
      url: `${siteUrl}/services/${key}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as 'monthly',
      priority: 0.8,
    }));
 
  return [
    {
      url: siteUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...servicePages,
  ]
}
