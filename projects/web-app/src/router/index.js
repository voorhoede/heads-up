import { createRouter, createWebHistory } from 'vue-router';

import AppleIos from '@/views/apple-ios.view.vue';
import Favicon from '@/views/favicon.view.vue';
import Link from '@/views/link.view.vue';
import Meta from '@/views/meta.view.vue';
import OpenGraph from '@/views/open-graph.view.vue';
import OpenSearch from '@/views/opensearch.view.vue';
import SearchMeta from '@/views/search-meta.view.vue';

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
    path: '/open-graph',
    name: 'open-graph',
    component: OpenGraph,
  },
  {
    path: '/opensearch',
    name: 'opensearch',
    component: OpenSearch,
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
