<template>
  <div class="twitter">
    <panel-section title="Preview">
      <p v-if="!isValidCard">
        This page does not contain the required meta data to create a preview.
      </p>
      <p v-if="isValidCard && !isSupportedCard">
        Preview is not yet available for <code>{{ card }}</code> cards.<br>
        Card preview is currently supported for:
        <span v-html="supportedCards.map(card => `<code>${card}</code>`).join(', ')" />.
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
          v-for="item in metaData"
          :key="item.term"
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
import { computed, onMounted, ref, watch } from 'vue';
import createAbsoluteUrl from '@shared/lib/create-absolute-url';
import { findImageDimensions, findMetaContent, findMetaProperty } from '@shared/lib/find-meta';
import getTheme from '@shared/lib/theme';
import schema from '@shared/lib/schemas/twitter-schema';

import ExternalLink from '@shared/components/external-link';
import PanelSection from '@shared/components/panel-section';
import PreviewIframe from '@shared/components/preview-iframe';
import PropertiesItem from '@shared/components/properties-item';
import PropertiesList from '@shared/components/properties-list';

export default {
  props: {
    headData: {
      type: Object,
      required: true,
    },
  },

  setup: props => {
    const imageDimensions = ref({ height: undefined, width: undefined });
    const validCards = ref([ 'summary', 'summary_large_image', 'app', 'player' ]);
    const supportedCards = ref([ 'summary', 'summary_large_image' ]);

    const card = computed(() => {
      const { card } = twitter.value;
      const { description, title, type } = og.value;

      if (card) {
        return card;
      } else if (type && title && description) {
        return 'summary';
      }
      return undefined;
    });
    const isValidCard = computed(() => (validCards.value.includes(card.value)));
    const isSupportedCard = computed(() => (supportedCards.value.includes(card.value)));
    const title = computed(() => (
      twitter.value.title ||
      og.value.title ||
      props.headData.head.title || ''
    ));
    const description = computed(() => (
      twitter.value.description ||
      og.value.description ||
      propertyValue('description') || ''
    ));
    const image = computed(() => (
      absoluteUrl(twitter.value.image || og.value.image)
    ));
    const og = computed(() => ({
      type: propertyValue('og:type'),
      title: propertyValue('og:title'),
      description: propertyValue('og:description'),
      image: propertyValue('og:image'),
      url: propertyValue('og:url'),
    }));
    const twitter = computed(() => ({
      appIdIphone: propertyValue('twitter:app:id:iphone'),
      appIdIpad: propertyValue('twitter:app:id:ipad'),
      appIdGoogle: propertyValue('twitter:app:id:googleplay'),
      appUrlIphone: propertyValue('twitter:app:url:iphone'),
      appUrlIpad: propertyValue('twitter:app:url:ipad'),
      appUrlGoogle: propertyValue('twitter:app:url:googleplay'),
      appCountry: propertyValue('twitter:app:country'),
      appNameIphone: propertyValue('twitter:app:name:iphone'),
      appNameIpad: propertyValue('twitter:app:name:ipad'),
      appNameGoogle: propertyValue('twitter:app:name:googleplay'),
      card: propertyValue('twitter:card'),
      title: propertyValue('twitter:title'),
      description: propertyValue('twitter:description'),
      image: propertyValue('twitter:image'),
      imageAlt: propertyValue('twitter:image:alt'),
      site: propertyValue('twitter:site'),
      siteId: propertyValue('twitter:site:id'),
      creator: propertyValue('twitter:creator'),
      creatorId: propertyValue('twitter:creator:id'),
      player: propertyValue('twitter:player'),
      playerWidth: propertyValue('twitter:player:width'),
      playerHeight: propertyValue('twitter:player:height'),
      playerStream: propertyValue('twitter:player:stream'),
    }));
    const previewUrl = computed(() => {
      const params = new URLSearchParams();
      params.set('card', twitter.value.card);
      params.set('title', title.value);
      params.set('description', description.value);
      params.set('image', image.value);
      params.set('url', props.headData.head.url);
      params.set('theme', getTheme());
      return `/previews/twitter/twitter.html?${ params }`;
    });
    const metaData = computed(() => ([
      {
        term: 'og:type',
        value: og.value.type,
      },
      {
        term: 'og:title',
        value: og.value.title,
      },
      {
        term: 'og:description',
        value: og.value.description,
      },
      {
        term: 'og:image',
        value: og.value.image,
        image: {
          href: og.value.image,
          url: absoluteUrl(og.value.image),
        },
        type: 'image',
      },
      {
        term: 'og:url',
        value: absoluteUrl(og.value.url),
        type: 'link',
      },
      {
        term: 'twitter:card',
        value: twitter.value.card,
        required: true,
      },
      {
        term: 'twitter:title',
        value: twitter.value.title,
        required: true,
      },
      {
        term: 'twitter:description',
        value: twitter.value.description,
        required: true,
      },
      {
        term: 'twitter:image',
        value: twitter.value.image,
        image: {
          href: twitter.value.image,
          url: absoluteUrl(twitter.value.image),
        },
        type: 'image',
        required: true,
      },
      {
        term: 'twitter:image:alt',
        value: twitter.value.imageAlt,
        required: true,
      },
      {
        term: 'twitter:creator',
        value: twitter.value.creator
          ? `https://twitter.com/${ twitter.value.creator.slice(1) }`
          : null,
        type: 'link',
      },
      {
        term: 'twitter:creator:id',
        value: twitter.value.creatorId,
      },
      {
        term: 'twitter:site',
        value: twitter.value.site
          ? `https://twitter.com/${ twitter.value.site.slice(1) }`
          : null,
        type: 'link',
        required: true,
      },
      {
        term: 'twitter:site:id',
        value: twitter.value.site,
        required: true,
      },
      {
        term: 'twitter:player',
        value: twitter.value.player,
      },
      {
        term: 'twitter:player:width',
        value: twitter.value.playerWidth,
      },
      {
        term: 'twitter:player:height',
        value: twitter.value.playerHeight,
      },
      {
        term: 'twitter:player:stream',
        value: twitter.value.playerStream,
      },
      {
        term: 'twitter:app:id:iphone',
        value: twitter.value.appIdIphone,
      },
      {
        term: 'twitter:app:id:ipad',
        value: twitter.value.appIdIpad,
      },
      {
        term: 'twitter:app:id:googleplay',
        value: twitter.value.appIdGoogle,
      },
      {
        term: 'twitter:app:url:iphone',
        value: twitter.value.appUrlIphone,
        type: 'link',
      },
      {
        term: 'twitter:app:url:ipad',
        value: twitter.value.appUrlIpad,
        type: 'link',
      },
      {
        term: 'twitter:app:url:googleplay',
        value: twitter.value.appUrlGoogle,
        type: 'link',
      },
      {
        term: 'twitter:app:country',
        value: twitter.value.appCountry,
      },
      {
        term: 'twitter:app:name:iphone',
        value: twitter.value.appNameIphone,
      },
      {
        term: 'twitter:app:name:ipad',
        value: twitter.value.appNameIpad,
      },
      {
        term: 'twitter:app:name:googleplay',
        value: twitter.value.appNameGoogle,
      },
    ]));

    const absoluteUrl = url => createAbsoluteUrl(props.headData.head, url);
    const propertyValue = propName =>
      findMetaProperty(props.headData.head, propName) || findMetaContent(props.headData.head, propName);
    const getImageDimensions = tagName => {
      const name = tagName ? tagName : 'og:image';
      findImageDimensions(props.headData.head, name)
        .then(dimensions => imageDimensions.value = dimensions);
    };

    watch(() => og.value.image, value => {
      if (value) {
        getImageDimensions('og:image');
      }
    });

    watch(() => twitter.value.image, value => {
      if (value) {
        getImageDimensions('twitter:image');
      }
    });

    onMounted(() => getImageDimensions());

    return {
      card,
      supportedCards,
      isValidCard,
      isSupportedCard,
      title,
      description,
      image,
      og,
      twitter,
      previewUrl,
      metaData,
      schema,
    };
  },
  components: {
    ExternalLink,
    PanelSection,
    PreviewIframe,
    PropertiesItem,
    PropertiesList,
  },
};
</script>

<style>
  .twitter__preview {
    max-width: var(--preview-width);
  }
</style>
