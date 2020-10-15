<template>
<form
  class="input-url"
  @submit.prevent="onSubmit"
>
  <input
    type="url"
    v-model="url"
    required
  />
</form>
</template>

<script>
import { ref } from 'vue';
import store from '@/store';
import repo from '@/repo';

export default {
  setup() {
    const url = ref('https://voorhoede.nl');
    const onSubmit = () => {
      repo.getMetaForUrl(url.value)
        .then(res => {
          store.dispatch('meta/setMeta', res);
        })
        .catch(err => {
          console.error(err);
        })
      ;
    };

    return {
      url,
      onSubmit,
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
