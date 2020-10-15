<template>
<section class="content">
  <pre v-if="meta">{{ meta }}</pre>
  <span v-else>Show me the meta</span>
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
