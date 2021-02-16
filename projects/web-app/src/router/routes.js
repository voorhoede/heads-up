import Home from '@/views/home.view';

import AppleIos from '@shared/views/apple-ios.view';
import Facebook from '@shared/views/facebook.view';
import Favicon from '@shared/views/favicon.view';
import Link from '@shared/views/link.view';
import LinkedIn from '@shared/views/linkedin.view';
import Google from '@shared/views/google.view';
import Meta from '@shared/views/meta.view';
import OpenGraph from '@shared/views/open-graph.view';
import OpenSearch from '@shared/views/open-search.view';
import RobotsTxt from '@shared/views/robots-txt.view';
import SearchMeta from '@shared/views/search-meta.view';
import Sitemap from '@shared/views/sitemap.view';
import Slack from '@shared/views/slack.view';
import StructuredData from '@shared/views/structured-data.view';
import Twitter from '@shared/views/twitter.view';
import Whatsapp from '@shared/views/whatsapp.view';

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
    path: '/open-search',
    name: 'open-search',
    component: OpenSearch,
    meta: {
      title: 'OpenSearch',
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
    path: '/linkedin',
    name: 'linkedin',
    component: LinkedIn,
    meta: {
      title: 'LinkedIn',
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
  {
    path: '/google',
    name: 'google',
    component: Google,
    meta: {
      title: 'Google',
    },
  },

  // Catch all fallback
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];
