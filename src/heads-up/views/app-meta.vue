<template>
  <div>
     <panel-section title="Properties">
      <properties-list>
        <dt>Title</dt><dd>{{ head.title }}</dd>
        <dt>Charset</dt><dd>{{ charset }}</dd>
        <dt>Viewport</dt><dd>{{ viewport }}</dd>
        <dt>Theme color</dt>
        <dd>
          <span
            v-if="themeColor"
            class="properties-list__color-swatch"
            :style="{ backgroundColor: themeColor }"
          />
          {{ themeColor }}
        </dd>
      </properties-list>
    </panel-section>

    <panel-section title="Favicons">
      <p v-if="!favicons.length">No favicons detected.</p>
      <properties-list>
        <template v-for="favicon in favicons">
          <dt :key="favicon.url">
            <div v-if="favicon.sizes">{{ favicon.sizes }}</div>
            <div v-if="favicon.type">{{ favicon.type }}</div>
          </dt>
          <dd :key="favicon.url">
            <img :src="favicon.url" />
          </dd>
        </template>
      </properties-list>
    </panel-section>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { PanelSection, PropertiesList } from '../components'
  import { findCharset, findMetaContent } from '../lib/find-meta'

  export default {
    components: { PanelSection, PropertiesList },
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
