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
import { mapState } from 'vuex';
import { findCharset, findMetaContent } from '@shared/lib/find-meta';
import validateData from '@shared/lib/validate-data';
import { schema, info } from '@shared/lib/schemas/app-meta-schema';

import ExternalLink from '@shared/components/external-link';
import PanelSection from '@shared/components/panel-section';
import PropertiesItemNew from '@shared/components/properties-item-new';
import PropertiesList from '@shared/components/properties-list';

export default {
  components: { ExternalLink, PanelSection, PropertiesItemNew, PropertiesList },
  data() {
    return {
      validation: {},
    };
  },
  mounted() {
    this.validation = validateData(this.metaData, schema);
  },
  computed: {
    ...mapState([ 'head' ]),
    metaData() {
      const { head } = this;
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
    },
  },
  methods: {
    getTooltipInfo(term) {
      return info[term] ?? {};
    },
  },
};
</script>
