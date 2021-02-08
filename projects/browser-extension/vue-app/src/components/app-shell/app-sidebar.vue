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
            <CodeIcon class="sidebar__icon" />Meta
          </router-link>
        </li>
        <li class="sidebar-list__item">
          <router-link
            class="sidebar__button"
            :to="{ name: 'link' }"
          >
            <LinkIcon class="sidebar__icon" />Link
          </router-link>
        </li>
        <li class="sidebar-list__item">
          <router-link
            class="sidebar__button"
            :to="{ name: 'favicon' }"
          >
            <ImageIcon class="sidebar__icon" />Favicon
          </router-link>
        </li>
        <li class="sidebar-list__item">
          <router-link
            class="sidebar__button"
            :to="{ name: 'apple-ios' }"
          >
            <AppleIcon class="sidebar__icon" />Apple iOS
          </router-link>
        </li>
        <li class="sidebar-list__item">
          <router-link
            class="sidebar__button"
            :to="{ name: 'open-graph' }"
          >
            <OpenGraphIcon class="sidebar__icon" />Open Graph
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
            <TwitterIcon class="sidebar__icon" />Twitter
          </router-link>
        </li>
        <li class="sidebar-list__item">
          <router-link
            class="sidebar__button"
            :to="{ name: 'whatsapp' }"
          >
            <WhatsappIcon class="sidebar__icon" />WhatsApp
          </router-link>
        </li>
        <li class="sidebar-list__item">
          <router-link
            class="sidebar__button"
            :to="{ name: 'linkedin' }"
          >
            <LinkedInIcon class="sidebar__icon" />LinkedIn
          </router-link>
        </li>
        <li class="sidebar-list__item">
          <router-link
            class="sidebar__button"
            :to="{ name: 'facebook' }"
          >
            <FacebookIcon class="sidebar__icon" />Facebook
          </router-link>
        </li>
        <li class="sidebar-list__item">
          <router-link
            class="sidebar__button"
            :to="{ name: 'slack' }"
          >
            <SlackIcon class="sidebar__icon" />Slack
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
            <CodeIcon class="sidebar__icon" />Search Meta
          </router-link>
        </li>
        <li class="sidebar-list__item">
          <router-link
            class="sidebar__button"
            :to="{ name: 'robots-txt' }"
          >
            <RobotIcon class="sidebar__icon" />Robots
          </router-link>
        </li>
        <li class="sidebar-list__item">
          <router-link
            class="sidebar__button"
            :to="{ name: 'sitemap' }"
          >
            <SitemapIcon class="sidebar__icon" />Sitemap
          </router-link>
        </li>
        <li class="sidebar-list__item">
          <router-link
            class="sidebar__button"
            :to="{ name: 'open-search' }"
          >
            <SearchIcon class="sidebar__icon" />OpenSearch
          </router-link>
        </li>
        <li class="sidebar-list__item">
          <router-link
            class="sidebar__button"
            :to="{ name: 'structured-data' }"
          >
            <SitemapIcon class="sidebar__icon" />Structured Data
          </router-link>
        </li>
        <li class="sidebar-list__item">
          <router-link
            class="sidebar__button"
            :to="{ name: 'google' }"
          >
            <SearchIcon class="sidebar__icon" />Google
          </router-link>
        </li>
      </ul>
    </section>
    <footer class="sidebar__footer">
      <MadeWithLove />
    </footer>
  </nav>
</template>

<script>
import AppleIcon from '@shared/assets/icons/apple.svg';
import CodeIcon from '@shared/assets/icons/code.svg';
import LinkIcon from '@shared/assets/icons/link.svg';
import ImageIcon from '@shared/assets/icons/image.svg';
import OpenGraphIcon from '@shared/assets/icons/open-graph.svg';
import MadeWithLove from '@shared/components/made-with-love';
import TwitterIcon from '@shared/assets/icons/twitter.svg';
import WhatsappIcon from '@shared/assets/icons/whatsapp.svg';
import LinkedInIcon from '@shared/assets/icons/linkedin.svg';
import SlackIcon from '@shared/assets/icons/slack.svg';
import FacebookIcon from '@shared/assets/icons/facebook.svg';
import SearchIcon from '@shared/assets/icons/search.svg';
import RobotIcon from '@shared/assets/icons/robot.svg';
import SitemapIcon from '@shared/assets/icons/sitemap.svg';

export default {
  components: {
    AppleIcon,
    CodeIcon,
    LinkIcon,
    MadeWithLove,
    OpenGraphIcon,
    TwitterIcon,
    ImageIcon,
    WhatsappIcon,
    FacebookIcon,
    LinkedInIcon,
    SearchIcon,
    SlackIcon,
    RobotIcon,
    SitemapIcon,
  },
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
  margin-right: 0.25em;
}

.sidebar__footer {
  margin-top: auto;
  padding: 20px 10px 10px 10px;

  color: var(--label-color);
  text-align: center;
}
</style>
