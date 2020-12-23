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
            <social-media-tooltip
              :exist="tooltip[item.keyName].exist"
              :has-variation="tooltip[item.keyName].hasVariation"
              :required-sizes="tooltip[item.keyName].requiredSizes"
              :required="tooltip[item.keyName].required"
              :size="tooltip[item.keyName].size"
              :tag="tooltip[item.keyName].tag"
              :type="item.keyName"
              :value-length="tooltip[item.keyName].valueLength"
            />
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
import {
  findImageDimensions,
  findMetaContent,
  findMetaProperty
} from '@shared/lib/find-meta';
import getTheme from '@shared/lib/theme';
import PanelSection from '@shared/components/panel-section';
import ExternalLink from '@shared/components/external-link';
import PropertiesItem from '@shared/components/properties-item';
import PropertiesList from '@shared/components/properties-list';
import PreviewIframe from '@shared/components/preview-iframe';
import SocialMediaTooltip from '@shared/components/social-media-tooltip';

const validCards = [ 'summary', 'summary_large_image', 'app', 'player' ];
export const supportedCards = [ 'summary', 'summary_large_image' ];

export default {
  components: {
    ExternalLink,
    PanelSection,
    PropertiesItem,
    PropertiesList,
    PreviewIframe,
    SocialMediaTooltip,
  },
  data() {
    return {
      imageDimensions: {
        height: undefined,
        width: undefined,
      },
      tooltip: {
        'twitter:app:id:iphone': {
          exist: false,
          required: false,
          tag: 'twitter:app:id:iphone',
        },
        'twitter:app:id:ipad': {
          exist: false,
          required: false,
          tag: 'twitter:app:id:ipad',
        },
        'twitter:app:id:googleplay': {
          exist: false,
          required: false,
          tag: 'twitter:app:id:googleplay',
        },
        'twitter:app:url:iphone': {
          exist: false,
          required: false,
          tag: 'twitter:app:url:iphone',
        },
        'twitter:app:url:ipad': {
          exist: false,
          required: false,
          tag: 'twitter:app:url:ipad',
        },
        'twitter:app:url:googleplay': {
          exist: false,
          required: false,
          tag: 'twitter:app:url:googleplay',
        },
        'twitter:app:country': {
          exist: false,
          required: false,
          tag: 'twitter:app:country',
        },
        'twitter:app:name:iphone': {
          exist: false,
          required: false,
          tag: 'twitter:app:name:iphone',
        },
        'twitter:app:name:ipad': {
          exist: false,
          required: false,
          tag: 'twitter:app:name:ipad',
        },
        'twitter:app:name:googleplay': {
          exist: false,
          required: false,
          tag: 'twitter:app:name:googleplay',
        },
        'twitter:card': {
          exist: false,
          required: true,
          tag: 'twitter:card',
        },
        'twitter:site': {
          exist: false,
          required: false,
          tag: 'twitter:site',
        },
        'twitter:site:id': {
          exist: false,
          required: false,
          tag: 'twitter:site:id',
        },
        'twitter:creator': {
          exist: false,
          required: false,
          tag: 'twitter:creator',
        },
        'twitter:creator:id': {
          exist: false,
          required: false,
          tag: 'twitter:creator:id',
        },
        'twitter:title': {
          exist: false,
          required: true,
          tag: 'twitter:title',
        },
        'twitter:description': {
          exist: false,
          required: false,
          tag: 'twitter:description',
        },
        'twitter:player': {
          exist: false,
          required: false,
          tag: 'twitter:player',
        },
        'twitter:player:width': {
          exist: false,
          required: false,
          tag: 'twitter:player:width',
        },
        'twitter:player:height': {
          exist: false,
          required: false,
          tag: 'twitter:player:height',
        },
        'twitter:player:stream': {
          exist: false,
          required: false,
          tag: 'twitter:player:stream',
        },
        'twitter:image': {
          exist: false,
          hasVariation: false,
          required: false,
          requiredSizes: {
            minimum: {
              width: 144,
              height: 144,
            },
            variation: {
              width: 300,
              height: 157,
            },
          },
          size: {
            width: null,
            height: null,
          },
          tag: 'twitter:image',
        },
        'twitter:image:alt': {
          exist: false,
          required: false,
          tag: 'twitter:image:alt',
        },
        'og:type': {
          exist: false,
          required: false,
          tag: 'og:type',
        },
        'og:title': {
          exist: false,
          required: false,
          tag: 'og:title',
        },
        'og:description': {
          exist: false,
          required: false,
          tag: 'og:description',
        },
        'og:image': {
          exist: false,
          hasVariation: false,
          required: false,
          requiredSizes: {
            minimum: {
              width: 144,
              height: 144,
            },
            variation: {
              width: 300,
              height: 157,
            },
          },
          size: {
            width: null,
            height: null,
          },
          tag: 'og:image',
        },
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
          keyName: 'og:type',
          title: 'og:type',
          value: this.og.type,
        }, {
          keyName: 'og:title',
          title: 'og:title',
          value: this.og.title,
        }, {
          keyName: 'og:description',
          title: 'og:description',
          value: this.og.description,
        }, {
          keyName: 'og:image',
          title: 'og:image',
          value: this.absoluteUrl(this.og.image),
        }, {
          keyName: 'twitter:card',
          title: 'twitter:card',
          value: this.twitter.card,
        }, {
          keyName: 'twitter:title',
          title: 'twitter:title',
          value: this.twitter.title,
        }, {
          keyName: 'twitter:description',
          title: 'twitter:description',
          value: this.twitter.description,
        }, {
          keyName: 'twitter:image',
          title: 'twitter:image',
          value: this.absoluteUrl(this.twitter.image),
        },{
          keyName: 'twitter:image:alt',
          title: 'twitter:image:alt',
          value: this.twitter.imageAlt,
        }, {
          keyName: 'twitter:creator',
          title: 'twitter:creator',
          value: this.twitter.creator
            ? `https://twitter.com/${ this.twitter.creator.slice(1) }`
            : null,
        }, {
          keyName: 'twitter:creator:id',
          title: 'twitter:creator:id',
          value: this.twitter.creatorId,
        }, {
          keyName: 'twitter:site',
          title: 'twitter:site',
          value: this.twitter.site
            ? `https://twitter.com/${ this.twitter.site.slice(1) }`
            : null,
        }, {
          keyName: 'twitter:site:id',
          title: 'twitter:site:id',
          value: this.twitter.site,
        }, {
          keyName: 'twitter:player',
          title: 'twitter:player',
          value: this.twitter.player,
        }, {
          keyName: 'twitter:player:width',
          title: 'twitter:player:width',
          value: this.twitter.playerWidth,
        }, {
          keyName: 'twitter:player:height',
          title: 'twitter:player:height',
          value: this.twitter.playerHeight,
        }, {
          keyName: 'twitter:player:stream',
          title: 'twitter:player:stream',
          value: this.twitter.playerStream,
        }, {
          keyName: 'twitter:app:id:iphone',
          title: 'twitter:app:id:iphone',
          value: this.twitter.appIdIphone,
        }, {
          keyName: 'twitter:app:id:ipad',
          title: 'twitter:app:id:ipad',
          value: this.twitter.appIdIpad,
        }, {
          keyName: 'twitter:app:id:googleplay',
          title: 'twitter:app:id:googleplay',
          value: this.twitter.appIdGoogle,
        }, {
          keyName: 'twitter:app:url:iphone',
          title: 'twitter:app:url:iphone',
          value: this.twitter.appUrlIphone,
        }, {
          keyName: 'twitter:app:url:ipad',
          title: 'twitter:app:url:ipad',
          value: this.twitter.appUrlIpad,
        }, {
          keyName: 'twitter:app:url:googleplay',
          title: 'twitter:app:url:googleplay',
          value: this.twitter.appUrlGoogle,
        }, {
          keyName: 'twitter:app:country',
          title: 'twitter:app:country',
          value: this.twitter.appCountry,
        }, {
          keyName: 'twitter:app:name:iphone',
          title: 'twitter:app:name:iphone',
          value: this.twitter.appNameIphone,
        }, {
          keyName: 'twitter:app:name:ipad',
          title: 'twitter:app:name:ipad',
          value: this.twitter.appNameIpad,
        }, {
          keyName: 'twitter:app:name:googleplay',
          title: 'twitter:app:name:googleplay',
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
        this.setTooltipData(dimensions);
      });
    },
    metaValue(metaName) {
      return findMetaContent(this.head, metaName);
    },
    propertyValue(propName) {
      return findMetaProperty(this.head, propName);
    },
    setTooltipData(dimensions) {
      this.tooltip['twitter:app:id:iphone'].exist = Boolean(this.twitter.appIdIphone);
      this.tooltip['twitter:app:id:ipad'].exist = Boolean(this.twitter.appIdIpad);
      this.tooltip['twitter:app:id:googleplay'].exist = Boolean(this.twitter.appIdGoogle);
      this.tooltip['twitter:app:url:iphone'].exist = Boolean(this.twitter.appUrlIphone);
      this.tooltip['twitter:app:url:ipad'].exist = Boolean(this.twitter.appUrlIpad);
      this.tooltip['twitter:app:url:googleplay'].exist = Boolean(this.twitter.appUrlGoogle);
      this.tooltip['twitter:app:country'].exist = Boolean(this.twitter.appCountry);
      this.tooltip['twitter:app:name:iphone'].exist = Boolean(this.twitter.appNameIphone);
      this.tooltip['twitter:app:name:ipad'].exist = Boolean(this.twitter.appNameIpad);
      this.tooltip['twitter:app:name:googleplay'].exist = Boolean(this.twitter.appNameGoogle);
      this.tooltip['twitter:card'].exist = Boolean(this.twitter.card);
      this.tooltip['twitter:site'].exist = Boolean(this.twitter.site);
      this.tooltip['twitter:site:id'].exist = Boolean(this.twitter.siteId);
      this.tooltip['twitter:creator'].exist = Boolean(this.twitter.creator);
      this.tooltip['twitter:creator:id'].exist = Boolean(this.twitter.creatorId);
      this.tooltip['twitter:title'].exist = Boolean(this.twitter.title);
      this.tooltip['twitter:card'].exist = Boolean(this.twitter.card);
      this.tooltip['twitter:description'].exist = Boolean(this.twitter.description);
      this.tooltip['twitter:image'].exist = Boolean(this.twitter.image);
      this.tooltip['twitter:image:alt'].exist = Boolean(this.twitter.imageAlt);
      this.tooltip['twitter:player'].exist = Boolean(this.twitter.player);
      this.tooltip['twitter:player:width'].exist = Boolean(this.twitter.playerWidth);
      this.tooltip['twitter:player:height'].exist = Boolean(this.twitter.playerHeight);
      this.tooltip['twitter:player:stream'].exist = Boolean(this.twitter.playerStream);
      this.tooltip['og:type'].exist = Boolean(this.og.type);
      this.tooltip['og:title'].exist = Boolean(this.og.title);
      this.tooltip['og:description'].exist = Boolean(this.og.description);
      this.tooltip['og:image'].exist = Boolean(this.og.image);
      this.tooltip['og:image'].size = dimensions;
    },
  },
};
</script>

<style>
  .twitter__preview {
    max-width: 521px;
  }
</style>
