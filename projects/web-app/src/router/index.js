import { createRouter, createWebHistory } from 'vue-router';

import Meta from '@/views/meta-renaming-error.vue';

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
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
