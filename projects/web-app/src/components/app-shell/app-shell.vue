<template>
  <div class="app">
    <app-header />
    <app-sidebar />
    <main class="app-main">
      <loader v-if="isLoadingHeadData" />
      <router-view v-else-if="hasData" />
    </main>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import useHead from '@/composables/use-head';
import AppHeader from './app-header';
import AppSidebar from './app-sidebar';
import Loader from '../loader/loader';

export default {
  setup: () => {
    const router = useRouter();
    const head = useHead();
    const isLoadingHeadData = head.isLoading;

    // We get `url` query param here to do initial load if available
    const params = new URLSearchParams(window.location.search);
    const urlParam = params.get('url');

    if(urlParam) {
      head.getDataForUrl(urlParam);
    }
    else if(router.currentRoute.value.name !== 'home') {
      router.replace({ name: 'home' });
    }

    const hasData = computed(() => head.data.value && Object.keys(head.data.value).length);

    return {
      isLoadingHeadData,
      hasData,
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
