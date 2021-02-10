<template>
  <div class="app">
    <app-header />
    <app-sidebar />
    <main id="main-content" class="app-main">
      <loader v-if="isLoadingHeadData" />
      <template v-else>
        <h1 v-if="title" class="app-main__view-title">{{ title }}</h1>
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
  margin-top: var(--header-height);
  margin-left: var(--sidebar-width);
  overflow: auto;
  border-top: 1px solid var(--color-gray);
}

.app-main__view-title {
  display: inline-block;
  border-bottom: 2px solid var(--color-blue);
  color: var(--color-blue);
  margin-bottom: 8px;
  margin-left: 16px;
  padding: 16px 0 8px;
}
</style>
