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
          <external-link href="https://www.linkedin.com/post-inspector/">
            LinkedIn Post Inspector
          </external-link>
        </li>
        <li>
          <external-link href="https://kinsta.com/blog/linkedin-debugger/">
            Previews on LinkedIn (Post Inspector Tips)
          </external-link>
        </li>
      </ul>
    </panel-section>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue';
import createAbsoluteUrl from '@shared/lib/create-absolute-url';
import { findImageDimensions, findMetaContent, findMetaProperty } from '@shared/lib/find-meta';
import getTheme from '@shared/lib/theme';
import schema from '@shared/lib/schemas/linkedin-schema';

import ExternalLink from '@shared/components/external-link';
import PanelSection from '@shared/components/panel-section';
import PreviewIframe from '@shared/components/preview-iframe';
import PropertiesItem from '@shared/components/properties-item';
import PropertiesList from '@shared/components/properties-list';

export default {
  props: {
    headData: {
      type: Object,
      required: true,
    },
  },

  setup: props => {
    const imageDimensions = ref({ height: undefined, width: undefined });
    const hasRequiredData = computed(() => (
      Boolean(og.value.title) &&
      Boolean(og.value.image) &&
      Boolean(og.value.description) &&
      Boolean(og.value.url)
    ));
    const og = computed(() => ({
      title: propertyValue('og:title'),
      type: propertyValue('og:type'),
      image: propertyValue('og:image'),
      description: propertyValue('og:description'),
      url: propertyValue('og:url'),
    }));
    const themeClass = computed(() => getTheme() === 'dark' ? '-theme-with-dark-background' : '');
    const previewUrl = computed(() => {
      const params = new URLSearchParams();
      params.set('title', og.value.title);
      params.set('image', og.value.image);
      params.set('description', og.value.description);
      params.set('url', og.value.url);
      params.set('theme', themeClass.value);
      params.set('imageIsBig', imageDimensions.value.height >= 400 && imageDimensions.value.width >= 400);
      return `/previews/linkedin/linkedin.html?${ params }`;
    });
    const metaData = computed(() => ([
      {
        term: 'og:title',
        value: og.value.title,
        required: true,
      },
      {
        term: 'og:type',
        value: og.value.type,
        required: true,
      },
      {
        term: 'og:image',
        value: og.value.image,
        image: {
          href: og.value.image,
          url: absoluteUrl(og.value.image),
        },
        type: 'image',
        required: true,
      },
      {
        term: 'og:description',
        value: og.value.description,
      },
      {
        term: 'og:url',
        value: og.value.url,
        type: 'link',
        required: true,
      },
    ]));

    const absoluteUrl = url => createAbsoluteUrl(props.headData.head, url);
    const getImageDimensions = () => findImageDimensions(props.headData.head, 'og:image')
      .then(dimensions => imageDimensions.value = dimensions);
    const propertyValue = propName =>
      findMetaProperty(props.headData.head, propName) || findMetaContent(props.headData.head, propName);

    watch(() => og.value.image, value => {
      if (value) {
        getImageDimensions();
      }
    });

    onMounted(() => getImageDimensions());

    return {
      hasRequiredData,
      og,
      themeClass,
      previewUrl,
      metaData,
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
  .linkedin__preview {
    max-width: var(--preview-width);
  }
</style>
