<template>
  <panel-section title="Preview">
    <figure>
      <figcaption class="twitter__preview-caption">
        Preview based on <external-link href="https://mobile.twitter.com/">
          mobile.twitter.com
        </external-link>.
      </figcaption>
    </figure>
  </panel-section>
</template>

<script>
import useHead from '@/composables/use-head';
import PanelSection from '@shared/components/panel-section';
import ExternalLink from '@shared/components/external-link';

export default {
  setup() {
    useHead().data;
  },

  components: {
    PanelSection,
    ExternalLink,
  },
};
</script>
