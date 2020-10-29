<template>
  <header class="app-header">
    <div class="app-header__logo">
      <heads-up-logo height="32" />
    </div>
    <div class="app-header__search">
      <input-url />
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  height: var(--header-height);
  padding: 1rem;
}

.app-header__logo {
  display: flex;
  flex: 0 0 var(--sidebar-width);
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
  flex: 0 0 calc(100% - var(--sidebar-width));
}
</style>
