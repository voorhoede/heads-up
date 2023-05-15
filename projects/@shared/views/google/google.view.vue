<template>
  <div class="google">
    <panel-section v-if="notSupportedTypes.length" title="Not Supported">
      <div class="warning-message">
        <app-icon name="warning" />
        <p>We currently don't support: {{ notSupportedTypes.join(', ') }}.</p>
      </div>
    </panel-section>

    <tab-selector v-model="openTab" :tabs="TABS" />

    <panel-section v-if="supportedTypes.length" title="Preview(s)">
      <component
        v-for="type in supportedTypes"
        :key="`${type}-${openTab}`"
        class="google__preview"
        v-bind:is="getComponentName(type)"
        :data="previewDataForType(type)"
      />
    </panel-section>

    <panel-section v-else title="Standard Preview">
      <google-default-preview
        class="google__preview"
        :data="defaultPreviewData"
      />
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

import AppIcon from '@shared/components/app-icon';
import ExternalLink from '@shared/components/external-link';
import GoogleArticleDesktopPreview from '@shared/components/rich-previews/google-article-desktop-preview';
import GoogleArticleMobilePreview from '@shared/components/rich-previews/google-article-mobile-preview';
import GoogleBreadcrumbPreview from '@shared/components/rich-previews/google-breadcrumb-preview';
import GoogleCoursePreview from '@shared/components/rich-previews/google-course-preview';
import GoogleDefaultPreview from '@shared/components/rich-previews/google-default-preview';
import GoogleProductDesktopPreview from '@shared/components/rich-previews/google-product-desktop-preview';
import GoogleProductMobilePreview from '@shared/components/rich-previews/google-product-mobile-preview';
import GoogleReviewPreview from '@shared/components/rich-previews/google-review-preview';
import PanelSection from '@shared/components/panel-section';
import PropertiesItem from '@shared/components/properties-item';
import PropertiesList from '@shared/components/properties-list';
import TabSelector from '@shared/components/tab-selector';

export default {
  props: {
    headData: {
      type: Object,
      required: true,
    },
  },

  setup: props => {
    const openTab = ref(TABS[0].value);

    const jsonldData = computed(() => getStructuredData(props.headData?.structuredData?.jsonld ?? {}));
    const microData = computed(() => getStructuredData(props.headData?.structuredData?.microdata ?? {}));
    const mergedData = computed(() => ({ ...jsonldData.value, ...microData.value }));

    const supportedTypes = computed(() => splitTypes(mergedData.value)[0]);
    const notSupportedTypes = computed(() => splitTypes(mergedData.value)[1].filter(val => val !== 'undefined' && Boolean(val)));
    const resources = computed(() => supportedTypes.value.map(type => TYPES[type].resources).flat());

    const defaultPreviewData = computed(() => ({
      description: findMetaContent(props.headData.head, 'description'),
      favicon: findFavicons(props.headData.head)?.[0]?.url || '',
      isMobile: openTab.value === 'mobile',
      theme: getTheme(),
      title: props.headData.head?.title,
      updatedOn: TYPES['default'].updatedOn,
      url: props.headData.head?.url,
    }));

    function previewDataForType(type) {
      const { head } = props.headData;
      const breadcrumbData = mergedData.value.BreadcrumbList?.[0]?.itemListElement;
      const data = mergedData.value[type][0];

      return {
        aggregateRatingValue: data.aggregateRating?.ratingValue,
        aggregateReviewCount: data.aggregateRating?.reviewCount,
        authorName: data.author?.name,
        breadcrumbSegments: getBreadcrumbSegments(breadcrumbData),
        dateModified: formatDate(data.dateModified),
        description: data.description,
        favicon: findFavicons(props.headData.head)?.[0].url || '',
        headDescription: findMetaContent(head, 'description'),
        headline: data.headline,
        headTitle: head.title,
        headUrl: head.url,
        image: getImageUrl(data.image),
        isMobile: openTab.value === 'mobile',
        itemReviewedAuthorName: data.itemReviewed?.author?.name,
        itemReviewedName: data.itemReviewed?.name,
        itemReviewedType: data.itemReviewed?.['@type'],
        name: data.name,
        offerPrice: formatPrice(data.offers?.price, data.offers?.priceCurrency),
        offerSellerName: data.offers?.seller?.name,
        providerName: data.provider?.name,
        publisherLogo: data.publisher?.logo?.url,
        publisherName: data.publisher?.name,
        reviewRatingValue: data.reviewRating?.ratingValue,
        theme: getTheme(),
        updatedOn: TYPES[type].updatedOn,
        url: data.url,
      };
    }

    function getComponentName(type) {
      const hasSinglePreview = TYPES[type].hasSinglePreview;
      const typeName = TYPES[type].urlSegment;

      if (hasSinglePreview) {
        return `google-${ typeName }-preview`;
      }

      return openTab.value === 'mobile'
        ? `google-${ typeName }-mobile-preview`
        : `google-${ typeName }-desktop-preview`;
    }

    function getMetaData(type) {
      const { head } = props.headData;
      const data = mergedData.value[type][0];

      return metadata(data, head, type);
    }

    function getStructuredData(rawData) {
      if (
        Object.keys(rawData).length === 1 &&
        Object.keys(rawData).includes('undefined')
      ) {
        if (!rawData.undefined?.[0]?.['@graph']) return rawData;
        return rawData['undefined'][0]['@graph'].reduce((data, value) => {
          data[value['@type']] = [ value ];
          return data;
        }, {});
      }

      return rawData;
    }

    function formatPrice(price, currency) {
      if (!price || !currency) return undefined;
      return new Intl.NumberFormat(undefined, { style: 'currency', currency })
        .format(typeof price === 'string' ? price.replace(',', '.') : price);
    }

    return {
      TABS,
      TYPES,
      openTab,
      supportedTypes,
      notSupportedTypes,
      defaultPreviewData,
      previewDataForType,
      getMetaData,
      resources,
      getComponentName,
    };
  },

  components: {
    AppIcon,
    ExternalLink,
    GoogleArticleDesktopPreview,
    GoogleArticleMobilePreview,
    GoogleBreadcrumbPreview,
    GoogleCoursePreview,
    GoogleDefaultPreview,
    GoogleProductDesktopPreview,
    GoogleProductMobilePreview,
    GoogleReviewPreview,
    PanelSection,
    PropertiesItem,
    PropertiesList,
    TabSelector,
  },
};
</script>

<style>
  .google__preview {
    margin-bottom: 8px;
  }
</style>
