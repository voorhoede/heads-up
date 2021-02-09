<template>
<figure
  class="preview-iframe"
  :class="{
    'preview-iframe--loading': isLoading,
    'preview-iframe--loaded': !isLoading,
  }"
>
  <p class="preview-iframe__loading">
    Preparing preview...
  </p>
  <iframe
    :class="[ 'preview-iframe__iframe', iframeClass ]"
    :src="url"
    @load="onLoad"
    frameborder="0"
    ref="iframe"
    scrolling="no"
    width="100%"
    :style="{ 'height': iframeHeight }"
  />
  <figcaption class="preview-iframe__caption">
    <slot name="caption" />
  </figcaption>
</figure>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import debounce from '@shared/lib/debounce';

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
    loadingHeight: {
      type: Number,
      default: 100,
    },
  },

  setup(props) {
    const iframe = ref(null);
    const iframeHeight = ref(props.loadingHeight + 'px');
    const isLoading = ref(true);

    const setIframeHeight = () => {
      iframeHeight.value = parseInt(iframe.value.contentWindow.document.body.scrollHeight) + 'px';
    };

    const onResize = () => debounce(setIframeHeight, 500);

    /**
     * We update the height with a final value based on the inner
     * content height to make sure the iframe fits perfectly.
     */
    const onLoad = () => setIframeHeight();

    onMounted(() => window.addEventListener('resize', onResize));

    onBeforeUnmount(() => window.removeEventListener('resize', onResize));

    watch(() => iframeHeight.value, (height, prevHeight) => {
      if (height !== prevHeight) {
        isLoading.value = false;
      }
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
  position: relative;
  margin-bottom: 1.5em;
}

.preview-iframe:last-of-type {
  margin-bottom: 0;
}

.preview-iframe__iframe {
  margin-bottom: 1em;
  padding: 0;
  border: none;
  opacity: 0;
  height: 0;
}

.preview-iframe--loading .preview-iframe__iframe {
  opacity: 0;
}

.preview-iframe--loaded .preview-iframe__iframe {
  opacity: 1;
}

.preview-iframe__caption {
  color: var(--label-color);
}

.preview-iframe__loading {
  position: absolute;
  margin: 0;
}

.preview-iframe--loading .preview-iframe__loading {
  opacity: 1;
}

.preview-iframe--loaded .preview-iframe__loading {
  opacity: 0;
}
</style>
