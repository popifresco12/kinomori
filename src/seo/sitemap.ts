import type { RouteObject } from 'react-router-dom';
const routes = ['/', '/story', '/menu', '/shop', '/contact'] as const;
const hostname = 'https://popifresco12.github.io/kinomori';
export const sitemap: Array<{url:string; lastmod:string; changefreq:'weekly'|'monthly'; priority:number}> = routes.map(path => ({
  url: hostname + path,
  lastmod: new Date().toISOString().split('T')[0],
  changefreq: 'weekly',
  priority: path === '/' ? 1.0 : 0.7,
}));
