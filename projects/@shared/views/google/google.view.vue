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
          :tooltip="item.tooltip"
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
import { metadata } from './metadata.js';
import { format as formatDate } from 'timeago.js';
import { findFavicons, findMetaContent } from '@shared/lib/find-meta';
import { TABS } from '@shared/lib/constants.js';
import {
  getBreadcrumbSegments,
  getImageUrl,
  splitTypes,
  TYPES
} from '@shared/lib/google-utils.js';
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
      params.set('favicon', findFavicons(props.headData.head)?.[0].url || '');
      params.set('isMobile', openTab.value === 'mobile');
      params.set('theme', getTheme());
      params.set('title', head.title);
      params.set('url', head.url);

      return `/previews/google-default/google-default.html?${ params }`;
    };

    const getPreviewUrl = type => {
      const { head } = props.headData;
      const params = new URLSearchParams();
      const urlSegment = TYPES[type].urlSegment;
      const hasSinglePreview = TYPES[type].hasSinglePreview;
      const data = mergedData.value[type][0];

      // Head Data
      params.set('headDescription', findMetaContent(head, 'description'));
      params.set('headTitle', head.title);
      params.set('headUrl', head.url);

      // Structured Data
      params.set('aggregateRatingValue', data['aggregateRating']?.ratingValue);
      params.set('aggregateReviewCount', data['aggregateRating']?.reviewCount);
      params.set('breadcrumbSegments', getBreadcrumbSegments(data['itemListElement']));
      params.set('dateModified', formatDate(data['dateModified']));
      params.set('description', data['description']);
      params.set('favicon', findFavicons(props.headData.head)?.[0].url || '');
      params.set('headline', data['headline']);
      params.set('image', getImageUrl(data['image']));
      params.set('isMobile', openTab.value === 'mobile');
      params.set('name', data['name']);
      params.set('offerPrice', formatPrice(data['offers']?.price, data['offers']?.priceCurrency));
      params.set('offerSellerName', data['offers']?.seller?.name);
      params.set('publisherLogo', data['publisher']?.logo?.url);
      params.set('publisherName', data['publisher']?.name);
      params.set('theme', getTheme());

      if (hasSinglePreview) {
        return `/previews/google-${ urlSegment }/google-${ urlSegment }.html?${ params }`;
      }

      return openTab.value === 'mobile'
        ? `/previews/google-${ urlSegment }-mobile/google-${ urlSegment }-mobile.html?${ params }`
        : `/previews/google-${ urlSegment }-desktop/google-${ urlSegment }-desktop.html?${ params }`;
    };

    const getMetaData = type => {
      const { head } = props.headData;
      const data = mergedData.value[type][0];

      return metadata(data, head, type);
    };

    const formatPrice = (price, currency) => {
      if (!price || !currency) return undefined;
      return new Intl.NumberFormat(undefined, { style: 'currency', currency })
        .format(typeof price === 'string' ? price.replace(',', '.') : price);
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
