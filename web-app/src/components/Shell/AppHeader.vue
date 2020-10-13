<template>
  <header class="app-header">
    <div class="app-logo">
      Heads Up
    </div>
  </header>
</template>

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

.app-logo {
  font-family: monospace;
  font-size: 3rem;
}
</style>
