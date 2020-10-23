<template>
  <panel-section title="Preview">
    <preview-iframe
      :url="twitterUrl"
      iframeClass="twitter__preview"
    >
      <template v-slot:caption>
        Preview based on <external-link href="https://mobile.twitter.com/">mobile.twitter.com</external-link>.
      </template>
    </preview-iframe>
  </panel-section>
</template>

<script>
import { ref } from 'vue';
import useHead from '@/composables/use-head';
import PanelSection from '@shared/components/panel-section';
import ExternalLink from '@shared/components/external-link';
import PreviewIframe from '@shared/components/preview-iframe';

export default {
  setup() {
    const headData = useHead().data;
    const TEMP_QS = 'card=summary_large_image&title=We+are+De+Voorhoede%2C+front-end+developers&description=Makers+of+websites+and+apps+for+everyone&image=https%3A%2F%2Fwww.voorhoede.nl%2Fimages%2Fsocial%2Flogo-wide.jpg&url=https%3A%2F%2Fwww.voorhoede.nl%2Fen%2F&theme=false';
    const twitterUrl = ref('/previews/twitter/twitter.html?' + TEMP_QS);

    return {
      headData,
      twitterUrl,
    };
  },

  components: {
    PanelSection,
    ExternalLink,
    PreviewIframe,
  },
};
</script>

<style>
  .twitter__preview {
    max-width: 521px;
  }
</style>
