<template>
  <panel-section title="Preview">
    <p v-if="!hasRequiredData">
      This page does not contain og:image meta data to create a preview.
    </p>
    <preview-iframe
      v-if="hasRequiredData"
      :url="previewUrl"
      iframeClass="slack__preview"
    >
      <template v-slot:caption>
        Preview based on <external-link href="https://slack.com/">slack.com</external-link>.
      </template>
    </preview-iframe>
  </panel-section>

  <panel-section title="Properties">
    <properties-list>
      <properties-item>
        <template #default>og:title</template>
        <template #value>{{ og.title }}</template>
      </properties-item>
      <properties-item>
        <template #default>og:description</template>
        <template #value>{{ og.description }}</template>
      </properties-item>
      <properties-item>
        <template #default>og:image</template>
        <template v-if="og.image || imageDimensions" #value>
          <external-link v-if="og.image" :href="absoluteUrl(og.image)">
            <img alt :src="absoluteUrl(og.image)">
            {{ og.image }}
          </external-link>
          <p v-if="imageDimensions">
            ({{ imageDimensions.width }}px &times; {{ imageDimensions.height }}px)
          </p>
        </template>
      </properties-item>
    </properties-list>
  </panel-section>
</template>

<script>
import { computed, onMounted, reactive, watch } from 'vue';
import useHead from '@/composables/use-head';
import createAbsoluteUrl from '@shared/lib/create-absolute-url';
import { findAdditionSlackData, findFavicons, findImageDimensions, findMetaProperty } from '@shared/lib/find-meta';
import getTheme from '@shared/lib/theme';
import PanelSection from '@shared/components/panel-section';
import ExternalLink from '@shared/components/external-link';
import PreviewIframe from '@shared/components/preview-iframe';
import PropertiesItem from '@shared/components/properties-item';
import PropertiesList from '@shared/components/properties-list';

export default {
  setup() {
    const headData = useHead().data;
    const imageDimensions = reactive({ width: 0, height: 0 });
    const hasRequiredData = computed(() => og.value.title !== null || og.value.description !== null);
    const themeClass = computed(() => getTheme() === 'dark' ? '-theme-with-dark-background' : '');
    const og = computed(() => ({
      title: propertyValue('og:title'),
      description: propertyValue('og:description'),
      image: absoluteUrl(propertyValue('og:image')),
    }));
    const favicon = computed(() => findFavicons(headData.value.head).length
      ? findFavicons(headData.value.head)[0].url
      : null
    );
    const additionalData = computed(() => findAdditionSlackData(headData.value.head));
    const previewUrl = computed(() => {
      const params = new URLSearchParams();
      params.set('title', og.value.title || headData.value.title || 'Weblink');
      params.set('url', headData.value.head.url);
      params.set('image', og.value.image);
      params.set('theme', themeClass.value);
      params.set('description', og.value.description);
      params.set('favicon', favicon.value);
      params.set('additionalData', JSON.stringify(additionalData.value));
      params.set('imageIsBig', imageDimensions.height > 201 && imageDimensions.width > 201);
      params.set('validImage', imageDimensions.height > 0 && imageDimensions.width > 0);

      return `/previews/slack/slack.html?${ params }`;
    });

    const absoluteUrl = url => createAbsoluteUrl(headData.value.head, url);
    const propertyValue = propName => findMetaProperty(headData.value.head, propName);
    const getImageDimensions = () => findImageDimensions(headData.value.head, 'og:image')
      .then(dimensions => {
        imageDimensions.width = dimensions.width;
        imageDimensions.height = dimensions.height;
      });

    watch(og, value => {
      if (value) { getImageDimensions(); }
    });

    onMounted(() => getImageDimensions());

    return {
      imageDimensions,
      hasRequiredData,
      themeClass,
      og,
      favicon,
      additionalData,
      previewUrl,
      absoluteUrl,
      propertyValue,
      getImageDimensions,
    };
  },
  components: {
    PanelSection,
    ExternalLink,
    PreviewIframe,
    PropertiesItem,
    PropertiesList,
  },
};
</script>

<style>
.slack__preview {
  max-width: 521px;
  min-height: 264px;
}
</style>
