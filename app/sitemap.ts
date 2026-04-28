import type { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';
import { stays } from '@/lib/searchData';
import { toSlug } from '@/lib/utils';

const BASE_URL = 'https://orbis-travel.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/search`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/auth/login`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/auth/signup`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  let hotelSlugs: string[];
  try {
    const { data } = await supabase.from('hotels').select('id');
    hotelSlugs = data?.length ? data.map((h: { id: string }) => h.id) : stays.map(s => toSlug(s.name));
  } catch {
    hotelSlugs = stays.map(s => toSlug(s.name));
  }

  const hotelRoutes: MetadataRoute.Sitemap = hotelSlugs.map(id => ({
    url: `${BASE_URL}/stays/${id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [...staticRoutes, ...hotelRoutes];
}
