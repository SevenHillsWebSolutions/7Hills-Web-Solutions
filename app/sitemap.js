import { sql } from '@/lib/db';

export default async function sitemap() {
  const baseUrl = 'https://7hillsweb.com';

  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/solutions',
    '/industries',
    '/portfolio',
    '/process',
    '/pricing',
    '/track',
    '/contact',
    '/faq',
    '/start-project',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  let portfolioRoutes = [];
  try {
    if (process.env.DATABASE_URL) {
      const items = await sql`SELECT slug, updated_at FROM portfolio WHERE published = 1`;
      portfolioRoutes = items.map((item) => ({
        url: `${baseUrl}/portfolio/${item.slug}`,
        lastModified: item.updated_at || new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.warn('Sitemap portfolio fetch error:', error.message);
  }

  return [...staticRoutes, ...portfolioRoutes];
}
