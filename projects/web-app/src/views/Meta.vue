<template>
<section class="content">
  <pre v-if="headData">{{ headData }}</pre>
  <span v-else>Show me the meta</span>
</section>
</template>

<script>
import useHead from '@/composables/use-head';

export default {
  setup: () => ({
    headData: useHead().data,
  }),
};
</script>
