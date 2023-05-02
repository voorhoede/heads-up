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

.slack-preview {
  margin-bottom: 8px;
}

.slack-preview > a {
  text-decoration: none;
}

.slack-preview__image {
  width: 100%;
  max-width: none;
  height: 100%;
  border-radius: 4px;
  object-fit: cover;
}

.slack-preview__content {
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  transition: background-color .15s linear;
  background-color: transparent;
}

.slack-preview__title {
  display: -webkit-box;
  margin-bottom: .35em;
  overflow: hidden;
  color: rgb(18, 100, 163);
  font-size: 1em;
  font-weight: 600;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.slack-preview__description {
  display: flex;
  align-items: center;
  margin-bottom: 2px;
  margin-bottom: 4px;
  color: rgb(29, 28, 29);
}

.slack-preview__domain {
  display: flex;
  align-items: center;
  margin: .25em .25em .25em 0;
  color: var(--slack-muted-color);
}

.slack-preview__hostname {
  display: flex;
  align-items: center;
  overflow: hidden;
  color: var(--slack-base-color);
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.slack-preview__favicon {
  height: 12px;
  margin-right: 8px;
}

.slack-preview__sidebar {
  padding-right: 4px;
  border-radius: 30px;
  background-color: rgb(221, 221, 221);
}

.slack-preview__emoji {
  display: flex;
  align-items: center;
  width: 39px;
  height: 24px;
  margin-top: 8px;
  padding: 0 4px 6px;
  border-radius: 12px;
  background-color: var(--slack-color-border);
  font-size: 11px;
}

.slack-preview__emoji-image {
  height: 20px;
  margin-right: 2px;
}

.slack-preview__emoji-count {
  margin-top: 16px;
}

.slack-preview__expand {
  color: rgb(18, 100, 163);
  font-size: 9px;
}

.slack-preview__container {
  display: flex;
  min-width: 196px;
}

.slack-preview__image-container {
  position: relative;
  max-width: 360px;
  padding: 0 12px;
}

.slack-preview__image-container::after {
  content: '';
  position: absolute;
  top: 0;
  left: 12px;
  width: calc(100% - 24px);
  height: 100%;
  border-radius: 4px;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .1);
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
