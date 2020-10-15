<template>
  <header class="app-header">
    <div class="app-logo">
      Heads Up
    </div>
    <input-url class="center-content" />
  </header>
</template>

<script>
import InputUrl from '@/components/InputUrl/InputUrl';
export default {
  components: {
    InputUrl,
  },
};
</script>

<style scoped>
.app-header {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  height: var(--header-height);
  width: 100%;
  align-items: center;
  box-sizing: border-box;
  padding: 0 2rem;
  border-bottom: thin solid var(--color-divider);
}

.center-content {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.app-logo {
  font-family: monospace;
  font-size: 3rem;
}
</style>
