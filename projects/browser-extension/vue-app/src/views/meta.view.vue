<template>
  <div>
    <panel-section title="Properties">
      <properties-list>
        <properties-item
          v-for="(item, index) in appMetaData"
          :key="index"
          :term="item.term"
          :value="item.value"
          :type="item.type"
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
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PanelSection from '@shared/components/panel-section';
import ExternalLink from '@shared/components/external-link';
import PropertiesList from '@shared/components/properties-list';
import PropertiesItem from '@shared/components/properties-item';
import { findCharset, findMetaContent, findAttrs } from '@shared/lib/find-meta';
import schema from '@shared/lib/schemas/app-meta-schema';

export default {
  components: { ExternalLink, PanelSection, PropertiesItem, PropertiesList },
  data() {
    return {
      schema,
    };
  },
  computed: {
    ...mapState([ 'head' ]),
    appMetaData() {
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
    },
  },
};
</script>
