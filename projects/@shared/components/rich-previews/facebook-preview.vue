<template>
  <div
    class="facebook-preview"
    :class="{ 'is-desktop': style === 'desktop' }"
  >
    <a
      rel="noopener"
      target="_blank"
      :href="url"
      class="facebook-preview__link-container"
      :class="{ 'facebook-preview__small': !imageIsBig }"
    >
      <!-- Image -->
      <div
        v-if="imageSpecified"
        class="facebook-preview__fixed-ratio"
        :class="{ 'facebook-preview__media--image-fallback': !image }"
      >
        <img
          v-if="image"
          class="facebook-preview__fixed-ratio-content"
          :src="image"
        />
      </div>

      <!-- Preview -->
      <div class="facebook-preview__wrapper">
        <div class="facebook-preview__hostname">{{ hostname }}</div>
        <div class="facebook-preview__content">
          <div class="facebook-preview__title">
            {{ title ? title : hostname }}
          </div>
          <div
            v-if="description"
            class="facebook-preview__description"
          >
            {{ description }}
          </div>
        </div>
      </div>
    </a>

    <!-- Interaction -->
    <div
      class="facebook-preview__interaction-wrapper"
      :class="{ '-theme-with-dark-background': dark }"
    >
      <div class="facebook-preview__interaction-stats">
        <i class="facebook-preview__interaction"></i>
        <p>{{ interaction }}</p>
      </div>
      <div class="facebook-preview__interaction-stats">
        <p>{{ comments }} comments</p>
        <p>{{ shares }} shares</p>
      </div>
    </div>

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
    const comments = computed(() => Math.floor(Math.random() * 388) + 11);
    const dark = computed(() => props.data.theme === 'dark');
    const description = computed(() => props.data.description.substring(0, 250));
    const hostname = computed(() => getHostname(props.data.url));
    const image = computed(() => props.data.image);
    const imageIsBig = computed(() => props.data.imageIsBig);
    const imageSpecified = computed(() => props.data.imageSpecified);
    const interaction = computed(() => Math.floor(Math.random() * 488) + 411);
    const shares = computed(() => Math.floor(Math.random() * 88) + 11);
    const style = computed(() => props.data.style === 'desktop' ? 'desktop' : 'mobile');
    const title = computed(() => props.data.title.substring(0, 247));
    const url = computed(() => props.data.url);

    return {
      comments,
      dark,
      description,
      hostname,
      image,
      imageIsBig,
      imageSpecified,
      interaction,
      shares,
      style,
      title,
      url,
    };
  },
};
</script>

<style>
@import "../../../rich-previews/@shared/css/defaults.css";

:root {
  --facebook-color-border: #E1E8ED;
  --facebook-image-height: 111px;
  --facebook-base-color: #292F33;
  --facebook-bg-color-hover: #F5F8FA;
  --facebook-background-color: #e8eaee;
  --facebook-lh: 16px;
}

.is-desktop {
  --facebook-image-height: 148px;
  --facebook-lh: 20px;
}

.-theme-with-dark-background {
  --facebook-color-border: rgb(56, 68, 77);
  --facebook-bg-color-hover: rgba(255, 255, 255, 0.03);
}

.facebook-preview {
  font-size: 14px;
}

.is-desktop.facebook-preview {
  width: 500px;
}

.facebook-preview__link-container {
  display: block;
  height: auto;
  text-decoration: none;
  cursor: pointer;
}

.facebook-preview__fixed-ratio {
  padding-bottom: 50%;
  height: 0;
  overflow: hidden;
}

.is-desktop .facebook-preview__fixed-ratio {
  display: block;
  padding-bottom: 50%;
  position: relative;
}

.facebook-preview__media--image-fallback {
  background-color: var(--facebook-background-color);
  background-image: url('../../../rich-previews/src/@assets/facebook-img-fallback.png');
  background-size: contain;
  background-repeat: no-repeat;
}

.facebook-preview__fixed-ratio-content {
  width: 100%;
}

.is-desktop .facebook-preview__fixed-ratio-content {
  position: absolute;
  top: 0;
  left: 0;
  max-width: inherit;
  object-fit: cover;
}

.facebook-preview__wrapper {
  background-color: #e8eaee;
  padding: 10px 12px;
}

.is-desktop .facebook-preview__wrapper {
  background-color: #f2f3f5;
  padding: 8px 12px;
}

.facebook-preview__title {
  line-height: var(--facebook-lh);
  color: var(--facebook-base-color);
  font-weight: bold;
}

.is-desktop .facebook-preview__title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 16px;
}

.facebook-preview__description {
  color: var(--facebook-base-color);
  font-size: 12px;
  line-height: var(--facebook-lh);
}

.is-desktop .facebook-preview__description {
  display: -webkit-box;
  font-size: 13px;
  color: #606770;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.facebook-preview__hostname {
  color: #606770;
  text-transform: uppercase;
  font-size: 12px;
  line-height: var(--facebook-lh);
}

.is-desktop .facebook-preview__hostname {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.facebook-preview__content {
  max-height: calc(var(--facebook-lh) * 2);
  overflow: hidden;
}

.facebook-preview__small .facebook-preview__wrapper {
  height: var(--facebook-image-height);
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.facebook-preview__small .facebook-preview__fixed-ratio {
  width: var(--facebook-image-height);
  height: var(--facebook-image-height);
  padding-bottom: 0;
  float: left;
}

.is-desktop .facebook-preview__small .facebook-preview__fixed-ratio-content {
  min-width: var(--facebook-image-height);
  min-height: var(--facebook-image-height);
  height: var(--facebook-image-height);
  float: left;
}

.is-desktop .facebook-preview__small .facebook-preview__content {
  max-height: calc(var(--facebook-lh) * 5);
}

.is-desktop .facebook-preview__small .facebook-preview__description {
  color: #606770;
  font-size: 13px;
  line-height: var(--facebook-lh);
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.is-desktop .facebook-preview__small .facebook-preview__title {
  display: block;
  text-overflow: ellipsis;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0;
}

.facebook-preview__interaction {
  display: inline-block;
  background-image: url('../../../rich-previews/src/@assets/facebook-emoji.png');
  background-size: contain;
  background-repeat: no-repeat;
  height: 20px;
  width: 60px;
}

.facebook-preview__interaction-wrapper {
  display: flex;
  justify-content: space-between;
  margin: 10px 12px;
  color: #606770;
}

.facebook-preview__interaction-stats {
  display: inline-flex;
}

.facebook-preview__interaction-stats p {
  margin-left: 6px;
  line-height: 20px;
}

.-theme-with-dark-background {
  color: var(--base-color);
}

</style>
