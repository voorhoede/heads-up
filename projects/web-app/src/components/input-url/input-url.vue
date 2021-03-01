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
      head.getDataForUrlWithRouteGuard(router.currentRoute.value.name, router.push)(url.value)
        .then(status => {
          // @a11y :: If we successfully retrieve data, set focus to main content
          if(status.success) {
            const $focusTarget = document.querySelector('#main-content');
            $focusTarget.setAttribute('tabindex', '-1');
            $focusTarget.focus();
            $focusTarget.removeAttribute('tabindex');
          }
        });
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
    min-width: 300px;
    padding: 0.625rem;
    transition: box-shadow .25s ease, background-color .25s ease;
    border: 1px solid var(--color-blue);
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    outline: none;
    box-shadow: inset 0 0 0 0 var(--color-blue);
    color: var(--color-blue);
  }

  .input-url__input:hover {
    background-color: rgb(0, 0, 255, .05);
  }

  .input-url__input:focus {
    background-color: rgb(0, 0, 255, .1);
    box-shadow: inset 0 0 0 1px var(--color-blue);
  }

  .input-url__submit {
    padding: 0.625rem;
    transition: background-color .25s ease;
    border-top: 1px solid var(--color-blue);
    border-right: 1px solid var(--color-blue);
    border-bottom: 1px solid var(--color-blue);
    border-left: none;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    background-color: var(--color-blue);
    color: var(--color-white);
    font-weight: bold;
    cursor: pointer;
  }

  .input-url__submit:focus,
  .input-url__submit:hover {
    background-color: var(--color-blue-active);
  }
</style>
