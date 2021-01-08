<template>
  <panel-section title="Properties">
    <properties-list>
      <properties-item
        v-for="(item, index) in siteMetaData"
        :key="index"
        :value="item.value"
        :term="item.keyName"
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
          keyName: 'title',
          title: 'title',
          value: head.title,
        },
        {
          keyName: 'description',
          title: 'description',
          value: findMetaContent(head, 'description'),
        },
        {
          keyName: 'search',
          title: 'search',
          isUrl: true,
          value: absoluteUrl(findLinkHref(head, 'search')),
        },
        {
          keyName: 'canonical',
          title: 'canonical',
          isUrl: true,
          value: findLinkHref(head, 'canonical'),
        },
        {
          keyName: 'robots',
          title: 'robots',
          value: findMetaContent(head, 'robots'),
        },
        {
          keyName: 'googlebot',
          title: 'googlebot',
          value: findMetaContent(head, 'googlebot'),
        },
        {
          keyName: 'google',
          title: 'google',
          value: findMetaContent(head, 'google'),
        },
        {
          keyName: 'google-site-verification',
          title: 'google-site-verification',
          value: findMetaContent(head, 'google-site-verification'),
        },
        {
          keyName: 'msvalidate.01',
          title: 'msvalidate.01',
          value: findMetaContent(head, 'msvalidate.01'),
        },
        {
          keyName: 'yandex-verification',
          title: 'yandex-verification',
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
