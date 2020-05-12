<template>
  <div>
    <panel-section title="Properties">
      <properties-list>
        <properties-item
          v-for="item in searchMetaData"
          :key="item.keyName"
          :value="item.value"
          :key-name="item.keyName"
          :schema="schema"
        >
          <template v-slot:default>
            {{ item.title }}
          </template>
        </properties-item>
      </properties-list>
    </panel-section>

    <panel-section title="Resources">
      <resource-list>
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
      </resource-list>
    </panel-section>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { ExternalLink, PanelSection, PropertiesItem, PropertiesList, ResourceList } from '../components'
  import { findLinkHref, findMetaContent } from '../lib/find-meta'
  import schema from '../lib/schemas/search-meta-schema'

  export default {
    components: { ExternalLink, PanelSection, PropertiesItem, PropertiesList, ResourceList },
    computed: {
      ...mapState(['head']),
      searchMetaData() {
        return [
          {
            keyName: 'title',
            title: 'title',
            value: this.head.title
          },
          {
            keyName: 'description',
            title: 'description',
            value: findMetaContent(this.head, 'description')
          },
          {
            keyName: 'search',
            title: 'search',
            value: findLinkHref(this.head, 'search'),
          },
          {
            keyName: 'canonical',
            title: 'canonical',
            value: findLinkHref(this.head, 'canonical'),
          },
          {
            keyName: 'robots',
            title: 'robots',
            value: findMetaContent(this.head, 'robots')
          },
          {
            keyName: 'googlebot',
            title: 'googlebot',
            value: findMetaContent(this.head, 'googlebot')
          },
          {
            keyName: 'google',
            title: 'google',
            value: findMetaContent(this.head, 'google')
          },
          {
            keyName: 'google-site-verification',
            title: 'google-site-verification',
            value: findMetaContent(this.head, 'google-site-verification')
          },
          {
            keyName: 'msvalidate.01',
            title: 'msvalidate.01',
            value: findMetaContent(this.head, 'msvalidate.01')
          },
          {
            keyName: 'yandex-verification',
            title: 'yandex-verification',
            value: findMetaContent(this.head, 'yandex-verification')
          },
        ]
      },
      schema() { return schema }
    },
  }
</script>
