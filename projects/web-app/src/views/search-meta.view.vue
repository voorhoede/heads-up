<template>
  <panel-section title="Properties">
    <properties-list>
      <properties-item
        v-for="(item, index) in siteMetaData"
        :key="index"
        :term="item.term"
        :value="item.value"
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
</template>

<script>
import { computed } from 'vue';
import useHead from '@/composables/use-head';
import schema from '@shared/lib/schemas/search-meta-schema';
import createAbsoluteUrl from '@shared/lib/create-absolute-url';
import { findLinkHref, findMetaContent } from '@shared/lib/find-meta';
import PanelSection from '@shared/components/panel-section';
import ExternalLink from '@shared/components/external-link';
import PropertiesItem from '@shared/components/properties-item';
import PropertiesList from '@shared/components/properties-list';

export default {
  setup: () => {
    const headData = useHead().data;
    const siteMetaData = computed(() => {
      const { head } = headData.value;
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

    const absoluteUrl = url => createAbsoluteUrl(headData.value.head, url);

    return {
      absoluteUrl,
      siteMetaData,
      schema,
    };
  },
  components: {
    ExternalLink,
    PanelSection,
    PropertiesItem,
    PropertiesList,
  },
};
</script>
