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
          :tooltip="getTooltipInfo(item.term)"
          :validation="validation"
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
import validate from '@shared/lib/validate';
import { schema, info } from './schema';

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
    const validation = ref({});
    const imageDimensions = ref({ size: undefined, height: undefined, width: undefined });
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
    const twitter = computed(() => ({
      card: propertyValue('twitter:card'),
      site: propertyValue('twitter:site'),
      siteId: propertyValue('twitter:site:id', { isNumber: true }),
      creator: propertyValue('twitter:creator'),
      creatorId: propertyValue('twitter:creator:id', { isNumber: true }),
      description: propertyValue('twitter:description'),
      title: propertyValue('twitter:title'),
      image: propertyValue('twitter:image'),
      imageAlt: propertyValue('twitter:image:alt'),
      player: propertyValue('twitter:player'),
      playerWidth: propertyValue('twitter:player:width', { isNumber: true }),
      playerHeight: propertyValue('twitter:player:height', { isNumber: true }),
      playerStream: propertyValue('twitter:player:stream'),
      appNameIphone: propertyValue('twitter:app:name:iphone'),
      appIdIphone: propertyValue('twitter:app:id:iphone', { isNumber: true }),
      appUrlIphone: propertyValue('twitter:app:url:iphone'),
      appNameIpad: propertyValue('twitter:app:name:ipad'),
      appIdIpad: propertyValue('twitter:app:id:ipad', { isNumber: true }),
      appUrlIpad: propertyValue('twitter:app:url:ipad'),
      appNameGoogle: propertyValue('twitter:app:name:googleplay'),
      appIdGoogle: propertyValue('twitter:app:id:googleplay', { isNumber: true }),
      appUrlGoogle: propertyValue('twitter:app:url:googleplay'),
      appCountry: propertyValue('twitter:app:country'),
    }));
    const og = computed(() => ({
      title: propertyValue('og:title'),
      type: propertyValue('og:type'),
      image: propertyValue('og:image'),
      url: propertyValue('og:url'),
      description: propertyValue('og:description'),
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
    const unsupportedProperties = computed(() => {
      const { meta } = props.headData.head;
      return meta
        .filter(meta =>
          meta.property?.startsWith('twitter:') ||
          meta.name?.startsWith('twitter:')
        )
        .filter(meta =>
          !Object.keys(info).includes(meta.property || meta.name)
        )
        .map(meta => ({
          term: meta.property || meta.name,
          type: 'unsupported',
          value: meta.content,
        }));
    });
    const metaData = computed(() => ([
      {
        term: 'twitter:card',
        value: twitter.value.card,
      },
      {
        term: 'twitter:title',
        value: twitter.value.title,
      },
      {
        term: 'twitter:description',
        value: twitter.value.description,
      },
      {
        term: 'twitter:image',
        value: twitter.value.image,
        image: {
          href: twitter.value.image,
          url: absoluteUrl(twitter.value.image),
        },
        type: 'image',
      },
      {
        term: 'twitter:image:alt',
        value: twitter.value.imageAlt,
      },
      {
        term: 'twitter:creator',
        value: twitter.value.creator,
      },
      {
        term: 'twitter:creator:id',
        value: twitter.value.creatorId,
      },
      {
        term: 'twitter:site',
        value: twitter.value.site,
      },
      {
        term: 'twitter:site:id',
        value: twitter.value.siteId,
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
      {
        term: 'twitter:app:country',
        value: twitter.value.appCountry,
      },
      {
        term: 'og:title',
        value: og.value.title,
      },
      {
        term: 'og:type',
        value: og.value.type,
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
        term: 'og:description',
        value: og.value.description,
      },
      ...unsupportedProperties.value,
    ]));

    const propertyValue = (propName, { isNumber = false } = {}) => {
      const value =
        findMetaProperty(props.headData.head, propName) ||
        findMetaContent(props.headData.head, propName);

      if (!value) {
        return undefined;
      }

      if (isNumber) {
        return Number(value) || undefined;
      }

      return value;
    };

    const absoluteUrl = url => createAbsoluteUrl(props.headData.head, url);

    const getImageDimensions = tagName => {
      const name = tagName ? tagName : 'og:image';
      findImageDimensions(props.headData.head, name)
        .then(dimensions => imageDimensions.value = dimensions);
    };

    const getTooltipInfo = term => (info[term] ?? {});

    watch(() => og.value.image, (value, oldValue) => {
      if (value !== oldValue) {
        getImageDimensions('og:image');
      }
    });

    watch(() => og.value.image, (value, oldValue) => {
      if (value !== oldValue) {
        getImageDimensions('twitter:image');
      }
    });

    onMounted(() => getImageDimensions());

    validate(metaData.value, schema)
      .then(result => validation.value = result);

    return {
      card,
      supportedCards,
      isValidCard,
      isSupportedCard,
      previewUrl,
      metaData,
      getTooltipInfo,
      validation,
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
