<template>
  <div class="linkedin">
    <panel-section title="Preview">
      <p v-if="!hasRequiredData">
        This page does not contain the necessary metadata to create a preview.
      </p>
      <preview-iframe
        v-else
        :url="previewUrl"
        iframeClass="linkedin__preview"
        :loading-height="348"
      >
        <template v-slot:caption>
          Preview based on <external-link href="https://linkedin.com/">linkedin.com</external-link>.
        </template>
      </preview-iframe>
    </panel-section>

    <panel-section title="Properties">
      <properties-list>
        <properties-item
          v-for="item in linkedinProperties"
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
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { findImageDimensions, findMetaContent, findMetaProperty } from '@shared/lib/find-meta';
import createAbsoluteUrl from '@shared/lib/create-absolute-url';
import getTheme from '@shared/lib/theme';
import ExternalLink from '@shared/components/external-link';
import PanelSection from '@shared/components/panel-section';
import PreviewIframe from '@shared/components/preview-iframe';
import PropertiesItem from '@shared/components/properties-item';
import PropertiesList from '@shared/components/properties-list';
import schema from '@shared/lib/schemas/linkedin-schema';

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
      schema,
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
        Boolean(this.og.title) &&
        Boolean(this.og.image) &&
        Boolean(this.og.description) &&
        Boolean(this.og.url)
      );
    },
    og() {
      return {
        title: this.propertyValue('og:title'),
        type: this.propertyValue('og:type'),
        image: this.propertyValue('og:image'),
        description: this.propertyValue('og:description'),
        url: this.propertyValue('og:url'),
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
      params.set('title', this.og.title);
      params.set('image', this.og.image);
      params.set('description', this.og.description);
      params.set('url', this.og.url);
      params.set('theme', this.themeClass);
      params.set('imageIsBig', this.imageDimensions.height >= 400 && this.imageDimensions.width >= 400);

      return `/previews/linkedin/linkedin.html?${ params }`;
    },
    linkedinProperties() {
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
          term: 'og:description',
          value: this.og.description,
          required: true,
        },
        {
          term: 'og:url',
          value: this.og.url,
          type: 'link',
          required: true,
        },
      ];
    },
  },
  watch: {
    'og.image'() {
      this.findImageDimensions();
    },
  },
  created() {
    this.findImageDimensions();
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
.linkedin__preview {
  max-width: 520px;
}
</style>
