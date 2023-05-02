<template>
  <div
    class="slack-preview"
    :class="{ '-theme-with-dark-background': dark }"
  >
    <a
      rel="noopener"
      target="_blank"
      :href="url"
      class="slack-preview__container"
    >
      <span class="slack-preview__sidebar"></span>
      <div
        class="slack-preview__content"
        :class="{ 'slack-preview__small': image && !imageIsBig }"
      >
        <div class="slack-preview__content-information">
          <div class="slack-preview__domain">
            <div class="slack-preview__hostname">
              <img
                v-if="favicon"
                class="slack-preview__favicon" :src="favicon"
                alt="favicon"
              />
                {{ siteName ? siteName : hostname }}
            </div>
          </div>
          <div class="slack-preview__title">
            {{ title }}
          </div>
          <div class="slack-preview__description">
            <p>
              {{ description }}
              <span v-if="image && imageIsBig" class="slack-preview__filesize">
                ({{ imageSize }})
                <span class="slack-preview__expand">▼</span>
              </span>
            </p>
          </div>

          <div
            v-if="additionalData"
            class="slack-preview__additional"
          >
            <div
              v-for="(item, index) in additionalData"
              class="slack-preview__additional-item"
              :key="index"
            >
              <strong>{{ item.label }}</strong>
              <p>{{ item.value }}</p>
            </div>
          </div>
          <div
            v-if="image"
            class="slack-preview__image-container"
          >
            <img :src="image" class="slack-preview__image" />
          </div>
        </div>
      </div>
    </a>

    <div class="slack-preview__emoji">
      <img
        class="slack-preview__emoji-image"
        src="../../../rich-previews/src/slack/assets/parrot.gif"
        alt=""
      />
      <p class="slack-preview__emoji-count">
        {{ emojiCount }}
      </p>
    </div>

  </div>
</template>

<script>
import { computed, shallowRef } from 'vue';
import { getHostname } from '../../../rich-previews/@shared/js/utils.js';

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const additionalData = shallowRef(null);
    const imageSize = shallowRef(null);

    try {
      additionalData.value = JSON.parse(props.data.additionalData);
    } catch {
      console.error('Invalid \'additionalData\' value.');
    }

    const dark = computed(() => props.data.theme === 'dark');
    const description = computed(() => props.data.description.substring(0, 700));
    const emojiCount = computed(() => Math.floor(Math.random() * 8) + 1);
    const favicon = computed(() => props.data.favicon);
    const hostname = computed(() => getHostname(props.data.url));
    const image = computed(() => props.data.image);
    const imageIsBig = computed(() => props.data.imageIsBig);
    const isValidImage = computed(() => props.data.isValidImage);
    const siteName = computed(() => props.data.siteName);
    const title = computed(() => props.data.title);
    const url = computed(() => props.data.url);

    if (isValidImage.value) {
      getImageFileSize(props.data.image)
        .then(size => imageSize.value = size)
        .catch(err => console.error('Issue in getting the image file size', err));
    }

    const getImageFileSize = image => fetch(image, { method: 'HEAD' })
      .then(x => `${ Math.round(Number(x.headers.get('content-length')) / 1000) } kB`)
      .catch(() => (Promise.resolve('0 kB')));

    return {
      additionalData,
      dark,
      description,
      emojiCount,
      favicon,
      hostname,
      image,
      imageIsBig,
      imageSize,
      isValidImage,
      siteName,
      title,
      url,
    };
  },
};
</script>

<style>
@import "../../../rich-previews/@shared/css/defaults.css";

:root {
  --slack-border-radius: 14px;
  --slack-color-border: #E1E8ED;
  --slack-image-small-size: 85px;
  --slack-image-medium-size: 104px;
  --slack-image-large-size: 124px;
  --slack-base-color: #292F33;
  --slack-muted-color: #8899A6;
}

.-theme-with-dark-background {
  --slack-color-border: rgb(56, 68, 77);
  --slack-base-color: #fff;
}

.data-slack-preview-card {
  display: flex;
}

.slack-preview > a {
  text-decoration: none;
}

.slack-preview__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  max-width: none;
  border-radius: 4px;
}

.slack-preview__content {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  background-color: transparent;
  transition: background-color .15s linear;
}

.slack-preview__title {
  margin-bottom: .35em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 1em;
  color: rgb(18, 100, 163);
  font-weight: 600;
}

.slack-preview__description {
  display: flex;
  margin-bottom: 2px;
  color: rgb(29, 28, 29);
  margin-bottom: 4px;
  align-items: center;
}

.slack-preview__domain {
  display: flex;
  align-items: center;
  margin: .25em .25em .25em 0;
  color: var(--slack-muted-color);
}

.slack-preview__hostname {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: var(--slack-base-color);
  font-weight: bold;
  display: flex;
  align-items: center;
}

.slack-preview__favicon {
  height: 12px;
  margin-right: 8px;
}

.slack-preview__sidebar {
  padding-right: 4px;
  background-color: rgb(221, 221, 221);
  border-radius: 30px;
}

.slack-preview__emoji {
  background-color: var(--slack-color-border);
  border-radius: 12px;
  width: 39px;
  height: 24px;
  padding: 0 4px 6px;
  display: flex;
  font-size: 11px;
  align-items: center;
  margin-top: 8px;
}

.slack-preview__emoji-image {
  height: 20px;
  margin-right: 2px;
}

.slack-preview__emoji-count {
  margin-top: 16px;
}

.slack-preview__expand {
  font-size: 9px;
  color: rgb(18, 100, 163);
}

.slack-preview__container {
  display: flex;
  min-width: 196px;
}

.slack-preview__image-container {
  max-width: 360px;
  padding: 0 12px;
  position: relative;
}

.slack-preview__image-container::after {
  border-radius: 4px;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .1);
  content: '';
  height: 100%;
  left: 12px;
  position: absolute;
  top: 0;
  width: calc(100% - 24px);
}

.slack-preview__small .slack-preview__image-container::after {
  display: none;
}

.slack-preview__content-information {
  padding: 0 12px;
}

.slack-preview__small {
  flex-direction: unset;
}

.slack-preview__small .slack-preview__content-information {
  width: calc(100% - 80px);
}

.slack-preview__small .slack-preview__image-container {
  width: 80px;
  height: 80px;
  padding: 0;
}

.slack-preview__filesize {
  white-space: nowrap;
}

.slack-preview__additional {
  display: flex;
  margin-bottom: 4px;
}

.slack-preview__additional-item {
  width: 50%;
}

.-theme-with-dark-background,
.-theme-with-dark-background .slack-preview__description {
  color: var(--slack-base-color);
}

.-theme-with-dark-background .slack-preview__sidebar {
  background-color: rgb(70, 70, 70);
}
</style>
