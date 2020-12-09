<template>
  <div>
    <panel-section title="Contents">
      <div v-if="!sitemaps.length" class="warning-message">
        <WarningIcon class="icon" />
        <p>No sitemaps were detected.</p>
      </div>
      <details
        v-else
        v-for="sitemap in sitemaps"
        :key="getSitemapUrl(sitemap)"
        :open="!sitemap.sitemapData"
        class="sitemap-view__sitemap"
      >
        <summary class="sitemap-view__sitemap-url">
          <ChevronRightIcon width="12" height="12" />
          sitemap:
          <span class="sitemap-view__sitemap-value">{{ getSitemapUrl(sitemap) }}</span>
          <small> (<external-link :href="getSitemapUrl(sitemap)">view original</external-link>) </small>
        </summary>

        <div v-if="sitemap.sitemapData">
          <tree-menu v-for="(item, key) in sitemap.sitemapData" :key="key" :name="key" :elements="item" />
        </div>

        <div v-else class="sitemap-view__sitemap-error warning-message">
          <WarningIcon class="icon" />
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
import ChevronRightIcon from '@shared/assets/icons/chevron-right.svg';
import ExternalLink from '@shared/components/external-link';
import PanelSection from '@shared/components/panel-section';
import TreeMenu from '@shared/components/tree-menu';
import WarningIcon from '@shared/assets/icons/warning.svg';

export default {
  components: { ChevronRightIcon, ExternalLink, PanelSection, TreeMenu, WarningIcon },
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
.sitemap-view__sitemap {
  position: relative;
  font-weight: bold;
  margin: 0 -1rem;
  overflow: hidden;
}

.sitemap-view__sitemap:not(:last-child)::after {
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

.sitemap-view__sitemap .tree-menu__item {
  display: flex;
  align-items: center;
  padding-left: 1.5rem;
  min-height: 22px;
}

.sitemap-view__sitemap summary {
  position: relative;
  padding-left: 1.5rem;
  list-style: none;
  cursor: pointer;
}

.sitemap-view__sitemap > div > .tree-menu > .tree-menu__item::before {
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

.sitemap-view__sitemap summary:focus {
  outline: none;
}

.sitemap-view__sitemap:focus-within > summary {
  background-color: var(--selection-inactive-bg-color);
}

.sitemap-view__sitemap summary:focus:not(:hover) {
  color: var(--selection-fg-color);
  background-color: var(--selection-bg-color);
}

.sitemap-view__sitemap summary:focus:not(:hover) a {
  color: var(--selection-fg-color);
}

.sitemap-view__sitemap > summary {
  padding-top: 0.5rem;
  padding-right: 0.25rem;
  padding-bottom: 0.5rem;
  padding-left: 2rem;
}

.sitemap-view__sitemap summary::-webkit-details-marker {
  display: none;
}

.sitemap-view__sitemap > div > .tree-menu > .tree-menu__item:nth-of-type(odd)::before {
  background-color: var(--network-grid-stripe-color);
}

.sitemap-view__sitemap summary > svg {
  position: absolute;
  top: 50%;
  left: 0.5rem;
  transform: translateY(-50%);
  transition: transform 0.15s ease-out;
  fill: currentColor;
}

.sitemap-view__sitemap > summary > svg {
  left: 1rem;
}

.sitemap-view__sitemap[open] > summary > svg {
  transform: translateY(-50%) rotate(90deg);
}

.sitemap-view__sitemap-value {
  color: var(--color-black);
  font-family: monospace;
  font-weight: normal;
}

.sitemap-view__sitemap .tree-menu__collapsible-node {
  padding: 0.25rem 0 0.25rem 1.5rem;
}

.sitemap-view__sitemap-item small {
  color: var(--color-black);
}

.sitemap-view__sitemap-error.warning-message {
  padding: 0.5rem 0.89rem;
  font-weight: normal;
}
</style>
