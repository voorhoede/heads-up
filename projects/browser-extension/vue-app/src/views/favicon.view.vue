<template>
  <div>
    <panel-section title="Favicons">
      <div v-if="!favicons.length" class="warning-message">
        <WarningIcon class="icon" />
        <p>No favicons detected.</p>
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
      console.log(findFavicons(this.head))
      return findFavicons(this.head);
    },
  },
};
</script>
