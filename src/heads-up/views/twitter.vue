<template>
  <div>
    <panel-section title="Preview">
      <p v-if="!isValidCard">
        This page does not contain the required meta data to create a preview.
      </p>
      <p v-if="isValidCard && !isSupportedCard">
        Preview is not yet available for <code>{{ card }}</code> cards. <br />
        Card preview is currently supported for:
        <span v-html="supportedCards.map(v => `<code>${v}</code>`).join(', ')" />.
      </p>
      <template v-if="isValidCard && isSupportedCard">
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
        <p>Preview based on <external-link href="https://mobile.twitter.com/">mobile.twitter.com</external-link>.</p>
      </template>
    </panel-section>

    <panel-section title="Properties">
      <properties-list>
        <dt>twitter:card</dt><dd>{{ twitter.card }}</dd>
        <dt>twitter:title</dt><dd>{{ twitter.title }}</dd>
        <dt>twitter:description</dt><dd>{{ twitter.description }}</dd>
        <template v-if="twitter.image">
          <dt>twitter:image</dt>
          <dd>
            <external-link :href="absoluteUrl(twitter.image)">
              <img alt="" :src="absoluteUrl(twitter.image)" />
              <span>{{ twitter.image }}</span>
            </external-link>
          </dd>
        </template>
        <template v-for="username in ['creator', 'site']">
          <dt :key="`${username}-key`" v-if="twitter[username]">
            twitter:{{ username }}
          </dt>
          <dd :key="`${username}-value`" v-if="twitter[username]">
            <external-link :href="`https://twitter.com/${twitter[username].slice(1)}`">
              {{ twitter[username] }}
            </external-link>
          </dd>
        </template>

        <template v-if="og.type">
          <dt>og:type</dt><dd>{{ og.type }}</dd>
        </template>
        <template v-if="og.title">
          <dt>og:title</dt><dd>{{ og.title }}</dd>
        </template>
        <template v-if="og.description">
          <dt>og:description</dt><dd>{{ og.description }}</dd>
        </template>
        <template v-if="og.image">
          <dt>og:image</dt>
          <dd>
            <external-link :href="absoluteUrl(og.image)">
              <img alt="" :src="absoluteUrl(og.image)" />
              <span>{{ og.image }}</span>
            </external-link>
          </dd>
        </template>

      </properties-list>
    </panel-section>

    <panel-section title="Resources">
      <resource-list>
        <li>
          <external-link href="https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/abouts-cards.html">About Twitter cards</external-link>
        </li>
        <li>
          <external-link href="https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/markup">Twitter card markup</external-link>
        </li>
        <li>
          <external-link href="https://cards-dev.twitter.com/validator">Twitter card validator (requires Twitter login)</external-link>
        </li>
      </resource-list>
    </panel-section>
  </div>
</template>


<script>
  import { mapState } from 'vuex'
  import { ExternalLink, PanelSection, PropertiesList, ResourceList } from '../components'
  import { findMetaContent, findMetaProperty } from '../lib/find-meta'

  const validCards = ['summary', 'summary_large_image', 'app', 'player']
  export const supportedCards = ['summary', 'summary_large_image']

  export default {
    components: { ExternalLink, PanelSection, PropertiesList, ResourceList },
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
      supportedCards() { return supportedCards },
      isValidCard() { return validCards.includes(this.card) },
      isSupportedCard() { return supportedCards.includes(this.card) },
      title() {
        return this.twitter.title || this.og.title || this.head.title || ''
      },
      description() {
        return this.twitter.description || this.og.description || this.metaValue('description') || ''
      },
      image() {
        return this.absoluteUrl(this.twitter.image || this.og.image)
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
        return `/twitter-preview/twitter-preview.html?${params}`
      }
    },
    mounted() {
      window.addEventListener('resize', this.onResize)
    },
    destroyed() {
      window.removeEventListener('resize', this.onResize)
    },
    methods: {
      absoluteUrl(url) {
        if (!url) return
        return url.startsWith('http') ? url : new URL(this.head.url).origin + url
      },
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
    margin-bottom: 1em;
    padding: 0;
    border: none;
  }
</style>
