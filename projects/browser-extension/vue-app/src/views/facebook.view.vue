<template>
  <div class="facebook">
    <tab-selecter
      v-model="openTab"
      :tabs="TABS"
    />

    <panel-section
      v-if="openTab === 'mobile'"
      title="Preview"
    >
      <preview-iframe
        :url="previewUrl"
        iframeClass="facebook__preview"
      >
        <template v-slot:caption>
          Preview based on <external-link href="https://m.facebook.com/">m.facebook.com</external-link>.
        </template>
      </preview-iframe>
    </panel-section>

    <panel-section
      v-if="openTab === 'desktop'"
      title="Preview"
    >
      <preview-iframe
        :url="previewUrl"
        class="facebook__preview"
      >
        <template v-slot:caption>
          Preview based on <external-link href="https://facebook.com/">facebook.com</external-link>.
        </template>
      </preview-iframe>
    </panel-section>

    <panel-section title="Properties">
      <properties-list>
        <properties-item
          v-for="(item, index) in facebookProperties"
          :key="index"
          :term="item.keyName"
          :value="item.value"
        >
        </properties-item>
      </properties-list>
    </panel-section>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import {
  findMetaProperty,
  findImageDimensions
} from '@shared/lib/find-meta';
import appMetaSchema from '@shared/lib/schemas/app-meta-schema';
import createAbsoluteUrl from '@shared/lib/create-absolute-url';
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
  components: {
    ExternalLink,
    PanelSection,
    PreviewIframe,
    PropertiesItem,
    PropertiesList,
    TabSelecter,
  },
  data() {
    return {
      appMetaSchema,
      imageDimensions: {
        height: undefined,
        width: undefined,
      },
      imageSpecified: true,
      TABS,
      openTab: TABS[0].value,
    };
  },
  computed: {
    ...mapState([ 'head' ]),
    og() {
      return {
        title: this.propertyValue('og:title'),
        image: this.absoluteUrl(this.propertyValue('og:image')),
        description: this.propertyValue('og:description'),
      };
    },
    themeClass() {
      /**
       * class '-theme-with-dark-background' is taken from original dev tools repo
       * src: https://github.com/ChromeDevTools/devtools-frontend/blob/02a851d01de158d8c0a8fd1d3af06649b5379bd6/front_end/ui/inspectorStyle.css
       */
      return getTheme() === 'dark' ? '-theme-with-dark-background' : '';
    },
    previewUrl() {
      const params = new URLSearchParams();
      params.set('title', this.og.title || this.head.title);
      params.set('url', this.head.url);
      params.set('image', this.og.image);
      params.set('theme', this.themeClass);
      params.set('imageSpecified', this.imageSpecified);
      params.set('description', this.og.description);
      if (this.og.image !== undefined) {
        params.set(
          'mobileImgIsBig',
          (this.imageDimensions.height > 359 && this.imageDimensions.width > 359) ||
            (this.imageSpecified &&
              (this.imageDimensions.height === 0 || this.imageDimensions.width === 0))
        );
      }
      params.set(
        'desktopImgIsBig',
        this.imageDimensions.height >= 415 && this.imageDimensions.width >= 415
      );
      return `${
        this.openTab === 'desktop'
          ? `/previews/facebook-desktop/facebook-desktop.html?${ params }`
          : `/previews/facebook-mobile/facebook-mobile.html?${ params }`
      }`;
    },
    facebookProperties() {
      return [
        {
          keyName: 'og:title',
          title: 'og:title',
          value: this.og.title,
        },
        {
          keyName: 'og:description',
          title: 'og:description',
          value: this.og.description,
        },
        {
          keyName: 'og:image',
          title: 'og:image',
          value: this.og.image,
        },
      ];
    },
  },
  watch: {
    'og.image'() {
      this.findImageDimensions();
    },
  },
  mounted() {
    window.addEventListener('resize', this.onResize);
  },
  created() {
    this.findImageDimensions();
  },
  unmounted() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    findImageDimensions() {
      findImageDimensions(this.head, 'og:image').then(imageDimensions => {
        this.imageDimensions = imageDimensions;
      });
    },
    absoluteUrl(url) {
      return createAbsoluteUrl(this.head, url);
    },
    propertyValue(propName) {
      return findMetaProperty(this.head, propName);
    },
  },
};
</script>

<style>
.facebook__preview {
  max-width: 521px;
}
</style>
