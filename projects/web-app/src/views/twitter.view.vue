<template>
  <panel-section title="Preview">
    <preview-iframe
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
    const twitterUrl = computed(() => {
      const params = new URLSearchParams();
      params.set('card', twitter.value.card);
      params.set('title', title.value);
      params.set('description', description.value);
      params.set('image', image.value);
      params.set('url', headData.value.head.url);
      params.set('theme', getTheme() !== 'default' && 'dark');
      return `/previews/twitter/twitter.html?${ params }`;
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
      twitterUrl,
      absoluteUrl,
      metaValue,
      propertyValue,
    };
  },
  components: {
    PanelSection,
    ExternalLink,
    PreviewIframe,
    PropertiesList,
  },
};
</script>

<style>
  .twitter__preview {
    max-width: 521px;
  }
</style>
