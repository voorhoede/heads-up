<template>
<form
  class="input-url"
  @submit.prevent="metadata.getForUrl(url)"
>
  <input
    type="url"
    v-model="url"
    name="url-to-get-meta-from"
    required
  />
  <button type="submit">
    Go!
  </button>
</form>
</template>

<script>
import { ref } from 'vue';
import useMetadata from '@/composables/useMetadata';

export default {
  setup() {
    const metadata = useMetadata();
    const url = ref('');

    return {
      metadata,
      url,
    };
  },
};
</script>

<style scoped>
input {
  padding: .5rem 1rem;
}
</style>
