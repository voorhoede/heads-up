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
import { computed } from 'vue';
import schema from './schema';

import ExternalLink from '@shared/components/external-link';
import PanelSection from '@shared/components/panel-section';
import PropertiesItem from '@shared/components/properties-item';
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
    const metaData = computed(() => {
      const { meta } = props.headData.head;
      return meta
        .filter(meta =>
          meta.property && meta.property.startsWith('og:') || meta.name && meta.name.startsWith('og:')
        )
        .map(meta => ({
          term: meta.property || meta.name,
          value: meta.content,
        }));
    });

    return {
      metaData,
      schema,
    };
  },
  components: {
    ExternalLink,
    PanelSection,
    PropertiesItem,
    PropertiesList,
    WarningIcon,
  },
};
</script>