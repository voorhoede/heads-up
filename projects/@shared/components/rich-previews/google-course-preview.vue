<template>
  <div class="google-course-preview">
    <h3 class="iframe-heading" :class="{ 'iframe-heading--dark-mode': isDarkMode }">Course</h3>
    <div v-if="!isMobile" class="warning-message">
      <app-icon name="warning" />
      <p>Google does not show a rich-preview for <strong>'Course'</strong> on <strong>'Desktop'</strong>.</p>
    </div>

    <div v-else-if="hasRequiredData" class="scroll-container">
      <div class="scroll-container__inner">
        <div class="google-course" :class="{
          'google-course--dark': isDarkMode,
          'google-course--mobile': isMobile
        }">
          <a class="google-course__link" rel="noopener" target="_blank" :href="url">
            <ul class="google-course__url">
              <li v-if="favicon && isMobile" class="google-course__url-segment--favicon">
                <img :src="favicon" alt="">
              </li>
              <li
                class="google-course__url-segment"
                v-for="(segment, index) in breadcrumbSegments"
                :key="index"
              >
                {{ segment }}
              </li>
            </ul>
            <p class="google-course__title">{{ title }}</p>
          </a>
          <ul class="google-course__courses">
            <li class="google-course__course">
              <a class="google-course__course-link" rel="noopener" target="_blank" :href="url">
                <div>
                  <p class="google-course__course-name">{{ name }}</p>
                  <p class="google-course__course-description">{{ description }}</p>
                  <p class="google-course__course-provider-name">{{ providerName }}</p>
                </div>
                <svg class="google-course__course-arrow"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                </svg>
              </a>
            </li>
            <li v-for="index in 2" :key="index" class="google-course__course">
              <div class="google-course__course-link">
                <div class="google-course__skeleton-container">
                  <div class="google-course__course-name google-course__skeleton-text"></div>
                  <div class="google-course__course-description google-course__skeleton-text"></div>
                  <div class="google-course__course-provider-name google-course__skeleton-text"></div>
                </div>
                <svg class="google-course__course-arrow"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                </svg>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div v-else class="warning-message">
      <app-icon name="warning" />
      <p>This page does not contain the necessary metadata to create a preview.</p>
    </div>

    <p>
      Preview based on <external-link href="https://google.com/">google.com</external-link> (Updated on {{ updatedOn }}).
    </p>
  </div>
</template>

<script>
import { computed } from 'vue';
import { getUrlSegments, truncateString } from '@shared/lib/google-utils.js';

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
    const breadcrumbSegments = computed(() => props.data.breadcrumbSegments
      ? truncateString(`${ domainWithoutProtocol.value },${ props.data.breadcrumbSegments }`, 46).split(',').filter(Boolean)
      : getUrlSegments(props.data.url));
    const description = computed(() => props.data.description);
    const domainWithoutProtocol = computed(() => new URL(props.data.url).origin.replace(/(^\w+:|^)\/\//, ''));
    const favicon = computed(() => props.data.favicon);
    const isDarkMode = computed(() => props.data.theme === 'dark');
    const isMobile = computed(() => props.data.isMobile);
    const name = computed(() => props.data.name);
    const providerName = computed(() => props.data.providerName);
    const title = computed(() => props.data.headTitle);
    const updatedOn = computed(() => props.data.updatedOn);
    const url = computed(() => props.data.url);

    const hasRequiredData = computed(() =>
      !!description.value &&
      !!name.value &&
      !!providerName.value &&
      !!url.value
    );

    return {
      breadcrumbSegments,
      description,
      favicon,
      hasRequiredData,
      isDarkMode,
      isMobile,
      name,
      providerName,
      title,
      updatedOn,
      url,
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

/* Course */
.google-course__link {
  text-decoration: none;
}

.google-course__url {
  -webkit-line-clamp: 1;
  color: var(--color-shark);
  font-size: 0.875rem;
  line-height: 1.3;
  list-style: none;
  margin: 0;
}

.google-course--dark .google-course__url {
  color: var(--color-silver-sand);
}

.google-course__url-segment {
  display: inline-block;
  height: 1rem;
  line-height: 1;
  margin-right: 0.2rem;
  vertical-align: middle;
}

.google-course__url-segment--favicon {
  aspect-ratio: auto 16 / 16;
  display: inline-block;
  height: 1rem;
  margin-right: 0.75rem;
  vertical-align: middle;
  width: 1rem;
}

.google-course__url-segment:not(:first-of-type) {
  color: var(--color-shuttle-gray);
}

.google-course--mobile .google-course__url-segment:nth-of-type(2) {
  color: inherit;
}

.google-course__url-segment:not(:last-of-type)::after {
  color: var(--color-shuttle-gray);
  content: " ›";
}

.google-course--dark .google-course__url-segment:not(:first-of-type),
.google-course--dark .google-course__url-segment:not(:last-of-type)::after {
  color: var(--color-manatee);
}

.google-course--dark.google-course--mobile .google-course__url-segment:nth-of-type(2) {
  color: inherit;
}

.google-course__url-segment:last-of-type {
  position: relative;
}

.google-course__url-segment:last-of-type::after {
  border-color: var(--color-rolling-stone) transparent;
  border-style: solid;
  border-width: 0.313rem 0.25rem 0;
  content: "";
  height: 0;
  margin-top: -0.125rem;
  position: absolute;
  right: -0.938rem;
  top: 50%;
  width: 0;
}

.google-course__url,
.google-course__title {
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
}

.google-course__title {
  -webkit-line-clamp: 1;
  color: var(--color-ultramarine);
  font-size: 1.25rem;
  line-height: 1.3;
  margin: 0.25rem 0 0.188rem;
  max-width: 34.375rem;
}

.google-course--dark .google-course__title {
  color: var(--color-cornflower-blue);
}

.google-course--mobile .google-course__title {
  -webkit-line-clamp: 2;
}

.google-course__courses {
  color: var(--color-mine-shaft);
  font-size: 0.75rem;
  margin-top: 0.75rem;
}

.google-course--dark .google-course__courses {
  color: var(--color-silver-sand);
}

.google-course__course {
  border-bottom: 1px solid var(--color-iron);
  padding: 0.75rem 0;
}

.google-course--dark .google-course__course {
  border-bottom-color: var(--color-manatee);
}

.google-course__course:last-of-type {
  border-bottom: none;
  padding-bottom: 0;
}

.google-course__course-link {
  align-items: center;
  color: inherit;
  display: flex;
  text-decoration: none;
}

.google-course__course-name,
.google-course__course-description,
.google-course__course-provider-name {
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  display: -webkit-box;
  overflow: hidden;
}

.google-course__course-name {
  font-size: 0.875rem;
  line-height: 1rem;
  margin-bottom: 0.375rem;
}

.google-course__course-provider-name {
  color: var(--color-rolling-stone);
  margin-top: 0.125rem;
}

.google-course--dark .google-course__course-provider-name {
  color: var(--color-manatee);
}

.google-course__course-arrow {
  display: block;
  fill: var(--color-rolling-stone);
  flex-shrink: 0;
  height: 1.5rem;
  margin-left: 0.5rem;
  width: 1.5rem;
}

.google-course--dark .google-course__course-arrow {
  fill: var(--color-manatee);
}

/* Skeleton UI */
.google-course__skeleton-container {
  flex-grow: 1;
}

.google-course__skeleton-text {
  background-color: var(--color-gallery);
  border-radius: 3px;
  border: 1px solid var(--color-iron);
  height: 1rem;
  width: 100%;
}

.google-course--dark .google-course__skeleton-text {
  background-color: var(--color-manatee);
  border-color: var(--color-silver-sand);
}
</style>
