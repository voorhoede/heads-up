<template>
<section class="content">
  <div v-if="headData">
    <dl>
      <div v-if="title">
        <dt>Title:</dt>
        <dd>{{ title }}</dd>
      </div>
      <div v-if="lang">
        <dt>Language:</dt>
        <dd>{{ lang }}</dd>
      </div>
      <div v-if="description">
        <dt>Description:</dt>
        <dd>{{ description }}</dd>
      </div>
    </dl>
  </div>
  <div v-else class="content-message">
    <h2>Visualise everything in your &lt;head&gt; with Heads Up.</h2>
  </div>
</section>
</template>

<script>
import { computed } from 'vue';
import useHead from '@/composables/use-head';

export default {
  setup: () => {
    const headData = useHead().data;
    const title = computed(() => (headData?.value?.general?.title));
    const lang = computed(() => (headData?.value?.general?.lang));
    const description = computed(() => (headData?.value?.general?.description));

    return {
      headData,
      title,
      lang,
      description,
    };
  },
};
</script>
