<template>
  <div class="open-graph">
    <panel-section title="Properties">
      <div v-if="!metaData.length" class="warning-message">
        <WarningIcon class="icon" />
        <p>No Open Graph properties detected.</p>
      </div>
      <properties-list v-else>
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
import createAbsoluteUrl from '@shared/lib/create-absolute-url';
import { findMetaContent, findMetaProperty } from '@shared/lib/find-meta';
import validate from '@shared/lib/validate-data';
import { schema, info } from './schema';

import ExternalLink from '@shared/components/external-link';
import PanelSection from '@shared/components/panel-section';
import PropertiesItemNew from '@shared/components/properties-item-new';
import PropertiesList from '@shared/components/properties-list';
import WarningIcon from '@shared/assets/icons/warning.svg';

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
    PropertiesItemNew,
    PropertiesList,
    WarningIcon,
  },
};
</script>
