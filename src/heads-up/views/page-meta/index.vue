<template>
  <div v-if="head && head.url">

    <section class="section">
      <h1 class="heading-default heading">Page meta</h1>
      <p><a :href="head.url">{{ head.url }}}</a></p>
    </section>

    <section class="section">
      <h2 class="heading-small heading">Properties</h2>

      <ul class="properties-list">
        <li>
          <h3 class="properties-list__title">Title</h3>
          <div class="properties-list__content">{{ head.title }}</div>
        </li>
        <li>
          <h3 class="properties-list__title">Charset</h3>
          <div class="properties-list__content">{{ charsetValue }}</div>
        </li>
        <li>
          <h3 class="properties-list__title">Viewport</h3>
          <div class="properties-list__content">{{ viewportValue }}</div>
        </li>
        <li>
          <h3 class="properties-list__title">Theme color</h3>
          <span class="properties-list__color-block" :style="{ backgroundColor: themeColorValue }"></span>
          <div class="properties-list__content">{{ themeColorValue }}</div>
        </li>
      </ul>
    </section>

    <section class="section">
      <h2 class="heading-small heading">Favicons</h2>
      <p v-if="!favicons.length">No favicons detected.</p>

      <ul class="properties-list">
        <li v-for="favicon in favicons" class="properties-list__item">
          <div class="properties-list__title">
            <div v-if="favicon.sizes">{{ favicon.sizes }}</div>
            <div v-if="favicon.type">{{ favicon.type }}</div>
          </div>
          <div class="properties-list__content">
            <img :src="favicon.url" />
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState({
        head: state => state.head,
      }),
      charsetValue() {
        const charsetMetaItem = this.head.meta.find(metaItem => Object.keys(metaItem).includes('charset'))
        return charsetMetaItem ? charsetMetaItem.charset : null;
      },
      viewportValue() {
        const viewportMetaItem = this.head.meta.find(metaItem => metaItem.name === 'viewport')
        return viewportMetaItem ? viewportMetaItem.content : null;
      },
      themeColorValue() {
        const themeColorMetaItem = this.head.meta.find(metaItem => metaItem.name === 'theme-color')
        return themeColorMetaItem ? themeColorMetaItem.content : null;
      },
      favicons() {
        return this.head.link
          .filter(linkItem => linkItem.rel === 'shortcut icon' || linkItem.rel === 'icon')
          .map(faviconItem => {
            const url = faviconItem.href.startsWith('http') ? faviconItem.href : new URL(this.head.url).origin + faviconItem.href
            return {
              ...faviconItem,
              url
            }
          })
      }
    }
  }
</script>
