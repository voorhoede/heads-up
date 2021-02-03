<template>
  <div class="sitemap">
    <panel-section title="Contents">
      <div v-if="!sitemaps.length" class="warning-message">
        <WarningIcon class="icon" />
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
          <ChevronRightIcon width="12" height="12" />
          sitemap:
          <span class="sitemap__preview-value">{{ getSitemapUrl(sitemap) }}</span>
          <small> (<a :href="getSitemapUrl(sitemap)" target="_blank" rel="nofollow">view original</a>) </small>
        </summary>

        <div v-if="sitemap.sitemapData">
          <tree-menu v-for="(item, key) in sitemap.sitemapData" :key="key" :name="key" :elements="item" />
        </div>

        <div v-else class="sitemap__preview-error warning-message">
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
    const url = computed(() => headData.value.head.url);
    const sitemaps = computed(() => headData.value.sitemaps);

    const getSitemapUrl = sitemap => (sitemap.sitemapUrl);

    return {
      url,
      sitemaps,
      getSitemapUrl,
    };
  },
  components: {
    ExternalLink,
    PanelSection,
    TreeMenu,
    ChevronRightIcon,
    WarningIcon,
  },
};
</script>

<style>
  .sitemap__preview {
    position: relative;
    font-weight: bold;
  }

  .sitemap__preview .tree-menu__item {
    padding: 4px 0;
  }

  .sitemap__preview summary {
    position: relative;
    padding-left: 1rem;
    list-style: none;
    cursor: pointer;
  }

  .sitemap__preview summary:focus {
    outline: none;
  }

  .sitemap__preview > summary {
    padding-top: 0.5rem;
    padding-right: 0.25rem;
    padding-bottom: 0.5rem;
  }

  .sitemap__preview summary::-webkit-details-marker {
    display: none;
  }

  .sitemap__preview summary > svg {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    transition: transform 0.15s ease-out;
    fill: currentColor;
  }

  .sitemap__preview[open] > summary > svg {
    transform: translateY(-50%) rotate(90deg);
  }

  .sitemap__preview-value {
    color: var(--color-black);
    font-family: monospace;
    font-weight: normal;
  }

  .sitemap__preview-item small {
    color: var(--color-black);
  }

  .sitemap__preview .tree-menu--indent {
    margin-left: 0.375rem;
    padding-left: 0.625rem;
    border-left: 1px solid var(--color-gray);
  }

  .sitemap__preview-error.warning-message {
    margin-left: -0.1rem;
    padding: 0.5rem 0;
    font-weight: normal;
  }
</style>
