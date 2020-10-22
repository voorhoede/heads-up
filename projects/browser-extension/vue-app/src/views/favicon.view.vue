<template>
  <div>
    <panel-section title="Favicons">
      <div v-if="!favicons.length" class="warning-message">
        <WarningIcon class="icon" />
        <p>No favicons detected.</p>
      </div>
      <properties-list v-else>
        <template
          v-for="favicon in favicons"
          :key="`${favicon.url}-key`"
        >
          <dt>
            <div v-if="favicon.sizes">
              {{ favicon.sizes }}
            </div>
            <div v-if="favicon.type">
              {{ favicon.type }}
            </div>
          </dt>
          <dd>
            <external-link :href="favicon.url">
              <img
                alt
                :src="favicon.url"
              >
            </external-link>
          </dd>
        </template>
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
import PropertiesList from '@shared/components/properties-list';
import { findFavicons } from '@shared/lib/find-meta';
import WarningIcon from '@shared/assets/icons/warning.svg';

export default {
  components: {
    ExternalLink,
    PanelSection,
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
