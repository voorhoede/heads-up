<template>
  <div>
    <panel-section title="Preview">
      <iframe
        ref="iframe"
        :src="twitterUrl"
        :height="iframeHeight"
        width="100%"
        frameborder="0"
        scrolling="no"
        class="twitter__preview"
        @load="onResize"
      />
    </panel-section>

    <panel-section title="Properties">
      <properties-list>
        <dt>twitter:card</dt><dd>{{ twitter.card }}</dd>
        <dt>twitter:title</dt><dd>{{ twitter.title }}</dd>
        <dt>twitter:description</dt><dd>{{ twitter.description }}</dd>
        <dt>twitter:image</dt>
        <dd>
          <external-link :href="twitter.image">{{ twitter.image }}</external-link>
        </dd>
      </properties-list>
    </panel-section>
  </div>
</template>


<script>
  import { mapState } from 'vuex'
  import { ExternalLink, PanelSection, PropertiesList } from '../components'
  import { findMetaContent } from '../lib/find-meta'

  export default {
    components: { ExternalLink, PanelSection, PropertiesList },
    data() {
      return {
        iframeHeight: 'auto',
      }
    },
    computed: {
      ...mapState(['head']),
      title() {
        return this.twitter.title || this.head.title || ''
      },
      description() {
        return this.twitter.description || this.metaValue('description') || ''
      },
      twitter() {
        return {
          card: this.metaValue('twitter:card'),
          title: this.metaValue('twitter:title'),
          description: this.metaValue('twitter:description'),
          image: this.metaValue('twitter:image'),
        }
      },
      twitterUrl() {
        const params = new URLSearchParams()
        params.set('card', this.twitter.card)
        params.set('title', this.title)
        params.set('description', this.description)
        params.set('image', this.twitter.image)
        params.set('url', this.head.url)
        return `/twitter-preview.html?${params}`
      }
    },
    mounted() {
      window.addEventListener('resize', this.onResize)
    },
    destroyed() {
      window.removeEventListener('resize', this.onResize)
    },
    methods: {
      metaValue(metaName) {
        return findMetaContent(this.head, metaName)
      },
      onResize() {
        this.iframeHeight = parseInt(this.$refs.iframe.contentWindow.document.body.scrollHeight + 2) + 'px';
      }
    }
  }
</script>

<style>
  .twitter__preview {
    max-width: 521px;
    margin: 0;
    padding: 0;
    border: none;
  }
</style>
