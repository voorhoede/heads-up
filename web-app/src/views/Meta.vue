<template>
<section class="content-section">
  <div class="content-container">
    <pre v-if="meta">{{ meta }}</pre>
    <span v-else>Show me the meta</span>
  </div>
</section>
</template>

<script>
import useMetadata from '@/composables/useMetadata';

export default {
  setup: () => ({
    meta: useMetadata().data,
  }),
};
</script>
