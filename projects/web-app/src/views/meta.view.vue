<template>
  <div class="meta">
    <panel-section title="Properties">
      <properties-list>
        <properties-item
          v-for="item in metaData"
          :key="item.term"
          :term="item.term"
          :value="item.value"
          :type="item.type"
          :attrs="item.attrs"
          :tooltip="tooltip"
          :required="true"
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
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import useHead from '@/composables/use-head';
import { findCharset, findMetaContent, findAttrs } from '@shared/lib/find-meta';
import validateData from '@shared/lib/validate-data';
import schema from '@shared/lib/schemas/app-meta-validation';

import ExternalLink from '@shared/components/external-link';
import PanelSection from '@shared/components/panel-section';
import PropertiesList from '@shared/components/properties-list';
import PropertiesItem from '@shared/components/properties-item';

export default {
  setup: () => {
    const headData = useHead().data;
    const tooltip = ref({});
    const metaData = computed(() => {
      const { head } = headData.value;
      return [
        {
          term: 'title',
          value: head.title,
        },
        {
          term: 'lang',
          value: head.lang,
        },
        {
          term: 'charset',
          value: findCharset(head),
          attrs: findAttrs(head, 'charset') || findAttrs(head, 'http-equiv'),
        },
        {
          term: 'viewport',
          value: findMetaContent(head, 'viewport'),
        },
        {
          term: 'description',
          value: findMetaContent(head, 'description'),
        },
        {
          term: 'theme-color',
          value: findMetaContent(head, 'theme-color'),
          type: 'color',
        },
      ];
    });

    const validate = async () => {
      tooltip.value = validateData(metaData.value, schema);
    };

    onMounted(() => validate());

    return {
      metaData,
      tooltip,
    };
  },
  components: {
    ExternalLink,
    PanelSection,
    PropertiesList,
    PropertiesItem,
  },
};
</script>
