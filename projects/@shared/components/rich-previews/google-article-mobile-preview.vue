<template>
  <div class="google-article-mobile-preview">
    <h3 class="iframe-heading" :class="{ 'iframe-heading--dark-mode': isDarkMode }">NewsArticle</h3>
    <div v-if="!hasRequiredData" class="warning-message">
      <app-icon name="warning" />
      <p>This page does not contain the necessary metadata to create a preview.</p>
    </div>

    <div v-else class="scroll-container" :class="{ 'google--dark-mode': isDarkMode }">
      <div class="scroll-container__inner">
        <a rel="noopener" target="_blank" class="article article--variant">
          <div class="article__wrapper">
            <img :src="image" class="article__image"/>
            <div class="article__content">
              <div class="article__publisher">
                <img :src="publisherLogo" class="article__publisher-logo"/>
                <p class="article__publisher-name">{{ publisherName }}</p>
              </div>
              <div>
                <p class="article__headline">{{ headline }}</p>
                <div class="article__footer">
                  <time class="article__time">{{ dateModified }}</time>
                </div>
              </div>
            </div>
          </div>
        </a>
        <div class="article-carrousel">
          <h2 class="article-carrousel__title">Articles</h2>
          <ul>
            <li class="article-carrousel__item">
              <a rel="noopener" target="_blank" class="article">
                <div class="article__wrapper">
                  <img :src="image" class="article__image"/>
                  <div class="article__content">
                    <div class="article__publisher">
                      <img :src="publisherLogo" class="article__publisher-logo"/>
                      <p class="article__publisher-name">{{ publisherName }}</p>
                    </div>
                    <div>
                      <p class="article__headline">{{ headline }}</p>
                      <div class="article__footer">
                        <time class="article__time">{{ dateModified }}</time>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </li>
            <li class="article-carrousel__item">
              <a rel="noopener" target="_blank" class="article article--no-hover">
                <div class="article__wrapper">
                  <div class="article__image article__skeleton-image"></div>
                  <div class="article__content">
                    <div class="article__skeleton-publisher"></div>
                    <div class="article__skeleton-headline"></div>
                    <div class="article__skeleton-time"></div>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
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

/* Article */
.google-article-mobile-preview .article {
  background-color: var(--color-white);
  border-radius: 0.5rem;
  box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
  cursor: pointer;
  display: block;
  padding: 1rem;
}

.google-article-mobile-preview .article--no-hover {
  cursor: default;
}

.google-article-mobile-preview .article__wrapper {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
}

.google-article-mobile-preview .article__content {
  flex-grow: 1;
}

.google-article-mobile-preview .article__image {
  background-color: var(--color-athens-gray);
  border-radius: 0.5rem;
  display: block;
  height: 92px;
  margin-left: 1rem;
  object-fit: cover;
  object-position: center;
  width: 92px;
}

.google-article-mobile-preview .article__headline {
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  color: var(--color-shark);
  display: -webkit-box;
  font-size: 1rem;
  height: auto;
  line-height: 20px;
  margin-bottom: 0.25rem;
  overflow: hidden;
}

.google-article-mobile-preview .article__publisher {
  color: var(--color-rolling-stone);
  display: flex;
  font-size: 12px;
  line-height: 1.33em;
  margin-bottom: 0.5rem;
}

.google-article-mobile-preview .article__publisher-logo {
  height: 1rem;
  margin-right: 0.5rem;
  width: auto;
}

.google-article-mobile-preview .article__publisher-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.google-article-mobile-preview .article__time {
  color: var(--color-rolling-stone);
  font-size: 12px;
  line-height: 1rem;
}

/* Article Carrousel */
.google-article-mobile-preview .article-carrousel {
  border-radius: 0.5rem;
  box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
  list-style: none;
  margin-top: 1rem;
  overflow: hidden;
}

.google-article-mobile-preview .article-carrousel .article {
  border-radius: 0;
  box-shadow: none;
}

.google-article-mobile-preview .article-carrousel .article__wrapper {
  flex-direction: row;
  justify-content: flex-start;
}

.google-article-mobile-preview .article-carrousel .article__image {
  margin-left: 0;
  margin-right: 1rem;
}

.google-article-mobile-preview .article-carrousel__title {
  background-color: var(--color-white);
  border-bottom: 1px solid var(--color-iron);
  font-size: 1rem;
  font-weight: bold;
  line-height: 1.25;
  margin: 0;
  padding: 1rem;
}

.google-article-mobile-preview .article-carrousel__item {
  border-bottom: 1px solid var(--color-iron);
}

.google-article-mobile-preview .article-carrousel__item:last-of-type {
  border-bottom: none;
}

/* Skeleton UI */
.google-article-mobile-preview .article__skeleton-headline,
.google-article-mobile-preview .article__skeleton-image,
.google-article-mobile-preview .article__skeleton-publisher,
.google-article-mobile-preview .article__skeleton-time {
  background-color: var(--color-gallery);
  border: 1px solid var(--color-iron);
}

.google-article-mobile-preview .article__skeleton-headline,
.google-article-mobile-preview .article__skeleton-publisher,
.google-article-mobile-preview .article__skeleton-time {
  border-radius: 3px;
}

.google-article-mobile-preview .article__skeleton-publisher {
  height: 20px;
  margin-bottom: 0.25rem;
}

.google-article-mobile-preview .article__skeleton-headline {
  height: 44px;
  margin-bottom: 0.25rem;
}

.google-article-mobile-preview .article__skeleton-time {
  height: 20px;
}
</style>
