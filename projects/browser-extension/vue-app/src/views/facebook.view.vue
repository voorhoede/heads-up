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
          v-if="head.title !== og.title"
          :schema="appMetaSchema"
          :value="head.title"
          key-name="title"
        >
          <template #default>title</template>
        </properties-item>
        <properties-item
          v-for="item in facebookMetaData"
          :key="item.keyName"
          :key-name="item.keyName"
        >
          <template #default>
            <social-media-tooltip
              :exist="tooltip[item.keyName].exist"
              :has-variation="tooltip[item.keyName].hasVariation"
              :required-sizes="tooltip[item.keyName].requiredSizes"
              :required="tooltip[item.keyName].required"
              :size="tooltip[item.keyName].size"
              :tag="tooltip[item.keyName].tag"
              :type="item.keyName"
              :value-length="tooltip[item.keyName].valueLength"
            />
          </template>
          <template v-if="item.value && item.keyName.includes(':image')" #value>
            <external-link :href="absoluteUrl(item.value)">
              <img :src="absoluteUrl(item.value)" alt="" />
              <span>{{ item.value }}</span>
            </external-link>
          </template>
          <template v-else-if="item.value" #value>
            {{ item.value }}
          </template>
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
import SocialMediaTooltip from '@shared/components/social-media-tooltip';
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
    SocialMediaTooltip,
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
      tooltip: {
        'fb:app_id': {
          exist: false,
          required: true,
          tag: 'fb:app_id',
        },
        'og:type': {
          exist: false,
          required: false,
          tag: 'og:type',
        },
        'og:url': {
          exist: false,
          required: true,
          tag: 'og:url',
        },
        'og:locale': {
          exist: false,
          required: false,
          tag: 'og:locale',
        },
        'og:title': {
          exist: null,
          required: true,
          tag: null,
        },
        'og:description': {
          exist: null,
          required: true,
          tag: 'og:description',
          valueLength: {
            max: 250,
            tooLong: null,
          },
        },
        'og:image': {
          exist: false,
          hasVariation: true,
          required: false,
          requiredSizes: {
            minimum: {
              width: 100,
              height: 100,
            },
            variation: {
              width: 415,
              height: 415,
            },
          },
          size: {
            width: null,
            height: null,
          },
          tag: 'og:image',
        },
        'og:image:url': {
          exist: false,
          required: false,
          tag: 'og:image:url',
        },
        'og:image:secure_url': {
          exist: false,
          required: false,
          tag: 'og:image:secure_url',
        },
        'og:image:type': {
          exist: false,
          required: false,
          tag: 'og:image:type',
        },
        'og:image:width': {
          exist: false,
          required: false,
          tag: 'og:image:width',
        },
        'og:image:height': {
          exist: false,
          required: false,
          tag: 'og:image:height',
        },
        'og:video': {
          exist: false,
          required: false,
          tag: 'og:video',
        },
        'og:video:url': {
          exist: false,
          required: false,
          tag: 'og:video:url',
        },
        'og:video:secure_url': {
          exist: false,
          required: false,
          tag: 'og:video:secure_url',
        },
        'og:video:type': {
          exist: false,
          required: false,
          tag: 'og:video:type',
        },
        'og:video:width': {
          exist: false,
          required: false,
          tag: 'og:video:width',
        },
        'og:video:height': {
          exist: false,
          required: false,
          tag: 'og:video:height',
        },
      },
    };
  },
  computed: {
    ...mapState([ 'head' ]),
    og() {
      return {
        type: this.propertyValue('og:type'),
        url: this.absoluteUrl(this.propertyValue('og:url')),
        locale: this.absoluteUrl(this.propertyValue('og:locale')),
        title: this.propertyValue('og:title'),
        description: this.propertyValue('og:description'),
        image: this.absoluteUrl(this.propertyValue('og:image')),
        imageUrl: this.absoluteUrl(this.propertyValue('og:image:url')),
        imageSecureUrl: this.absoluteUrl(this.propertyValue('og:image:secure_url')),
        imageType: this.propertyValue('og:image:type'),
        imageWidth: this.propertyValue('og:image:width'),
        imageHeight: this.propertyValue('og:image:height'),
        video: this.absoluteUrl(this.propertyValue('og:video')),
        videoUrl: this.absoluteUrl(this.propertyValue('og:video:url')),
        videoSecureUrl: this.absoluteUrl(this.propertyValue('og:video:secure_url')),
        videoType: this.propertyValue('og:video:type'),
        videoWidth: this.propertyValue('og:video:width'),
        videoHeight: this.propertyValue('og:video:height'),
      };
    },
    facebookProperties() {
      return {
        appId: this.propertyValue('fb:app_id'),
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
    facebookMetaData() {
      return [
        {
          keyName: 'fb:app_id',
          title: 'fb:app_id',
          value: this.facebookProperties.appId,
        },
        {
          keyName: 'og:type',
          title: 'og:type',
          value: this.og.type,
        },
        {
          keyName: 'og:url',
          title: 'og:url',
          value: this.og.url,
        },
        {
          keyName: 'og:locale',
          title: 'og:locale',
          value: this.og.locale,
        },
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
        {
          keyName: 'og:image:url',
          title: 'og:image:url',
          value: this.og.imageUrl,
        },
        {
          keyName: 'og:image:secure_url',
          title: 'og:image:secure_url',
          value: this.og.imageSecureUrl,
        },
        {
          keyName: 'og:image:type',
          title: 'og:image:type',
          value: this.og.imageType,
        },
        {
          keyName: 'og:image:width',
          title: 'og:image:width',
          value: this.og.imageWidth,
        },
        {
          keyName: 'og:image:height',
          title: 'og:image:height',
          value: this.og.imageHeight,
        },
        {
          keyName: 'og:video',
          title: 'og:video',
          value: this.og.video,
        },
        {
          keyName: 'og:video:url',
          title: 'og:video:url',
          value: this.og.videoUrl,
        },
        {
          keyName: 'og:video:secure_url',
          title: 'og:video:secure_url',
          value: this.og.videoSecureUrl,
        },
        {
          keyName: 'og:video:type',
          title: 'og:video:type',
          value: this.og.videoType,
        },
        {
          keyName: 'og:video:width',
          title: 'og:video:width',
          value: this.og.videoWidth,
        },
        {
          keyName: 'og:video:height',
          title: 'og:video:height',
          value: this.og.videoHeight,
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
        this.setTooltipData(imageDimensions);
      });
    },
    absoluteUrl(url) {
      return createAbsoluteUrl(this.head, url);
    },
    setTooltipData(imageDimensions) {
      for (const [ key, value ] of Object.entries(this.og)) {
        this.tooltip[`og:${ key }`].exist = Boolean(value);
      }

      for (const [ key, value ] of Object.entries(this.facebookProperties)) {
        this.tooltip[`fb:${ key }`].exist = Boolean(value);
      }

      this.og.image
        ? (this.tooltip['og:image'].exist = true)
        : (this.tooltip['og:image'].exist = false);

      this.tooltip['og:image'].size = imageDimensions;
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

.facebook .properties-item__icon {
  margin-left: 4px;
}
</style>
