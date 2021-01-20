<template>
  <div class="app">
    <app-header />
    <app-sidebar />
    <main class="app-main">
      <loader v-if="isLoadingHeadData" />
      <template v-else>
        <h1 v-if="title">{{ title }}</h1>
        <router-view />
      </template>
    </main>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import AppHeader from './app-header';
import AppSidebar from './app-sidebar';
import Loader from '@/components/loader/loader';
import useHead from '@/composables/use-head';

export default {
  setup: () => {
    const head = useHead();
    const isLoadingHeadData = head.isLoading;
    const title = computed(() => useRoute()?.meta?.title);


    return {
      isLoadingHeadData,
      title,
    };
  },

  components: {
    AppHeader,
    AppSidebar,
    Loader,
  },
};
</script>

<style>
.app {
  display: flex;
  height: 100vh;
  min-height: 100vh;
  overflow-x: hidden;
}

.app-main {
  flex: 1 1 auto;
  border-top: 1px solid var(--color-gray);
  margin-top: var(--header-height);
  overflow: auto;
}
</style>
