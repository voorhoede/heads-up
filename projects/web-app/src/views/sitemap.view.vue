<template>
  <panel-section title="Sitemap">
    <div v-if="!sitemap" class="warning-message">
      <WarningIcon class="icon" />
      <p>
        No sitemap found at
        <external-link :href="sitemapUrl">{{ sitemapUrl }}</external-link>.
      </p>
    </div>
    <code v-else>
      <pre>{{ sitemap }}</pre>
    </code>
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
</template>

<script>
import { computed } from 'vue';
import useHead from '@/composables/use-head';
import PanelSection from '@shared/components/panel-section';
import ExternalLink from '@shared/components/external-link';
import WarningIcon from '@shared/assets/icons/warning.svg';

export default {
  setup: () => {
    const headData = useHead().data;
    const sitemap = computed(() => headData.value.sitemap);
    const sitemapUrl = computed(() => {
      return headData.value.head.domain + '/sitemap.xml';
    });

    return {
      sitemap,
      sitemapUrl,
    };
  },
  components: {
    ExternalLink,
    PanelSection,
    WarningIcon,
  },
};
</script>
