<template>
  <div>
    <panel-section title="Properties">
      <properties-list>
        <properties-item
          key-name="title"
          :schema="appMetaSchema"
        >
          <template v-slot:default>
            Title
          </template>
          <template v-slot:value>
            {{ head.title }}
          </template>
        </properties-item>

        <properties-item
          key-name="lang"
          :schema="appMetaSchema"
        >
          <template v-slot:default>
            Language
          </template>
          <template v-slot:value>
            {{ head.lang }}
          </template>
        </properties-item>

        <properties-item
          key-name="charset"
          :schema="appMetaSchema"
        >
          <template v-slot:default>
            Charset
          </template>
          <template v-slot:value>
            {{ charset }}
          </template>
        </properties-item>

        <properties-item
          key-name="viewport"
          :schema="appMetaSchema"
        >
          <template v-slot:default>
            Viewport
          </template>
          <template v-slot:value>
            {{ viewport }}
          </template>
        </properties-item>

        <properties-item
          v-if="themeColor"
          key-name="viewport"
          :schema="appMetaSchema"
        >
          <template v-slot:default>
            Theme color
          </template>
          <template v-slot:value>
            <span
              v-if="themeColor"
              class="properties-list__color-swatch"
              :style="{ backgroundColor: themeColor }"
            />
            {{ themeColor }}
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
  import { appMetaSchema } from '../lib/schemas/app-meta-schema'
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
      charset() { return findCharset(this.head) },
      viewport() { return this.metaValue('viewport') },
      themeColor() { return this.metaValue('theme-color') }
    },
    methods: {
      metaValue(metaName) {
        return findMetaContent(this.head, metaName)
      }
    }
  }
</script>
