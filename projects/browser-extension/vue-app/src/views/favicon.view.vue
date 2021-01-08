<template>
  <div>
    <panel-section title="Favicons">
      <div v-if="!favicons.length" class="warning-message">
        <WarningIcon class="icon" />
        <p>No favicons detected.</p>
      </div>
      <properties-list v-else>
        <properties-item
          v-for="(image, index) in favicons"
          :key="index"
          :term="[image.type, image.rel, image.sizes]"
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
import { mapState } from 'vuex';
import PanelSection from '@shared/components/panel-section';
import ExternalLink from '@shared/components/external-link';
import PropertiesItem from '@shared/components/properties-item';
import PropertiesList from '@shared/components/properties-list';
import { findFavicons } from '@shared/lib/find-meta';
import WarningIcon from '@shared/assets/icons/warning.svg';

export default {
  components: {
    ExternalLink,
    PanelSection,
    PropertiesItem,
    PropertiesList,
    WarningIcon,
  },
  computed: {
    ...mapState([ 'head' ]),
    favicons() {
      return findFavicons(this.head);
    },
  },
};
</script>
