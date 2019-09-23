<template>
  <div>
    <panel-section title="Properties">
      <properties-list>
        <properties-item
          v-for="item in appMetaData"
          :key="item.keyName"
          :value="item.value"
          :key-name="item.keyName"
          :schema="item.schema"
        >
          <template v-slot:default>
            {{ item.title }}
          </template>
          <template v-slot:value>
            <span
              v-if="item.keyName === 'theme-color' && themeColor"
              :style="{ backgroundColor: themeColor }"
            />
          </template>
        </properties-item>
      </properties-list>
    </panel-section>

    <panel-section title="Resources">
      <resource-list>
        <li>
          <external-link href="https://htmlhead.dev/">
            Guide to HTML5 <code>&lt;head&gt;</code> elements
          </external-link>
        </li>
      </resource-list>
    </panel-section>
  </div>
</template>

<script>
  import appMetaSchema  from '../lib/schemas/app-meta-schema'
  import { mapState } from 'vuex'
  import { ExternalLink, PanelSection, PropertiesItem, PropertiesList, ResourceList } from '../components'
  import { findCharset, findMetaContent } from '../lib/find-meta'

  export default {
    components: { ExternalLink, PanelSection, PropertiesItem, PropertiesList, ResourceList },
    data() {
      return {
        appMetaSchema
      }
    },
    computed: {
      ...mapState(['head']),
      themeColor() {
        return this.metaValue('theme-color')
      },
      appMetaData() {
        return [
          {
            keyName: 'title',
            title: 'Title',
            value: this.head.title,
            schema: appMetaSchema
          },
          {
            keyName: 'lang',
            title: 'Language',
            value: this.head.lang,
            schema: appMetaSchema
          },
          {
            keyName: 'charset',
            title: 'Charset',
            value: findCharset(this.head),
            schema: appMetaSchema
          },
          {
            keyName: 'viewport',
            title: 'Viewport',
            value: this.metaValue('viewport'),
            schema: appMetaSchema
          },
          {
            keyName: 'theme-color',
            title: 'Theme color',
            value: this.metaValue('theme-color'),
            schema: appMetaSchema
          }
        ]
      }
    },
    methods: {
      metaValue(metaName) {
        return findMetaContent(this.head, metaName)
      }
    }
  }
</script>
