import { createRouter, createWebHistory } from 'vue-router';

import Favicon from '@/views/favicon.vue';
import Meta from '@/views/meta.vue';

const routes = [
  {
    path: '/',
    redirect: '/meta',
  },
  {
    path: '/favicon',
    name: 'favicon',
    component: Favicon,
  },
  {
    path: '/meta',
    name: 'meta',
    component: Meta,
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
