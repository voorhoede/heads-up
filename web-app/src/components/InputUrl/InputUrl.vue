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

export default {
  setup() {
    const url = ref('');
    const onSubmit = () => {
      console.log(url.value);
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
