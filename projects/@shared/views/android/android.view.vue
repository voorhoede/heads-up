<template>
  <div class="android">
    <panel-section title="Properties">
      <properties-list>
        <properties-item
          v-for="item in metaData"
          :key="item.term"
          :term="item.term"
          :value="item.value"
          :required="true"
        >
        </properties-item>
      </properties-list>
    </panel-section>
    <panel-section title="App Links">
      <properties-list>
        <properties-item
          v-for="link in appLinks"
          :key="link.term"
          :term="link.term"
          :value="link.url"
        >
        </properties-item>
      </properties-list>
    </panel-section>
    <panel-section title="Resources">
      <ul class="resource-list">
        <li>
          <external-link href="https://developers.facebook.com/docs/applinks">
            App Links - Facebook Docs
          </external-link>
        </li>
        <li>
          <external-link href="https://github.com/joshbuchea/HEAD">
            HEAD by joshbuchea
          </external-link>
        </li>
      </ul>
    </panel-section>
  </div>
</template>

<script>
import { computed } from 'vue';
import { findMetaContent } from '@shared/lib/find-meta';

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
    const metaData = computed(() => {
      const { head } = props.headData;
      return [
        {
          term: 'apple-mobile-web-app-capable',
          value: findMetaContent(head, 'apple-mobile-web-app-capable'),
        },
        {
          term: 'apple-mobile-web-app-title',
          value: findMetaContent(head, 'apple-mobile-web-app-title'),
        },
        {
          term: 'apple-mobile-web-app-status-bar-style',
          value: findMetaContent(head, 'apple-mobile-web-app-status-bar-style'),
        },
        {
          term: 'format-detection',
          value: findMetaContent(head, 'format-detection'),
        },
        {
          term: 'apple-itunes-app',
          value: findMetaContent(head, 'apple-itunes-app'),
        },
      ];
    });

    return {
      metaData,
    };
  },
  components: {
    ExternalLink,
    PanelSection,
    PropertiesItem,
    PropertiesList,
  },
};
</script>
