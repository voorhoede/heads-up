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
</form>
</template>

<script>
import { ref } from 'vue';
import useMetadata from '@/composables/useMetadata';

export default {
  setup: () => {
    const metadata = useMetadata();
    const url = ref('https://voorhoede.nl');

    return {
      metadata,
      url,
    };
  },
};
</script>

<style>
  .input-url input {
    border: 1px solid var(--color-blue);
    box-shadow: inset 0 0 0 0 var(--color-blue);
    border-radius: 2rem;
    padding: 0.625rem 1.25rem;
    outline: none;
    min-width: 300px;
    color: var(--color-blue);
  }

  .input-url input:focus {
    border: 1px solid var(--color-blue);
    box-shadow: inset 0 0 0 1px var(--color-blue);
  }
</style>
