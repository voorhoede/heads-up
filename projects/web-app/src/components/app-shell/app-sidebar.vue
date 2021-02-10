<template>
  <aside class="app-sidebar">
    <nav>
      <section class="app-sidebar__section">
        <h3 class="app-sidebar__section-title">Application</h3>
        <ul class="app-sidebar__list">
          <li>
            <router-link
              :to="{ name: 'meta' }"
              class="app-sidebar__link"
              :disabled="!hasData"
            >
              <CodeIcon />
              <span>Meta</span>
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'link' }"
              class="app-sidebar__link"
              :disabled="!hasData"
            >
              <LinkIcon />
              <span>Link</span>
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'favicon' }"
              class="app-sidebar__link"
              :disabled="!hasData"
            >
              <ImageIcon />
              <span>Favicon</span>
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'apple-ios' }"
              class="app-sidebar__link"
              :disabled="!hasData"
            >
              <AppleIcon />
              <span>Apple iOS</span>
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'open-graph' }"
              class="app-sidebar__link"
              :disabled="!hasData"
            >
              <OpenGraphIcon />
              <span>OpenGraph</span>
            </router-link>
          </li>
        </ul>
      </section>
      <section class="app-sidebar__section">
        <h3 class="app-sidebar__section-title">Social Media</h3>
        <ul class="app-sidebar__list">
          <li>
            <router-link
              :to="{ name: 'twitter' }"
              class="app-sidebar__link"
              :disabled="!hasData"
            >
              <TwitterIcon />
              <span>Twitter</span>
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'whatsapp' }"
              class="app-sidebar__link"
              :disabled="!hasData"
            >
              <WhatsappIcon />
              <span>WhatsApp</span>
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'linkedin' }"
              class="app-sidebar__link"
              :disabled="!hasData"
            >
              <LinkedinIcon />
              <span>LinkedIn</span>
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'facebook' }"
              class="app-sidebar__link"
              :disabled="!hasData"
            >
              <FacebookIcon />
              <span>Facebook</span>
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'slack' }"
              class="app-sidebar__link"
              :disabled="!hasData"
            >
              <SlackIcon />
              <span>Slack</span>
            </router-link>
          </li>
        </ul>
      </section>
      <section class="app-sidebar__section">
        <h3 class="app-sidebar__section-title">Search</h3>
        <ul class="app-sidebar__list">
          <li>
            <router-link
              :to="{ name: 'search-meta' }"
              class="app-sidebar__link"
              :disabled="!hasData"
            >
              <CodeIcon />
              <span>Search Meta</span>
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'robots-txt' }"
              class="app-sidebar__link"
              :disabled="!hasData"
            >
              <RobotIcon />
              <span>Robots</span>
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'sitemap' }"
              class="app-sidebar__link"
              :disabled="!hasData"
            >
              <SitemapIcon />
              <span>Sitemap</span>
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'open-search' }"
              class="app-sidebar__link"
              :disabled="!hasData"
            >
              <SearchIcon />
              <span>OpenSearch</span>
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'structured-data' }"
              class="app-sidebar__link"
              :disabled="!hasData"
            >
              <SitemapIcon />
              <span>Structured Data</span>
            </router-link>
          </li>
        </ul>
      </section>
    </nav>
    <footer class="app-sidebar__footer">
      <external-link class="app-sidebar__external-link" href="https://heads-up-landing-page.netlify.app/">About Heads Up</external-link>
      <madeWithLove />
    </footer>
  </aside>
</template>

<script>
import { computed } from 'vue';
import useHead from '@/composables/use-head';
import AppleIcon from '@shared/assets/icons/apple.svg';
import CodeIcon from '@shared/assets/icons/code.svg';
import FacebookIcon from '@shared/assets/icons/facebook.svg';
import ImageIcon from '@shared/assets/icons/image.svg';
import ExternalLink from '@shared/components/external-link';
import LinkIcon from '@shared/assets/icons/link.svg';
import LinkedinIcon from '@shared/assets/icons/linkedin.svg';
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
    ExternalLink,
    FacebookIcon,
    ImageIcon,
    LinkIcon,
    LinkedinIcon,
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

.app-sidebar__link[disabled] {
  opacity: 0.5;
  cursor: default;
}

.app-sidebar__link[disabled]:hover {
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
  padding: 1.5rem 1.5rem 0;
}

.app-sidebar__section-title {
  margin-bottom: 0.75rem;
  color: var(--color-blue);
  font-size: 1.25rem;
  font-weight: 500;
}

.app-sidebar__footer {
  margin-top: auto;
  padding: .75rem 1.5rem;
  font-size: 0.75rem;
  text-align: center;
}
</style>
