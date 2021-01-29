<template>
  <div class="whatsapp">
    <panel-section title="Preview">
      <p v-if="!hasRequiredData">
        This page does not contain the necessary metadata to create a preview.
      </p>
      <preview-iframe
        v-else
        :url="previewUrl"
        iframeClass="whatsapp__preview"
        :loading-height="122"
      >
        <template v-slot:caption>
          Preview based on <external-link href="https://web.whatsapp.com/">web.whatsapp.com</external-link>.
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
        <ul>
          <li>
            <external-link
              href="https://stackoverflow.com/a/43154489"
            >
              2019 WhatsApp sharing standards (on StackOverflow)
            </external-link>
          </li>
          <li>
            <external-link
              href="https://stackoverflow.com/questions/19778620/provide-an-image-for-whatsapp-link-sharing"
            >
              Unfurl mechanism used by WhatsApp for sharing
            </external-link>
          </li>
        </ul>
      </ul>
    </panel-section>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import createAbsoluteUrl from '@shared/lib/create-absolute-url';
import { findImageDimensions, findMetaContent, findMetaProperty } from '@shared/lib/find-meta';
import schema from '@shared/lib/schemas/whatsapp-schema';

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
        (this.og.title || this.head.title) &&
        (this.og.description || this.headDescription)
      );
    },
    og() {
      return {
        title: this.propertyValue('og:title'),
        description: this.propertyValue('og:description'),
        type: this.propertyValue('og:type'),
        image: this.absoluteUrl(this.propertyValue('og:image')),
        url: this.propertyValue('og:url'),
      };
    },
    headDescription() {
      return findMetaContent(this.head, 'description');
    },
    previewUrl() {
      const params = new URLSearchParams();
      params.set('title', this.og.title || this.head.title);
      params.set('url', this.og.url || this.head.url);
      params.set('description', this.og.description || this.headDescription);
      if (this.imageDimensions.height >= 200 && this.imageDimensions.width >= 300) {
        params.set('image', this.og.image);
      }

      return `/previews/whatsapp/whatsapp.html?${ params }`;
    },
    metaData() {
      return [
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
          term: 'og:type',
          value: this.og.type,
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
  .whatsapp__preview {
    max-width: var(--preview-width);
  }
</style>
