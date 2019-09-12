<template>
  <div>
    <panel-section title="Properties">
      <properties-list>
        <dt>
          <app-tooltip>
            <template v-slot:default>
              Title
            </template>

            <template v-slot:info>
              <p>The HTML Title element  defines the document's title that is shown in a browser's title bar or a page's tab. It only contains text; tags within the element are ignored.</p>
            </template>
          </app-tooltip>
        </dt>
        <dd v-if="head.title">
          {{ head.title }}
        </dd>
        <dd v-else>
          <WarningIcon class="icon-warning" />
          No title defined
        </dd>

        <dt>Language</dt>
        <dd v-if="lang">
          {{ lang }}
        </dd>
        <dd v-else>
          <WarningIcon class="icon-warning" />
          <code>html</code> lang attribute not defined or invalid
        </dd>
        
        <dt>Charset</dt>
        <dd>
          <template v-if="charset.value">
            {{ charset.value }}
          </template>
          <template v-if="charset.hint">
            <WarningIcon class="icon-warning" />
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span v-html="charset.hint" />
          </template>
        </dd>
        
        <dt>
          <app-tooltip>
            <template v-slot:default>
              Viewport
            </template>

            <template v-slot:info>
              <p>The browser's viewport is the area of the window in which web content can be seen. This is often not the same size as the rendered page, in which case the browser provides scrollbars for the user to scroll around and access all the content.</p>
            </template>
          </app-tooltip>
        </dt>
        <dd v-if="viewport">
          {{ viewport }}
        </dd>
        <dd v-else>
          <WarningIcon class="icon-warning" />
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
  import { AppTooltip, ExternalLink, PanelSection, PropertiesList, ResourceList } from '../components'
  import { findCharset, findMetaContent } from '../lib/find-meta'
  import { validateCharset, validateLang } from '../lib/validate-meta'
  import WarningIcon from '../assets/icons/warning.svg'

  export default {
    components: { AppTooltip, ExternalLink, PanelSection, PropertiesList, ResourceList, WarningIcon },
    computed: {
      ...mapState(['head']),
      charset() { 
        const value = findCharset(this.head)
        return validateCharset(value) 
      },
      lang() {
        return validateLang(this.head.lang)
      },
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