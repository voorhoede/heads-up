import { createRouter, createWebHistory } from 'vue-router';
import useHead from '@/composables/use-head';
import routes from './routes';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

let isFirstRoute = true;

router.beforeEach(async (to, from, next) => {
  const head = useHead();
  const getDataGuarded = head.getDataForUrlWithRouteGuard(to.name, next);
  const atHome = to.name === 'home';

  /**
   * Route Guard for first route:
   * - Try to fetch data for initial url and (re-)route accordingly
   */
  if(isFirstRoute) {
    isFirstRoute = false;
    const queryUrl = to.query.url;
    const storedUrl = sessionStorage && sessionStorage.getItem('url');

    if(queryUrl) {
      const status = await getDataGuarded(queryUrl);
      if(status.routed) return;
    }
    else if(storedUrl) {
      if(atHome) {
        head.setUrl(storedUrl);
      }
      else {
        const status = await getDataGuarded(storedUrl);
        if(status.routed) return;
      }
    }
    else if(!atHome) {
      return next({ name: 'home' });
    }
    return next();
  }
  isFirstRoute = false;

  /**
   * Route Guard for any subsequent route that isn't `home`
   * - Check if data is present or reroute home
   */
  if(!atHome && !head.data.value) {
    return next({ name: 'home' });
  }

  return next();
});

export default router;
