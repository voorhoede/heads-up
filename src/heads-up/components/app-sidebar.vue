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
            :to="{ name: 'app-meta' }"
          >
            <CodeIcon class="sidebar__icon" /> Meta
          </router-link>
        </li>
        <li class="sidebar-list__item">
          <router-link
            class="sidebar__button"
            :to="{ name: 'favicon' }"
          >
            <ImageIcon class="sidebar__icon" /> Favicon
          </router-link>
        </li>
        <li class="sidebar-list__item">
          <router-link
            class="sidebar__button"
            :to="{ name: 'apple-ios' }"
          >
            <AppleIcon class="sidebar__icon" /> Apple iOS
          </router-link>
        </li>
        <li class="sidebar-list__item">
          <router-link
            class="sidebar__button"
            :to="{ name: 'open-graph' }"
          >
            <OpenGraphIcon class="sidebar__icon" /> Open Graph
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
            <TwitterIcon class="sidebar__icon" /> Twitter
          </router-link>
        </li>
      </ul>
    </section>
    <footer class="sidebar__footer">
      Made with love by 
      <external-link
        class="sidebar__footer-link"
        href="https://www.voorhoede.nl"
      >
        De Voorhoede
      </external-link>
    </footer>
  </nav>
</template>

<script>
import AppleIcon from '../assets/icons/apple.svg'
import CodeIcon from '../assets/icons/code.svg'
import ImageIcon from '../assets/icons/image.svg'
import OpenGraphIcon from '../assets/icons/open-graph.svg'
import TwitterIcon from '../assets/icons/twitter.svg'
import ExternalLink from '../components/external-link.vue'

export default {
  components: { AppleIcon, CodeIcon, OpenGraphIcon, TwitterIcon, ImageIcon, ExternalLink }
}
</script>

<style>
  .sidebar {
    display: flex;
    flex-direction: column;

    font-size: .8125rem;
    border-right: var(--divider-border);
    background-color: var(--toolbar-bg-color);
    overflow: auto;
  }

  .sidebar__divider {
    margin-top: 10px;
    margin-bottom: 5px;
    border-top: 1px solid rgb(230, 230, 230);
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

  .sidebar__icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
  }

  .sidebar__footer {
    margin-top: auto;
    padding: 20px 10px 10px 10px;

    color: var(--label-color);
    text-align: center;
  }

  .sidebar__footer-link {
    color: var(--accent-color);
    text-decoration: underline;
    white-space: nowrap;
  }

  .sidebar__footer-link:hover {
    color: var(--accent-color-hover);
  }

</style>
