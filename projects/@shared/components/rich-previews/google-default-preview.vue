<template>
  <div class="google-default-preview">
    <div class="scroll-container">
      <div class="scroll-container__inner">
        <div
          class="google-default"
          :class="{
            'google-default--dark': isDarkMode,
            'google-default--mobile': isMobile
          }"
        >
          <a class="google-default__link" rel="noopener" target="_blank" :href="url">
            <ul class="google-default__url">
              <li v-if="favicon && isMobile" class="google-default__url-segment--favicon">
                <img :src="favicon" alt="">
              </li>
              <li
                class="google-default__url-segment"
                v-for="(segment, index) in urlSegments"
                :key="index"
              >
                {{ segment }}
              </li>
            </ul>
            <p class="google-default__title">{{ title }}</p>
          </a>
          <p class="google-default__description" v-html="description" />
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
import { getUrlSegments } from '@shared/lib/google-utils.js';

import ExternalLink from '@shared/components/external-link';

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    console.log(props.data);
    const description = computed(() => props.data.description.replace(/ ?<br ?\/?> ?/gi, ' '));
    const favicon = computed(() => props.data.favicon);
    const isDarkMode = computed(() => props.data.theme === 'dark');
    const isMobile = computed(() => props.data.isMobile);
    const title = computed(() => props.data.title);
    const updatedOn = computed(() => props.data.updatedOn);
    const url = computed(() => props.data.url);
    const urlSegments = computed(() => getUrlSegments(props.data.url));

    return {
      description,
      favicon,
      isDarkMode,
      isMobile,
      title,
      updatedOn,
      url,
      urlSegments,
    };
  },

  components: {
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

/* Default */
.google-default__link {
  text-decoration: none;
}

.google-default__link:hover .google-default__title {
  text-decoration: underline;
}

.google-default__url {
  margin: 0;
  color: var(--color-shark);
  font-size: 0.875rem;
  line-height: 1.3;
  list-style: none;
  -webkit-line-clamp: 1;
}

.google-default--dark .google-default__url {
  color: var(--color-silver-sand);
}

.google-default__url-segment {
  display: inline-block;
  height: 1rem;
  margin-right: 0.2rem;
  line-height: 1;
  vertical-align: middle;
}

.google-default__url-segment--favicon {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  margin-right: 0.75rem;
  vertical-align: middle;
  aspect-ratio: auto 16 / 16;
}

.google-default__url-segment:not(:first-of-type) {
  color: var(--color-shuttle-gray);
}

.google-default--mobile .google-default__url-segment:nth-of-type(2) {
  color: inherit;
}

.google-default__url-segment:not(:last-of-type)::after {
  content: " ›";
  color: var(--color-shuttle-gray);
}

.google-default--dark .google-default__url-segment:not(:first-of-type),
.google-default--dark .google-default__url-segment:not(:last-of-type)::after {
  color: var(--color-manatee);
}

.google-default--dark.google-default--mobile .google-default__url-segment:nth-of-type(2) {
  color: inherit;
}

.google-default__url-segment:last-of-type {
  position: relative;
}

.google-default__url-segment:last-of-type::after {
  content: "";
  position: absolute;
  top: 50%;
  right: -0.938rem;
  width: 0;
  height: 0;
  margin-top: -0.125rem;
  border-width: 0.313rem 0.25rem 0;
  border-style: solid;
  border-color: var(--color-rolling-stone) transparent;
}

.google-default__url,
.google-default__title,
.google-default__description {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
}

.google-default__title {
  max-width: 34.375rem;
  margin: 0.25rem 0 0.188rem;
  color: var(--color-ultramarine);
  font-size: 1.25rem;
  line-height: 1.3;
  -webkit-line-clamp: 1;
}

.google-default--dark .google-default__title {
  color: var(--color-cornflower-blue);
}

.google-default--mobile .google-default__title {
  -webkit-line-clamp: 2;
}

.google-default__description {
  color: var(--color-abbey);
  font-size: 0.875rem;
  line-height: 1.58;
  word-wrap: break-word;
  -webkit-line-clamp: 2;
}

.google-default--dark .google-default__description {
  color: var(--color-silver-sand);
}

.google-default--mobile .google-default__description {
  -webkit-line-clamp: 3;
}
</style>
