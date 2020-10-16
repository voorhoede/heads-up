import { createRouter, createWebHistory } from 'vue-router';

import Favicon from '@/views/Favicon.vue';
import Meta from '@/views/Meta.vue';

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
