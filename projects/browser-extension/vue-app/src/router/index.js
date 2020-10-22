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
    component: () => import(/* webpackChunkName:'views/meta' */ '@/views/meta.view.vue'),
  },
  {
    path: '/link',
    name: 'link',
    meta: {
      title: 'Link',
    },
    component: () => import(/* webpackChunkName:'views/link' */ '@/views/link.view.vue'),
  },
  {
    path: '/favicon',
    name: 'favicon',
    meta: {
      title: 'Favicon',
    },
    component: () => import(/* webpackChunkName:'views/favicon' */ '@/views/favicon.view.vue'),
  },
  {
    path: '/apple-ios',
    name: 'apple-ios',
    meta: {
      title: 'Apple iOS',
    },
    component: () => import(/* webpackChunkName:'views/apple-ios' */ '@/views/apple-ios.view.vue'),
  },
  {
    path: '/open-graph',
    name: 'open-graph',
    meta: {
      title: 'Open Graph',
    },
    component: () => import(/* webpackChunkName:'views/open-graph' */ '@/views/open-graph.view.vue'),
  },
  {
    path: '/twitter',
    name: 'twitter',
    meta: {
      title: 'Twitter',
    },
    component: () => import(/* webpackChunkName:'views/twitter' */ '@/views/twitter.view.vue'),
  },
  {
    path: '/whatsapp',
    name: 'whatsapp',
    meta: {
      title: 'WhatsApp',
    },
    component: () => import(/* webpackChunkName:'views/whatsapp' */ '@/views/whatsapp.view.vue'),
  },
  {
    path: '/linkedin',
    name: 'linkedin',
    meta: {
      title: 'LinkedIn',
    },
    component: () => import(/* webpackChunkName:'views/linkedin' */ '@/views/linkedin.view.vue'),
  },
  {
    path: '/facebook',
    name: 'facebook',
    meta: {
      title: 'Facebook',
    },
    component: () => import(/* webpackChunkName:'views/facebook' */ '@/views/facebook.view.vue'),
  },
  {
    path: '/slack',
    name: 'slack',
    meta: {
      title: 'Slack',
    },
    component: () => import(/* webpackChunkName:'views/slack' */ '@/views/slack.view.vue'),
  },
  {
    path: '/search-meta',
    name: 'search-meta',
    meta: {
      title: 'Search Meta',
    },
    component: () => import(/* webpackChunkName:'views/search-meta' */ '@/views/search-meta.view.vue'),
  },
  {
    path: '/opensearch',
    name: 'opensearch',
    meta: {
      title: 'OpenSearch',
    },
    component: () => import(/* webpackChunkName:'views/open-search' */ '@/views/opensearch.view.vue'),
  },
  {
    path: '/robots-txt',
    name: 'robots-txt',
    meta: {
      title: 'Robots.txt',
    },
    component: () => import(/* webpackChunkName:'views/robots-txt' */ '@/views/robots-txt.view.vue'),
  },
  {
    path: '/sitemap',
    name: 'sitemap',
    meta: {
      title: 'Sitemap',
    },
    component: () => import(/* webpackChunkName:'views/sitemap' */ '@/views/sitemap.view.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
