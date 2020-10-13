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
  <button type="submit">
    Go!
  </button>
</form>
</template>

<script>
import { ref } from 'vue';
import repo from '@/repo';

export default {
  setup() {
    const url = ref('');
    const onSubmit = () => {
      repo.getMetaForUrl(url.value)
        .then(res => console.log(res));
    };

    return {
      url,
      onSubmit,
    };
  },
};
</script>

<style scoped>
input {
  padding: .5rem 1rem;
}
</style>
