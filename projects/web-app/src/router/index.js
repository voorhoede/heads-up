import { createRouter, createWebHistory } from 'vue-router';
import useHead from '@/composables/use-head';

import Home from '@/views/home.view';
import AppleIos from '@/views/apple-ios.view';
import Favicon from '@/views/favicon.view';
import Link from '@/views/link.view';
import Meta from '@/views/meta.view';
import OpenGraph from '@/views/open-graph.view';
import OpenSearch from '@/views/opensearch.view';
import SearchMeta from '@/views/search-meta.view';
import Facebook from '@/views/facebook.view';
import RobotsTxt from '@/views/robots-txt.view';
import Sitemap from '@/views/sitemap.view';
import Twitter from '@/views/twitter.view';
import Whatsapp from '@/views/whatsapp.view';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },

  // Application
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

  // Social Media
  {
    path: '/twitter',
    name: 'twitter',
    component: Twitter,
  },
  {
    path: '/whatsapp',
    name: 'whatsapp',
    component: Whatsapp,
  },
  {
    path: '/facebook',
    name: 'facebook',
    component: Facebook,
  },

  // Search
  {
    path: '/search-meta',
    name: 'search-meta',
    component: SearchMeta,
  },
  {
    path: '/sitemap',
    name: 'sitemap',
    component: Sitemap,
  },
  {
    path: '/robots-txt',
    name: 'robots-txt',
    component: RobotsTxt,
  },

  // Catch all fallback
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

let isFirstRoute = true;

// eslint-disable-next-line sonarjs/cognitive-complexity
router.beforeEach(async (to, from, next) => {
  const toQueryUrl = to.query.url;
  const head = useHead();

  /**
   * Route Guard for first route
   */
  if(isFirstRoute) {
    isFirstRoute = false;
    if(toQueryUrl) {
      try {
        const headData = await head.getDataForUrl(toQueryUrl);
        if(headData && Object.keys(headData).length) {
          if(to.name === 'home') {
            return next({ name: 'meta' });
          }
          return next();
        }
        else {
          // @TODO :: Nicer error messaging to user
          console.error(`Failed to load head data for "${ toQueryUrl }".`);
          if(to.name !== 'home') {
            return next({ name: 'home' });
          }
        }
      }
      catch(err) {
        // @TODO :: Nicer error messaging to user
        console.error(`Failed to load head data for "${ toQueryUrl }".`, err);
        if(to.name !== 'home') {
          return next({ name: 'home' });
        }
      }
    }
    else if(to.name !== 'home') {
      return next({ name: 'home' });
    }
  }
  isFirstRoute = false;

  /**
   * Route Guard for any subsequent route that isn't `home`
   * Check if data is present
   */
  if(to.name !== 'home' && !(head.data.value && Object.keys(head.data.value).length)) {
    return next({ name: 'home' });
  }

  // Pass url query string along to each route if it exists
  // const fromQueryUrl = from.query.url;
  // if(fromQueryUrl && !toQueryUrl) {
  //   return next({ path: to.path, query: { url: fromQueryUrl } });
  // }

  return next();
});

export default router;
