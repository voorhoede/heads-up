<template>
  <div class="slack">
    <panel-section title="Preview">
      <p v-if="!hasRequiredData">
        This page does not contain the necessary metadata to create a preview.
      </p>
      <slack-preview
        v-else
        class="slack__preview"
        :data="previewData"
      />
      <p v-if="hasRequiredData">
        Preview based on <external-link href="https://slack.com/">slack.com</external-link>.
      </p>
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
          :tooltip="getTooltipInfo(item.term)"
          :validation="validation"
          :required="item.required"
        >
        </properties-item>
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
import validate from '@shared/lib/validate';
import { schema, info } from './schema';

import ExternalLink from '@shared/components/external-link';
import PanelSection from '@shared/components/panel-section';
import PropertiesItem from '@shared/components/properties-item';
import PropertiesList from '@shared/components/properties-list';
import SlackPreview from '@shared/components/rich-previews/slack-preview';

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
    const previewData = computed(() => ({
      additionalData: JSON.stringify(additional.value.twitterData),
      description: og.value.description || headDescription.value,
      favicon: additional.value.favicon,
      image: og.value.image,
      imageIsBig: imageDimensions.value.height > 201 && imageDimensions.value.width > 201,
      siteName: og.value.site_name,
      theme: getTheme(),
      title: og.value.title || props.headData.head.title || 'Weblink',
      url: props.headData.head.url,
      validImage: imageDimensions.value.height > 0 && imageDimensions.value.width > 0,
    }));
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
      previewData,
      metaData,
      getTooltipInfo,
      validation,
    };
  },
  components: {
    ExternalLink,
    PanelSection,
    PropertiesItem,
    PropertiesList,
    SlackPreview,
  },
};
</script>

<style>
  .slack__preview {
    max-width: var(--preview-width);
  }
</style>
