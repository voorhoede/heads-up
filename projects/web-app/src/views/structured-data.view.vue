<template>
  <div>
    <panel-section title="Properties">
      <pre>
{{ structuredData }}
      </pre>
    </panel-section>
    <panel-section title="Resources">
      <ul class="resource-list">
        <li>
          <external-link href="https://schema.org/">
            Schema.org
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

export default {
  setup: () => {
    const headData = useHead().data;
    const structuredData = computed(() => headData.value.structuredData);

    return {
      structuredData,
    };
  },
  components: {
    ExternalLink,
    PanelSection,
  },
};
</script>
