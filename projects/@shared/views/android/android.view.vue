<template>
  <div class="android">
    <panel-section title="Properties" v-if="showMetaData">
      <properties-list>
        <properties-item
          v-for="item in metaData"
          :key="item.term"
          :term="item.term"
          :value="item.value"
        >
        </properties-item>
      </properties-list>
    </panel-section>
    <panel-section title="App Links" v-if="showAppLinks">
      <properties-list>
        <properties-item
          v-for="link in appLinks"
          :key="link.term"
          :term="link.term"
          :value="link.value"
        >
        </properties-item>
      </properties-list>
    </panel-section>
    <panel-section title="Insufficient data" v-if="!showAppLinks && !showMetaData">
      <div class="warning-message">
        <WarningIcon class="icon" />
        <p>No Android related data found. For more information, see resource links.</p>
      </div>
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
import { findMetaContent, findMetaProperty } from '@shared/lib/find-meta';

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
    const propertyValue = propName =>
      findMetaProperty(props.headData.head, propName) ||
      findMetaContent(props.headData.head, propName);

    const metaData = computed(() => {
      return [
        {
          term: 'theme-color',
          value: propertyValue('theme-color'),
        },
        {
          term: 'mobile-web-app-capable',
          value: propertyValue('mobile-web-app-capable'),
        },
        {
          term: 'google-play-app',
          value: propertyValue('google-play-app'),
        },
      ];
    });

    const appLinks = computed(() => {
      return [
        {
          term: 'al:android:app_name',
          value: propertyValue('al:android:app_name'),
        },
        {
          term: 'al:android:url',
          value: propertyValue('al:android:url'),
        },
        {
          term: 'al:android:package',
          value: propertyValue('al:android:package'),
        },
      ];
    });

    const showAppLinks = computed(() => {
      return appLinks.value.some(link => link.value);
    });

    const showMetaData = computed(() => {
      return metaData.value.some(item => item.value);
    });

    return {
      appLinks,
      metaData,
      showAppLinks,
      showMetaData,
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
