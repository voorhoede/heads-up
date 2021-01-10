<template>
  <div class="app">
    <app-header />
    <app-sidebar />
    <main class="app-main">
      <loader v-if="isLoadingHeadData" />
      <router-view v-else />
    </main>
  </div>
</template>

<script>
import useHead from '@/composables/use-head';
import AppHeader from './app-header';
import AppSidebar from './app-sidebar';
import Loader from '@/components/loader/loader';

export default {
  setup: () => {
    const head = useHead();
    const isLoadingHeadData = head.isLoading;

    return {
      isLoadingHeadData,
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
