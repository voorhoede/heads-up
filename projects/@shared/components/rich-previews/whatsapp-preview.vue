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
            <div v-if="title" class="whatsapp-preview__title">
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
        <div v-if="image" class="whatsapp-preview__media">
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
import { getHostname } from './js/utils.js';

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
};
</script>

<style>
@import "./css/defaults.css";

:root {
  --whatsapp-color-border: #E1E8ED;
  --whatsapp-base-color: #292F33;
  --whatsapp-label-color: rgba(0, 0, 0, .6);
  --whatsapp-accent-color: #039be5;
  --whatsapp-background-color: #dcf8c6;
  --whatsapp-content-background-color: rgba(0, 0, 0, 0.05);
  --whatsapp-lh: 1.2rem;
}

.whatsapp-preview {
  margin-bottom: 8px;
}

.whatsapp-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
  border-radius: 7.5px;
  background-color: var(--whatsapp-content-background-color);
}

.whatsapp-preview__media {
  min-width: 69px;
  max-width: 69px;
  height: 69px;
}

.whatsapp-preview__image {
  display: block;
  height: 100%;
  border-top-right-radius: 7.5px;
  object-fit: cover;
}

.whatsapp-preview__content {
  margin: 6px 10px 0;
  overflow: hidden;
}

.whatsapp-preview__title {
  color: var(--whatsapp-base-color);
  color: black;
  font-size: 13px;
  font-weight: 400;
  line-height: var(--whatsapp-lh);
}

.whatsapp-preview__description {
  color: var(--whatsapp-label-color);
  font-size: 12px;
  line-height: var(--whatsapp-lh);
}

.whatsapp-preview__url {
  padding: 0 10px 6px;
  color: var(--whatsapp-base-color);
  font-size: 11px;
  line-height: var(--whatsapp-lh);
}

.whatsapp-preview__hostname {
  color: var(--whatsapp-accent-color);
  font-size: 12px;
  overflow-wrap: break-word;
}

.whatsapp-preview {
  position: relative;
  padding: 3px 3px 8px 3px;
  border-radius: 7.5px;
  background-color: var(--whatsapp-background-color);
  box-shadow: 0 1px 0.5px rgba(0, 0, 0, .13);

}

.whatsapp-preview > a {
  text-decoration: none;
}

.whatsapp-preview__domain {
  padding: 0 4px 0 6px;
}

.whatsapp-preview__tail {
  position: absolute;
  top: 0;
  right: -12px;
  width: 12px;
  height: 19px;
}

.whatsapp-preview__timewrapper {
  display: flex;
  position: relative;
  flex-flow: row-reverse;
  padding-top: 3px;
  float: right;
}

.whatsapp-preview__checkmark {
  position: absolute;
  top: 2px;
  right: -1px;
}

.whatsapp-preview__checkmark svg {
  width: 16px;
  height: auto;
}

.whatsapp-preview__time {
  margin-right: 20px;
  color: rgba(0, 0, 0, .45);
  font-size: 11px;
}

@media (min-width: 400px) {
  .whatsapp-preview__description {
    display: -webkit-box;
  }
}
</style>
