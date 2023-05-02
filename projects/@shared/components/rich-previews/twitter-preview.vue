<template>
  <div
    class="twitter-preview"
    :class="{
      '-theme-with-dark-background': dark,
      'twitter-preview--player': type === 'player',
    }"
  >
    <a
      rel="noopener"
      target="_blank"
      :href="url"
      class="twitter-preview__link-container"
      :class="{ 'twitter-preview__link-container--vertical': type === 'summary_large_image' }"
    >
      <!-- Image -->
      <div
        v-if="image"
        :class="type === 'summary_large_image' ? 'twitter-preview__fixed-ratio twitter-preview__ratio' : 'twitter-preview__media'"
      >
        <img
          :src="image"
          :class="type === 'summary_large_image' ? 'twitter-preview__fixed-ratio-content' : 'twitter-preview__image'"
        />
        <div class="twitter-preview__player-link" v-if="type === 'player'">
          <svg class="twitter-preview__player-icon" viewBox="0 0 24 24">
            <path d="M20.436 11.37L5.904 2.116a.751.751 0 00-1.152.633v18.5a.751.751 0 001.152.633l14.53-9.248a.749.749 0 00.002-1.266z"/>
          </svg>
        </div>
      </div>
      <!-- Image fallback -->
      <div
        v-else
        class="twitter-preview__media twitter-preview__media--image-fallback"
      >
        <div class="twitter-preview__image-fallback"></div>
      </div>
      <div class="twitter-preview__content">
        <div class="twitter-preview__title">
          {{ title }}
        </div>
        <div class="twitter-preview__description">
          {{ description }}
        </div>
        <div class="twitter-preview__domain">
          <svg viewBox="0 0 24 24" class="twitter-preview__icon"><g><path d="M11.96 14.945c-.067 0-.136-.01-.203-.027-1.13-.318-2.097-.986-2.795-1.932-.832-1.125-1.176-2.508-.968-3.893s.942-2.605 2.068-3.438l3.53-2.608c2.322-1.716 5.61-1.224 7.33 1.1.83 1.127 1.175 2.51.967 3.895s-.943 2.605-2.07 3.438l-1.48 1.094c-.333.246-.804.175-1.05-.158-.246-.334-.176-.804.158-1.05l1.48-1.095c.803-.592 1.327-1.463 1.476-2.45.148-.988-.098-1.975-.69-2.778-1.225-1.656-3.572-2.01-5.23-.784l-3.53 2.608c-.802.593-1.326 1.464-1.475 2.45-.15.99.097 1.975.69 2.778.498.675 1.187 1.15 1.992 1.377.4.114.633.528.52.928-.092.33-.394.547-.722.547z"></path><path d="M7.27 22.054c-1.61 0-3.197-.735-4.225-2.125-.832-1.127-1.176-2.51-.968-3.894s.943-2.605 2.07-3.438l1.478-1.094c.334-.245.805-.175 1.05.158s.177.804-.157 1.05l-1.48 1.095c-.803.593-1.326 1.464-1.475 2.45-.148.99.097 1.975.69 2.778 1.225 1.657 3.57 2.01 5.23.785l3.528-2.608c1.658-1.225 2.01-3.57.785-5.23-.498-.674-1.187-1.15-1.992-1.376-.4-.113-.633-.527-.52-.927.112-.4.528-.63.926-.522 1.13.318 2.096.986 2.794 1.932 1.717 2.324 1.224 5.612-1.1 7.33l-3.53 2.608c-.933.693-2.023 1.026-3.105 1.026z"></path></g></svg>
          <div class="twitter-preview__hostname">
            {{ hostname }}
          </div>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
import { computed } from 'vue';
import { getHostname } from '../../../rich-previews/@shared/js/utils.js';

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const dark = computed(() => props.data.theme === 'dark');
    const description = computed(() => props.data.description);
    const hostname = computed(() => getHostname(props.data.url));
    const image = computed(() => props.data.image);
    const title = computed(() => props.data.title);
    const type = computed(() => props.data.card);
    const url = computed(() => props.data.url);

    return {
      dark,
      description,
      hostname,
      image,
      title,
      type,
      url,
    };
  },
};
</script>

<style>
@import "../../../rich-previews/@shared/css/defaults.css";

:root {
  --twitter-base-color-variant: #5b7083;
  --twitter-base-color: #292f33;
  --twitter-bg-color-hover: #f5f8fa;
  --twitter-border-radius: 14px;
  --twitter-color-blue: #1da1f2;
  --twitter-color-border: #e1e8ed;
  --twitter-color-dark-blue: #1a91da;
  --twitter-color-white: #fff;
  --twitter-image-large-size: 124px;
  --twitter-image-medium-size: 104px;
  --twitter-image-small-size: 85px;
  --twitter-muted-color: #8899a6;
}

.-theme-with-dark-background {
  --twitter-base-color-variant: #fff;
  --twitter-base-color: #fff;
  --twitter-bg-color-hover: rgba(255, 255, 255, 0.03);
  --twitter-color-border: rgb(56, 68, 77);
}

html {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Ubuntu, "Helvetica Neue", sans-serif;
}

.twitter-preview {
  font-size: 14px;
}

.twitter-preview__link-container {
  display: flex;
  height: 100%;
  border-radius: var(--twitter-border-radius);
  border: 1px solid var(--twitter-color-border);
  text-decoration: none;
  cursor: pointer;
}

.twitter-preview__link-container--vertical {
  display: block;
}

.twitter-preview__ratio {
  padding-bottom: 52.356%;
}

.twitter-preview__fixed-ratio {
  display: block;
  position: relative;
  height: 0;
  overflow: hidden;
}

.twitter-preview__fixed-ratio-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-width: inherit;
  border-top-left-radius: var(--twitter-border-radius);
  border-top-right-radius: var(--twitter-border-radius);
  object-fit: cover;
}

.twitter-preview__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  max-width: none;
  border-top-left-radius: var(--twitter-border-radius);
  border-bottom-left-radius: var(--twitter-border-radius);
}

.twitter-preview__media {
  border-right: 1px solid var(--twitter-color-border);
  flex-shrink: 0;
  height: var(--twitter-image-small-size);
  position: relative;
  width: var(--twitter-image-small-size);
}

.twitter-preview__media--image-fallback {
  border-top-left-radius: var(--twitter-border-radius);
  border-bottom-left-radius: var(--twitter-border-radius);
  background-color: var(--twitter-color-border);
}

.twitter-preview__player-link {
  align-items: center;
  background-color: var(--twitter-color-blue);
  border-radius: 50%;
  border: 4px solid var(--twitter-color-white);
  display: flex;
  height: 2.2rem;
  justify-content: center;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-1.1rem, -1.1rem);
  width: 2.2rem;
}

.twitter-preview__player-link:hover {
  background-color: var(--twitter-color-dark-blue);
}

.twitter-preview__player-icon {
  fill: var(--twitter-color-white);
  height: 1rem;
  padding-left: 0.15rem;
  width: auto;
}

.twitter-preview__image-fallback {
  height: 100%;
  background-image: url("../../../rich-previews/src/@assets/image-not-found.svg");
  background-size: 3em;
  background-repeat: no-repeat;
  background-position: center;
}

.twitter-preview__content {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  overflow: hidden;
  width: 100%;

  border-radius: 0 0 var(--twitter-border-radius) var(--twitter-border-radius);
  background-color: transparent;
  transition: background-color 0.15s linear;
}

.twitter-preview__link-container:hover .twitter-preview__content {
  background-color: var(--twitter-bg-color-hover);
}

.twitter-preview__title {
  margin-bottom: 0.35em;

  /* Display on 2 lines and if longer than available space, cut off with '...' */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  font-size: 1em;
  color: var(--twitter-base-color);
  font-weight: bold;
}

.twitter-preview--player .twitter-preview__title,
.twitter-preview--player .twitter-preview__description,
.twitter-preview--player .twitter-preview__domain {
  font-size: .9375rem;
  font-weight: 400;
  line-height: 1.3125;
  margin: 0;
}

.twitter-preview__description {
  display: none;
  margin-bottom: 2px;
  color: var(--twitter-base-color);
}

.twitter-preview--player .twitter-preview__description,
.twitter-preview--player .twitter-preview__domain {
  color: var(--twitter-base-color-variant);
  margin-top: 0.125rem;
}

.twitter-preview__domain {
  display: flex;
  align-items: center;
  margin-top: 0.4em;
  color: var(--twitter-muted-color);
}

.twitter-preview__icon {
  fill: currentcolor;
  font-size: 13px;
  height: 1.25em;
  margin-right: 0.125rem;
}

.twitter-preview__hostname {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

@media (min-width: 416px) {
  .twitter-preview.is-small {
    height: calc(var(--twitter-image-medium-size) + 2px);
  }

  .twitter-preview__media {
    height: var(--twitter-image-medium-size);
    width: var(--twitter-image-medium-size);
  }
}

@media (min-width: 416px) and (max-width: 449px) {
  .twitter-preview__description {
    display: block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}

@media (min-width: 450px) {
  .twitter-preview.is-small {
    height: calc(var(--twitter-image-large-size) + 2px);
  }

  .twitter-preview__media {
    height: var(--twitter-image-large-size);
    width: var(--twitter-image-large-size);
  }

  /* Show on 1 line */
  .twitter-preview__title {
    display: block;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* Display on 2 lines and if longer than available space, cut off with '...' */
  .twitter-preview__description {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
</style>
