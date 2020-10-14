<template>
<section class="content-section">
  <div class="content-container">
    <pre v-if="meta">{{ meta }}</pre>
    <span v-else>Show me the meta</span>
  </div>
</section>
</template>

<script>
export default {
  computed: {
    meta() {
      return this.$store.getters['meta/meta'];
    },
  },
};
</script>
