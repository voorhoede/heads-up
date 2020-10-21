<template>
  <panel-section title="Properties">
    <div v-if="!ogMeta.length" class="warning-message">
      <WarningIcon class="icon" />
      <p>No Open Graph properties detected.</p>
    </div>
    <properties-list v-else>
      <div v-for="meta in ogMeta" :key="meta.property">
        <dt>
          {{ meta.property }}
        </dt>
        <dd>
          {{ meta.content }}
        </dd>
      </div>
    </properties-list>
  </panel-section>
  <panel-section title="Resources">
    <ul class="resource-list">
      <li>
        <external-link href="https://ogp.me/">
          The Open Graph Protocol
        </external-link>
      </li>
    </ul>
  </panel-section>
</template>

<script>
import { computed } from 'vue';
import useHead from '@/composables/use-head';
import PanelSection from '@shared/components/panel-section.vue';
import ExternalLink from '@shared/components/external-link.vue';
import PropertiesList from '@shared/components/properties-list.vue';
import WarningIcon from '@shared/assets/icons/warning.svg';

export default {
  setup: () => {
    const headData = useHead().data;
    const ogMeta = computed(() => {
      return headData.value.head.meta
        .filter(meta => meta.property && meta.property.startsWith('og:'));
    });

    return {
      ogMeta,
    };
  },
  components: {
    ExternalLink,
    PanelSection,
    PropertiesList,
    WarningIcon,
  },
};
</script>
