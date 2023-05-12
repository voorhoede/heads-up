<template>
  <div class="google-article-desktop-preview">
    <h3 class="iframe-heading" :class="{ 'iframe-heading--dark-mode': isDarkMode }">NewsArticle</h3>
    <div v-if="!hasRequiredData" class="warning-message">
      <app-icon name="warning" />
      <p>This page does not contain the necessary metadata to create a preview.</p>
    </div>

    <div v-else class="scroll-container" :class="{ 'google--dark-mode': isDarkMode }">
      <div class="scroll-container__inner">
        <a rel="noopener" target="_blank" class="article article--variant">
          <div class="article__wrapper">
            <img :src="image" class="article__image" />
            <div class="article__content">
              <div class="article__publisher">
                <img :src="publisherLogo" class="article__publisher-logo" />
                <p class="article__publisher-name">{{ publisherName }}</p>
              </div>
              <p class="article__headline">{{ headline }}</p>
              <p class="article__description">{{ description }}</p>
            </div>
          </div>
          <div class="article__footer">
            <time class="article__time">{{ dateModified }}</time>
          </div>
        </a>
        <ul class="article-carrousel">
          <li class="article-carrousel__item">
            <a rel="noopener" target="_blank" class="article">
              <img :src="image" class="article__image" />
              <div class="article__content">
                <div class="article__publisher">
                  <img :src="publisherLogo" class="article__publisher-logo" />
                  <p class="article__publisher-name">{{ publisherName }}</p>
                </div>
                <p class="article__headline">{{ headline }}</p>
              </div>
              <div class="article__footer">
                <time class="article__time">{{ dateModified }}</time>
              </div>
            </a>
          </li>
          <li v-for="index in 2" :key="index" class="article-carrousel__item">
            <a rel="noopener" target="_blank" class="article article--no-hover">
              <div class="article__skeleton-image"></div>
              <div class="article__content">
                <div class="article__skeleton-publisher"></div>
                <div class="article__skeleton-headline"></div>
                <div class="article__skeleton-time"></div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <p>
      Preview based on <external-link href="https://google.com/">google.com</external-link> (Updated on {{ updatedOn }}).
    </p>
  </div>
</template>

<script>
import { computed } from 'vue';

import AppIcon from '@shared/components/app-icon';
import ExternalLink from '@shared/components/external-link';

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const dateModified = computed(() => props.data.dateModified);
    const description = computed(() => props.data.description);
    const headline = computed(() => props.data.headline);
    const image = computed(() => props.data.image);
    const isDarkMode = computed(() => props.data.theme === 'dark');
    const publisherLogo = computed(() => props.data.publisherLogo);
    const publisherName = computed(() => props.data.publisherName);
    const updatedOn = computed(() => props.data.updatedOn);

    const hasRequiredData = computed(() =>
      !!dateModified.value &&
      !!description.value &&
      !!headline.value &&
      !!image.value &&
      !!publisherLogo.value &&
      !!publisherName.value
    );

    return {
      dateModified,
      description,
      hasRequiredData,
      headline,
      image,
      isDarkMode,
      publisherLogo,
      publisherName,
      updatedOn,
    };
  },

  components: {
    AppIcon,
    ExternalLink,
  },
};
</script>

<style>
@import "./css/defaults.css";
@import "./css/google.css";

.scroll-container__inner {
  min-width: 40rem;
}

/* Article */
.google-article-desktop-preview .article {
  background-color: var(--color-white);
  border-radius: 0.5rem;
  border: 1px solid var(--color-iron);
  cursor: pointer;
  display: block;
  height: 283px;
  overflow: hidden;
}

.google-article-desktop-preview .article--no-hover {
  cursor: default;
}

.google-article-desktop-preview .article--variant {
  height: auto;
  padding: 1rem;
}

.google-article-desktop-preview .article--variant:hover .article__headline {
  color: var(--color-royal-blue);
}

.google-article-desktop-preview .article:not(.article--variant):hover .article__headline,
.google-article-desktop-preview .article:not(.article--variant):hover .article__publisher-name {
  text-decoration: underline;
}

.google-article-desktop-preview .article__wrapper {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
}

.google-article-desktop-preview .article__image {
  background-color: var(--color-athens-gray);
  display: block;
  height: 119px;
  object-fit: cover;
  object-position: center;
  width: 100%;
}

.google-article-desktop-preview .article--variant .article__image {
  border-radius: 0.5rem;
  height: 112px;
  margin-left: 1rem;
  width: 112px;
}

.google-article-desktop-preview .article__content {
  padding: 1rem 1rem 0;
}

.google-article-desktop-preview .article--variant .article__content {
  padding: 0;
}

.google-article-desktop-preview .article__headline {
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  color: var(--color-ultramarine);
  display: -webkit-box;
  font-size: 1rem;
  height: 80px;
  line-height: 1.25em;
  overflow: hidden;
}

.google-article-desktop-preview .article--variant .article__headline {
  -webkit-line-clamp: 2;
  color: var(--color-shark);
  font-size: 18px;
  height: auto;
  max-height: 48px;
}

.google-article-desktop-preview .article__description {
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  color: var(--color-rolling-stone);
  display: -webkit-box;
  font-size: 14px;
  line-height: 1.43em;
  margin: 0.25rem 0;
  max-height: 4.28em;
  overflow: hidden;
}

.google-article-desktop-preview .article__publisher {
  color: var(--color-rolling-stone);
  display: flex;
  font-size: 12px;
  line-height: 1.33em;
  margin-bottom: 0.5rem;
}

.google-article-desktop-preview .article__publisher-logo {
  height: 1rem;
  margin-right: 0.5rem;
  width: auto;
}

.google-article-desktop-preview .article__publisher-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.google-article-desktop-preview .article__footer {
  padding: 12px 1rem 0;
}

.google-article-desktop-preview .article--variant .article__footer {
  padding: 0;
}

.google-article-desktop-preview .article__time {
  color: var(--color-rolling-stone);
  font-size: 12px;
  line-height: 1.33em;
}

/* Article Carrousel */
.google-article-desktop-preview .article-carrousel {
  display: flex;
  list-style: none;
  margin-top: 1rem;
}

.google-article-desktop-preview .article-carrousel__item {
  margin-right: 0.5rem;
  width: 13.125rem;
}

.google-article-desktop-preview .article-carrousel__item:last-of-type {
  margin-right: 0;
  position: relative;
}

.google-article-desktop-preview .article-carrousel__item:last-of-type::after {
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.04),
    0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.2);
  color: var(--color-rolling-stone);
  content: "›";
  font-size: 1.5rem;
  height: 38px;
  line-height: 36px;
  position: absolute;
  right: -19px;
  text-align: center;
  top: calc(50% - 19px);
  width: 38px;
}

/* Skeleton UI */
.google-article-desktop-preview .article__skeleton-headline,
.google-article-desktop-preview .article__skeleton-image,
.google-article-desktop-preview .article__skeleton-publisher,
.google-article-desktop-preview .article__skeleton-time {
  background-color: var(--color-gallery);
}

.google-article-desktop-preview .article__skeleton-image {
  border-bottom: 1px solid var(--color-iron);
  height: 119px;
}

.google-article-desktop-preview .article__skeleton-headline,
.google-article-desktop-preview .article__skeleton-publisher,
.google-article-desktop-preview .article__skeleton-time {
  border-radius: 3px;
  border: 1px solid var(--color-iron);
}

.google-article-desktop-preview .article__skeleton-publisher {
  height: 20px;
  margin-bottom: 0.25rem;
}

.google-article-desktop-preview .article__skeleton-headline {
  height: 83px;
  margin-bottom: 0.25rem;
}

.google-article-desktop-preview .article__skeleton-time {
  height: 20px;
}
</style>
