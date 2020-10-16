<template>
  <div class="app">
    <app-header />
    <app-sidebar />
    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>

<script>
import AppHeader from './app-header';
import AppSidebar from './app-sidebar';

export default {
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
  padding: 2rem;
  overflow: auto;
}

.content {
  height: 100%;
}

.content-message {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
