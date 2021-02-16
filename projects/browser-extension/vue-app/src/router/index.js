import { createRouter, createWebHashHistory } from 'vue-router';


const routes = [
  {
    path: '/',
    redirect: '/meta',
  },
  {
    path: '/meta',
    name: 'meta',
    meta: {
      title: 'Meta',
    },
    component: () => import(/* webpackChunkName:'views/meta' */ '@shared/views/meta.view'),
  },
  {
    path: '/link',
    name: 'link',
    meta: {
      title: 'Link',
    },
    component: () => import(/* webpackChunkName:'views/link' */ '@/views/link.view'),
  },
  {
    path: '/favicon',
    name: 'favicon',
    meta: {
      title: 'Favicon',
    },
    component: () => import(/* webpackChunkName:'views/favicon' */ '@/views/favicon.view'),
  },
  {
    path: '/apple-ios',
    name: 'apple-ios',
    meta: {
      title: 'Apple iOS',
    },
    component: () => import(/* webpackChunkName:'views/apple-ios' */ '@/views/apple-ios.view'),
  },
  {
    path: '/open-graph',
    name: 'open-graph',
    meta: {
      title: 'Open Graph',
    },
    component: () => import(/* webpackChunkName:'views/open-graph' */ '@/views/open-graph.view'),
  },
  {
    path: '/twitter',
    name: 'twitter',
    meta: {
      title: 'Twitter',
    },
    component: () => import(/* webpackChunkName:'views/twitter' */ '@/views/twitter.view'),
  },
  {
    path: '/whatsapp',
    name: 'whatsapp',
    meta: {
      title: 'WhatsApp',
    },
    component: () => import(/* webpackChunkName:'views/whatsapp' */ '@/views/whatsapp.view'),
  },
  {
    path: '/linkedin',
    name: 'linkedin',
    meta: {
      title: 'LinkedIn',
    },
    component: () => import(/* webpackChunkName:'views/linkedin' */ '@/views/linkedin.view'),
  },
  {
    path: '/facebook',
    name: 'facebook',
    meta: {
      title: 'Facebook',
    },
    component: () => import(/* webpackChunkName:'views/facebook' */ '@/views/facebook.view'),
  },
  {
    path: '/slack',
    name: 'slack',
    meta: {
      title: 'Slack',
    },
    component: () => import(/* webpackChunkName:'views/slack' */ '@/views/slack.view'),
  },
  {
    path: '/search-meta',
    name: 'search-meta',
    meta: {
      title: 'Search Meta',
    },
    component: () => import(/* webpackChunkName:'views/search-meta' */ '@/views/search-meta.view'),
  },
  {
    path: '/open-search',
    name: 'open-search',
    meta: {
      title: 'OpenSearch',
    },
    component: () => import(/* webpackChunkName:'views/open-search' */ '@/views/open-search.view'),
  },
  {
    path: '/robots-txt',
    name: 'robots-txt',
    meta: {
      title: 'Robots.txt',
    },
    component: () => import(/* webpackChunkName:'views/robots-txt' */ '@/views/robots-txt.view'),
  },
  {
    path: '/sitemap',
    name: 'sitemap',
    meta: {
      title: 'Sitemap',
    },
    component: () => import(/* webpackChunkName:'views/sitemap' */ '@/views/sitemap.view'),
  },
  {
    path: '/structured-data',
    name: 'structured-data',
    meta: {
      title: 'Structured Data',
    },
    component: () => import(/* webpackChunkName:'views/structured-data' */ '@/views/structured-data.view'),
  },
  {
    path: '/google',
    name: 'google',
    meta: {
      title: 'Google',
    },
    component: () => import(/* webpackChunkName:'views/google' */ '@/views/google.view'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
