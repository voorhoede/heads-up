<template>
<figure class="preview-iframe">
  <p v-if="isLoading" class="preview-iframe__loading">
    Loading...
  </p>
  <iframe
    v-show="!isLoading"
    :class="[ 'preview-iframe__iframe', iframeClass ]"
    :height="iframeHeight"
    :src="url"
    @load="onLoad"
    frameborder="0"
    ref="iframe"
    scrolling="no"
    width="100%"
  />
  <figcaption v-if="!isLoading" class="preview-iframe__caption">
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
}

.preview-iframe__iframe {
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
