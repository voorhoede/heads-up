<template>
<figure>
  <iframe
    :class="[ 'preview-iframe', iframeClass ]"
    ref="iframe"
    :src="url"
    :height="iframeHeight"
    width="100%"
    frameborder="0"
    scrolling="no"
    @load="onResize"
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

<style>
.preview-iframe {
  margin-bottom: 1em;
  padding: 0;
  border: none;
}

.preview-iframe__caption {
  color: var(--label-color);
}
</style>
