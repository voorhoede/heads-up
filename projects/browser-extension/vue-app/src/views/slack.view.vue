<template>
  <div class="slack">
    <panel-section title="Preview">
      <p v-if="!hasRequiredData">
        This page does not contain the necessary metadata to create a preview.
      </p>
      <preview-iframe
        v-else
        :url="previewUrl"
        iframeClass="slack__preview"
        :loading-height="263"
      >
        <template v-slot:caption>
          Preview based on <external-link href="https://slack.com/">slack.com</external-link>.
        </template>
      </preview-iframe>
    </panel-section>

    <panel-section title="Properties">
      <properties-list>
        <properties-item
          v-for="item in slackProperties"
          :key="item.term"
          :term="item.term"
          :value="item.value"
          :image="item.image"
          :type="item.type"
          :required="item.required"
        >
        </properties-item>
      </properties-list>
    </panel-section>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import {
  findAdditionalTwitterData,
  findFavicons,
  findImageDimensions,
  findMetaContent,
  findMetaProperty
} from '@shared/lib/find-meta';
import createAbsoluteUrl from '@shared/lib/create-absolute-url';
import getTheme from '@shared/lib/theme';
import ExternalLink from '@shared/components/external-link';
import PanelSection from '@shared/components/panel-section';
import PreviewIframe from '@shared/components/preview-iframe';
import PropertiesItem from '@shared/components/properties-item';
import PropertiesList from '@shared/components/properties-list';

export default {
  components: {
    ExternalLink,
    PanelSection,
    PreviewIframe,
    PropertiesItem,
    PropertiesList,
  },
  data() {
    return {
      imageDimensions: {
        height: undefined,
        width: undefined,
      },
    };
  },
  computed: {
    ...mapState([ 'head' ]),
    hasRequiredData() {
      return (
        (this.og.title || this.head.title) &&
        (this.og.description || this.headDescription)
      );
    },
    og() {
      return {
        title: this.propertyValue('og:title'),
        type: this.propertyValue('og:type'),
        description: this.propertyValue('og:description'),
        site_name: this.propertyValue('og:site_name'),
        image: this.absoluteUrl(this.propertyValue('og:image')),
        url: this.absoluteUrl(this.propertyValue('og:url')),
      };
    },
    headDescription() {
      return findMetaContent(this.head, 'description');
    },
    favicon() {
      return findFavicons(this.head).length ? findFavicons(this.head)[0].url : '';
    },
    additional() {
      return {
        favicon: this.favicon,
        twitterData: findAdditionalTwitterData(this.head),
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
      params.set('additionalData', JSON.stringify(this.additional.twitterData));
      params.set('description', this.og.description || this.headDescription);
      params.set('favicon', this.additional.favicon);
      params.set('image', this.og.image);
      params.set('imageIsBig', this.imageDimensions.height > 201 && this.imageDimensions.width > 201);
      params.set('siteName', this.og.site_name);
      params.set('theme', this.themeClass);
      params.set('title', this.og.title || this.head.title || 'Weblink');
      params.set('url', this.head.url);
      params.set('validImage', this.imageDimensions.height > 0 && this.imageDimensions.width > 0);
      return `/previews/slack/slack.html?${ params }`;
    },
    slackProperties() {
      return [
        {
          term: 'og:title',
          value: this.og.title,
          required: true,
        },
        {
          term: 'og:type',
          value: this.og.type,
          required: true,
        },
        {
          term: 'og:description',
          value: this.og.description,
        },
        {
          term: 'og:site_name',
          value: this.og.site_name,
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
          term: 'og:url',
          value: this.og.url,
          type: 'link',
          required: true,
        },
        // Transform twitterData array and
        // spread objects into slackProperties array.
        ...this.additional.twitterData.map((item, index) => (
          Object.entries(item).map(entry => ({
            term: `twitter:${ entry[0] === 'label' ? entry[0] : 'data' }${ index + 1 }`,
            value: entry[1],
          }))
        )).flat(),
      ];
    },
  },
  watch:{
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
      return findMetaProperty(this.head, propName) || findMetaContent(this.head, propName);
    },
  },
};
</script>

<style>
.slack__preview {
  max-width: 521px;
}
</style>
