<template>
  <tab-selecter v-model="openTab" :tabs="TABS" />

  <panel-section v-if="openTab === 'mobile'" title="Preview">
    <preview-iframe :url="previewUrl" iframeClass="facebook__preview">
      <template v-slot:caption>
        Preview based on <external-link href="https://m.facebook.com/">m.facebook.com</external-link>.
      </template>
    </preview-iframe>
  </panel-section>

  <panel-section v-if="openTab === 'desktop'" title="Preview">
    <preview-iframe :url="previewUrl" class="facebook__preview">
      <template v-slot:caption>
        Preview based on <external-link href="https://facebook.com/">facebook.com</external-link>.
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
import { computed, onMounted, reactive, ref, watch } from 'vue';
import useHead from '@/composables/use-head';
import createAbsoluteUrl from '@shared/lib/create-absolute-url';
import { findImageDimensions, findMetaProperty } from '@shared/lib/find-meta';
import getTheme from '@shared/lib/theme';
import ExternalLink from '@shared/components/external-link';
import PanelSection from '@shared/components/panel-section';
import PreviewIframe from '@shared/components/preview-iframe';
import PropertiesItem from '@shared/components/properties-item';
import PropertiesList from '@shared/components/properties-list';
import TabSelecter from '@shared/components/tab-selecter';

const TABS = [
  {
    label: 'Mobile',
    value: 'mobile',
  },
  {
    label: 'Desktop',
    value: 'desktop',
  },
];

export default {
  setup() {
    const headData = useHead().data;
    const openTab = ref(TABS[0].value);
    const imageDimensions = reactive({ width: 0, height: 0 });
    const imageSpecified = ref(true);
    const og = computed(() => ({
      title: propertyValue('og:title'),
      image: absoluteUrl(propertyValue('og:image')),
      description: propertyValue('og:description'),
    }));
    const themeClass = computed(() => getTheme() === 'dark' ? '-theme-with-dark-background' : '');
    const previewUrl = computed(() => {
      const params = new URLSearchParams();
      params.set('title', og.value.title || headData.value.head.title);
      params.set('url', headData.value.head.url);
      params.set('image', og.value.image);
      params.set('theme', themeClass.value);
      params.set('imageSpecified', imageSpecified.value);
      params.set('description', og.value.description);
      if (og.value.image !== undefined) {
        params.set(
          'mobileImgIsBig',
          (imageDimensions.height > 359 && imageDimensions.width > 359) ||
            (imageSpecified.value &&
              (imageDimensions.height === 0 || imageDimensions.width === 0))
        );
      }
      params.set('desktopImgIsBig', imageDimensions.height >= 415 && imageDimensions.width >= 415);
      return `${
        openTab.value === 'desktop'
          ? `/previews/facebook-desktop/facebook-desktop.html?${ params }`
          : `/previews/facebook-mobile/facebook-mobile.html?${ params }`
      }`;
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
      TABS,
      openTab,
      imageDimensions,
      imageSpecified,
      og,
      themeClass,
      previewUrl,
      absoluteUrl,
      propertyValue,
    };
  },
  components: {
    ExternalLink,
    PanelSection,
    PreviewIframe,
    PropertiesItem,
    PropertiesList,
    TabSelecter,
  },
};
</script>

<style>
.facebook__preview {
  max-width: 521px;
  min-height: 400px;
}
</style>
