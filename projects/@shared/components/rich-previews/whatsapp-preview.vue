<template>
  <div class="whatsapp-preview">
    <a
      rel="noopener"
      target="_blank"
      :href="url"
    >
      <div class="whatsapp-top">
        <div>
          <div class="whatsapp-preview__content">
            <div
              v-if="title && title !== 'undefined'"
              class="whatsapp-preview__title"
            >
              {{ title }}
            </div>
            <div class="whatsapp-preview__description">
              {{ description }}
            </div>
          </div>
          <div class="whatsapp-preview__url">
            www.{{ hostname }}
          </div>
        </div>
        <div
          v-if="image"
          class="whatsapp-preview__media"
        >
          <img :src="image" class="whatsapp-preview__image">
        </div>
      </div>

      <div class="whatsapp-preview__domain">
        <div class="whatsapp-preview__hostname">
          {{ url }}
          <span class="whatsapp-preview__timewrapper">
            <time class="whatsapp-preview__time">{{ currentTime }}</time>
            <span class="whatsapp-preview__checkmark">
              <svg viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#4FC3F7"/>
              </svg>
            </span>
          </span>
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
    const currentTime = computed(() => new Date().toLocaleTimeString());
    const description = computed(() => props.data.description);
    const hostname = computed(() => getHostname(props.data.url));
    const image = computed(() => props.data.image);
    const title = computed(() => props.data.title);
    const url = computed(() => props.data.url);

    return {
      currentTime,
      description,
      hostname,
      image,
      title,
      url,
    };
  },
}
</script>

<style>
@import "../../../rich-previews/@shared/css/defaults.css";

:root {
  --whatsapp-color-border: #E1E8ED;
  --whatsapp-base-color: #292F33;
  --whatsapp-label-color: rgba(0, 0, 0, .6);
  --whatsapp-accent-color: #039be5;
  --whatsapp-background-color: #dcf8c6;
  --whatsapp-content-background-color: rgba(0, 0, 0, 0.05);
  --whatsapp-lh: 1.2rem;
}

html {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;
  text-decoration: none;
}

.whatsapp-top {
  display: flex;
  justify-content: space-between;
  background-color: var(--whatsapp-content-background-color);
  border-radius: 7.5px;
  margin-bottom: 6px;
}

.whatsapp-preview__media {
  height: 69px;
  min-width: 69px;
  max-width: 69px;
}

.whatsapp-preview__image {
  border-top-right-radius: 7.5px;
  object-fit: cover;
  height: 100%;
  display: block;
}

.whatsapp-preview__content {
  margin: 6px 10px 0;
  overflow: hidden;
}

.whatsapp-preview__title {
  font-size: 13px;
  color: var(--whatsapp-base-color);
  line-height: var(--whatsapp-lh);
  color: black;
  font-weight: 400;
}

.whatsapp-preview__description {
  color: var(--whatsapp-label-color);
  line-height: var(--whatsapp-lh);
  font-size: 12px;
}

.whatsapp-preview__url {
  color: var(--whatsapp-base-color);
  font-size: 11px;
  line-height: var(--whatsapp-lh);
  padding: 0 10px 6px;
}

.whatsapp-preview__hostname {
  color: var(--whatsapp-accent-color);
  font-size: 12px;
  overflow-wrap: break-word;
}

.whatsapp-preview {
  box-shadow: 0 1px 0.5px rgba(0, 0, 0, .13);
  border-radius: 7.5px;
  padding: 3px 3px 8px 3px;
  background-color: var(--whatsapp-background-color);
  position: relative;

}

.whatsapp-preview > a {
  text-decoration: none;
}

.whatsapp-preview__domain {
  padding: 0 4px 0 6px;
}

.whatsapp-preview__tail {
  width: 12px;
  height: 19px;
  top: 0;
  right: -12px;
  position: absolute;
}

.whatsapp-preview__timewrapper {
  position: relative;
  display: flex;
  flex-flow: row-reverse;
  padding-top: 3px;
  float: right;
}

.whatsapp-preview__checkmark {
  position: absolute;
  right: -1px;
  top: 2px;
}

.whatsapp-preview__checkmark svg {
  height: auto;
  width: 16px;
}

.whatsapp-preview__time {
  color: rgba(0, 0, 0, .45);
  font-size: 11px;
  margin-right: 20px;
}

@media (min-width: 400px) {
  .whatsapp-preview__description {
    display: -webkit-box;
  }
}
</style>
