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
  import { findCharset, findMetaContent, findAttrs } from '../lib/find-meta'
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
            title: 'title',
            value: head.title
          },
          {
            keyName: 'lang',
            title: 'language',
            value: head.lang
          },
          {
            keyName: 'charset',
            title: 'charset',
            value: findCharset(head),
            attrs: findAttrs(head, 'charset') || findAttrs(head, 'http-equiv')
          },
          {
            keyName: 'viewport',
            title: 'viewport',
            value: findMetaContent(head, 'viewport')
          },
          {
            keyName: 'description',
            title: 'description',
            value: findMetaContent(head, 'description')
          },
          {
            keyName: 'theme-color',
            title: 'theme-color',
            value: findMetaContent(head, 'theme-color')
          }
        ]
      },
      schema() { return schema }
    }
  }
</script>
