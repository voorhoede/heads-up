<template>
  <div class="google">
    <panel-section v-if="notSupportedTypes.length > 0" title="Not Supported">
      <div class="warning-message">
        <WarningIcon class="icon" />
        <p>We currently don't support: {{ notSupportedTypes.join(', ') }}. Stay tuned for future updates.</p>
      </div>
    </panel-section>

    <tab-selector v-model="openTab" :tabs="TABS"/>

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

    <panel-section v-else title="Standard Preview">
      <preview-iframe
        iframeClass="google__preview"
        :url="getDefaultPreviewUrl()"
        :loading-height="40"
      >
        <template v-slot:caption>
          Preview based on <external-link href="https://google.com/">google.com</external-link> (Updated on {{ TYPES.default.updatedOn }}).
        </template>
      </preview-iframe>
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
import { findMetaContent } from '@shared/lib/find-meta';
import { TABS } from '@shared/lib/constants.js';
import { TYPES, splitTypes } from '@shared/lib/google-utils.js';
import getTheme from '@shared/lib/theme';

import ExternalLink from '@shared/components/external-link';
import PanelSection from '@shared/components/panel-section';
import PreviewIframe from '@shared/components/preview-iframe';
import PropertiesItem from '@shared/components/properties-item';
import PropertiesList from '@shared/components/properties-list';
import TabSelector from '@shared/components/tab-selector';
import WarningIcon from '@shared/assets/icons/warning.svg';

export default {
  props: {
    headData: {
      type: Object,
      required: true,
    },
  },

  setup: props => {
    const openTab = ref(TABS[0].value);

    const jsonldData = computed(() => props.headData?.structuredData?.jsonld ?? {});
    const microData = computed(() => props.headData?.structuredData?.microdata ?? {});
    const mergedData = computed(() => ({ ...jsonldData.value, ...microData.value }));

    const supportedTypes = computed(() => splitTypes(mergedData.value)[0]);
    const notSupportedTypes = computed(() => splitTypes(mergedData.value)[1]);
    const resources = computed(() => supportedTypes.value.map(type => TYPES[type].resources).flat());

    const getDefaultPreviewUrl = () => {
      const { head } = props.headData;
      const params = new URLSearchParams();

      params.set('description', findMetaContent(head, 'description'));
      params.set('theme', getTheme());
      params.set('title', head.title);
      params.set('url', head.url);

      return `/previews/google-default/google-default.html?${ params }`;
    };

    const getPreviewUrl = type => {
      const params = new URLSearchParams();
      const urlSegment = TYPES[type].urlSegment;
      const data = mergedData.value[type][0];

      params.set('aggregateRatingValue', data['aggregateRating']?.ratingValue);
      params.set('aggregateReviewCount', data['aggregateRating']?.reviewCount);
      params.set('dateModified', formatDate(data['dateModified']));
      params.set('description', data['description']);
      params.set('headline', data['headline']);
      params.set('image', getImageUrl(data['image']));
      params.set('name', data['name']);
      params.set('offerPrice', formatPrice(data['offers']?.price, data['offers']?.priceCurrency));
      params.set('offerSellerName', data['offers']?.seller?.name);
      params.set('platform', 'web-app');
      params.set('publisherLogo', data['publisher']?.logo?.url);
      params.set('publisherName', data['publisher']?.name);
      params.set('theme', getTheme());

      return openTab.value === 'mobile'
        ? `/previews/google-${ urlSegment }-mobile/google-${ urlSegment }-mobile.html?${ params }`
        : `/previews/google-${ urlSegment }-desktop/google-${ urlSegment }-desktop.html?${ params }`;
    };

    const getMetaData = type => {
      const data = mergedData.value[type][0];
      const metaData = {
        NewsArticle: [
          { term: '@type', value: data['@type'] },
          { term: 'headline', value: data['headline'] },
          { term: 'description', value: data['description'] },
          { term: 'dateModified', value: data['dateModified'] },
          { term: 'publisher - name', value: data['publisher']?.name },
          {
            term: 'publisher - logo',
            value: getImageUrl(data['publisher']?.logo),
            image: {
              href: getImageUrl(data['publisher']?.logo),
              url: getImageUrl(data['publisher']?.logo),
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
        Product: [
          { term: '@type', value: data['@type'] },
          { term: 'name', value: data['name'] },
          { term: 'description', value: data['description'] },
          { term: 'offers - price', value: data['offers']?.price },
          { term: 'offers - priceCurrency', value: data['offers']?.priceCurrency },
          { term: 'offers - seller - name', value: data['offers']?.seller?.name },
          { term: 'aggregateRating - ratingValue', value: data['aggregateRating']?.ratingValue },
          { term: 'aggregateRating - reviewCount', value: data['aggregateRating']?.reviewCount },
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
      if (Array.isArray(img)) {
        return getImageUrl(img[0]);
      } else if (typeof img === 'string') {
        return img.split(', ')[0];
      }

      return img?.url;
    };

    const formatPrice = (price, currency) => {
      if (!price || !currency) return undefined;
      return new Intl.NumberFormat(undefined, { style: 'currency', currency })
        .format(typeof price === 'string' ? price.replace(',00', '') : price);
    };

    return {
      TABS,
      TYPES,
      openTab,
      supportedTypes,
      notSupportedTypes,
      getDefaultPreviewUrl,
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
