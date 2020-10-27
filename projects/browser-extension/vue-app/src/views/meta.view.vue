<template>
  <div>
    <panel-section title="Properties">
      <properties-list>
        <properties-item
          v-for="item in appMetaData"
          :key="item.keyName"
          :value="item.value"
          :key-name="item.keyName"
          :attrs="item.attrs"
          :schema="schema"
          :refresh-on="appMetaData"
        >
          <template #default>
            {{ item.title }}
          </template>
          <template v-if="item.keyName === 'theme-color' && item.value" #value>
            <span :style="{ backgroundColor: item.value }" />
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
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PanelSection from '@shared/components/panel-section';
import ExternalLink from '@shared/components/external-link';
import PropertiesList from '@shared/components/properties-list';
import PropertiesItem from '@shared/components/properties-item';
import { findCharset, findMetaContent, findAttrs } from '@shared/lib/find-meta';
import schema  from '@shared/lib/schemas/app-meta-schema';

export default {
  components: { ExternalLink, PanelSection, PropertiesItem, PropertiesList },
  computed: {
    ...mapState([ 'head' ]),
    appMetaData() {
      const { head } = this;
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
    },
    schema() { return schema; },
  },
};
</script>
