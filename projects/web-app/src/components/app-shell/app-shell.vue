<template>
  <div class="app">
    <app-header />
    <app-sidebar />
    <main class="app-main">
      <router-view v-if="headData" />
      <div
        v-else
        class="intro-message"
      >
        <h2>Visualise everything in your &lt;head&gt; with Heads Up.</h2>
        <p>Enter your website in the top bar to begin.</p>
      </div>
    </main>
  </div>
</template>

<script>
import AppHeader from './app-header';
import AppSidebar from './app-sidebar';
import useHead from '@/composables/use-head';

export default {
  setup: () => ({
    headData: useHead().data,
  }),

  components: {
    AppHeader,
    AppSidebar,
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
