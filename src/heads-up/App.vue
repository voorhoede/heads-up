<template>
  <div class="app">
    <app-sidebar class="app__sidebar" />

    <main class="app__panel" >
      <template v-if="head && head.url">
        <header class="section">
          <h1 class="heading-default heading">{{ $route.meta.title }}</h1>
          <external-link :href="head.url">{{ head.url }}</external-link>
        </header>
        <router-view></router-view>
      </template>
    </main>

    <refresh-button v-if="isDev" />

  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { AppSidebar, ExternalLink, RefreshButton } from './components'

  export default {
    name: 'App',
    components: { AppSidebar, ExternalLink, RefreshButton },
    computed: {
      ...mapState(['head']),
      isDev() { return process.env.NODE_ENV === 'development' }
    }
  }
</script>

<style>
  :root {
    --sidebar-width: 190px;
  }

  .app__sidebar {
    position: fixed;
    height: 100%;
    width: var(--sidebar-width);
  }

  .app__panel {
    width: calc(100% - var(--sidebar-width));
    margin-left: var(--sidebar-width);
  }

  .section {
    padding: 16px;
    border-bottom: 1px solid var(--color-grey-light);
  }

  .section:last-child {
    border-bottom: none;
  }

  .heading {
    margin-bottom: 16px;
  }

  .heading-default {
    font-size: 1rem;
  }

  .heading-small {
    font-size: .875rem;
    color: var(--color-grey-dark);
  }

  .heading-smaller {
    font-size: .8125rem;
  }
</style>
