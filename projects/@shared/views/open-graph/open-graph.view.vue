<template>
  <div class="open-graph">
    <panel-section title="Properties">
      <div v-if="!metaData.length" class="warning-message">
        <app-icon name="warning" />
        <p>No Open Graph properties detected.</p>
      </div>
      <properties-list v-else>
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
          <external-link href="https://ogp.me/">
            The Open Graph Protocol
          </external-link>
        </li>
      </ul>
    </panel-section>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { schema, info } from './schema';
import { findMetaContent, findMetaProperty } from '@shared/lib/find-meta';
import createAbsoluteUrl from '@shared/lib/create-absolute-url';
import validate from '@shared/lib/validate';

import AppIcon from '@shared/components/app-icon';
import ExternalLink from '@shared/components/external-link';
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
    const og = computed(() => ({
      title: propertyValue('og:title'),
      type: propertyValue('og:type'),
      image: propertyValue('og:image'),
      url: propertyValue('og:url'),
    }));
    const requiredMetaData = computed(() => [
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
        required: true,
      },
    ]);
    const headMetaData = computed(() => {
      const { meta } = props.headData.head;
      return meta
        .filter(meta =>
          meta.property && meta.property.startsWith('og:') ||
          meta.name && meta.name.startsWith('og:')
        )
        .map(meta => ({
          term: meta.property || meta.name,
          type: !Object.keys(info).includes(meta.property || meta.name)
            ? 'unsupported'
            : 'string',
          value: meta.content,
        }));
    });
    const metaData = computed(() => ([
      ...requiredMetaData.value,
      ...headMetaData.value.filter(item => !requiredMetaData.value.find(req => req.term === item.term)),
    ]));

    const absoluteUrl = url => createAbsoluteUrl(props.headData.head, url);
    const getTooltipInfo = term => (info[term] ?? {});
    const propertyValue = propName =>
      findMetaProperty(props.headData.head, propName) || findMetaContent(props.headData.head, propName);

    validate(metaData.value, schema)
      .then(result => validation.value = result);

    return {
      getTooltipInfo,
      metaData,
      validation,
    };
  },
  components: {
    ExternalLink,
    PanelSection,
    PropertiesItem,
    PropertiesList,
    AppIcon,
  },
};
</script>
