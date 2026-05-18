import type { RouteObject } from 'react-router-dom';
const routes = ['/', '/story', '/menu', '/shop', '/contact'];
const hostname = 'https://kinomori.ma';
export const sitemap = routes.map(path => ({
  url: \`\${hostname}\${path}\`,
  lastmod: new Date().toISOString().split('T')[0],
  changefreq: 'weekly' as const,
  priority: path === '/' ? 1.0 : 0.7,
}));
