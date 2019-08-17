<template>
  <nav class="sidebar">
    <section>
      <h2>Application</h2>
      <ul class="sidebar-list">
        <li class="sidebar-list__item">
          <router-link class="sidebar__button" :to="{ name: 'page-meta' }">
            Page meta
          </router-link>
        </li>
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
    font-weight: bold;
    font-size: .8125rem;
    border-right: var(--divider-border);
    background-color: var(--toolbar-bg-color);
    overflow: auto;
  }

  .sidebar-list {
    list-style: none;
  }

  .sidebar__button {
    all: unset;
    cursor: pointer;
    display: block;
    padding: 5px 5px 5px 25px;
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
