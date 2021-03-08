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
          <external-link href="https://stackoverflow.com/a/43154489">
            2019 WhatsApp sharing standards (on StackOverflow)
          </external-link>
        </li>
        <li>
          <external-link href="https://stackoverflow.com/questions/19778620/provide-an-image-for-whatsapp-link-sharing">
            Unfurl mechanism used by WhatsApp for sharing
          </external-link>
        </li>
      </ul>
    </panel-section>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import createAbsoluteUrl from '@shared/lib/create-absolute-url';
import { findMetaContent, findMetaProperty } from '@shared/lib/find-meta';
import validate from '@shared/lib/validate-data';
import { schema, info } from './schema';

import ExternalLink from '@shared/components/external-link';
import PanelSection from '@shared/components/panel-section';
import PreviewIframe from '@shared/components/preview-iframe';
import PropertiesItemNew from '@shared/components/properties-item-new';
import PropertiesList from '@shared/components/properties-list';

export default {
  props: {
    headData: {
      type: Object,
      required: true,
    },
  },

  setup: props => {
    const validation = ref({});
    const hasRequiredData = computed(() => (
      (og.value.title || props.headData.head.title) &&
      (og.value.description || props.headData.headDescription)
    ));
    const og = computed(() => ({
      title: propertyValue('og:title'),
      description: propertyValue('og:description'),
      type: propertyValue('og:type'),
      image: propertyValue('og:image'),
      url: propertyValue('og:url'),
    }));
    const title = computed(() => (
      propertyValue('og:title') || props.headData.head.title || ''
    ));
    const description = computed(() => (og.value.description));
    const image = computed(() => (
      og.value.image !== undefined ? absoluteUrl(og.value.image) : og.value.image
    ));
    const previewUrl = computed(() => {
      const params = new URLSearchParams();
      params.set('title', og.value.title || title.value);
      params.set('description', description.value);
      params.set('image', image.value);
      params.set('url', props.headData.head.url);
      return `/previews/whatsapp/whatsapp.html?${ params }`;
    });
    const metaData = computed(() => ([
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
    ]));

    const absoluteUrl = url => createAbsoluteUrl(props.headData.head, url);
    const getTooltipInfo = term => (info[term] ?? {});
    const propertyValue = propName =>
      findMetaProperty(props.headData.head, propName) || findMetaContent(props.headData.head, propName);

    validate(metaData.value, schema)
      .then(result => validation.value = result);

    return {
      hasRequiredData,
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
  },
};
</script>

<style>
  .whatsapp__preview {
    max-width: var(--preview-width);
  }
</style>
