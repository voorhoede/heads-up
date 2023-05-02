<template>
  <div>
    <div class="linkedin-preview">
      <a
        rel="noopener"
        target="_blank"
        :href="url"
        class="linkedin-preview__link-container"
        :class="{ 'linkedin-preview__small': !imageIsBig }"
      >
        <div :class="image ? 'linkedin-preview__fixed-ratio linkedin-preview__ratio' : 'linkedin-preview__media linkedin-preview__media--image-fallback'">
          <img
            v-if="image"
            :src="image"
            class="linkedin-preview__fixed-ratio-content"
          />
          <div v-else class="linkedin-preview__image-fallback"></div>
        </div>
        <div class="linkedin-preview__content">
          <div class="linkedin-preview__title">
            {{ title }}
          </div>
          <div class="linkedin-preview__domain">
            <div class="linkedin-preview__hostname">
              {{ hostname }}
            </div>
          </div>
        </div>
      </a>
    </div>
    <div class="linkedin-preview__like">
      <svg enable-background="new 0 0 43.6 43.6" version="1.1" viewBox="0 0 43.6 43.6" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(0 48)">
          <path fill="none" d="m21.8-48c12 0 21.8 9.8 21.8 21.8s-9.8 21.8-21.8 21.8-21.8-9.7-21.8-21.8c0-12 9.8-21.8 21.8-21.8z"/>
          <circle fill-rule="evenodd" clip-rule="evenodd" fill="#1485BD" cx="21.8" cy="-26.2" r="19.1"/>
          <path fill-rule="evenodd" clip-rule="evenodd" fill="#E6F7FF" d="m32.5-28.2h-1.5c-0.1 0-0.4-0.5-1.1-1.3-1-1.1-2.1-2.5-2.9-3.2-2-1.7-3.6-3.8-4.7-6.1-0.7-1.4-0.7-2-2-2-1.1 0.1-1.9 1.1-1.8 2.2 0 0.4 0.2 1.7 0.3 2.2 0.6 2.1 1.5 4.2 2.7 6h1.5-11.7c-0.7 0-1.3 0.3-1.8 0.8s-0.7 1.1-0.6 1.8c0.1 1.3 1.2 2.3 2.5 2.3h0.4c-0.6 0-1.1 0.3-1.5 0.7s-0.6 1-0.6 1.5c0 1.1 0.9 2.1 2 2.2-0.7 0.5-1 1.4-0.8 2.2s0.9 1.5 1.7 1.6c-0.3 0.5-0.3 1-0.2 1.5 0.3 1 1.2 1.7 2.3 1.7h6.3c0.8 0 1.6-0.1 2.4-0.3l3.9-1.1h5.2c2.7-0.2 3.5-12.7 0-12.7z"/>
          <path fill="none" d="m19.9-37.9c0.5 2.7 1.5 5.2 3.1 7.4"/>
          <path fill="none" d="M16.2-15.6h5.9c1.8-0.4,3.5-0.9,5.2-1.5H31"/>
          <path fill="#004B7C" d="m14.6-12.6c-1.6 0-3.1-1.1-3.5-2.7-0.1-0.4-0.1-0.8-0.1-1.1-0.9-0.7-1.5-1.7-1.5-2.9 0-0.4 0.1-0.8 0.2-1.1-0.8-0.7-1.3-1.7-1.4-2.8 0-0.6 0.1-1.2 0.4-1.8-0.7-0.6-1.2-1.6-1.3-2.6s0.2-2.1 0.9-2.9 1.8-1.2 2.9-1.3h6.5c-0.2-0.4-0.4-0.7-0.6-1.1-0.4-0.9-0.7-1.8-0.9-2.6s-0.3-1.8-0.2-2.7c0.1-0.5 0.2-0.9 0.3-1.2 0.2-0.5 0.6-1 0.9-1.4 1.3-1.4 3.5-1.6 5-0.4 0.6 0.7 1 1.3 1.3 1.9 1 2.1 2.5 4 4.3 5.6 0.5 0.5 1.1 1.2 1.8 1.9 0.4 0.5 0.8 1 1.2 1.4 0.3 0.3 0.5 0.6 0.7 0.8h0.8c2.4 0 3.8 2.7 3.8 7.1 0 0.8-0.1 8.2-3.7 8.2h-5l-3.6 1.3c-1 0.3-1.9 0.4-2.9 0.4h-6.3c0.1 0 0.1 0 0 0zm-2.8-14.2c0.7 0 1.4 0.6 1.4 1.3s-0.6 1.4-1.3 1.4c-0.2 0-0.4 0.1-0.5 0.2s-0.2 0.3-0.2 0.5c0 0.5 0.4 0.8 0.8 0.9 0.6 0.1 1 0.4 1.2 1s0 1.1-0.5 1.4c-0.2 0.2-0.3 0.4-0.3 0.7 0 0.4 0.3 0.8 0.7 0.8 0.4 0.1 0.8 0.4 1 0.8s0.2 0.9-0.1 1.2c-0.1 0.2-0.1 0.4-0.1 0.6 0.1 0.3 0.5 0.6 0.9 0.6h6.2c0.7 0 1.4-0.1 2.1-0.3l3.8-1.3c0.1 0 0.3-0.1 0.4-0.1h5.2c0.4-0.4 1.2-3.7 0.9-7.1-0.2-2.1-0.8-2.7-0.9-2.8h-1.6c-0.7 0-1-0.5-1.4-0.9-0.2-0.2-0.4-0.5-0.6-0.8-0.4-0.5-0.9-1-1.3-1.5-0.6-0.7-1.1-1.3-1.6-1.7-2-1.8-3.7-4-4.9-6.5-0.2-0.4-0.4-0.8-0.7-1.1-0.2-0.2-0.8-0.1-1.1 0.3-0.2 0.2-0.4 0.4-0.5 0.7-0.1 0.1-0.1 0.3-0.2 0.5 0 0.5 0 1.1 0.2 1.7 0.2 0.8 0.4 1.4 0.7 2.1 0.4 0.7 0.9 1.5 1.5 2.3 0.2 0.2 0.4 0.4 0.5 0.6s0.1 0.4 0.1 0.6v0.1c0 0.8-0.6 1.4-1.4 1.4h-9.1c-0.2 0-0.6 0.1-0.8 0.4-0.2 0.2-0.3 0.5-0.2 0.8 0.1 0.7 0.6 1.1 1.1 1.1h0.6z"/>
        </g>
      </svg>
      <p
        class="linkedin-preview__like-count"
        :class="{ '-theme-with-dark-background': dark }"
      >
        {{ likes }}
      </p>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { getHostname } from './js/utils.js';

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const dark = computed(() => props.data.theme === 'dark');
    const hostname = computed(() => getHostname(props.data.url));
    const image = computed(() => props.data.image);
    const imageIsBig = computed(() => props.data.imageIsBig === 'true');
    const likes = computed(() => Math.floor(Math.random() * 98) + 1);
    const title = computed(() => props.data.title);
    const url = computed(() => props.data.url);

    return {
      dark,
      hostname,
      image,
      imageIsBig,
      likes,
      title,
      url,
    };
  },
};
</script>

<style>
@import "./css/defaults.css";

:root {
  --linkedin-color-border: #E1E8ED;
  --linkedin-image-small-size: 85px;
  --linkedin-image-medium-size: 104px;
  --linkedin-image-large-size: 124px;
  --linkedin-base-color: #292F33;
  --linkedin-muted-color: rgba(0, 0, 0, 0.6);
  --linkedin-background-color: #f3f6f8;
  --linkedin-color-white: #ffffff;
}

.-theme-with-dark-background {
  --linkedin-color-border: rgb(56, 68, 77);
}

.linkedin-preview {
  margin-bottom: 8px;
  background-color: var(--linkedin-background-color);
  font-size: 14px;
}

.linkedin-preview__link-container {
  display: block;
  height: 100%;
  border: 1px solid var(--linkedin-color-border);
  text-decoration: none;
  cursor: pointer;
}

.linkedin-preview__link-container--vertical {
  display: block;
}

.linkedin-preview__ratio {
  padding-bottom: 52.356%;
}

.linkedin-preview__fixed-ratio {
  display: block;
  position: relative;
  height: 0;
  overflow: hidden;
}

.linkedin-preview__fixed-ratio-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  max-width: inherit;
  height: 100%;
  object-fit: cover;
}

.linkedin-preview__fixed-ratio-content::before {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  background-color: var(--linkedin-background-color);
}

.linkedin-preview__image {
  width: 100%;
  max-width: none;
  height: 100%;
  object-fit: cover;
}

.linkedin-preview__media {
  flex-basis: calc(var(--linkedin-image-small-size) + 1px);
  flex-grow: 0;
  flex-shrink: 0;
  height: 100%;
  border-right: 1px solid var(--linkedin-color-border);
}

.linkedin-preview__media--image-fallback {
  background-color: var(--linkedin-color-border);
}

.linkedin-preview__image-fallback {
  height: 100%;
  background-image: url('/assets/image-not-found.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 3em;
}

.linkedin-preview__content {
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  overflow: hidden;
  transition: background-color 0.15s linear;
  background-color: transparent;
}

.linkedin-preview__title {
  display: -webkit-box;
  overflow: hidden;
  color: var(--linkedin-base-color);
  font-size: 1em;
  font-weight: bold;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.linkedin-preview__hostname {
  overflow: hidden;
  color: var(--linkedin-muted-color);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.linkedin-preview__like {
  display: flex;
  margin: 8px 16px;
  color: var(--linkedin-muted-color);
  font-size: 12px;
}

.linkedin-preview__like svg {
  height: 1.3em;
  margin-right: 4px;
}

.linkedin-preview__small {
  display: flex;
  padding: 12px 16px;
}

.linkedin-preview__small .linkedin-preview__fixed-ratio {
  min-width: 138px;
  height: auto;
  min-height: 72px;
}

.linkedin-preview__small .linkedin-preview__ratio {
  padding-bottom: 0;
}

.linkedin-preview__like-count {
  color: var(--linkedin-base-color);
}

.-theme-with-dark-background.linkedin-preview__like-count {
  color: var(--linkedin-color-white);
}
</style>
