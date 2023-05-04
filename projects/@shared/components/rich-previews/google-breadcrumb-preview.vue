<template>
  <div class="google-breadcrumb-preview">
    <h1 class="iframe-heading" :class="{ 'iframe-heading--dark-mode': isDarkMode }">Breadcrumb</h1>
    <div v-if="breadcrumbSegments.length > 1" class="scroll-container">
      <div class="scroll-container__inner">
        <div class="google-breadcrumb" :class="{
          'google-breadcrumb--dark': isDarkMode,
          'google-breadcrumb--mobile': isMobile
        }">
          <a class="google-breadcrumb__link" rel="noopener" target="_blank" :href="url">
            <ul class="google-breadcrumb__url">
              <li v-if="favicon && isMobile" class="google-breadcrumb__url-segment--favicon">
                <img :src="favicon" alt="" />
              </li>
              <li
                class="google-breadcrumb__url-segment"
                v-for="(segment, index) in breadcrumbSegments"
                :key="index"
              >
                {{ segment }}
              </li>
            </ul>
            <p class="google-breadcrumb__title">{{ title }}</p>
          </a>
          <p class="google-breadcrumb__description" v-html="description" />
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
import { truncateString } from '@shared/lib/google-utils.js';

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
    const breadcrumbSegments = computed(() => truncateString(
      `${ domainWithoutProtocol.value },${ props.data.breadcrumbSegments || '' }`, 46
    ).split(',').filter(Boolean));
    const description = computed(() => props.data.headDescription.replace(/ ?<br ?\/?> ?/gi, ' '));
    const domainWithoutProtocol = computed(() => new URL(props.data.headUrl).origin.replace(/(^\w+:|^)\/\//, ''));
    const favicon = computed(() => props.data.favicon);
    const isDarkMode = computed(() => props.data.theme === 'dark');
    const isMobile = computed(() => props.data.isMobile);
    const title = computed(() => props.data.headTitle);
    const updatedOn = computed(() => props.data.updatedOn);
    const url = computed(() => props.data.url);

    return {
      breadcrumbSegments,
      description,
      favicon,
      isDarkMode,
      isMobile,
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

/* Breadcrumb */
.google-breadcrumb__link {
  text-decoration: none;
}

.google-breadcrumb__link:hover .google-breadcrumb__title {
  text-decoration: underline;
}

.google-breadcrumb__url {
  -webkit-line-clamp: 1;
  color: var(--color-shark);
  font-size: 0.875rem;
  line-height: 1.3;
  list-style: none;
  margin: 0;
}

.google-breadcrumb--dark .google-breadcrumb__url {
  color: var(--color-silver-sand);
}

.google-breadcrumb__url-segment {
  display: inline-block;
  height: 1rem;
  line-height: 1;
  margin-right: 0.2rem;
  vertical-align: middle;
}

.google-breadcrumb__url-segment--favicon {
  aspect-ratio: auto 16 / 16;
  display: inline-block;
  height: 1rem;
  margin-right: 0.75rem;
  vertical-align: middle;
  width: 1rem;
}

.google-breadcrumb__url-segment:not(:first-of-type) {
  color: var(--color-shuttle-gray);
}

.google-breadcrumb--mobile .google-breadcrumb__url-segment:nth-of-type(2) {
  color: inherit;
}

.google-breadcrumb__url-segment:not(:last-of-type)::after {
  color: var(--color-shuttle-gray);
  content: " ›";
}

.google-breadcrumb--dark .google-breadcrumb__url-segment:not(:first-of-type),
.google-breadcrumb--dark .google-breadcrumb__url-segment:not(:last-of-type)::after {
  color: var(--color-manatee);
}

.google-breadcrumb--dark.google-breadcrumb--mobile .google-breadcrumb__url-segment:nth-of-type(2) {
  color: inherit;
}

.google-breadcrumb__url-segment:last-of-type {
  position: relative;
}

.google-breadcrumb__url-segment:last-of-type::after {
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

.google-breadcrumb__url,
.google-breadcrumb__title,
.google-breadcrumb__description {
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
}

.google-breadcrumb__title {
  -webkit-line-clamp: 1;
  color: var(--color-ultramarine);
  font-size: 1.25rem;
  line-height: 1.3;
  margin: 0.25rem 0 0.188rem;
  max-width: 34.375rem;
}

.google-breadcrumb--dark .google-breadcrumb__title {
  color: var(--color-cornflower-blue);
}

.google-breadcrumb--mobile .google-breadcrumb__title {
  -webkit-line-clamp: 2;
}

.google-breadcrumb__description {
  -webkit-line-clamp: 2;
  color: var(--color-abbey);
  font-size: 0.875rem;
  line-height: 1.58;
  word-wrap: break-word;
}

.google-breadcrumb--dark .google-breadcrumb__description {
  color: var(--color-silver-sand);
}

.google-breadcrumb--mobile .google-breadcrumb__description {
  -webkit-line-clamp: 3;
}
</style>
