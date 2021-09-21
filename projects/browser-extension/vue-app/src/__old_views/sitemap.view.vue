<template>
  <div class="sitemap">
    <panel-section title="Contents">
      <div v-if="!sitemaps.length" class="warning-message">
        <app-icon name="warning" />
        <p>
          No Sitemap reference found in
          <external-link :href="`${url}/robots.txt`">/robots.txt</external-link>.
        </p>
      </div>
      <details
        v-else
        v-for="sitemap in sitemaps"
        :key="getSitemapUrl(sitemap)"
        :open="!sitemap.sitemapData"
        class="sitemap__preview"
      >
        <summary class="sitemap__preview-item">
          <app-icon name="chevron-right" />
          sitemap:
          <span class="sitemap__preview-value">{{ getSitemapUrl(sitemap) }}</span>
          <small> (<external-link :href="getSitemapUrl(sitemap)">view original</external-link>) </small>
        </summary>

        <div v-if="sitemap.sitemapData">
          <tree-menu v-for="(item, key) in sitemap.sitemapData" :key="key" :name="key" :elements="item" />
        </div>

        <div v-else class="sitemap__preview-error warning-message">
          <app-icon name="warning" />
          <p>Could not read/parse the sitemap.</p>
        </div>
      </details>
    </panel-section>
    <panel-section title="Resources">
      <ul class="resource-list">
        <li>
          <external-link href="https://www.sitemaps.org/">
            Sitemaps.org
          </external-link>
        </li>
        <li>
          <external-link href="https://support.google.com/webmasters/answer/183668?hl=en">
            Build and submit a sitemap - Google Support
          </external-link>
        </li>
      </ul>
    </panel-section>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import AppIcon from '@shared/components/app-icon';
import ExternalLink from '@shared/components/external-link';
import PanelSection from '@shared/components/panel-section';
import TreeMenu from '@shared/components/tree-menu';

export default {
  components: { AppIcon, ExternalLink, PanelSection, TreeMenu },
  computed: {
    ...mapState([ 'head', 'sitemaps' ]),
  },
  methods: {
    getSitemapUrl(sitemap) {
      return sitemap.sitemapUrl;
    },
  },
};
</script>

<style>
  .sitemap__preview {
    position: relative;
    margin: 0 -1rem;
    overflow: hidden;
    font-weight: bold;
  }

  .sitemap__preview:not(:last-child)::after {
    content: '';
    display: block;
    position: absolute;
    z-index: -1;
    bottom: 0;
    left: -1rem;
    width: calc(100% + 2rem);
    height: 1px;
    opacity: 0.5;
    background-color: var(--divider-color);
  }

  .sitemap__preview .tree-menu__item {
    display: flex;
    align-items: center;
    min-height: 22px;
    padding-left: 1.5rem;
  }

  .sitemap__preview summary {
    position: relative;
    padding-left: 1.5rem;
    list-style: none;
    cursor: pointer;
  }

  .sitemap__preview > div > .tree-menu > .tree-menu__item::before {
    content: '';
    display: block;
    position: absolute;
    z-index: -1;
    top: 0;
    left: -1rem;
    width: calc(100% + 2rem);
    height: 100%;
    background-color: transparent;
  }

  .sitemap__preview summary:focus {
    outline: none;
  }

  .sitemap__preview:focus-within > summary {
    background-color: var(--selection-inactive-bg-color);
  }

  .sitemap__preview summary:focus:not(:hover) {
    background-color: var(--selection-bg-color);
    color: var(--selection-fg-color);
  }

  .sitemap__preview summary:focus:not(:hover) a {
    color: var(--selection-fg-color);
  }

  .sitemap__preview > summary {
    padding-top: 0.5rem;
    padding-right: 0.25rem;
    padding-bottom: 0.5rem;
    padding-left: 2rem;
  }

  .sitemap__preview summary::-webkit-details-marker {
    display: none;
  }

  .sitemap__preview > div > .tree-menu > .tree-menu__item:nth-of-type(odd)::before {
    background-color: var(--network-grid-stripe-color);
  }

  .sitemap__preview summary > .app-icon {
    position: absolute;
    top: 50%;
    left: 0.5rem;
    transform: translateY(-50%);
    transition: transform 0.15s ease-out;
    width: 12px;
    height: 12px;
  }

  .sitemap__preview summary > .app-icon svg {
    fill: currentColor;
  }

  .sitemap__preview > summary > .app-icon {
    left: 1rem;
  }

  .sitemap__preview[open] > summary > .app-icon {
    transform: translateY(-50%) rotate(90deg);
  }

  .sitemap__preview-value {
    color: var(--color-black);
    font-family: monospace;
    font-weight: normal;
  }

  .sitemap__preview .tree-menu__collapsible-node {
    padding: 0.25rem 0 0.25rem 1.5rem;
  }

  .sitemap__preview-item small {
    color: var(--color-black);
  }

  .sitemap__preview-error.warning-message {
    padding: 0.5rem 0.89rem;
    font-weight: normal;
  }
</style>
