<template>
  <div class="google">
    <tab-selector v-model="openTab" :tabs="TABS"/>

    <panel-section v-if="notSupportedTypes.length > 0" title="Not Supported">
      <div class="warning-message">
        <WarningIcon class="icon" />
        <p>We currently don't support: {{ notSupportedTypes.join(', ') }}. Stay tuned for future updates.</p>
      </div>
    </panel-section>

    <panel-section v-if="supportedTypes.length > 0" title="Preview">
      <preview-iframe
        v-for="type in supportedTypes"
        iframeClass="google__preview"
        :url="getPreviewUrl(type)"
        :key="`${type}-${openTab}`"
        :loading-height="40"
      >
        <template v-slot:caption>
          Preview based on <external-link href="https://google.com/">google.com</external-link> (Updated on {{ TYPES[type].updatedOn }}).
        </template>
      </preview-iframe>
    </panel-section>

    <!-- @TODO: Create a 'default' google search preview. -->
    <panel-section v-else title="Standard Preview">
      <div class="warning-message">
        <WarningIcon class="icon" />
        <p>Standard preview coming soon.</p>
      </div>
    </panel-section>

    <panel-section
      v-for="type in supportedTypes"
      :title="`Properties - ${type}`"
      :key="type"
    >
      <properties-list>
        <properties-item
          v-for="item in getMetaData(type)"
          :key="item.term"
          :term="item.term"
          :value="item.value"
          :image="item.image"
          :type="item.type"
          :required="true"
        >
        </properties-item>
      </properties-list>
    </panel-section>

    <panel-section v-if="resources.length > 0" title="Resources">
      <ul class="resource-list">
        <li v-for="resource in resources" :key="resource.url">
          <external-link :href="resource.url">{{ resource.label }}</external-link>
        </li>
      </ul>
    </panel-section>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { format as formatDate } from 'timeago.js';
import useHead from '@/composables/use-head';
import { TABS } from '@shared/lib/constants.js';
import { TYPES } from '@shared/lib/google-utils.js';

import ExternalLink from '@shared/components/external-link';
import PanelSection from '@shared/components/panel-section';
import PreviewIframe from '@shared/components/preview-iframe';
import PropertiesItem from '@shared/components/properties-item';
import PropertiesList from '@shared/components/properties-list';
import TabSelector from '@shared/components/tab-selector';
import WarningIcon from '@shared/assets/icons/warning.svg';

export default {
  setup() {
    const headData = useHead().data;
    const openTab = ref(TABS[0].value);
    const jsonldData = computed(() => headData.value.structuredData.jsonld);
    const [ supportedTypes, notSupportedTypes ] = Object.keys(jsonldData.value).reduce((acc, type) => {
      acc[type in TYPES ? 0 : 1].push(type);
      return acc;
    }, [ [], [] ]);
    const resources = supportedTypes.map(type => TYPES[type].resources).flat();

    const getPreviewUrl = type => {
      const params = new URLSearchParams();
      const urlSegment = TYPES[type].urlSegment;
      const data = jsonldData.value[type][0];

      params.set('dateModified', formatDate(data['dateModified']));
      params.set('description', data['description']);
      params.set('headline', data['headline']);
      params.set('image', getImageUrl(data['image']));
      params.set('platform', 'web-app');
      params.set('publisherLogo', data['publisher'].logo.url);
      params.set('publisherName', data['publisher'].name);
      params.set('type', data['@type']);

      return openTab.value === 'mobile'
        ? `/previews/google-${ urlSegment }-mobile/google-${ urlSegment }-mobile.html?${ params }`
        : `/previews/google-${ urlSegment }-desktop/google-${ urlSegment }-desktop.html?${ params }`;
    };

    const getMetaData = type => {
      const data = jsonldData.value[type][0];
      const metaData = {
        NewsArticle: [
          { term: '@type', value: data['@type'] },
          { term: 'headline', value: data['headline'] },
          { term: 'description', value: data['description'] },
          { term: 'dateModified', value: data['dateModified'] },
          { term: 'publisher - name', value: data['publisher'].name },
          {
            term: 'publisher - logo',
            value: getImageUrl(data['publisher'].logo),
            image: {
              href: getImageUrl(data['publisher'].logo),
              url: getImageUrl(data['publisher'].logo),
            },
            type: 'image',
          },
          {
            term: 'image',
            value: getImageUrl(data['image']),
            image: {
              href: getImageUrl(data['image']),
              url: getImageUrl(data['image']),
            },
            type: 'image',
          },
        ],
      };

      return metaData[type];
    };

    const getImageUrl = img => {
      return Array.isArray(img) ? img[0] : img.url;
    };

    return {
      TABS,
      TYPES,
      openTab,
      supportedTypes,
      notSupportedTypes,
      getPreviewUrl,
      getMetaData,
      resources,
    };
  },
  components: {
    ExternalLink,
    PanelSection,
    PreviewIframe,
    PropertiesItem,
    PropertiesList,
    TabSelector,
    WarningIcon,
  },
};
</script>
