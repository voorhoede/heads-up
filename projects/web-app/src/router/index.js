import { createRouter, createWebHistory } from 'vue-router';

import AppleIos from '@/views/apple-ios.view';
import Favicon from '@/views/favicon.view';
import Link from '@/views/link.view';
import Meta from '@/views/meta.view';
import Opengraph from '@/views/open-graph.view';
import SearchMeta from '@/views/search-meta.view';
import Facebook from '@/views/facebook.view';

const routes = [
  {
    path: '/',
    redirect: '/meta',
  },
  {
    path: '/meta',
    name: 'meta',
    component: Meta,
  },
  {
    path: '/link',
    name: 'link',
    component: Link,
  },
  {
    path: '/favicon',
    name: 'favicon',
    component: Favicon,
  },
  {
    path: '/apple-ios',
    name: 'apple-ios',
    component: AppleIos,
  },
  {
    path: '/robots-txt',
    name: 'robots-txt',
    component: RobotsTxt,
  },
  {
    path: '/open-graph',
    name: 'open-graph',
    component: Opengraph,
  },
  {
    path: '/facebook',
    name: 'facebook',
    component: Facebook,
  },
    path: '/sitemap',
    name: 'sitemap',
    component: Sitemap,
  },
  {
    path: '/search-meta',
    name: 'search-meta',
    component: SearchMeta,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
