<template>
  <aside class="app-sidebar">
    <h2 class="a11y-sr-only">Side menu</h2>
    <div class="app-sidebar__content">
      <nav class="app-sidebar__section" aria-label="Application analysis">
        <h3 class="app-sidebar__section-title">Application</h3>
        <ul class="app-sidebar__list">
          <li>
            <router-link
              :to="{ name: 'meta' }"
              class="app-sidebar__link"
              :disabled="!hasData"
            >
              <CodeIcon aria-hidden="true" />
              <span>Meta</span>
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'link' }"
              class="app-sidebar__link"
              :disabled="!hasData"
            >
              <LinkIcon aria-hidden="true" />
              <span>Link</span>
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'favicon' }"
              class="app-sidebar__link"
              :disabled="!hasData"
            >
              <ImageIcon aria-hidden="true" />
              <span>Favicon</span>
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'apple-ios' }"
              class="app-sidebar__link"
              :disabled="!hasData"
            >
              <AppleIcon aria-hidden="true" />
              <span>Apple iOS</span>
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'open-graph' }"
              class="app-sidebar__link"
              :disabled="!hasData"
            >
              <OpenGraphIcon aria-hidden="true" />
              <span>OpenGraph</span>
            </router-link>
          </li>
        </ul>
      </nav>
      <nav class="app-sidebar__section" aria-label="Social Media analysis">
        <h3 class="app-sidebar__section-title">Social Media</h3>
        <ul class="app-sidebar__list">
          <li>
            <router-link
              :to="{ name: 'twitter' }"
              class="app-sidebar__link"
              :disabled="!hasData"
            >
              <TwitterIcon aria-hidden="true" />
              <span>Twitter</span>
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'whatsapp' }"
              class="app-sidebar__link"
              :disabled="!hasData"
            >
              <WhatsappIcon aria-hidden="true" />
              <span>WhatsApp</span>
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'linkedin' }"
              class="app-sidebar__link"
              :disabled="!hasData"
            >
              <LinkedinIcon aria-hidden="true" />
              <span>LinkedIn</span>
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'facebook' }"
              class="app-sidebar__link"
              :disabled="!hasData"
            >
              <FacebookIcon aria-hidden="true" />
              <span>Facebook</span>
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'slack' }"
              class="app-sidebar__link"
              :disabled="!hasData"
            >
              <SlackIcon aria-hidden="true" />
              <span>Slack</span>
            </router-link>
          </li>
        </ul>
      </nav>
      <nav class="app-sidebar__section" aria-label="Search metadata analysis">
        <h3 class="app-sidebar__section-title">Search</h3>
        <ul class="app-sidebar__list">
          <li>
            <router-link
              :to="{ name: 'search-meta' }"
              class="app-sidebar__link"
              :disabled="!hasData"
            >
              <CodeIcon aria-hidden="true" />
              <span>Search Meta</span>
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'robots-txt' }"
              class="app-sidebar__link"
              :disabled="!hasData"
            >
              <RobotIcon aria-hidden="true" />
              <span>Robots</span>
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'sitemap' }"
              class="app-sidebar__link"
              :disabled="!hasData"
            >
              <SitemapIcon aria-hidden="true" />
              <span>Sitemap</span>
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'open-search' }"
              class="app-sidebar__link"
              :disabled="!hasData"
            >
              <SearchIcon aria-hidden="true" />
              <span>OpenSearch</span>
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'structured-data' }"
              class="app-sidebar__link"
              :disabled="!hasData"
            >
              <SitemapIcon aria-hidden="true" />
              <span>Structured Data</span>
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'google' }"
              class="app-sidebar__link"
              :disabled="!hasData"
            >
              <GoogleIcon aria-hidden="true" />
              <span>Google</span>
            </router-link>
          </li>
        </ul>
      </nav>
      <footer class="app-sidebar__footer">
        <madeWithLove />
      </footer>
    </div>
  </aside>
</template>

<script>
import { computed } from 'vue';
import useHead from '@/composables/use-head';
import AppleIcon from '@shared/assets/icons/apple.svg';
import CodeIcon from '@shared/assets/icons/code.svg';
import FacebookIcon from '@shared/assets/icons/facebook.svg';
import GoogleIcon from '@shared/assets/icons/google.svg';
import ImageIcon from '@shared/assets/icons/image.svg';
import LinkedinIcon from '@shared/assets/icons/linkedin.svg';
import LinkIcon from '@shared/assets/icons/link.svg';
import MadeWithLove from '@shared/components/made-with-love';
import OpenGraphIcon from '@shared/assets/icons/open-graph.svg';
import RobotIcon from '@shared/assets/icons/robot.svg';
import SearchIcon from '@shared/assets/icons/search.svg';
import SitemapIcon from '@shared/assets/icons/sitemap.svg';
import SlackIcon from '@shared/assets/icons/slack.svg';
import TwitterIcon from '@shared/assets/icons/twitter.svg';
import WhatsappIcon from '@shared/assets/icons/whatsapp.svg';

export default {
  setup() {
    const hasData = computed(() => !!useHead().data.value);
    return { hasData };
  },

  components: {
    AppleIcon,
    CodeIcon,
    FacebookIcon,
    GoogleIcon,
    ImageIcon,
    LinkedinIcon,
    LinkIcon,
    MadeWithLove,
    OpenGraphIcon,
    RobotIcon,
    SearchIcon,
    SitemapIcon,
    SlackIcon,
    TwitterIcon,
    WhatsappIcon,
  },
};
</script>

<style>
.app-sidebar {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  flex-direction: column;
  width: var(--sidebar-width);
  height: 100vh;
  padding-top: var(--header-height);
  border-right: 1px solid var(--color-gray);
  background-color: var(--paper);
}

.app-sidebar__content {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-x: auto;
}

.app-sidebar__list {
  list-style: none;
}

.app-sidebar__external-link,
.app-sidebar__link {
  display: flex;
  align-items: center;
  padding: 0.5rem 0.5rem;
  transition: opacity .3s ease-out, border-color .15s ease, color .15s ease, fill .15s ease;
  border-left: 2px solid transparent;
  background-color: rgba(0, 0, 255, 0);
  color: var(--color-black);
  text-decoration: none;
}

.app-sidebar__external-link:hover,
.app-sidebar__link:hover,
.app-sidebar__link.router-link-active {
  border-color: currentColor;
  fill: var(--color-blue);
  color: var(--color-blue);
}

.app-sidebar__link svg {
  width: 18px;
  height: 18px;
  margin-right: 0.625rem;
}

.app-sidebar__link[disabled="true"] {
  opacity: 0.5;
  cursor: default;
}

.app-sidebar__link[disabled="true"]:hover {
  border-color: transparent;
  fill: var(--color-black);
  color: var(--color-black);
}

.app-sidebar__external-link {
  justify-content: center;
  margin-bottom: 12px;
  border: none;
}

.app-sidebar__section {
  padding: 1rem 1rem 0;
}

@media (min-width: 600px) {
  .app-sidebar__section {
    padding: 1.5rem 1.5rem 0;
  }
}

.app-sidebar__section-title {
  margin-bottom: 0.75rem;
  color: var(--color-blue);
  font-size: 1.25rem;
  font-weight: 500;
}

.app-sidebar__footer {
  margin-top: auto;
  padding: 1.5rem;
  font-size: 0.75rem;
  text-align: center;
}
</style>
