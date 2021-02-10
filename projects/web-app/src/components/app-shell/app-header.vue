<template>
  <header class="app-header">
    <div class="app-header__left">
      <router-link :to="{ name: 'home' }" class="app-header__logo">
        <span class="a11y-sr-only">Heads Up home page</span>
        <heads-up-logo height="32" />
      </router-link>
    </div>
    <div class="app-header__right">
      <div class="app-header__search">
        <input-url />
      </div>
    </div>
  </header>
</template>

<script>
import HeadsUpLogo from '@shared/assets/images/heads-up.svg';
import InputUrl from '@/components/input-url/input-url';

export default {
  components: {
    HeadsUpLogo,
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

.app-header__left {
  flex: 0 0 var(--sidebar-width);
  padding: 1rem;
}

.app-header__right {
  flex: 0 0 calc(100% - var(--sidebar-width));
  padding: 1rem;
}

.app-header__logo {
  display: flex;
  align-items: center;
  color: var(--color-blue);
}

.app-header__logo img {
  height: 32px;
}

.app-header__search {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
