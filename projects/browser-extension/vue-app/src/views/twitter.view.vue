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
      <preview-iframe
        v-if="isValidCard && isSupportedCard"
        :url="twitterUrl"
        iframeClass="twitter__preview"
      >
        <template v-slot:caption>
          Preview based on <external-link href="https://mobile.twitter.com/">mobile.twitter.com</external-link>.
        </template>
      </preview-iframe>
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
              <img
                alt=""
                :src="absoluteUrl(twitter.image)"
              >
              <span>{{ twitter.image }}</span>
            </external-link>
          </dd>
        </template>
        <template v-for="username in ['creator', 'site']">
          <dt
            v-if="twitter[username]"
            :key="`${username}-key`"
          >
            twitter:{{ username }}
          </dt>
          <dd
            v-if="twitter[username]"
            :key="`${username}-value`"
          >
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
              <img
                alt=""
                :src="absoluteUrl(og.image)"
              >
              <span>{{ og.image }}</span>
            </external-link>
          </dd>
        </template>
      </properties-list>
    </panel-section>

    <panel-section title="Resources">
      <ul class="resource-list">
        <li>
          <external-link href="https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/abouts-cards.html">
            About Twitter cards
          </external-link>
        </li>
        <li>
          <external-link href="https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/markup">
            Twitter card markup
          </external-link>
        </li>
        <li>
          <external-link href="https://cards-dev.twitter.com/validator">
            Twitter card validator (requires Twitter login)
          </external-link>
        </li>
      </ul>
    </panel-section>
  </div>
</template>


<script>
import { mapState } from 'vuex';
import createAbsoluteUrl from '@shared/lib/create-absolute-url';
import { findMetaContent, findMetaProperty } from '@shared/lib/find-meta';
import getTheme from '@shared/lib/theme';
import PanelSection from '@shared/components/panel-section';
import ExternalLink from '@shared/components/external-link';
import PropertiesList from '@shared/components/properties-list';
import PreviewIframe from '@shared/components/preview-iframe';

const validCards = [ 'summary', 'summary_large_image', 'app', 'player' ];
export const supportedCards = [ 'summary', 'summary_large_image' ];

export default {
  components: { ExternalLink, PanelSection, PropertiesList, PreviewIframe },
  computed: {
    ...mapState([ 'head' ]),
    card() {
      /**
         * If an og:type, og:title and og:description exist in the markup
         * but twitter:card is absent, then a summary card may be rendered.
         * @see https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/markup#overview-of-all-twitter-card-tags
         */
      if (this.twitter.card) {
        return this.twitter.card;
      } else if (this.og.type && this.og.title && this.og.description) {
        return 'summary';
      }
      return undefined;
    },
    supportedCards() { return supportedCards; },
    isValidCard() { return validCards.includes(this.card); },
    isSupportedCard() { return supportedCards.includes(this.card); },
    title() {
      return this.twitter.title || this.og.title || this.head.title || '';
    },
    description() {
      return this.twitter.description || this.og.description || this.metaValue('description') || '';
    },
    image() {
      return this.absoluteUrl(this.twitter.image || this.og.image);
    },
    og() {
      return {
        type: this.propertyValue('og:type'),
        title: this.propertyValue('og:title'),
        description: this.propertyValue('og:description'),
        image: this.propertyValue('og:image'),
      };
    },
    twitter() {
      return {
        card: this.metaValue('twitter:card'),
        title: this.metaValue('twitter:title'),
        description: this.metaValue('twitter:description'),
        image: this.metaValue('twitter:image'),
        site: this.metaValue('twitter:site'),
        creator: this.metaValue('twitter:creator'),
      };
    },
    twitterUrl() {
      const params = new URLSearchParams();
      params.set('card', this.twitter.card);
      params.set('title', this.title);
      params.set('description', this.description);
      params.set('image', this.image);
      params.set('url', this.head.url);
      params.set('theme', getTheme() !== 'default' && 'dark');
      return `/previews/twitter/twitter.html?${ params }`;
    },
  },
  mounted() {
    window.addEventListener('resize', this.onResize);
  },
  unmounted() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    absoluteUrl(url) {
      return createAbsoluteUrl(this.head, url);
    },
    metaValue(metaName) {
      return findMetaContent(this.head, metaName);
    },
    propertyValue(propName) {
      return findMetaProperty(this.head, propName);
    },
  },
};
</script>

<style>
  .twitter__preview {
    max-width: 521px;
  }
</style>
