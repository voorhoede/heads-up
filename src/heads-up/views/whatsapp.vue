<template>
  <div>
    <panel-section title="Preview">
      <p v-if="!isValidCard">
        This page does not contain the required meta data to create a preview.
      </p>
      <p v-if="isValidCard && !isSupportedCard">
        Preview is not yet available for <code>{{ card }}</code> cards. <br>
        Card preview is currently supported for:
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span v-html="supportedCards.map(v => `<code>${v}</code>`).join(', ')" />.
      </p>
      <figure v-if="isValidCard && isSupportedCard">
        <iframe
          title="whatsapp preview"
          ref="iframe"
          :src="whatsappUrl"
          :height="iframeHeight"
          width="100%"
           frameborder="0"
          scrolling="no"
          class="whatsapp__preview"
          @load="onResize"
        />
        <figcaption class="whatsapp__preview-caption">
          Preview based on <external-link href="https://mobile.whatsapp.com/">
            mobile.whatsapp.com
          </external-link>.
        </figcaption>
      </figure>
    </panel-section>

    <panel-section title="Properties">
      <properties-list>
      <dl>
        
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
              <img
                alt=""
                :src="absoluteUrl(og.image)"
              >
              <span>{{ og.image }}</span>
            </external-link>
          </dd>
        </template>
        <template v-if="og.url">
          <dt>og:url</dt><dd>{{ og.url }}</dd>
        </template>
      </dl>
      </properties-list>
    </panel-section>

    <panel-section title="Resources">
      <resource-list>
      <ul>
        <li>
          <external-link href="https://stackoverflow.com/questions/19778620/provide-an-image-for-whatsapp-link-sharing">
            2019 unfurl standards
          </external-link>
        </li>
        </ul>
      </resource-list>
    </panel-section>
  </div>
</template>


<script>
  import getTheme from '../lib/theme'
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
         * but whatsapp:card is absent, then a summary card may be rendered.
         * @see https://developer.whatsapp.com/en/docs/tweets/optimize-with-cards/overview/markup#overview-of-all-whatsapp-card-tags
         */
        if (this.whatsapp.card) {
          return this.whatsapp.card
        } else if (this.og.type && this.og.title && this.og.description) {
          return 'summary'
        }
        return undefined
      },
      supportedCards() { return supportedCards },
      isValidCard() { return validCards.includes(this.card) },
      isSupportedCard() { return supportedCards.includes(this.card) },
      title() {
        return this.whatsapp.title || this.og.title || this.head.title || ''
      },
      description() {
        return this.whatsapp.description || this.og.description || this.metaValue('description') || ''
      },
      image() {
        return this.absoluteUrl(this.whatsapp.image || this.og.image)
      },

      url(){
        return this.head.url
    },

      og() {
        return {
          title: this.propertyValue('og:title'),
          description: this.propertyValue('og:description'),
          type: this.propertyValue('og:type'),
          image: this.propertyValue('og:image'),
          url: this.propertyValue('og:url')
        }
      },
      whatsapp() {
        return {
          title: this.metaValue('whatsapp:title'),
          description: this.metaValue('whatsapp:description'),
          card: this.metaValue('whatsapp:card'),
          image: this.metaValue('whatsapp:image'),
          site: this.metaValue('whatsapp:site'),
          creator: this.metaValue('whatsapp:creator'),
        }
      },
      whatsappUrl() {
        const params = new URLSearchParams()
        params.set('card', this.whatsapp.card)
        params.set('title', this.title)
        params.set('description', this.description)
        params.set('image', this.image)
        params.set('url', this.head.url)
        params.set('theme', getTheme() !== 'default' && 'dark')
        return `/whatsapp-preview/whatsapp-preview.html?${params}`
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
  .whatsapp__preview {
    max-width: 521px;
    margin-bottom: 1em;
    padding: 0;
    border: none;
  }

  .whatsapp__preview-caption {
    color: var(--label-color);
  }
</style>
