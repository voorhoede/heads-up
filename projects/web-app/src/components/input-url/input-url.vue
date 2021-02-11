<template>
<form
  class="input-url"
  @submit.prevent="submitUrl"
>
  <label for="url" class="a11y-sr-only">
    Your website's URL
  </label>
  <input
    v-model="url"
    id="url"
    type="url"
    class="input-url__input"
    name="url-to-get-meta-from"
    placeholder="Your website's URL"
    required
  />
  <button type="submit" class="input-url__submit">
    Submit
  </button>
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
  .input-url__input {
    border: 1px solid var(--color-blue);
    box-shadow: inset 0 0 0 0 var(--color-blue);
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    padding: 0.625rem;
    outline: none;
    min-width: 300px;
    color: var(--color-blue);
  }

  .input-url__input:focus {
    box-shadow: inset 0 0 0 1px var(--color-blue);
  }

  .input-url__submit {
    padding: 0.625rem;
    border: 1px solid var(--color-blue);
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    background: var(--color-blue);
    font-weight: bold;
    color: var(--color-white);
    cursor: pointer;
  }

  .input-url__submit:focus {
    background: var(--color-blue-active);
  }
</style>
