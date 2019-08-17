<template>
  <div>
    <iframe :src="twitterUrl" scrolling="no" width="100%" :height="iframeHeight" frameborder="0" ref="iframe" @load="onResize"></iframe>
  </div>
</template>


<script>
  import { mapState } from 'vuex'

  export default {
    data() {
      return {
        iframeHeight: 'auto'
      }
    },
    mounted() {
      window.addEventListener('resize', this.onResize)
    },
    destroyed() {
      window.removeEventListener('resize', this.onResize)
    },
    computed: {
      ...mapState(['head']),
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
      },
      twitterUrl() {
        const twitterTitleMetaItem = this.head.meta.find(metaItem => metaItem.name === 'twitter:title')
        const twitterTitle = twitterTitleMetaItem ? twitterTitleMetaItem.content : ''
        const twitterDescrpitionMetaItem = this.head.meta.find(metaItem => metaItem.name === 'twitter:description')
        const twitterDescription = twitterDescrpitionMetaItem ? twitterDescrpitionMetaItem.content : ''
        const twitterImageItem = this.head.meta.find(metaItem => metaItem.name === 'twitter:image')
        const twitterImage = twitterImageItem ? twitterImageItem.content : ''
        const twitterTypeItem = this.head.meta.find(metaItem => metaItem.name === 'twitter:image')
        const twitterType = twitterTypeItem ? twitterTypeItem.content : ''

        return `/twitter-preview.html?title=${twitterTitle}&description=${twitterDescription}&image=${twitterImage}&url=${this.head.url}&type=${twitterType}`
      }
    },
    methods: {
      onResize() {
        this.iframeHeight = parseInt(this.$refs.iframe.contentWindow.document.body.scrollHeight + 2) + 'px';
      }
    }
  }
</script>
