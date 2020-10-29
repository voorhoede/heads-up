<template>
  <panel-section title="Preview">
    <p v-if="!isValidCard">
      This page does not contain the required meta data to create a preview.
    </p>
    <p v-if="isValidCard && !isSupportedCard">
      Preview is not yet available for <code>{{ card }}</code> cards. <br>
      Card preview is currently supported for:
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
         <external-link v-if="item.value" :href="absoluteUrl(item.value)">
            <img :src="absoluteUrl(item.value)" alt="" />
            <span>{{ item.value }}</span>
          </external-link>
        </template>
        <template v-else-if="item.keyName.includes(':creator') || item.keyName.includes(':site')" #value>
          <external-link v-if="item.value" :href="item.value">
            {{ item.value }}
          </external-link>
        </template>
        <template v-else-if="item.value" #value>
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
</template>

<script>
import { computed, ref } from 'vue';
import useHead from '@/composables/use-head';
import createAbsoluteUrl from '@shared/lib/create-absolute-url';
import { findMetaContent, findMetaProperty } from '@shared/lib/find-meta';
import getTheme from '@shared/lib/theme';
import PanelSection from '@shared/components/panel-section';
import ExternalLink from '@shared/components/external-link';
import PreviewIframe from '@shared/components/preview-iframe';
import PropertiesItem from '@shared/components/properties-item';
import PropertiesList from '@shared/components/properties-list';

export default {
  setup() {
    const headData = useHead().data;
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
      headData.value.head.title || ''
    ));
    const description = computed(() => (
      twitter.value.description ||
      og.value.description ||
      metaValue('description') || ''
    ));
    const image = computed(() => (
      absoluteUrl(twitter.value.image || og.value.image)
    ));
    const og = computed(() => ({
      description: propertyValue('og:description'),
      image: propertyValue('og:image'),
      title: propertyValue('og:title'),
      type: propertyValue('og:type'),
    }));
    const twitter = computed(() => ({
      card: metaValue('twitter:card'),
      creator: metaValue('twitter:creator'),
      description: metaValue('twitter:description'),
      image: metaValue('twitter:image'),
      site: metaValue('twitter:site'),
      title: metaValue('twitter:title'),
    }));
    const previewUrl = computed(() => {
      const params = new URLSearchParams();
      params.set('card', twitter.value.card);
      params.set('title', title.value);
      params.set('description', description.value);
      params.set('image', image.value);
      params.set('url', headData.value.head.url);
      params.set('theme', getTheme() !== 'default' && 'dark');
      return `/previews/twitter/twitter.html?${ params }`;
    });
    const twitterMetaData = computed(() => {
      return [
        {
          keyName: 'twitter:card',
          title: 'twitter:card',
          value: twitter.value.card,
        },
        {
          keyName: 'twitter:title',
          title: 'twitter:title',
          value: twitter.value.title,
        },
        {
          keyName: 'twitter:description',
          title: 'twitter:description',
          value: twitter.value.description,
        },
        {
          keyName: 'twitter:image',
          title: 'twitter:image',
          value: absoluteUrl(twitter.value.image),
        },
        {
          keyName: 'twitter:creator',
          title: 'twitter:creator',
          value: twitter.value.creator
            ? `https://twitter.com/${ twitter.value.creator.slice(1) }`
            : null,
        },
        {
          keyName: 'twitter:site',
          title: 'twitter:site',
          value: twitter.value.site
            ? `https://twitter.com/${ twitter.value.site.slice(1) }`
            : null,
        },
        {
          keyName: 'og:type',
          title: 'og:type',
          value: og.value.type,
        },
        {
          keyName: 'og:title',
          title: 'og:title',
          value: og.value.title,
        },
        {
          keyName: 'og:description',
          title: 'og:description',
          value: og.value.description,
        },
        {
          keyName: 'og:image',
          title: 'og:image',
          value: absoluteUrl(og.value.image),
        },
      ];
    });

    const absoluteUrl = url => createAbsoluteUrl(headData.value.head, url);
    const metaValue = metaName => findMetaContent(headData.value.head, metaName);
    const propertyValue = propName => findMetaProperty(headData.value.head, propName);

    return {
      card,
      isValidCard,
      isSupportedCard,
      title,
      description,
      image,
      og,
      twitter,
      previewUrl,
      twitterMetaData,
      absoluteUrl,
      metaValue,
      propertyValue,
    };
  },
  components: {
    PanelSection,
    ExternalLink,
    PreviewIframe,
    PropertiesItem,
    PropertiesList,
  },
};
</script>

<style>
  .twitter__preview {
    max-width: 521px;
  }
</style>
