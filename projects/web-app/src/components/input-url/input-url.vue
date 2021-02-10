<template>
<form
  class="input-url"
  @submit.prevent="submitUrl"
>
  <label for="url" class="a11y-sr-only">Your website's url</label>
  <input
    v-model="url"
    id="url"
    type="url"
    name="url-to-get-meta-from"
    required
  />
</form>
</template>

<script>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import useHead from '@/composables/use-head';

export default {
  setup: () => {
    const router = useRouter();
    const head = useHead();

    // Initialize local ref with stored global url
    const url = ref(head.url.value);
    watch(head.url, newUrl => {
      if(url.value !== newUrl) url.value = newUrl;
    });

    const submitUrl = () => {
      head.getDataForUrlWithRouteGuard(router.currentRoute.value.name, router.push)(url.value);
    };

    return {
      url,
      submitUrl,
    };
  },
};
</script>

<style>
  .input-url input {
    border: 1px solid var(--color-blue);
    box-shadow: inset 0 0 0 0 var(--color-blue);
    border-radius: 4px;
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
