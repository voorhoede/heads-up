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
import AppHeader from './components/AppHeader/AppHeader';
import AppSidebar from './components/AppSidebar/AppSidebar';

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
}
</style>
