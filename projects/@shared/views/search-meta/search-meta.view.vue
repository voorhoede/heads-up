<template>
  <div class="search-meta">
    <panel-section title="Properties">
      <properties-list>
        <properties-item-new
          v-for="item in metaData"
          :key="item.term"
          :term="item.term"
          :value="item.value"
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
          <external-link href="https://htmlhead.dev/#meta">
            Guide to HTML5 <code>&lt;head&gt;</code> elements
          </external-link>
        </li>
        <li>
          <external-link href="https://support.google.com/webmasters/answer/79812">
            Special tags that Google understands
          </external-link>
        </li>
      </ul>
    </panel-section>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import createAbsoluteUrl from '@shared/lib/create-absolute-url';
import { findLinkHref, findMetaContent } from '@shared/lib/find-meta';
import validate from '@shared/lib/validate-data';
import { schema, info } from './schema';

import PanelSection from '@shared/components/panel-section';
import ExternalLink from '@shared/components/external-link';
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
    const metaData = computed(() => {
      const { head } = props.headData;
      return [
        {
          term: 'title',
          value: head.title,
          required: true,
        },
        {
          term: 'description',
          value: findMetaContent(head, 'description'),
          required: true,
        },
        {
          term: 'search',
          value: absoluteUrl(findLinkHref(head, 'search')),
          type: 'link',
        },
        {
          term: 'canonical',
          value: findLinkHref(head, 'canonical'),
          type: 'link',
        },
        {
          term: 'robots',
          value: findMetaContent(head, 'robots'),
          required: true,
        },
        {
          term: 'googlebot',
          value: findMetaContent(head, 'googlebot'),
        },
        {
          term: 'google',
          value: findMetaContent(head, 'google'),
        },
        {
          term: 'google-site-verification',
          value: findMetaContent(head, 'google-site-verification'),
        },
        {
          term: 'msvalidate.01',
          value: findMetaContent(head, 'msvalidate.01'),
        },
        {
          term: 'yandex-verification',
          value: findMetaContent(head, 'yandex-verification'),
        },
      ];
    });

    const absoluteUrl = url => createAbsoluteUrl(props.headData.head, url);
    const getTooltipInfo = term => (info[term] ?? {});

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
  },
};
</script>
