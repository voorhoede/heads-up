<template>
  <div class="structured-data">
    <panel-section v-if="hasMicrodata" title="Microdata">
      <pre class="structured-data__code-block">{{ structuredData.microdata }}</pre>
    </panel-section>
    <panel-section v-if="hasJsonld" title="JSON-LD">
      <pre class="structured-data__code-block">{{ structuredData.jsonld }}</pre>
    </panel-section>
    <panel-section v-if="hasRdfa" title="RDFa">
      <pre class="structured-data__code-block">{{ structuredData.rdfa }}</pre>
    </panel-section>
    <panel-section v-if="hasNoData" title="Preview">
      <div class="warning-message">
        <app-icon name="warning" />
        <p>No Structured Data found.</p>
      </div>
    </panel-section>
    <panel-section title="Resources">
      <ul class="resource-list">
        <li>
          <external-link href="https://schema.org/">
            Official website - schema.org
          </external-link>
        </li>
        <li>
          <external-link href="https://json-ld.org/">
            JSON-LD - Linked Data format
          </external-link>
        </li>
        <li>
          <external-link href="http://rdfa.info/">
            RDFa - JSON-LD in HTML
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

export default {
  components: {
    ExternalLink,
    PanelSection,
    AppIcon,
  },
  computed: {
    ...mapState([ 'structuredData' ]),
    hasMicrodata() {
      return (
        this.structuredData.microdata &&
        Object.keys(this.structuredData.microdata).length > 0
      );
    },
    hasJsonld() {
      return (
        this.structuredData.jsonld &&
        Object.keys(this.structuredData.jsonld).length > 0
      );
    },
    hasRdfa() {
      return (
        this.structuredData.rdfa &&
        Object.keys(this.structuredData.rdfa).length > 0
      );
    },
    hasNoData() {
      return !this.hasMicrodata && !this.hasJsonld && !this.hasRdfa;
    },
  },
};
</script>

<style>
  .structured-data__code-block {
    max-height: 50vh;
    padding: 0.5rem;
    overflow: auto;
    border: var(--divider-border);
    background-color: var(--toolbar-bg-color);
  }
</style>
