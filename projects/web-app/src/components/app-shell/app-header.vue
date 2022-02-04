<template>
  <header class="app-header">
    <div class="app-header__column app-header__column--left">
      <h1 class="a11y-sr-only">Heads Up</h1>
      <router-link :to="{ name: 'home' }" class="app-header__logo">
        <span class="a11y-sr-only">Heads Up home page</span>
        <app-icon name="heads-up" />
      </router-link>
    </div>
    <div class="app-header__column app-header__column--right">
      <div class="app-header__search">
        <input-url />
      </div>
    </div>
  </header>
</template>

<script>
import AppIcon from '@shared/components/app-icon';
import InputUrl from '@/components/input-url/input-url';

export default {
  components: {
    AppIcon,
    InputUrl,
  },
};
</script>

<style>
.app-header {
  display: flex;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
}

.app-header .app-icon {
  height: 32px;
  width: auto;
}

.app-header__column {
  padding: 1rem;
}

.app-header__column--left {
  flex: 0 0 var(--sidebar-width);
}

.app-header__column--right {
  flex: 0 0 calc(100% - var(--sidebar-width));
  border-bottom: 1px solid var(--color-gray);
  background-color: var(--color-white);
}

.app-header__logo {
  display: flex;
  align-items: center;
  height: 38px;
  color: var(--color-blue);
}

.app-header__search {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.app-header__search .input-url {
  display: flex;
  width: 100%;
  max-width: 350px;
}

@media (min-width: 1024px) {
  .app-header__search .input-url {
    max-width: 500px;
  }
}

@media (min-width: 1440px) {
  .app-header__search .input-url {
    max-width: 550px;
  }
}

.app-header__search .input-url__input {
  display: block;
  flex: 1 1 100%;
  width: 100%;
  min-width: 0;
}
</style>
