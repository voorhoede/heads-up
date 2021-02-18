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
    component: () => import(/* webpackChunkName:'views/link' */ '@shared/views/link.view'),
  },
  {
    path: '/favicon',
    name: 'favicon',
    meta: {
      title: 'Favicon',
    },
    component: () => import(/* webpackChunkName:'views/favicon' */ '@shared/views/favicon.view'),
  },
  {
    path: '/apple-ios',
    name: 'apple-ios',
    meta: {
      title: 'Apple iOS',
    },
    component: () => import(/* webpackChunkName:'views/apple-ios' */ '@shared/views/apple-ios.view'),
  },
  {
    path: '/open-graph',
    name: 'open-graph',
    meta: {
      title: 'Open Graph',
    },
    component: () => import(/* webpackChunkName:'views/open-graph' */ '@shared/views/open-graph.view'),
  },
  {
    path: '/twitter',
    name: 'twitter',
    meta: {
      title: 'Twitter',
    },
    component: () => import(/* webpackChunkName:'views/twitter' */ '@shared/views/twitter.view'),
  },
  {
    path: '/whatsapp',
    name: 'whatsapp',
    meta: {
      title: 'WhatsApp',
    },
    component: () => import(/* webpackChunkName:'views/whatsapp' */ '@shared/views/whatsapp.view'),
  },
  {
    path: '/linkedin',
    name: 'linkedin',
    meta: {
      title: 'LinkedIn',
    },
    component: () => import(/* webpackChunkName:'views/linkedin' */ '@shared/views/linkedin.view'),
  },
  {
    path: '/facebook',
    name: 'facebook',
    meta: {
      title: 'Facebook',
    },
    component: () => import(/* webpackChunkName:'views/facebook' */ '@shared/views/facebook.view'),
  },
  {
    path: '/slack',
    name: 'slack',
    meta: {
      title: 'Slack',
    },
    component: () => import(/* webpackChunkName:'views/slack' */ '@shared/views/slack.view'),
  },
  {
    path: '/search-meta',
    name: 'search-meta',
    meta: {
      title: 'Search Meta',
    },
    component: () => import(/* webpackChunkName:'views/search-meta' */ '@shared/views/search-meta.view'),
  },
  {
    path: '/robots-txt',
    name: 'robots-txt',
    meta: {
      title: 'Robots.txt',
    },
    component: () => import(/* webpackChunkName:'views/robots-txt' */ '@shared/views/robots-txt.view'),
  },
  {
    path: '/sitemap',
    name: 'sitemap',
    meta: {
      title: 'Sitemap',
    },
    component: () => import(/* webpackChunkName:'views/sitemap' */ '@shared/views/sitemap.view'),
  },
  {
    path: '/open-search',
    name: 'open-search',
    meta: {
      title: 'OpenSearch',
    },
    component: () => import(/* webpackChunkName:'views/open-search' */ '@shared/views/open-search.view'),
  },
  {
    path: '/structured-data',
    name: 'structured-data',
    meta: {
      title: 'Structured Data',
    },
    component: () => import(/* webpackChunkName:'views/structured-data' */ '@shared/views/structured-data.view'),
  },
  {
    path: '/google',
    name: 'google',
    meta: {
      title: 'Google',
    },
    component: () => import(/* webpackChunkName:'views/google' */ '@shared/views/google.view'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
