<template>
  <div>
     <panel-section title="Properties">
      <properties-list>
        <dt>
          <tool-tip>
            <template v-slot:default>
              Title
            </template>

            <template v-slot:info>
              <p>The HTML Title element  defines the document's title that is shown in a browser's title bar or a page's tab. It only contains text; tags within the element are ignored.</p>
            </template>

            <template v-slot:link>
              <external-link href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title">More info</external-link>
            </template>
          </tool-tip>
        </dt><dd>{{ head.title }}</dd>
        <dt>Language</dt>
        <dd>
          {{ head.lang }}
        </dd>
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
          <external-link href="https://htmlhead.dev/">Guide to HTML5 <code>&lt;head&gt;</code> elements</external-link>
        </li>
      </resource-list>
    </panel-section>

  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { ExternalLink, PanelSection, PropertiesList, ResourceList, ToolTip } from '../components'
  import { findCharset, findMetaContent } from '../lib/find-meta'

  export default {
    components: { ExternalLink, PanelSection, PropertiesList, ResourceList, ToolTip },
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
