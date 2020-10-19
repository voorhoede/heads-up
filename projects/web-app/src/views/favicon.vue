<template>
<section class="content">
  <div v-if="headData">
    <dl>
      <div v-for="icon in icons" :key="`${icon.url}-key`">
        <dt>
          <span v-if="icon.type">
            {{ icon.type }}
          </span>
          <span v-if="icon.sizes">
            {{ icon.sizes }}
          </span>
        </dt>
        <dd :key="`${icon.href}-value`">
          <span>{{ icon.href }}</span>
          <a :href="icon.href">
            <img :src="`https://www.voorhoede.nl${icon.href}`" alt="">
          </a>
        </dd>
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
    const icons = computed(() => (headData?.value?.general?.icons));

    return {
      headData,
      icons,
    };
  },
};
</script>
