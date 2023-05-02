<template>
  <div class="linkedin">
    <panel-section title="Preview">
      <p v-if="!hasRequiredData">
        This page does not contain the necessary metadata to create a preview.
      </p>
      <linkedin-preview
        v-else
        class="linkedin__preview"
        :data="previewData"
      />
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
        <li>
          <external-link href="https://www.linkedin.com/help/linkedin/answer/46687/making-your-website-shareable-on-linkedin?lang=en">
            Making Your Website Shareable on LinkedIn
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
import validate from '@shared/lib/validate';
import { schema, info } from './schema';

import ExternalLink from '@shared/components/external-link';
import LinkedinPreview from '@shared/components/rich-previews/linkedin-preview';
import PanelSection from '@shared/components/panel-section';
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
    const validation = ref({});
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
    const previewData = computed(() => ({
      title: og.value.title,
      image: og.value.image,
      description: og.value.description,
      url: og.value.url,
      theme: getTheme(),
      imageIsBig: imageDimensions.value.height >= 400 && imageDimensions.value.width >= 400,
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
      previewData,
      metaData,
      getTooltipInfo,
      validation,
    };
  },
  components: {
    ExternalLink,
    LinkedinPreview,
    PanelSection,
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
