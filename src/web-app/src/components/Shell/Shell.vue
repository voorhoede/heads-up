<template>
  <app-header />
  <app-sidebar />
  <main class="main-content">
    <router-view/>
  </main>
</template>

<script>
import 'normalize.css';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';

export default {
  components: {
    AppHeader,
    AppSidebar,
  },
};
</script>

<style>
@import '../../assets/css/index.css';

.main-content {
  border-top: var(--header-height) solid transparent;
  padding-left: var(--sidebar-width);
}
</style>
