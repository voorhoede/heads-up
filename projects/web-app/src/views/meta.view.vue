<template>
  <panel-section title="Properties">
    <properties-list>
      <properties-item
        v-for="item in siteMetadata"
        :key="item.keyName"
        :value="item.value"
        :key-name="item.keyName"
        :attrs="item.attrs"
        :schema="schema"
        :refresh-on="siteMetadata"
      >
        <template #default>
          {{ item.title }}
        </template>
        <template #value>
          <span
            v-if="item.keyName === 'theme-color' && item.value"
            :style="{ backgroundColor: item.value }"
          />
        </template>
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
import ExternalLink from '@shared/components/external-link.vue';
import PropertiesList from '@shared/components/properties-list.vue';
import PropertiesItem from '@shared/components/properties-item.vue';

export default {
  setup: () => {
    const headData = useHead().data;
    const siteMetadata = computed(() => {
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
      headData,
      siteMetadata,
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
