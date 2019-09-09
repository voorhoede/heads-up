<template>
  <div>
     <panel-section title="Properties">
      <properties-list>
        <dt><span v-tooltip="{
          content: '<p>The HTML Title element defines the document\'s title that is shown in a browser\'s title bar or a page\'s tab.</p><p><a rel=\'noopener\' target=\'_blank\' href=\'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title\'>More info</a></p>',
          trigger: 'click',
          offset: '15px' }">Title</span></dt><dd>{{ head.title }}</dd>
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
          <external-link href="https://htmlhead.dev/">Guide to HTML5 <code>&lt;head&gt;</code> elements</external-link>
        </li>
      </resource-list>
    </panel-section>

  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { ExternalLink, PanelSection, PropertiesList, ResourceList } from '../components'
  import { findCharset, findMetaContent } from '../lib/find-meta'

  export default {
    components: { ExternalLink, PanelSection, PropertiesList, ResourceList },
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
