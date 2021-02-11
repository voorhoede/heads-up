<template>
  <div class="meta">
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
          :required="true"
        >
        </properties-item-new>
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
import { findCharset, findMetaContent } from '@shared/lib/find-meta';
import validateData from '@shared/lib/validate-data';
import info from '@shared/lib/schemas/app-meta-schema';
import schema from '@shared/lib/schemas/app-meta-validation';

import ExternalLink from '@shared/components/external-link';
import PanelSection from '@shared/components/panel-section';
import PropertiesItemNew from '@shared/components/properties-item-new';
import PropertiesList from '@shared/components/properties-list';

export default {
  setup: () => {
    const headData = useHead().data;
    const validation = ref({});
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

    const getTooltipInfo = term => (info[term].meta);
    const validate = async () => {
      validation.value = validateData(metaData.value, schema);
    };

    onMounted(() => validate());

    return {
      getTooltipInfo,
      metaData,
      validation,
    };
  },
  components: {
    ExternalLink,
    PanelSection,
    PropertiesList,
    PropertiesItemNew,
  },
};
</script>
