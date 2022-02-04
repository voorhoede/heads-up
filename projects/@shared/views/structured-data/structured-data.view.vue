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
import { computed } from 'vue';

import AppIcon from '@shared/components/app-icon';
import ExternalLink from '@shared/components/external-link';
import PanelSection from '@shared/components/panel-section';

export default {
  props: {
    headData: {
      type: Object,
      required: true,
    },
  },

  setup: props => {
    const structuredData = computed(() => props.headData.structuredData);
    const hasMicrodata = computed(() => Object.keys(structuredData.value.microdata).length > 0);
    const hasJsonld = computed(() => Object.keys(structuredData.value.jsonld).length > 0);
    const hasRdfa = computed(() => Object.keys(structuredData.value.rdfa).length > 0);
    const hasNoData = computed(() => !hasMicrodata.value && !hasJsonld.value && !hasRdfa.value);

    return {
      structuredData,
      hasMicrodata,
      hasJsonld,
      hasRdfa,
      hasNoData,
    };
  },
  components: {
    ExternalLink,
    PanelSection,
    AppIcon,
  },
};
</script>

<style>
  .structured-data__code-block {
    max-height: 50vh;
    padding: 0.5rem;
    overflow: auto;
    border: 1px solid var(--divider-color);
    background-color: var(--bg-color);
    font-size: 14px;
  }
</style>
