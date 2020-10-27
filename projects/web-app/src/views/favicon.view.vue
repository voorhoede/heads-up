<template>
  <panel-section title="Favicons">
    <div v-if="!favicons.length" class="warning-message">
      <WarningIcon class="icon" />
      <p>No Open Graph properties detected.</p>
    </div>
    <properties-list v-else>
      <properties-item
        v-for="(item, index) in favicons"
        :key="index"
        :key-name="item.sizes"
        :refresh-on="favicons"
      >
        <template #default>
          <template v-if="item.sizes">
            {{ item.sizes }}<br>
          </template>
          <template v-if="item.type">
            {{ item.type }}<br>
          </template>
          <template v-if="item.rel">
            {{ item.rel }}
          </template>
        </template>
        <template #value>
          <external-link :href="item.url">
            <img :src="item.url" alt="" />
          </external-link>
        </template>
      </properties-item>
    </properties-list>
  </panel-section>
  <panel-section title="Resources">
    <ul class="resource-list">
      <li>
        <external-link
          href="https://bitsofco.de/all-about-favicons-and-touch-icons/"
        >
          All About Favicons
        </external-link>
      </li>
    </ul>
  </panel-section>
</template>

<script>
import { computed } from 'vue';
import useHead from '@/composables/use-head';
import { findFavicons } from '@shared/lib/find-meta';
import PanelSection from '@shared/components/panel-section';
import ExternalLink from '@shared/components/external-link';
import PropertiesItem from '@shared/components/properties-item';
import PropertiesList from '@shared/components/properties-list';
import WarningIcon from '@shared/assets/icons/warning.svg';

export default {
  setup: () => {
    const headData = useHead().data;
    const favicons = computed(() => (findFavicons(headData.value.head)));

    return {
      favicons,
    };
  },
  components: {
    PanelSection,
    ExternalLink,
    PropertiesItem,
    PropertiesList,
    WarningIcon,
  },
};
</script>
