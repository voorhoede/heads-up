<template>
<nav class="app-sidebar">
  <section class="section">
    <ul class="list">
      <li>
        <router-link :to="{ name: 'meta' }">
          Meta
        </router-link>
      </li>
    </ul>
  </section>
</nav>
</template>

<style scoped>
.app-sidebar {
  position: fixed;
  top: var(--header-height);
  left: 0;
  height: calc(100% - var(--header-height));
  width: var(--sidebar-width);
  box-sizing: border-box;
  border-right: thin solid var(--color-divider);
}

.section {
  border-bottom: thin solid var(--color-divider);
}

/* .app */

.list {
  list-style: none outside none;
}
</style>
