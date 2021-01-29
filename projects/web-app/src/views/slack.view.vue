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
          :schema="schema"
          :required="item.required"
        >
        </properties-item>
      </properties-list>
    </panel-section>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue';
import useHead from '@/composables/use-head';
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
import schema from '@shared/lib/schemas/slack-schema';

export default {
  setup() {
    const headData = useHead().data;
    const imageDimensions = ref({ height: undefined, width: undefined });
    const hasRequiredData = computed(() => (
      (og.value.title || headData.value.head.title) &&
      (og.value.description || headDescription.value)
    ));
    const og = computed(() => ({
      title: propertyValue('og:title'),
      type: propertyValue('og:type'),
      description: propertyValue('og:description'),
      site_name: propertyValue('og:site_name'),
      image: absoluteUrl(propertyValue('og:image')),
      url: absoluteUrl(propertyValue('og:url')),
    }));
    const headDescription = computed(() => (findMetaContent(headData.value.head, 'description')));
    const favicon = computed(() => (
      findFavicons(headData.value.head).length ? findFavicons(headData.value.head)[0].url : ''
    ));
    const additional = computed(() => ({
      favicon: favicon.value,
      twitterData: findAdditionalTwitterData(headData.value.head),
    }));
    const themeClass = computed(() => getTheme() === 'dark' ? '-theme-with-dark-background' : '');
    const previewUrl = computed(() => {
      const params = new URLSearchParams();
      params.set('additionalData', JSON.stringify(additional.value.twitterData));
      params.set('description', og.value.description || headDescription.value);
      params.set('favicon', additional.value.favicon);
      params.set('image', og.value.image);
      params.set('imageIsBig', imageDimensions.value.height > 201 && imageDimensions.value.width > 201);
      params.set('siteName', og.value.site_name);
      params.set('theme', themeClass.value);
      params.set('title', og.value.title || headData.value.head.title || 'Weblink');
      params.set('url', headData.value.head.url);
      params.set('validImage', imageDimensions.value.height > 0 && imageDimensions.value.width > 0);
      return `/previews/slack/slack.html?${ params }`;
    });
    const slackProperties = computed(() => ([
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
        value: og.value.url,
        type: 'link',
        required: true,
      },
      // Transform twitterData array and
      // spread objects into slackProperties array.
      ...additional.value.twitterData.map((item, index) => (
        Object.entries(item).map(entry => ({
          term: `twitter:${ entry[0] === 'label' ? entry[0] : 'data' }${ index + 1 }`,
          value: entry[1],
        }))
      )).flat(),
    ]));

    const absoluteUrl = url => createAbsoluteUrl(headData.value.head, url);
    const getImageDimensions = () => findImageDimensions(headData.value.head, 'og:image')
      .then(dimensions => imageDimensions.value = dimensions);
    const propertyValue = propName =>
      findMetaProperty(headData.value.head, propName) || findMetaContent(headData.value.head, propName);

    watch(() => og.value.image, value => {
      if (value) {
        getImageDimensions();
      }
    });

    onMounted(() => getImageDimensions());

    return {
      hasRequiredData,
      og,
      headDescription,
      favicon,
      additional,
      themeClass,
      previewUrl,
      slackProperties,
      absoluteUrl,
      findImageDimensions,
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
  .slack__preview {
    max-width: var(--preview-width);
  }
</style>
