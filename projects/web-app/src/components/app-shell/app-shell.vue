<template>
  <div class="app">
    <app-header />
    <app-sidebar />
    <main class="app-main">
      <loader v-if="loading" />
      <router-view v-if="headData" />

      <div
        v-if="!headData"
        class="intro-message"
      >
        <h2>Visualise everything in your &lt;head&gt; with Heads Up.</h2>
        <p>Enter your website in the top bar to begin.</p>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, onUpdated } from 'vue';
import AppHeader from './app-header';
import AppSidebar from './app-sidebar';
import Loader from '../loader/loader';
import useHead from '@/composables/use-head';

export default {
  setup: () => {
    const headData = useHead().data;
    const loading = ref(true);

    onUpdated(() => {
      if (headData.value && Object.keys(headData.value).length) {
        loading.value = false;
      } else {
        loading.value = true;
      }
    });

    return {
      headData,
      loading,
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

.intro-message {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
