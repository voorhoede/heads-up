import { createRouter, createWebHashHistory } from 'vue-router';
import sharedRoutes from '@shared/views/shared-routes';

const routes = [
  {
    path: '/',
    redirect: '/meta',
  },
  ...sharedRoutes,
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
