<template>
  <div>
    <panel-section title="Sitemaps">
      <div v-if="!sitemaps.length" class="warning-message">
        <WarningIcon class="icon" />
        <p>
          No sitemap found at
          <external-link :href="sitemapUrl">{{ sitemapUrl }}</external-link>.
        </p>
      </div>
      <details
        v-else
        v-for="sitemap in sitemaps"
        :key="getSitemapUrl(sitemap)"
        :open="!sitemap.sitemapData"
        class="sitemap-view__sitemap"
      >
        <summary class="sitemap-view__sitemap-item">
          <ChevronRightIcon width="12" height="12" />
          sitemap:
          <span class="sitemap-view__sitemap-value">{{ getSitemapUrl(sitemap) }}</span>
          <small> (<a :href="getSitemapUrl(sitemap)" target="_blank" rel="nofollow">view original</a>) </small>
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
import { computed } from 'vue';
import useHead from '@/composables/use-head';
import ChevronRightIcon from '@shared/assets/icons/chevron-right.svg';
import ExternalLink from '@shared/components/external-link';
import PanelSection from '@shared/components/panel-section';
import TreeMenu from '@shared/components/tree-menu';
import WarningIcon from '@shared/assets/icons/warning.svg';

export default {
  setup: () => {
    const headData = useHead().data;
    const sitemaps = computed(() => headData.value.sitemaps);
    const sitemapUrl = computed(() => {
      return headData.value.head.domain + '/sitemap.xml';
    });

    return {
      sitemaps,
      sitemapUrl,
    };
  },
  components: {
    ExternalLink,
    PanelSection,
    TreeMenu,
    ChevronRightIcon,
    WarningIcon,
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
}

.sitemap-view__sitemap .tree-menu__item {
  padding: 4px 0;
}

.sitemap-view__sitemap summary {
  position: relative;
  padding-left: 1rem;
  list-style: none;
  cursor: pointer;
}

.sitemap-view__sitemap summary:focus {
  outline: none;
}

.sitemap-view__sitemap > summary {
  padding-top: 0.5rem;
  padding-right: 0.25rem;
  padding-bottom: 0.5rem;
}

.sitemap-view__sitemap summary::-webkit-details-marker {
  display: none;
}

.sitemap-view__sitemap summary > svg {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  transition: transform 0.15s ease-out;
  fill: currentColor;
}

.sitemap-view__sitemap[open] > summary,
.sitemap-view__sitemap [open] > summary {
  color: var(--color-blue);
}

.sitemap-view__sitemap[open] > summary > svg {
  transform: translateY(-50%) rotate(90deg);
}

.sitemap-view__sitemap-value {
  color: var(--color-black);
  font-family: monospace;
  font-weight: normal;
}

.sitemap-view__sitemap-item small {
  color: var(--color-black);
}

.sitemap-view__sitemap .tree-menu--indent {
  margin-left: 0.375rem;
  padding-left: 0.625rem;
  border-left: 1px solid var(--color-gray);
}

.sitemap-view__sitemap-error.warning-message {
  padding: 0.5rem 0;
  font-weight: normal;
}
</style>
