<template>
  <div>
    <panel-section title="Contents">
      <code v-if="sitemap">
        <pre>{{ sitemap }}</pre>
      </code>
      <p v-else>
        No sitemap.xml file was found at
        <external-link :href="sitemapUrl">
          {{ sitemapUrl }}
        </external-link>
        .
      </p>
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
import PanelSection from '@shared/components/panel-section.vue';
import ExternalLink from '@shared/components/external-link.vue';

export default {
  components: { ExternalLink, PanelSection },
  computed: {
    ...mapState([ 'head', 'sitemap' ]),
    sitemapUrl() {
      return this.head.domain + '/sitemap.xml';
    },
  },
};
</script>
