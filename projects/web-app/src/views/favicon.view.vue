<template>
  <div class="favicon">
    <panel-section title="Favicons">
      <div v-if="!favicons.length" class="warning-message">
        <WarningIcon class="icon" />
        <p>No Open Graph properties detected.</p>
      </div>
      <properties-list v-else>
        <properties-item
          v-for="image in favicons"
          :key="image.term"
          :term="image.term"
          :value="image.url"
          :image="image"
          type="image"
        >
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
  </div>
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
    const favicons = computed(() => (
      findFavicons(headData.value.head).map(image => ({
        ...image,
        term: [ image.type, image.rel, image.sizes ],
      }))
    ));

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
