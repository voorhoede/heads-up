<template>
<figure>
  <iframe
    ref="iframe"
    :src="url"
    :height="iframeHeight"
    width="100%"
    frameborder="0"
    scrolling="no"
    @load="onResize"
  />
  <figcaption class="twitter__preview-caption">
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
  },

  setup() {
    const iframe = ref(null);
    const iframeHeight = ref('auto');
    const onResize = () => {
      iframeHeight.value = parseInt(iframe.value.contentWindow.document.body.scrollHeight + 2) + 'px';
    };

    return {
      iframe,
      iframeHeight,
      onResize,
    };
  },
};
</script>
