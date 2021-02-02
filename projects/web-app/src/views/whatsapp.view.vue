<template>
  <panel-section title="Preview">
    <p v-if="!hasDescription">
      This page does not contain an Open Graph description to create a preview.
    </p>
    <preview-iframe
      v-if="hasDescription && previewUrl"
      :url="previewUrl"
      iframeClass="whatsapp__preview"
      :loading-height="122"
    >
      <template v-slot:caption>
        Preview based on
        <external-link href="https://web.whatsapp.com/">
          web.whatsapp.com
        </external-link>
      </template>
    </preview-iframe>
  </panel-section>
  <panel-section title="Properties">
    <properties-list>
      <properties-item
        v-for="item in whatsappMetaData"
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
  </panel-section>
</template>

<script>
import { computed } from 'vue';
import useHead from '@/composables/use-head';
import createAbsoluteUrl from '@shared/lib/create-absolute-url';
import { findMetaContent, findMetaProperty } from '@shared/lib/find-meta';
import ExternalLink from '@shared/components/external-link';
import PanelSection from '@shared/components/panel-section';
import PreviewIframe from '@shared/components/preview-iframe';
import PropertiesItem from '@shared/components/properties-item';
import PropertiesList from '@shared/components/properties-list';
import schema from '@shared/lib/schemas/whatsapp-schema';

export default {
  setup() {
    const headData = useHead().data;
    const og = computed(() => ({
      title: propertyValue('og:title'),
      description: propertyValue('og:description'),
      type: propertyValue('og:type'),
      image: propertyValue('og:image'),
      url: propertyValue('og:url'),
    }));
    const title = computed(() => (
      propertyValue('og:title') || headData.value.head.title || ''
    ));
    const description = computed(() => (og.value.description));
    const hasDescription = computed(() => (
      og.value.description !== null && og.value.description.length > 0
    ));
    const image = computed(() => (
      og.value.image !== undefined ? absoluteUrl(og.value.image) : og.value.image
    ));
    const previewUrl = computed(() => {
      const params = new URLSearchParams();
      params.set('title', og.value.title || title.value);
      params.set('description', description.value);
      params.set('image', image.value);
      params.set('url', headData.value.head.url);
      return `/previews/whatsapp/whatsapp.html?${ params }`;
    });
    const whatsappMetaData = computed(() => {
      return [
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
          term: 'og:type',
          value: og.value.type,
        },
        {
          term: 'og:image',
          value: absoluteUrl(og.value.image),
          image: {
            href: og.value.image,
            url: absoluteUrl(og.value.image),
          },
          type: 'image',
          required: true,
        },
        {
          term: 'og:url',
          value: og.value.url,
          type: 'link',
          required: true,
        },
      ];
    });

    const absoluteUrl = url => createAbsoluteUrl(headData.value.head, url);
    const propertyValue = propName =>
      findMetaProperty(headData.value.head, propName) || findMetaContent(headData.value.head, propName);

    return {
      og,
      title,
      description,
      hasDescription,
      image,
      previewUrl,
      whatsappMetaData,
      absoluteUrl,
      propertyValue,
      schema,
    };
  },
  components: {
    ExternalLink,
    PanelSection,
    PreviewIframe,
    PropertiesItem,
    PropertiesList,
  },
};
</script>

<style>
.whatsapp__preview {
  max-width: 521px;
}
</style>
