<template>
  <div class="favicon">
    <panel-section title="Favicons">
      <div v-if="!favicons.length" class="warning-message">
        <app-icon name="warning" />
        <p>No favicons detected.</p>
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

import AppIcon from '@shared/components/app-icon';
import ExternalLink from '@shared/components/external-link';
import PanelSection from '@shared/components/panel-section';
import PropertiesItem from '@shared/components/properties-item';
import PropertiesList from '@shared/components/properties-list';

export default {
  props: {
    headData: {
      type: Object,
      required: true,
    },
  },

  setup: props => {
    const favicons = computed(() => (
      findFavicons(props.headData.head)
        .map(image => ({
          ...image,
          term: [ image.type, image.rel, image.sizes ],
        }))
        .sort((a, b) => {
          const sizeA = a.sizes ? a.sizes.split('x')[0] : 0;
          const sizeB = b.sizes ? b.sizes.split('x')[0] : 0;
          return parseInt(sizeA, 10) > parseInt(sizeB, 10) ? 1 : -1;
        })
    ));

    return {
      favicons,
    };
  },
  components: {
    ExternalLink,
    PanelSection,
    PropertiesItem,
    PropertiesList,
    AppIcon,
  },
};
</script>
