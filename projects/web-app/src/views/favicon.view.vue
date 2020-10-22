<template>
  <panel-section title="Favicons">
    <div v-if="!favicons.length" class="warning-message">
      <WarningIcon class="icon" />
      <p>No Open Graph properties detected.</p>
    </div>
    <properties-list v-else>
      <div v-for="favicon in favicons" :key="favicon.url">
        <dt>
          <div v-if="favicon.sizes">
            {{ favicon.sizes }}
          </div>
          <div v-if="favicon.type">
            &nbsp;{{ favicon.type }}
          </div>
        </dt>
        <dd>
          <external-link :href="favicon.url">
            <img :src="favicon.url" alt="" />
          </external-link>
        </dd>
      </div>
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
    PropertiesList,
    WarningIcon,
  },
};
</script>
