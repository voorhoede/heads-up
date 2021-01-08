<template>
  <panel-section title="Properties">
    <properties-list>
      <properties-item
        v-for="(item, index) in siteMetaData"
        :key="index"
        :value="item.value"
        :term="item.keyName"
        :schema="schema"
      >
      </properties-item>
    </properties-list>
  </panel-section>
  <panel-section title="Resources">
    <ul class="resource-list">
      <li>
        <external-link href="https://htmlhead.dev/">
          Guide to HTML5 <code>&lt;head&gt;</code> elements
        </external-link>
      </li>
    </ul>
  </panel-section>
</template>

<script>
import { computed } from 'vue';
import useHead from '@/composables/use-head';
import schema  from '@shared/lib/schemas/app-meta-schema';
import { findCharset, findMetaContent, findAttrs } from '@shared/lib/find-meta';
import PanelSection from '@shared/components/panel-section';
import ExternalLink from '@shared/components/external-link';
import PropertiesList from '@shared/components/properties-list';
import PropertiesItem from '@shared/components/properties-item';

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
          keyName: 'lang',
          title: 'language',
          value: head.lang,
        },
        {
          keyName: 'charset',
          title: 'charset',
          value: findCharset(head),
          attrs: findAttrs(head, 'charset') || findAttrs(head, 'http-equiv'),
        },
        {
          keyName: 'viewport',
          title: 'viewport',
          value: findMetaContent(head, 'viewport'),
        },
        {
          keyName: 'description',
          title: 'description',
          value: findMetaContent(head, 'description'),
        },
        {
          keyName: 'theme-color',
          title: 'theme-color',
          value: findMetaContent(head, 'theme-color'),
        },
      ];
    });

    return {
      siteMetaData,
      schema,
    };
  },
  components: {
    PanelSection,
    ExternalLink,
    PropertiesList,
    PropertiesItem,
  },
};
</script>
