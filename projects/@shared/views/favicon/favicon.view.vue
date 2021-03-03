<template>
  <div class="favicon">
    <panel-section title="Favicons">
      <div v-if="!favicons.length" class="warning-message">
        <WarningIcon class="icon" />
        <p>No favicons detected.</p>
      </div>
      <properties-list v-else>
        <properties-item-new
          v-for="image in favicons"
          :key="image.term"
          :term="image.term"
          :value="image.url"
          :image="image"
          type="image"
        >
        </properties-item-new>
      </properties-list>
    </panel-section>
    <panel-section title="Resources">
      <ul class="resource-list">
        <li>
          <external-link href="https://bitsofco.de/all-about-favicons-and-touch-icons/">
            All About Favicons
          </external-link>
        </li>
      </ul>
    </panel-section>
  </div>
</template>

<script>
import { computed } from 'vue';
import { findFavicons } from '@shared/lib/find-meta';

import ExternalLink from '@shared/components/external-link';
import PanelSection from '@shared/components/panel-section';
import PropertiesItemNew from '@shared/components/properties-item-new';
import PropertiesList from '@shared/components/properties-list';
import WarningIcon from '@shared/assets/icons/warning.svg';

export default {
  props: {
    headData: {
      type: Object,
      required: true,
    },
  },

  setup: props => {
    const favicons = computed(() => (
      findFavicons(props.headData.head).map(image => ({
        ...image,
        term: [ image.type, image.rel, image.sizes ],
      }))
    ));

    return {
      favicons,
    };
  },
  components: {
    ExternalLink,
    PanelSection,
    PropertiesItemNew,
    PropertiesList,
    WarningIcon,
  },
};
</script>
