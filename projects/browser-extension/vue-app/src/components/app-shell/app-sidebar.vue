<template>
  <nav class="sidebar">
    <section>
      <h2 class="sidebar__heading">
        Application
      </h2>
      <ul class="sidebar-list">
        <li class="sidebar-list__item">
          <router-link
            class="sidebar__button"
            :to="{ name: 'meta' }"
          >
            <app-icon name="code" />
            <span>Meta</span>
          </router-link>
        </li>
        <li class="sidebar-list__item">
          <router-link
            class="sidebar__button"
            :to="{ name: 'link' }"
          >
            <app-icon name="link" />
            <span>Link</span>
          </router-link>
        </li>
        <li class="sidebar-list__item">
          <router-link
            class="sidebar__button"
            :to="{ name: 'favicon' }"
          >
            <app-icon name="image" />
            <span>Favicon</span>
          </router-link>
        </li>
        <li class="sidebar-list__item">
          <router-link
            class="sidebar__button"
            :to="{ name: 'android' }"
          >
            <app-icon name="android" />
            <span>Android</span>
          </router-link>
        </li>
        <li class="sidebar-list__item">
          <router-link
            class="sidebar__button"
            :to="{ name: 'apple-ios' }"
          >
            <app-icon name="apple" />
            <span>Apple iOS</span>
          </router-link>
        </li>
        <li class="sidebar-list__item">
          <router-link
            class="sidebar__button"
            :to="{ name: 'open-graph' }"
          >
            <app-icon name="open-graph" />
            <span>OpenGraph</span>
          </router-link>
        </li>
      </ul>
    </section>
    <div class="sidebar__divider" />
    <section>
      <h2 class="sidebar__heading">
        Social Media
      </h2>
      <ul class="sidebar-list">
        <li class="sidebar-list__item">
          <router-link
            class="sidebar__button"
            :to="{ name: 'twitter' }"
          >
            <app-icon name="twitter" />
            <span>Twitter</span>
          </router-link>
        </li>
        <li class="sidebar-list__item">
          <router-link
            class="sidebar__button"
            :to="{ name: 'whatsapp' }"
          >
            <app-icon name="whatsapp" />
            <span>WhatsApp</span>
          </router-link>
        </li>
        <li class="sidebar-list__item">
          <router-link
            class="sidebar__button"
            :to="{ name: 'linkedin' }"
          >
            <app-icon name="linkedin" />
            <span>LinkedIn</span>
          </router-link>
        </li>
        <li class="sidebar-list__item">
          <router-link
            class="sidebar__button"
            :to="{ name: 'facebook' }"
          >
            <app-icon name="facebook" />
            <span>Facebook</span>
          </router-link>
        </li>
        <li class="sidebar-list__item">
          <router-link
            class="sidebar__button"
            :to="{ name: 'slack' }"
          >
            <app-icon name="slack" />
            <span>Slack</span>
          </router-link>
        </li>
      </ul>
    </section>
    <div class="sidebar__divider" />
    <section>
      <h2 class="sidebar__heading">
        Search
      </h2>
      <ul class="sidebar-list">
        <li class="sidebar-list__item">
          <router-link
            class="sidebar__button"
            :to="{ name: 'search-meta' }"
          >
            <app-icon name="code" />
            <span>Search Meta</span>
          </router-link>
        </li>
        <li class="sidebar-list__item">
          <router-link
            class="sidebar__button"
            :to="{ name: 'robots-txt' }"
          >
            <app-icon name="robot" />
            <span>Robots</span>
          </router-link>
        </li>
        <li class="sidebar-list__item">
          <router-link
            class="sidebar__button"
            :to="{ name: 'sitemap' }"
          >
            <app-icon name="sitemap" />
            <span>Sitemap</span>
          </router-link>
        </li>
        <li class="sidebar-list__item">
          <router-link
            class="sidebar__button"
            :to="{ name: 'open-search' }"
          >
            <app-icon name="search" />
            <span>OpenSearch</span>
          </router-link>
        </li>
        <li class="sidebar-list__item">
          <router-link
            class="sidebar__button"
            :to="{ name: 'structured-data' }"
          >
            <app-icon name="sitemap" />
            <span>Structured Data</span>
          </router-link>
        </li>
      </ul>
    </section>
    <footer class="sidebar__footer">
      <made-with-love />
      <github-link />
    </footer>
  </nav>
</template>

<script>
import AppIcon from '@shared/components/app-icon';
import MadeWithLove from '@shared/components/made-with-love';
import GithubLink from '@shared/components/github-link';

export default {
  components: {
    AppIcon,
    MadeWithLove,
    GithubLink
  }
};
</script>

<style>
.sidebar {
  display: flex;
  flex-direction: column;
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
  padding: 10px 8px 6px 8px;
}

.sidebar-list {
  list-style: none;
}

.sidebar__button {
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 4px 5px 4px 25px;
}

.sidebar__button.router-link-exact-active {
  background-color: var(--selection-inactive-bg-color);
  color: var(--selection-inactive-fg-color);
}

.sidebar__button:focus {
  background-color: var(--selection-bg-color);
  color: var(--selection-fg-color);
}

.sidebar-list__item .app-icon {
  width: 1em;
  height: 1em;
  margin-right: 0.25em;
}

.sidebar-list__item .app-icon svg {
  fill: currentColor;
}

.sidebar__footer {
  margin-top: auto;
  padding: 20px 10px 10px 10px;

  color: var(--label-color);
  text-align: center;
}
</style>
