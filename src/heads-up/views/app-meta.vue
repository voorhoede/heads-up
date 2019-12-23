<template>
  <div>
    <panel-section title="Properties">
      <properties-list>
        <properties-item
          v-for="item in appMetaData"
          :key="item.keyName"
          :value="item.value"
          :key-name="item.keyName"
          :schema="schema"
        >
          <template v-slot:default>
            {{ item.title }}
          </template>
          <template v-slot:value>
            <span
              v-if="item.keyName === 'theme-color' && item.value"
              :style="{ backgroundColor: item.value }"
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
  import { mapState } from 'vuex'
  import { ExternalLink, PanelSection, PropertiesItem, PropertiesList, ResourceList } from '../components'
  import { findCharset, findMetaContent } from '../lib/find-meta'
  import schema  from '../lib/schemas/app-meta-schema'

  export default {
    components: { ExternalLink, PanelSection, PropertiesItem, PropertiesList, ResourceList },
    computed: {
      ...mapState(['head']),
      appMetaData() {
        const { head } = this
        return [
          {
            keyName: 'title',
            title: 'Title',
            value: head.title
          },
          {
            keyName: 'lang',
            title: 'Language',
            value: head.lang
          },
          {
            keyName: 'charset',
            title: 'Charset',
            value: findCharset(head)
          },
          {
            keyName: 'viewport',
            title: 'Viewport',
            value: findMetaContent(head, 'viewport')
          },
          {
            keyName: 'description',
            title: 'Description',
            value: findMetaContent(head, 'description')
          },
          {
            keyName: 'theme-color',
            title: 'Theme color',
            value: findMetaContent(head, 'theme-color')
          }
        ]
      },
      schema() { return schema }
    }
  }
</script>
