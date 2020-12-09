<template>
<figure>
  <p v-if="isLoading" class="preview-iframe__loading">Loading...</p>
  <iframe
    :class="[ 'preview-iframe', iframeClass ]"
    :height="iframeHeight"
    :src="url"
    @load="onLoad"
    frameborder="0"
    ref="iframe"
    scrolling="no"
    width="100%"
  />
  <figcaption class="preview-iframe__caption">
    <slot name="caption" />
  </figcaption>
</figure>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    url: {
      type: String,
      required: true,
    },
    iframeClass: {
      type: String,
      default: '',
    },
  },

  setup() {
    const iframe = ref(null);
    const iframeHeight = ref('0');
    const isLoading = ref(true);

    const onLoad = (() => {
      setTimeout(function () {
        iframeHeight.value = parseInt(iframe.value.contentWindow.document.body.scrollHeight) + 'px';
        isLoading.value = false;
      }, 500);
    });

    return {
      iframe,
      iframeHeight,
      isLoading,
      onLoad,
    };
  },
};
</script>

<style>
.preview-iframe {
  border: none;
  margin-bottom: 1em;
  padding: 0;
}

.preview-iframe__caption {
  color: var(--label-color);
}

.preview-iframe__loading {
  margin: 0;
}
</style>
