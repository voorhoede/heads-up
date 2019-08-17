<template>
  <nav class="sidebar">
    <section>
      <h2 class="sidebar__heading">Application</h2>
      <ul class="sidebar-list">
        <li class="sidebar-list__item">
          <router-link class="sidebar__button" :to="{ name: 'app-meta' }">
            Meta
          </router-link>
        </li>
        <li class="sidebar-list__item">
          <router-link class="sidebar__button" :to="{ name: 'apple-ios' }">
            Apple iOS
          </router-link>
        </li>
        <li class="sidebar-list__item">
          <router-link class="sidebar__button" :to="{ name: 'open-graph' }">
            Open Graph
          </router-link>
        </li>
      </ul>
    </section>
    <div class="sidebar__divider" />
    <section>
      <h2 class="sidebar__heading">Social Media</h2>
      <ul class="sidebar-list">
        <li class="sidebar-list__item">
          <router-link class="sidebar__button" :to="{ name: 'twitter' }">
            Twitter
          </router-link>
        </li>
      </ul>
    </section>
  </nav>
</template>

<style>
  .sidebar {
    font-size: .8125rem;
    border-right: var(--divider-border);
    background-color: var(--toolbar-bg-color);
    overflow: auto;
  }

  .sidebar__divider {
    margin-top: 10px;
    margin-bottom: 5px;
    border-top: var(--divider-border);
  }

  .sidebar__heading {
    all: unset;
    display: block;
    padding: 10px 10px 5px 10px;
  }

  .sidebar-list {
    list-style: none;
  }

  .sidebar__button {
    all: unset;
    cursor: pointer;
    display: block;
    padding: 3px 5px 3px 25px;
  }
  .sidebar__button.router-link-exact-active {
    background-color: var(--selection-inactive-bg-color);
    color: var(--selection-inactive-fg-color);
  }
  .sidebar__button:focus {
    background-color: var(--selection-bg-color);
    color: var(--selection-fg-color);
  }
</style>
