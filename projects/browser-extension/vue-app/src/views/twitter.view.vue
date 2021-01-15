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
        :loading-height="346"
      >
        <template v-slot:caption>
          Preview based on <external-link href="https://mobile.twitter.com/">mobile.twitter.com</external-link>.
        </template>
      </preview-iframe>
    </panel-section>

    <panel-section title="Properties">
      <properties-list>
        <properties-item
          v-for="(item, index) in twitterMetaData"
          :key="index"
          :term="item.term"
          :value="item.value"
          :image="item.image"
          :type="item.type"
          :schema="schema"
          :required="item.required"
        >
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
import { findImageDimensions, findMetaContent, findMetaProperty } from '@shared/lib/find-meta';
import getTheme from '@shared/lib/theme';
import PanelSection from '@shared/components/panel-section';
import ExternalLink from '@shared/components/external-link';
import PropertiesItem from '@shared/components/properties-item';
import PropertiesList from '@shared/components/properties-list';
import PreviewIframe from '@shared/components/preview-iframe';
import schema from '@shared/lib/schemas/twitter-schema';

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
  data() {
    return {
      schema,
      imageDimensions: {
        height: undefined,
        width: undefined,
      },
    };
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
        url: this.absoluteUrl(this.propertyValue('og:url')),
      };
    },
    twitter() {
      return {
        appIdIphone: this.metaValue('twitter:app:id:iphone'),
        appIdIpad: this.metaValue('twitter:app:id:ipad'),
        appIdGoogle: this.metaValue('twitter:app:id:googleplay'),
        appUrlIphone: this.metaValue('twitter:app:url:iphone'),
        appUrlIpad: this.metaValue('twitter:app:url:ipad'),
        appUrlGoogle: this.metaValue('twitter:app:url:googleplay'),
        appCountry: this.metaValue('twitter:app:country'),
        appNameIphone: this.metaValue('twitter:app:name:iphone'),
        appNameIpad: this.metaValue('twitter:app:name:ipad'),
        appNameGoogle: this.metaValue('twitter:app:name:googleplay'),
        card: this.metaValue('twitter:card'),
        title: this.metaValue('twitter:title'),
        description: this.metaValue('twitter:description'),
        image: this.metaValue('twitter:image'),
        imageAlt: this.metaValue('twitter:image:alt'),
        site: this.metaValue('twitter:site'),
        siteId: this.metaValue('twitter:site:id'),
        creator: this.metaValue('twitter:creator'),
        creatorId: this.metaValue('twitter:creator:id'),
        player: this.metaValue('twitter:player'),
        playerWidth: this.metaValue('twitter:player:width'),
        playerHeight: this.metaValue('twitter:player:height'),
        playerStream: this.metaValue('twitter:player:stream'),
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
          term: 'og:type',
          value: this.og.type,
        },
        {
          term: 'og:title',
          value: this.og.title,
        },
        {
          term: 'og:description',
          value: this.og.description,
        },
        {
          term: 'og:image',
          value: this.absoluteUrl(this.og.image),
          image: {
            href: this.og.image,
            url: this.absoluteUrl(this.og.image),
          },
          type: 'image',
        },
        {
          term: 'og:url',
          value: this.og.url,
          type: 'link',
        },
        {
          term: 'twitter:card',
          value: this.twitter.card,
          required: true,
        },
        {
          term: 'twitter:title',
          value: this.twitter.title,
          required: true,
        },
        {
          term: 'twitter:description',
          value: this.twitter.description,
          required: true,
        },
        {
          term: 'twitter:image',
          value: this.absoluteUrl(this.twitter.image),
          image: {
            href: this.twitter.image,
            url: this.absoluteUrl(this.twitter.image),
          },
          type: 'image',
          required: true,
        },
        {
          term: 'twitter:image:alt',
          value: this.twitter.imageAlt,
          required: true,
        },
        {
          term: 'twitter:creator',
          value: this.twitter.creator
            ? `https://twitter.com/${ this.twitter.creator.slice(1) }`
            : null,
          type: 'link',
          required: true,
        },
        {
          term: 'twitter:creator:id',
          value: this.twitter.creatorId,
        },
        {
          term: 'twitter:site',
          value: this.twitter.site
            ? `https://twitter.com/${ this.twitter.site.slice(1) }`
            : null,
          type: 'link',
          required: true,
        },
        {
          term: 'twitter:site:id',
          value: this.twitter.site,
          required: true,
        },
        {
          term: 'twitter:player',
          value: this.twitter.player,
        },
        {
          term: 'twitter:player:width',
          value: this.twitter.playerWidth,
        },
        {
          term: 'twitter:player:height',
          value: this.twitter.playerHeight,
        },
        {
          term: 'twitter:player:stream',
          value: this.twitter.playerStream,
        },
        {
          term: 'twitter:app:id:iphone',
          value: this.twitter.appIdIphone,
        },
        {
          term: 'twitter:app:id:ipad',
          value: this.twitter.appIdIpad,
        },
        {
          term: 'twitter:app:id:googleplay',
          value: this.twitter.appIdGoogle,
        },
        {
          term: 'twitter:app:url:iphone',
          value: this.twitter.appUrlIphone,
          type: 'link',
        },
        {
          term: 'twitter:app:url:ipad',
          value: this.twitter.appUrlIpad,
          type: 'link',
        },
        {
          term: 'twitter:app:url:googleplay',
          value: this.twitter.appUrlGoogle,
          type: 'link',
        },
        {
          term: 'twitter:app:country',
          value: this.twitter.appCountry,
        },
        {
          term: 'twitter:app:name:iphone',
          value: this.twitter.appNameIphone,
        },
        {
          term: 'twitter:app:name:ipad',
          value: this.twitter.appNameIpad,
        },
        {
          term: 'twitter:app:name:googleplay',
          value: this.twitter.appNameGoogle,
        },
      ];
    },
  },
  watch:{
    'og.image'() {
      this.findImageDimensions('og:image');
    },
    'twitter.image'() {
      this.findImageDimensions('twitter:image');
    },
  },
  mounted() {
    window.addEventListener('resize', this.onResize);
  },
  unmounted() {
    window.removeEventListener('resize', this.onResize);
  },
  created() {
    this.findImageDimensions();
  },
  methods: {
    absoluteUrl(url) {
      return createAbsoluteUrl(this.head, url);
    },
    findImageDimensions(tagName) {
      const name = tagName ? tagName : 'og:image';

      findImageDimensions(this.head, name).then(dimensions => {
        this.imageDimensions = dimensions;
      });
    },
    metaValue(metaName) {
      return findMetaContent(this.head, metaName);
    },
    propertyValue(propName) {
      return findMetaProperty(this.head, propName) || findMetaContent(this.head, propName);
    },
  },
};
</script>

<style>
.twitter__preview {
  max-width: 521px;
}
</style>
