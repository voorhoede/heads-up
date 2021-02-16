<template>
  <meta-view :head-data="headData" />
</template>

<script>
import MetaView from '@shared/views/meta.view';
import useHead from '@/composables/use-head';

export default {
  setup: () => ({ headData: useHead().data }),
  components: { MetaView },
};
</script>
