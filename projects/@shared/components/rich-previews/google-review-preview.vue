<template>
  <div class="google-review-preview">
    <h3 class="iframe-heading" :class="{ 'iframe-heading--dark-mode': isDarkMode }">Critic review</h3>
    <div v-if="!hasRequiredData" class="warning-message">
      <app-icon name="warning" />
      <p>This page does not contain the necessary metadata to create a preview.</p>
    </div>

    <div v-else class="scroll-container">
      <div class="scroll-container__inner">
        <div class="google-review" :class="{ 'google-review--mobile': isMobile }">
          <header class="google-review__header">
            <h4
              class="google-review__title"
              :class="{ 'google-review__title--short' : hasShortTitle }"
            >
              {{ itemReviewedName }}
            </h4>
            <span v-if="isBook" class="google-review__type">
              {{ itemReviewedType }} by {{ itemReviewedAuthorName }}
            </span>
            <span v-else-if="isMovie" class="google-review__type">
              Year ‧ Genre ‧ 0h 00m
            </span>
            <span v-else class="google-review__type">
              {{ itemReviewedType }}
            </span>
            <div class="google-review__button-group">
              <button class="google-review__button">Overview</button>
              <button class="google-review__button google-review__button--active">Reviews</button>
            </div>
            <svg v-if="isMobile" class="google-review__menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
            <svg v-else class="google-review__menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
            </svg>
          </header>
          <main>
            <section v-if="reviewRatingValue" class="google-review__section">
              <h2 v-if="isMobile" class="google-review__section-title">Ratings</h2>
              <p class="google-review__rating">
                {{ reviewRatingValue }}/5 ‧ <span class="google-review__rating-link">{{ publisherName }}</span>
              </p>
            </section>
            <section class="google-review__section">
              <h2 class="google-review__section-title">Critic reviews</h2>
              <article>
                <div class="google-review__description-wrapper">
                  <p class="google-review__description">
                    {{ description }} <span v-if="!isMobile" class="google-review__rating-link">Full review</span>
                  </p>
                  <svg v-if="isMobile" class="google-review__course-arrow"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                  </svg>
                </div>
                <footer class="google-review__footer">
                  <div class="google-review__publisher-wrapper">
                    <span>{{ authorName }}</span>
                    <span class="google-review__publisher-name">{{ publisherName }}</span>
                  </div>
                  <span v-if="isMobile && reviewRatingValue">{{ reviewRatingValue }}/5</span>
                </footer>
              </article>
            </section>
          </main>
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
    const authorName = computed(() => props.data.authorName);
    const description = computed(() => props.data.description);
    const hasShortTitle = computed(() => props.data.itemReviewedName.length <= 12);
    const isBook = computed(() => props.data.itemReviewedType.toLowerCase() === 'book');
    const isDarkMode = computed(() => props.data.theme === 'dark');
    const isMobile = computed(() => props.data.isMobile);
    const isMovie = computed(() => props.data.itemReviewedType.toLowerCase() === 'movie');
    const itemReviewedAuthorName = computed(() => props.data.itemReviewedAuthorName);
    const itemReviewedName = computed(() => props.data.itemReviewedName);
    const itemReviewedType = computed(() => props.data.itemReviewedType);
    const publisherName = computed(() => props.data.publisherName);
    const reviewRatingValue = computed(() => props.data.reviewRatingValue);
    const updatedOn = computed(() => props.data.updatedOn);

    const hasRequiredData = computed(() =>
      !!authorName.value &&
      !!description.value &&
      !!itemReviewedName.value &&
      !!itemReviewedType.value &&
      !!publisherName.value
    );

    return {
      authorName,
      description,
      hasRequiredData,
      hasShortTitle,
      isBook,
      isDarkMode,
      isMobile,
      isMovie,
      itemReviewedAuthorName,
      itemReviewedName,
      itemReviewedType,
      publisherName,
      reviewRatingValue,
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
  padding: 0;
}

/* Review */
.google-review {
  background-color: var(--color-white);
  border-radius: 0.5rem;
  border: 1px solid var(--color-iron);
  font-size: 0.875rem;
  line-height: 1.58;
}

.google-review--mobile {
  border-radius: 0;
  line-height: 1.25rem;
}

.google-review__header,
.google-review__section {
  padding: 0.75rem 1rem;
}

.google-review--mobile .google-review__header,
.google-review--mobile .google-review__section {
  padding: 1rem;
}

.google-review__header {
  position: relative;
}

.google-review__menu-icon {
  cursor: pointer;
  fill: var(--color-black);
  height: 1.125rem;
  opacity: 0.54;
  position: absolute;
  right: 1rem;
  top: 1rem;
  width: 1.125rem;
}

.google-review--mobile .google-review__menu-icon {
  fill: var(--color-rolling-stone);
  opacity: 1;
}

.google-review__title {
  color: var(--color-shark);
  font-size: 1.5rem;
  line-height: 1.34;
  width: calc(100% - 1.688rem);
}

.google-review__title--short {
  font-size: 1.875rem;
  line-height: 1.2;
}

.google-review--mobile .google-review__title {
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.75rem;
}

.google-review--mobile .google-review__title--short {
  font-size: 1.5rem;
  line-height: 2rem;
}

.google-review__type {
  color: var(--color-rolling-stone);
  margin-top: 0.25rem;
}

.google-review--mobile .google-review__type {
  color: var(--color-cape-cod);
  margin-top: 0.125rem;
}

.google-review__button-group {
  display: none;
}

.google-review--mobile .google-review__button-group {
  display: flex;
}

.google-review__button {
  background-color: #e7e7ea;
  border-radius: 25px;
  border: 1px solid #e7e7ea;
  color: #3f374f;
  cursor: pointer;
  display: block;
  font-weight: 500;
  line-height: 1;
  margin-top: 0.5rem;
  min-width: 2.25rem;
  outline: none;
  padding: 0.5rem 1rem;
}

.google-review__button--active {
  border: 1px solid #3f374f;
  margin-left: 0.375rem;
}

.google-review__section {
  border-top: 1px solid var(--color-iron);
}

.google-review__section-title {
  color: var(--color-mine-shaft);
  font-size: 1.25rem;
  line-height: 1.3;
  margin-bottom: 1rem;
}

.google-review--mobile .google-review__section-title {
  color: var(--color-shark);
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.5rem;
}

.google-review__rating {
  color: var(--color-shark);
}

.google-review--mobile .google-review__rating {
  line-height: 1.125rem;
}

.google-review__rating-link {
  color: var(--color-ultramarine);
  cursor: pointer;
  font-style: normal;
}

.google-review--mobile .google-review__rating-link {
  color: #1558d6;
}

.google-review__description-wrapper {
  align-items: center;
  display: flex;
}

.google-review--mobile .google-review__description-wrapper {
  cursor: pointer;
}

.google-review__description {
  color: var(--color-mine-shaft);
  flex-grow: 1;
  font-style: italic;
}

.google-review--mobile .google-review__description {
  color: var(--color-shark);
  font-style: normal;
}

.google-review__course-arrow {
  display: block;
  fill: var(--color-rolling-stone);
  flex-shrink: 0;
  height: 1.5rem;
  margin-left: 1rem;
  width: 1.5rem;
}

.google-review__footer {
  align-items: flex-start;
  color: var(--color-mine-shaft);
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
}

.google-review--mobile .google-review__footer {
  color: var(--color-rolling-stone);
  cursor: pointer;
  margin-top: 0.75rem;
}

.google-review__publisher-wrapper {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.google-review--mobile .google-review__publisher-wrapper {
  margin-right: 1rem;
}

.google-review__publisher-name {
  color: var(--color-ultramarine);
  cursor: pointer;
}

.google-review--mobile .google-review__publisher-name {
  color: inherit;
}
</style>
