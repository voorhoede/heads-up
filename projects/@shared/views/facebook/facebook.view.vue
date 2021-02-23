<template>
  <div class="facebook">
    <tab-selector
      v-model="openTab"
      :tabs="TABS"
    />
    <panel-section title="Preview">
      <preview-iframe
        :url="previewUrl"
        iframeClass="facebook__preview"
        :loading-height="openTab === 'mobile' ? 359 : 368"
      >
        <template v-slot:caption>
          Preview based on
            <external-link v-if="openTab === 'mobile'" href="https://m.facebook.com/">m.facebook.com</external-link>
            <external-link v-else href="https://facebook.com/">facebook.com</external-link>.
        </template>
      </preview-iframe>
    </panel-section>
    <panel-section title="Properties">
      <properties-list>
        <properties-item-new
          v-for="item in metaData"
          :key="item.term"
          :term="item.term"
          :value="item.value"
          :image="item.image"
          :type="item.type"
          :tooltip="getTooltipInfo(item.term)"
          :validation="validation"
          :required="item.required"
        >
        </properties-item-new>
      </properties-list>
    </panel-section>
    <panel-section title="Resources">
      <ul class="resource-list">
        <li>
          <external-link href="https://developers.facebook.com/docs/sharing/webmasters">
            Guide to Sharing - Facebook for Developers
          </external-link>
        </li>
      </ul>
    </panel-section>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue';
import { TABS } from '@shared/lib/constants.js';
import createAbsoluteUrl from '@shared/lib/create-absolute-url';
import { findImageDimensions, findMetaContent, findMetaProperty } from '@shared/lib/find-meta';
import getTheme from '@shared/lib/theme';
import validate from '@shared/lib/validate-data';
import { schema, info } from './schema';

import ExternalLink from '@shared/components/external-link';
import PanelSection from '@shared/components/panel-section';
import PreviewIframe from '@shared/components/preview-iframe';
import PropertiesItemNew from '@shared/components/properties-item-new';
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
    const validation = ref({});
    const openTab = ref(TABS[0].value);
    const imageDimensions = ref({ height: undefined, width: undefined });
    const imageSpecified = ref(true);

    const og = computed(() => ({
      type: propertyValue('og:type'),
      url: propertyValue('og:url'),
      locale: propertyValue('og:locale'),
      title: propertyValue('og:title'),
      description: propertyValue('og:description'),
      image: propertyValue('og:image'),
      imageUrl: propertyValue('og:image:url'),
      imageSecureUrl: propertyValue('og:image:secure_url'),
      imageType: propertyValue('og:image:type'),
      imageWidth: propertyValue('og:image:width'),
      imageHeight: propertyValue('og:image:height'),
      video: propertyValue('og:video'),
      videoUrl: propertyValue('og:video:url'),
      videoSecureUrl: propertyValue('og:video:secure_url'),
      videoType: propertyValue('og:video:type'),
      videoWidth: propertyValue('og:video:width'),
      videoHeight: propertyValue('og:video:height'),
    }));

    const facebookProperties = computed(() => ({
      appId: propertyValue('fb:app_id'),
      pages: propertyValue('fb:pages'),
    }));

    const previewUrl = computed(() => {
      const isDesktop = openTab.value === 'desktop';
      const params = new URLSearchParams();
      params.set('title', og.value.title || props.headData.head.title);
      params.set('url', props.headData.head.url);
      params.set('image', og.value.image);
      params.set('theme', getTheme());
      params.set('imageSpecified', imageSpecified.value);
      params.set('description', og.value.description);
      if (og.value.image !== undefined) {
        params.set(
          'imageIsBig',
          isDesktop ? imageDimensions.value.height >= 415 && imageDimensions.value.width >= 415 :
            (imageDimensions.value.height > 359 && imageDimensions.value.width > 359) ||
              (imageSpecified.value &&
                (imageDimensions.value.height === 0 || imageDimensions.value.width === 0))
        );
      }
      params.set('style', openTab.value);

      return `/previews/facebook/facebook.html?${ params }`;
    });
    const metaData = computed(() => ([
      {
        term: 'fb:app_id',
        value: facebookProperties.value.appId,
        required: true,
      },
      {
        term: 'fb:pages',
        value: facebookProperties.value.pages,
      },
      {
        term: 'og:type',
        value: og.value.type,
      },
      {
        term: 'og:url',
        value: absoluteUrl(og.value.url),
        type: 'link',
        required: true,
      },
      {
        term: 'og:locale',
        value: og.value.locale,
      },
      {
        term: 'og:title',
        value: og.value.title,
        required: true,
      },
      {
        term: 'og:description',
        value: og.value.description,
        required: true,
      },
      {
        term: 'og:image',
        value: og.value.image,
        image: {
          href: og.value.image,
          url: absoluteUrl(og.value.image),
        },
        type: 'image',
        required: true,
      },
      {
        term: 'og:image:url',
        value: og.value.imageUrl,
        image: {
          href: og.value.imageUrl,
          url: absoluteUrl(og.value.imageUrl),
        },
        type: 'image',
      },
      {
        term: 'og:image:secure_url',
        value: absoluteUrl(og.value.imageSecureUrl),
        type: 'link',
      },
      {
        term: 'og:image:type',
        value: og.value.imageType,
      },
      {
        term: 'og:image:width',
        value: og.value.imageWidth,
      },
      {
        term: 'og:image:height',
        value: og.value.imageHeight,
      },
      {
        term: 'og:video',
        value: og.value.video,
        image: {
          href: og.value.video,
          url: absoluteUrl(og.value.video),
        },
        type: 'image',
      },
      {
        term: 'og:video:url',
        value: og.value.videoUrl,
        image: {
          href: og.value.videoUrl,
          url: absoluteUrl(og.value.videoUrl),
        },
        type: 'image',
      },
      {
        term: 'og:video:secure_url',
        value: absoluteUrl(og.value.videoSecureUrl),
        type: 'link',
      },
      {
        term: 'og:video:type',
        value: og.value.videoType,
      },
      {
        term: 'og:video:width',
        value: og.value.videoWidth,
      },
      {
        term: 'og:video:height',
        value: og.value.videoHeight,
      },
    ]));

    const getTooltipInfo = term => (info[term] ?? {});
    const absoluteUrl = url => createAbsoluteUrl(props.headData.head, url);
    const getImageDimensions = () => findImageDimensions(props.headData.head, 'og:image')
      .then(dimensions => imageDimensions.value = dimensions);
    const propertyValue = propName =>
      findMetaProperty(props.headData.head, propName) || findMetaContent(props.headData.head, propName);

    watch(() => og.value.image, value => {
      if (value) {
        getImageDimensions();
      }
    });

    onMounted(() => getImageDimensions());

    validation.value = validate(metaData.value, schema);

    return {
      TABS,
      openTab,
      og,
      facebookProperties,
      previewUrl,
      metaData,
      getTooltipInfo,
      validation,
    };
  },
  components: {
    ExternalLink,
    PanelSection,
    PreviewIframe,
    PropertiesItemNew,
    PropertiesList,
    TabSelector,
  },
};
</script>

<style>
  .facebook__preview {
    max-width: var(--preview-width);
  }
</style>
