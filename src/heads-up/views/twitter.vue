<template>
  <div>
    <panel-section title="Preview">
      <iframe
        v-if="card"
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
        <template v-for="username in ['creator', 'site']">
          <dt :key="username" v-if="twitter[username]">
            twitter:{{ username }}
          </dt>
          <dd :key="username" v-if="twitter[username]">
            <external-link :href="`https://twitter.com/${twitter[username].slice(1)}`">
              {{ twitter[username] }}
            </external-link>
          </dd>
        </template>

        <dt>og:type</dt><dd>{{ og.type }}</dd>
        <dt>og:title</dt><dd>{{ og.title }}</dd>
        <dt>og:description</dt><dd>{{ og.description }}</dd>
        <dt>og:image</dt>
        <dd>
          <external-link :href="og.image">{{ og.image }}</external-link>
        </dd>

      </properties-list>
    </panel-section>

    <panel-section title="Resources">
      <ul>
        <li>
          <external-link href="https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/abouts-cards.html">About Twitter cards</external-link>
        </li>
        <li>
          <external-link href="https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/markup">Twitter card markup</external-link>
        </li>
        <li>
          <external-link href="https://cards-dev.twitter.com/validator">Twitter card validator (requires Twitter login)</external-link>
        </li>
      </ul>
    </panel-section>
  </div>
</template>


<script>
  import { mapState } from 'vuex'
  import { ExternalLink, PanelSection, PropertiesList } from '../components'
  import { findMetaContent, findMetaProperty } from '../lib/find-meta'

  export default {
    components: { ExternalLink, PanelSection, PropertiesList },
    data() {
      return {
        iframeHeight: 'auto',
      }
    },
    computed: {
      ...mapState(['head']),
      card() {
        /**
         * If an og:type, og:title and og:description exist in the markup
         * but twitter:card is absent, then a summary card may be rendered.
         * @see https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/markup#overview-of-all-twitter-card-tags
         */
        if (this.twitter.card) {
          return this.twitter.card
        } else if (this.og.type && this.og.title && this.og.description) {
          return 'summary'
        }
      },
      title() {
        return this.twitter.title || this.og.title || this.head.title || ''
      },
      description() {
        return this.twitter.description || this.og.description || this.metaValue('description') || ''
      },
      image() {
        return this.twitter.image || this.og.image
      },
      og() {
        return {
          type: this.propertyValue('og:type'),
          title: this.propertyValue('og:title'),
          description: this.propertyValue('og:description'),
          image: this.propertyValue('og:image'),
        }
      },
      twitter() {
        return {
          card: this.metaValue('twitter:card'),
          title: this.metaValue('twitter:title'),
          description: this.metaValue('twitter:description'),
          image: this.metaValue('twitter:image'),
          site: this.metaValue('twitter:site'),
          creator: this.metaValue('twitter:creator'),
        }
      },
      twitterUrl() {
        const params = new URLSearchParams()
        params.set('card', this.twitter.card)
        params.set('title', this.title)
        params.set('description', this.description)
        params.set('image', this.image)
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
      propertyValue(propName) {
        return findMetaProperty(this.head, propName)
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
