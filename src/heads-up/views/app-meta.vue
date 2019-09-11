<template>
  <div>
     <panel-section title="Properties">
      <properties-list>
        
        <dt>Title</dt>
        <dd v-if="head.title">{{ head.title }}</dd>
        <dd v-else>
          <WarningIcon class="icon-warning"/>
          No title defined
        </dd>

        <dt>Language</dt>
        <dd v-if="head.lang">{{ head.lang }}</dd>
        <dd v-else>
          <WarningIcon class="icon-warning"/>
          No language defined
        </dd>
        
        <dt>Charset</dt>
        <dd v-if="charset">{{ charset }}</dd>
        <dd v-else>
          <WarningIcon class="icon-warning"/>
          No charset defined
        </dd>
        
        <dt>Viewport</dt>
        <dd v-if="viewport">{{ viewport }}</dd>
        <dd v-else>
          <WarningIcon class="icon-warning"/>
          No viewport defined
        </dd>
        
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
  import WarningIcon from '../assets/icons/warning.svg'

  export default {
    components: { ExternalLink, PanelSection, PropertiesList, ResourceList, WarningIcon },
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