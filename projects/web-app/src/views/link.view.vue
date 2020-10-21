<template>
  <panel-section title="Rel">
    <div v-if="!linkMetadata.length" class="warning-message">
      <WarningIcon class="icon" />
      <p>No link meta properties detected.</p>
    </div>
    <collapsible-list v-else :data="linkMetadata" />
  </panel-section>
  <panel-section title="Resources">
    <ul class="resource-list">
      <li>
        <external-link href="https://htmlhead.dev/">
          Guide to HTML5 <code>&lt;head&gt;</code> elements
        </external-link>
      </li>
    </ul>
  </panel-section>
</template>

<script>
import { computed } from 'vue';
import useHead from '@/composables/use-head';
import PanelSection from '@shared/components/panel-section';
import CollapsibleList from '@shared/components/collapsible-list';
import ExternalLink from '@shared/components/external-link.vue';
import WarningIcon from '@shared/assets/icons/warning.svg';

export default {
  setup() {
    const headData = useHead().data;
    const linkMetadata = computed(() => headData.value.head.link);

    return {
      linkMetadata,
    };
  },
  components: {
    PanelSection,
    CollapsibleList,
    ExternalLink,
    WarningIcon,
  },
};
</script>
