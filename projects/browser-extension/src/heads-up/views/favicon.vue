<template>
  <div>
    <panel-section title="Favicons">
      <p v-if="!favicons.length">
        <WarningIcon class="warning-icon" />No favicons detected.
      </p>
      <properties-list>
        <template v-for="favicon in favicons">
          <dt :key="`${favicon.url}-key`">
            <div v-if="favicon.sizes">
              {{ favicon.sizes }}
            </div>
            <div v-if="favicon.type">
              {{ favicon.type }}
            </div>
          </dt>
          <dd :key="`${favicon.url}-value`">
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
import PanelSection from '@shared/components/panel-section.vue';
import ExternalLink from '@shared/components/external-link.vue';
import PropertiesList from '@shared/components/properties-list.vue';
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

<style>
.warning-icon {
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  vertical-align: text-top;
  fill: #eac250;
  margin-right: 4px;
}
</style>
