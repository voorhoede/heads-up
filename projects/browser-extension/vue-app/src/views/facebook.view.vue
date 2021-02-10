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
        <properties-item
          v-for="item in metaData"
          :key="item.term"
          :term="item.term"
          :value="item.value"
          :image="item.image"
          :type="item.type"
          :schema="schema"
          :required="item.required"
        >
        </properties-item>
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
import { mapState } from 'vuex';
import { findImageDimensions, findMetaContent, findMetaProperty } from '@shared/lib/find-meta';
import createAbsoluteUrl from '@shared/lib/create-absolute-url';
import getTheme from '@shared/lib/theme';
import schema from '@shared/lib/schemas/facebook-schema';

import ExternalLink from '@shared/components/external-link';
import PanelSection from '@shared/components/panel-section';
import PreviewIframe from '@shared/components/preview-iframe';
import PropertiesItem from '@shared/components/properties-item';
import PropertiesList from '@shared/components/properties-list';
import TabSelector from '@shared/components/tab-selector';

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
    TabSelector,
  },
  data() {
    return {
      schema,
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
        type: this.propertyValue('og:type'),
        url: this.propertyValue('og:url'),
        locale: this.propertyValue('og:locale'),
        title: this.propertyValue('og:title'),
        description: this.propertyValue('og:description'),
        image: this.propertyValue('og:image'),
        imageUrl: this.propertyValue('og:image:url'),
        imageSecureUrl: this.propertyValue('og:image:secure_url'),
        imageType: this.propertyValue('og:image:type'),
        imageWidth: this.propertyValue('og:image:width'),
        imageHeight: this.propertyValue('og:image:height'),
        video: this.propertyValue('og:video'),
        videoUrl: this.propertyValue('og:video:url'),
        videoSecureUrl: this.propertyValue('og:video:secure_url'),
        videoType: this.propertyValue('og:video:type'),
        videoWidth: this.propertyValue('og:video:width'),
        videoHeight: this.propertyValue('og:video:height'),
      };
    },

    facebookProperties() {
      return {
        appId: this.propertyValue('fb:app_id'),
        pages: this.propertyValue('fb:pages'),
      };
    },

    themeClass() {
      return getTheme() === 'dark' ? '-theme-with-dark-background' : '';
    },

    previewUrl() {
      const isDesktop = this.openTab === 'desktop';
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
      if (this.og.image !== undefined) {
        params.set(
          'imageIsBig',
          isDesktop ? this.imageDimensions.height >= 415 && this.imageDimensions.width >= 415 :
            (this.imageDimensions.height > 359 && this.imageDimensions.width > 359) ||
              (this.imageSpecified &&
                (this.imageDimensions.height === 0 || this.imageDimensions.width === 0))
        );
      }
      params.set('style', this.openTab);

      return `/previews/facebook/facebook.html?${ params }`;
    },

    metaData() {
      return [
        {
          term: 'fb:app_id',
          value: this.facebookProperties.appId,
          required: true,
        },
        {
          term: 'fb:pages',
          value: this.facebookProperties.pages,
        },
        {
          term: 'og:type',
          value: this.og.type,
        },
        {
          term: 'og:url',
          value: this.absoluteUrl(this.og.url),
          type: 'link',
          required: true,
        },
        {
          term: 'og:locale',
          value: this.og.locale,
        },
        {
          term: 'og:title',
          value: this.og.title,
          required: true,
        },
        {
          term: 'og:description',
          value: this.og.description,
          required: true,
        },
        {
          term: 'og:image',
          value: this.og.image,
          image: {
            href: this.og.image,
            url: this.absoluteUrl(this.og.image),
          },
          type: 'image',
          required: true,
        },
        {
          term: 'og:image:url',
          value: this.og.imageUrl,
          image: {
            href: this.og.imageUrl,
            url: this.absoluteUrl(this.og.imageUrl),
          },
          type: 'image',
        },
        {
          term: 'og:image:secure_url',
          value: this.absoluteUrl(this.og.imageSecureUrl),
          type: 'link',
        },
        {
          term: 'og:image:type',
          value: this.og.imageType,
        },
        {
          term: 'og:image:width',
          value: this.og.imageWidth,
        },
        {
          term: 'og:image:height',
          value: this.og.imageHeight,
        },
        {
          term: 'og:video',
          value: this.og.video,
          image: {
            href: this.og.video,
            url: this.absoluteUrl(this.og.video),
          },
          type: 'image',
        },
        {
          term: 'og:video:url',
          value: this.og.videoUrl,
          image: {
            href: this.og.videoUrl,
            url: this.absoluteUrl(this.og.videoUrl),
          },
          type: 'image',
        },
        {
          term: 'og:video:secure_url',
          value: this.absoluteUrl(this.og.videoSecureUrl),
          type: 'link',
        },
        {
          term: 'og:video:type',
          value: this.og.videoType,
        },
        {
          term: 'og:video:width',
          value: this.og.videoWidth,
        },
        {
          term: 'og:video:height',
          value: this.og.videoHeight,
        },
      ];
    },
  },

  watch: {
    'og.image'() {
      this.getImageDimensions();
    },
  },

  created() {
    this.getImageDimensions();
  },

  methods: {
    getImageDimensions() {
      findImageDimensions(this.head, 'og:image').then(dimensions => {
        this.imageDimensions = dimensions;
      });
    },
    absoluteUrl(url) {
      return createAbsoluteUrl(this.head, url);
    },
    propertyValue(propName) {
      return findMetaProperty(this.head, propName) || findMetaContent(this.head, propName);
    },
  },
};
</script>

<style>
  .facebook__preview {
    max-width: var(--preview-width);
  }
</style>
