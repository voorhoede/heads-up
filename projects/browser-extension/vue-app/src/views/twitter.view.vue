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
        :url="previewUrl"
        iframeClass="twitter__preview"
      >
        <template v-slot:caption>
          Preview based on <external-link href="https://mobile.twitter.com/">mobile.twitter.com</external-link>.
        </template>
      </preview-iframe>
    </panel-section>

    <panel-section title="Properties">
      <properties-list>
        <properties-item
          v-for="item in twitterMetaData"
          :key="item.keyName"
          :key-name="item.keyName"
        >
          <template #default>
            {{ item.title }}
          </template>
          <template v-if="item.keyName.includes(':image')" #value>
          <external-link :href="absoluteUrl(item.value)">
              <img :src="absoluteUrl(item.value)" alt="" />
              <span>{{ item.value }}</span>
            </external-link>
          </template>
          <template v-else-if="item.keyName.includes(':creator') || item.keyName.includes(':site')" #value>
            <external-link v-if="item.value" :href="item.value">
              {{ item.value }}
            </external-link>
          </template>
          <template v-else #value>
            {{ item.value }}
          </template>
        </properties-item>
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
import PropertiesItem from '@shared/components/properties-item';
import PropertiesList from '@shared/components/properties-list';
import PreviewIframe from '@shared/components/preview-iframe';

const validCards = [ 'summary', 'summary_large_image', 'app', 'player' ];
export const supportedCards = [ 'summary', 'summary_large_image' ];

export default {
  components: {
    ExternalLink,
    PanelSection,
    PropertiesItem,
    PropertiesList,
    PreviewIframe,
  },
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
    previewUrl() {
      const params = new URLSearchParams();
      params.set('card', this.twitter.card);
      params.set('title', this.title);
      params.set('description', this.description);
      params.set('image', this.image);
      params.set('url', this.head.url);
      params.set('theme', getTheme() !== 'default' && 'dark');
      return `/previews/twitter/twitter.html?${ params }`;
    },
    twitterMetaData() {
      return [
        {
          keyName: 'twitter:card',
          title: 'twitter:card',
          value: this.twitter.card,
        },
        {
          keyName: 'twitter:title',
          title: 'twitter:title',
          value: this.twitter.title,
        },
        {
          keyName: 'twitter:description',
          title: 'twitter:description',
          value: this.twitter.description,
        },
        {
          keyName: 'twitter:image',
          title: 'twitter:image',
          value: this.absoluteUrl(this.twitter.image),
        },
        {
          keyName: 'twitter:creator',
          title: 'twitter:creator',
          value: this.twitter.creator
            ? `https://twitter.com/${ this.twitter.creator.slice(1) }`
            : null,
        },
        {
          keyName: 'twitter:site',
          title: 'twitter:site',
          value: this.twitter.site
            ? `https://twitter.com/${ this.twitter.site.slice(1) }`
            : null,
        },
        {
          keyName: 'og:type',
          title: 'og:type',
          value: this.og.type,
        },
        {
          keyName: 'og:title',
          title: 'og:title',
          value: this.og.title,
        },
        {
          keyName: 'og:description',
          title: 'og:description',
          value: this.og.description,
        },
        {
          keyName: 'og:image',
          title: 'og:image',
          value: this.absoluteUrl(this.og.image),
        },
      ];
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
