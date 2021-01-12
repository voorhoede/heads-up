<template>
  <div>
    <panel-section v-if="hasMicrodata" title="Microdata">
      <pre>{{ structuredData.microdata }}</pre>
    </panel-section>
    <panel-section v-if="hasJsonld" title="JSON-LD">
      <pre>{{ structuredData.jsonld }}</pre>
    </panel-section>
    <panel-section v-if="hasRdfa" title="RDFa">
      <pre>{{ structuredData.rdfa }}</pre>
    </panel-section>

    <panel-section v-if="hasNoData" title="Structured Data">
      <div class="warning-message">
        <WarningIcon class="icon" />
        <p>No Structured Data found.</p>
      </div>
    </panel-section>

    <panel-section title="Resources">
      <ul class="resource-list">
        <li>
          <external-link href="https://schema.org/">
            Schema.org
          </external-link>
        </li>
        <li>
          <external-link href="https://json-ld.org/">
            Json-ld.org
          </external-link>
        </li>
        <li>
          <external-link href="http://rdfa.info/">
            Rdfa.info
          </external-link>
        </li>
      </ul>
    </panel-section>
  </div>
</template>

<script>
import { computed } from 'vue';
import useHead from '@/composables/use-head';
import ExternalLink from '@shared/components/external-link';
import PanelSection from '@shared/components/panel-section';
import WarningIcon from '@shared/assets/icons/warning.svg';

export default {
  setup: () => {
    const headData = useHead().data;
    const structuredData = computed(() => headData.value.structuredData);
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
    WarningIcon,
  },
};
</script>
