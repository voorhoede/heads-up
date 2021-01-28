import Home from '@/views/home.view';
import AppleIos from '@/views/apple-ios.view';
import Facebook from '@/views/facebook.view';
import Favicon from '@/views/favicon.view';
import Link from '@/views/link.view';
import Meta from '@/views/meta.view';
import OpenGraph from '@/views/open-graph.view';
import OpenSearch from '@/views/opensearch.view';
import RobotsTxt from '@/views/robots-txt.view';
import SearchMeta from '@/views/search-meta.view';
import Sitemap from '@/views/sitemap.view';
import Slack from '@/views/slack.view';
import StructuredData from '@/views/structured-data.view';
import Twitter from '@/views/twitter.view';
import Whatsapp from '@/views/whatsapp.view';

export default [
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
    meta: {
      title: 'Meta',
    },
  },
  {
    path: '/link',
    name: 'link',
    component: Link,
    meta: {
      title: 'Link',
    },
  },
  {
    path: '/favicon',
    name: 'favicon',
    component: Favicon,
    meta: {
      title: 'Favicon',
    },
  },
  {
    path: '/apple-ios',
    name: 'apple-ios',
    component: AppleIos,
    meta: {
      title: 'Apple iOS',
    },
  },
  {
    path: '/open-graph',
    name: 'open-graph',
    component: OpenGraph,
    meta: {
      title: 'OpenGraph',
    },
  },
  {
    path: '/opensearch',
    name: 'opensearch',
    component: OpenSearch,
    meta: {
      title: 'Open Search',
    },
  },

  // Social Media
  {
    path: '/twitter',
    name: 'twitter',
    component: Twitter,
    meta: {
      title: 'Twitter',
    },
  },
  {
    path: '/whatsapp',
    name: 'whatsapp',
    component: Whatsapp,
    meta: {
      title: 'WhatsApp',
    },
  },
  {
    path: '/facebook',
    name: 'facebook',
    component: Facebook,
    meta: {
      title: 'Facebook',
    },
  },
  {
    path: '/slack',
    name: 'slack',
    component: Slack,
    meta: {
      title: 'Slack',
    },
  },

  // Search
  {
    path: '/search-meta',
    name: 'search-meta',
    component: SearchMeta,
    meta: {
      title: 'Search Meta',
    },
  },
  {
    path: '/sitemap',
    name: 'sitemap',
    component: Sitemap,
    meta: {
      title: 'Sitemap',
    },
  },
  {
    path: '/robots-txt',
    name: 'robots-txt',
    component: RobotsTxt,
    meta: {
      title: 'Robots',
    },
  },
  {
    path: '/structured-data',
    name: 'structured-data',
    component: StructuredData,
    meta: {
      title: 'Structured Data',
    },
  },

  // Catch all fallback
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];
