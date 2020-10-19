<template>
  <panel-section title="Rel">
    <collapsible-list :data="linkListData_mocked" />
  </panel-section>
  <panel-section title="Resources">
    <ul class="resource-list">
      <li>
        <external-link href="https://htmlhead.dev/">
          Guide to HTML5 <code>&lt;head&gt;</code> elements
        </external-link>
      </li>
    </ul>
  </panel-section>
</template>

<script>
// import { computed } from 'vue';
import useHead from '@/composables/use-head';
import PanelSection from '@shared/components/panel-section';
import CollapsibleList from '@shared/components/collapsible-list';

export default {
  setup() {
    const headData = useHead().data;
    console.log(headData.value);
  },

  computed: {
    linkListData_mocked() {
      return [
        {
          'data-n-head': 'ssr',
          'rel': 'alternate',
          'hreflang': 'en',
          'type': 'application/rss+xml',
          'href': 'https://www.voorhoede.nl/blog-feed.xml',
        },
        {
          'data-n-head': 'ssr',
          'rel': 'shortcut icon',
          'type': 'image/x-icon',
          'href': '/images/social/favicon.ico',
        },
        {
          'data-n-head': 'ssr',
          'rel': 'icon',
          'type': 'image/png',
          'href': '/images/social/favicon-16x16.png',
        },
        {
          'data-n-head': 'ssr',
          'rel': 'icon',
          'type': 'image/png',
          'href': '/images/social/favicon-32x32.png',
        },
        {
          'data-n-head': 'ssr',
          'rel': 'icon',
          'type': 'image/png',
          'href': '/images/social/android-36x36.png',
          'sizes': '36x36',
        },
        {
          'data-n-head': 'ssr',
          'rel': 'icon',
          'type': 'image/png',
          'href': '/images/social/android-48x48.png',
          'sizes': '48x48',
        },
        {
          'data-n-head': 'ssr',
          'rel': 'icon',
          'type': 'image/png',
          'href': '/images/social/android-72x72.png',
          'sizes': '72x72',
        },
        {
          'data-n-head': 'ssr',
          'rel': 'icon',
          'type': 'image/png',
          'href': '/images/social/android-96x96.png',
          'sizes': '96x96',
        },
        {
          'data-n-head': 'ssr',
          'rel': 'icon',
          'type': 'image/png',
          'href': '/images/social/android-144x144.png',
          'sizes': '144x144',
        },
        {
          'data-n-head': 'ssr',
          'rel': 'icon',
          'type': 'image/png',
          'href': '/images/social/android-192x192.png',
          'sizes': '192x192',
        },
        {
          'data-n-head': 'ssr',
          'rel': 'manifest',
          'type': 'application/manifest+json',
          'href': '/manifest.json',
        },
        {
          'data-n-head': 'ssr',
          'rel': 'apple-touch-icon',
          'href': '/images/social/apple-icon-60x60.png',
          'sizes': '60x60',
        },
        {
          'data-n-head': 'ssr',
          'rel': 'apple-touch-icon',
          'href': '/images/social/apple-icon-76x76.png',
          'sizes': '76x76',
        },
        {
          'data-n-head': 'ssr',
          'rel': 'apple-touch-icon',
          'href': '/images/social/apple-icon-120x120.png',
          'sizes': '120x120',
        },
        {
          'data-n-head': 'ssr',
          'rel': 'apple-touch-icon',
          'href': '/images/social/apple-icon-152x152.png',
          'sizes': '152x152',
        },
        {
          'data-n-head': 'ssr',
          'rel': 'apple-touch-icon',
          'href': '/images/social/apple-icon-180x180.png',
          'sizes': '180x180',
        },
        {
          'data-n-head': 'ssr',
          'rel': 'mask-icon',
          'href': '/images/social/logo-monochrome.svg',
          'color': '#5959ff',
        },
        {
          'data-n-head': 'ssr',
          'rel': 'dns-prefetch',
          'href': 'https://www.datocms-assets.com/',
        },
        {
          'data-n-head': 'ssr',
          'rel': 'canonical',
          'href': 'https://www.voorhoede.nl/nl/',
        },
        {
          'rel': 'modulepreload',
          'href': '/_nuxt/7185ecf.modern.js',
          'as': 'script',
        },
        {
          'rel': 'modulepreload',
          'href': '/_nuxt/db7eb49.modern.js',
          'as': 'script',
        },
        {
          'rel': 'modulepreload',
          'href': '/_nuxt/b067567.modern.js',
          'as': 'script',
        },
        {
          'rel': 'modulepreload',
          'href': '/_nuxt/52c5bf8.modern.js',
          'as': 'script',
        },
        {
          'rel': 'modulepreload',
          'href': '/_nuxt/9318fff.modern.js',
          'as': 'script',
        },
        {
          'rel': 'modulepreload',
          'href': '/_nuxt/6665bdb.modern.js',
          'as': 'script',
        },
        {
          'rel': 'modulepreload',
          'href': '/_nuxt/61b88d0.modern.js',
          'as': 'script',
        },
        {
          'rel': 'modulepreload',
          'href': '/_nuxt/c6704f4.modern.js',
          'as': 'script',
        },
        {
          'href': 'https://www.google-analytics.com',
          'rel': 'preconnect',
        },
      ];
    },
  },

  components: {
    PanelSection,
    CollapsibleList,
  },
};
</script>
