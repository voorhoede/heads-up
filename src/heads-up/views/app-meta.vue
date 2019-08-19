<template>
  <div>
     <panel-section title="Properties">
      <properties-list>
        <dt>Title</dt><dd>{{ head.title }}</dd>
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

    <panel-section title="Favicons">
      <p v-if="!favicons.length">No favicons detected.</p>
      <properties-list>
        <template v-for="favicon in favicons">
          <dt :key="`${favicon.url}-key`">
            <div v-if="favicon.sizes">{{ favicon.sizes }}</div>
            <div v-if="favicon.type">{{ favicon.type }}</div>
          </dt>
          <dd :key="`${favicon.url}-value`">
            <external-link :href="favicon.url">
              <img alt="" :src="favicon.url" />
            </external-link>
          </dd>
        </template>
      </properties-list>
    </panel-section>

    <panel-section title="Resources">
      <ul>
        <li>
          <external-link href="https://htmlhead.dev/">Guide to HTML5 <code>&lt;head&gt;</code> elements</external-link>
        </li>
      </ul>
    </panel-section>

  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { ExternalLink, PanelSection, PropertiesList } from '../components'
  import { findCharset, findMetaContent } from '../lib/find-meta'

  export default {
    components: { ExternalLink, PanelSection, PropertiesList },
    computed: {
      ...mapState(['head']),
      charset() { return findCharset(this.head) },
      viewport() { return this.metaValue('viewport') },
      themeColor() { return this.metaValue('theme-color') },
      favicons() {
        return this.head.link
          .filter(link => link.rel === 'shortcut icon' || link.rel === 'icon')
          .map(favicon => {
            const url = favicon.href.startsWith('http')
              ? favicon.href
              : new URL(this.head.url).origin + favicon.href
            return { ...favicon, url }
          })
      }
    },
    methods: {
      metaValue(metaName) {
        return findMetaContent(this.head, metaName)
      }
    }
  }
</script>
