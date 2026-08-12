import { getBlogSlugs } from '@/lib/mdx';

const SITE_URL = 'https://www.sunilkarki98.com.np';

export default function sitemap() {
  // Static pages
  const staticPages = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/writing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/uses`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/ne/writing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // Dynamic blog posts (English)
  const blogSlugsEn = getBlogSlugs('blog', 'en');
  const blogPagesEn = blogSlugsEn.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Dynamic blog posts (Nepali)
  const blogSlugsNe = getBlogSlugs('blog', 'ne');
  const blogPagesNe = blogSlugsNe.map((slug) => ({
    url: `${SITE_URL}/ne/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Dynamic essays
  const essaySlugs = getBlogSlugs('essays');
  const essayPages = essaySlugs.map((slug) => ({
    url: `${SITE_URL}/essays/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...blogPagesEn, ...blogPagesNe, ...essayPages];
}
