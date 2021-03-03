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
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue';
import createAbsoluteUrl from '@shared/lib/create-absolute-url';
import {
  findAdditionalTwitterData,
  findFavicons,
  findImageDimensions,
  findMetaContent,
  findMetaProperty
} from '@shared/lib/find-meta';
import getTheme from '@shared/lib/theme';
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
    const imageDimensions = ref({ height: undefined, width: undefined });
    const hasRequiredData = computed(() => (
      (og.value.title || props.headData.head.title) &&
      (og.value.description || headDescription.value)
    ));
    const og = computed(() => ({
      title: propertyValue('og:title'),
      type: propertyValue('og:type'),
      description: propertyValue('og:description'),
      site_name: propertyValue('og:site_name'),
      image: propertyValue('og:image'),
      url: propertyValue('og:url'),
    }));
    const headDescription = computed(() => (findMetaContent(props.headData.head, 'description')));
    const favicon = computed(() => (
      findFavicons(props.headData.head).length ? findFavicons(props.headData.head)[0].url : ''
    ));
    const additional = computed(() => ({
      favicon: favicon.value,
      twitterData: findAdditionalTwitterData(props.headData.head),
    }));
    const previewUrl = computed(() => {
      const params = new URLSearchParams();
      params.set('additionalData', JSON.stringify(additional.value.twitterData));
      params.set('description', og.value.description || headDescription.value);
      params.set('favicon', additional.value.favicon);
      params.set('image', og.value.image);
      params.set('imageIsBig', imageDimensions.value.height > 201 && imageDimensions.value.width > 201);
      params.set('siteName', og.value.site_name);
      params.set('theme', getTheme());
      params.set('title', og.value.title || props.headData.head.title || 'Weblink');
      params.set('url', props.headData.head.url);
      params.set('validImage', imageDimensions.value.height > 0 && imageDimensions.value.width > 0);
      return `/previews/slack/slack.html?${ params }`;
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
        term: 'og:description',
        value: og.value.description,
      },
      {
        term: 'og:site_name',
        value: og.value.site_name,
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
        term: 'og:url',
        value: absoluteUrl(og.value.url),
        type: 'link',
        required: true,
      },
      // Transform twitterData array and
      // spread objects into metaData array.
      ...additional.value.twitterData.map((item, index) => (
        Object.entries(item).map(entry => ({
          term: `twitter:${ entry[0] === 'label' ? entry[0] : 'data' }${ index + 1 }`,
          value: entry[1],
        }))
      )).flat(),
    ]));

    const absoluteUrl = url => createAbsoluteUrl(props.headData.head, url);
    const getImageDimensions = () => findImageDimensions(props.headData.head, 'og:image')
      .then(dimensions => imageDimensions.value = dimensions);
    const getTooltipInfo = term => (info[term] ?? {});
    const propertyValue = propName =>
      findMetaProperty(props.headData.head, propName) || findMetaContent(props.headData.head, propName);

    watch(() => og.value.image, (value, oldValue) => {
      if (value !== oldValue) {
        getImageDimensions();
      }
    });

    onMounted(() => getImageDimensions());

    validate(metaData.value, schema)
      .then(result => validation.value = result);

    return {
      hasRequiredData,
      og,
      headDescription,
      favicon,
      additional,
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
  .slack__preview {
    max-width: var(--preview-width);
  }
</style>
