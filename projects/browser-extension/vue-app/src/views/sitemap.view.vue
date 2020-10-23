<template>
  <div>
    <panel-section title="Contents">
      <div v-if="!sitemap" class="warning-message">
        <WarningIcon class="icon" />
        <p>No sitemaps were detected.</p>
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
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PanelSection from '@shared/components/panel-section';
import ExternalLink from '@shared/components/external-link';
import WarningIcon from '@shared/assets/icons/warning.svg';

export default {
  components: { ExternalLink, PanelSection, WarningIcon },
  computed: {
    ...mapState([ 'head', 'sitemap' ]),
    sitemapUrl() {
      return this.head.domain + '/sitemap.xml';
    },
  },
};
</script>
