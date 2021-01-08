<template>
<form
  class="input-url"
  @submit.prevent="getHeadData"
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
import { ref, onMounted } from 'vue';
import useHead from '@/composables/use-head';

export default {
  setup: () => {
    const getHeadForUrl = useHead().getForUrl;
    const params = new URLSearchParams(window.location.search);
    const urlParam = params.get('url');
    const url = ref('');

    const getHeadData = () => {
      console.log('get head data!');
      getHeadForUrl(url.value)
        .then(res => {
          console.log('great success!', res);
        })
        .catch(err => {
          console.log('no success!', err);
        })
      ;
    };

    onMounted(() => {
      if(urlParam) {
        url.value = urlParam;
        getHeadData();
      }
    });

    return {
      url,
      getHeadData,
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
