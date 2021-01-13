<template>
  <div>
    <panel-section title="Properties">
      <properties-list>
        <properties-item
          v-for="(item, index) in searchMetaData"
          :key="index"
          :term="item.term"
          :value="item.value"
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
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PanelSection from '@shared/components/panel-section';
import ExternalLink from '@shared/components/external-link';
import PropertiesList from '@shared/components/properties-list';
import PropertiesItem from '@shared/components/properties-item';
import { findLinkHref, findMetaContent } from '@shared/lib/find-meta';
import schema from '@shared/lib/schemas/search-meta-schema';

export default {
  components: { ExternalLink, PanelSection, PropertiesItem, PropertiesList },
  computed: {
    ...mapState([ 'head' ]),
    searchMetaData() {
      const { head } = this;
      return [
        {
          term: 'title',
          value: head.title,
        },
        {
          term: 'description',
          value: findMetaContent(head, 'description'),
        },
        {
          term: 'search',
          isUrl: true,
          value: findLinkHref(head, 'search'),
        },
        {
          term: 'canonical',
          isUrl: true,
          value: findLinkHref(head, 'canonical'),
        },
        {
          term: 'robots',
          value: findMetaContent(head, 'robots'),
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
    },
    schema() { return schema; },
  },
};
</script>
