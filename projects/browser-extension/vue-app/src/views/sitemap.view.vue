<template>
  <div>
    <panel-section title="Contents">
      <div v-if="!sitemaps.length" class="warning-message">
        <WarningIcon class="icon" />
        <p>No sitemaps were detected.</p>
      </div>
      <div
        v-else
        v-for="sitemap in sitemaps"
        :key="getSitemapUrl(sitemap)"
        class="sitemap-view__sitemap"
      >
        <p class="sitemap-view__sitemap-url">{{ getSitemapUrl(sitemap) }}</p>
        <tree-menu
          v-if="getSitemapElements(sitemap)"
          :name="getSitemapName(sitemap)"
          :elements="getSitemapElements(sitemap)"
        />
        <div v-else class="sitemap-view__sitemap-error warning-message">
          <WarningIcon class="icon" />
          <p>Could not read/parse the sitemap.</p>
        </div>
      </div>
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
import ExternalLink from '@shared/components/external-link';
import PanelSection from '@shared/components/panel-section';
import TreeMenu from '@shared/components/tree-menu';
import WarningIcon from '@shared/assets/icons/warning.svg';

export default {
  components: { ExternalLink, PanelSection, TreeMenu, WarningIcon },
  computed: {
    ...mapState([ 'head', 'sitemaps' ]),
  },
  methods: {
    getSitemapUrl(sitemap) {
      return Object.keys(sitemap)[0];
    },
    getSitemapName(sitemap) {
      return Object.values(sitemap)[0].elements[0].name;
    },
    getSitemapElements(sitemap) {
      return Object.values(sitemap)[0].elements[0].elements;
    },
  },
};
</script>

<style>
.sitemap-view__sitemap {
  margin-top: 1em;
}

.sitemap-view__sitemap-url {
  font-weight: bold;
  margin-bottom: .5em;
}

.sitemap-view__sitemap-error.warning-message {
  margin-left: 16px;
  padding: .125em 0 .25em;
}
</style>
