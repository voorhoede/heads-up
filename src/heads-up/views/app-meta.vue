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

        <dt>Language</dt><dd>{{ head.lang }}</dd>
        <dt>Charset</dt><dd>{{ charset }}</dd>
        <dt>Viewport</dt><dd>{{ viewport }}</dd>
        <template v-if="themeColor">
          <dt>Theme color</dt>
          <dd>
            <span
              v-if="themeColor"
              class="properties-list__color-swatch"
              :style="{ backgroundColor: themeColor }"
            />
            {{ themeColor }}
          </dd>
        </template>
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
