<template>
  <div
    class="app"
    :class="themeClass"
  >
    <app-sidebar class="app__sidebar" />

    <main class="app__panel">
      <template v-if="head && head.url">
        <panel-section
          is-header
          :title="$route.meta.title || 'Loading...'"
        >
          <external-link :href="head.url">
            {{ head.url }}
          </external-link>
        </panel-section>
        <router-view :head-data="{ head, robots, sitemaps, sitemapUrls, urlIsCrawlable, openSearchContent, openSearchUrl, structuredData }" />
      </template>
    </main>

    <refresh-button v-if="isDev" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import getTheme from '@shared/lib/theme';
import PanelSection from '@shared/components/panel-section';
import ExternalLink from '@shared/components/external-link';
import AppSidebar from './app-sidebar';
import RefreshButton from './refresh-button';

export default {
  components: { AppSidebar, ExternalLink, PanelSection, RefreshButton },
  computed: {
    // @TODO :: Clean this up
    ...mapState([ 'head', 'robots', 'sitemaps', 'sitemapUrls', 'urlIsCrawlable', 'openSearchContent', 'openSearchUrl', 'structuredData' ]),
    themeClass() {
      return getTheme() === 'dark' ? '-theme-with-dark-background' : '';
    },
    isDev() { return process.env.NODE_ENV === 'development'; },
  },
};
</script>

<style>
  :root {
    --sidebar-width: 190px;
  }

  .app {
    color: var(--base-color);
    height: 100%;
  }

  .app__sidebar {
    position: fixed;
    height: 100%;
    width: var(--sidebar-width);
  }

  .app__panel {
    background-color: var(--toolbar-bg-color);
    width: calc(100% - var(--sidebar-width));
    margin-left: var(--sidebar-width);
    min-height: 100vh;
  }

  .heading {
    margin-bottom: 16px;
  }

  .heading-default {
    font-size: 15px;
  }

  .heading-small {
    font-weight: bold;
    font-size: .75rem;
    color: var(--base-color);
  }
</style>
