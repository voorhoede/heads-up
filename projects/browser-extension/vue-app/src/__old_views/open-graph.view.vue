<template>
  <div class="open-graph">
    <panel-section title="Properties">
      <div v-if="!metaData.length" class="warning-message">
        <WarningIcon class="icon" />
        <p>No Open Graph properties detected.</p>
      </div>
      <properties-list v-else>
        <properties-item
          v-for="item in metaData"
          :key="item.term"
          :term="item.term"
          :value="item.value"
          :schema="schema"
        >
        </properties-item>
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
  </div>
</template>

<script>
import { mapState } from 'vuex';
import schema from '@shared/lib/schemas/open-graph-schema';

import ExternalLink from '@shared/components/external-link';
import PanelSection from '@shared/components/panel-section';
import PropertiesItem from '@shared/components/properties-item';
import PropertiesList from '@shared/components/properties-list';
import WarningIcon from '@shared/assets/icons/warning.svg';

export default {
  components: {
    ExternalLink,
    PanelSection,
    PropertiesItem,
    PropertiesList,
    WarningIcon,
  },
  data() {
    return {
      schema,
    };
  },
  computed: {
    ...mapState([ 'head' ]),
    metaData() {
      return this.head.meta
        .filter(meta =>
          meta.property && meta.property.startsWith('og:') || meta.name && meta.name.startsWith('og:')
        )
        .map(meta => ({
          term: meta.property || meta.name,
          value: meta.content,
        }));
    },
  },
};
</script>
