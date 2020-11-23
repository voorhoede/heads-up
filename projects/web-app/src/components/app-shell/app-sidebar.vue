<template>
  <aside class="app-sidebar">
    <nav>
      <section class="app-sidebar__section">
        <h3 class="app-sidebar__section-title">Application</h3>
        <ul class="app-sidebar__list">
          <li>
            <router-link :to="{ name: 'meta' }" class="app-sidebar__link">
              <CodeIcon />
              <span>Meta</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'link' }" class="app-sidebar__link">
              <LinkIcon />
              <span>Link</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'favicon' }" class="app-sidebar__link">
              <ImageIcon />
              <span>Favicon</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'apple-ios' }" class="app-sidebar__link">
              <AppleIcon />
              <span>Apple iOS</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'open-graph' }" class="app-sidebar__link">
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
            <router-link :to="{ name: 'twitter' }" class="app-sidebar__link">
              <TwitterIcon />
              <span>Twitter</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'whatsapp' }" class="app-sidebar__link">
              <WhatsappIcon />
              <span>WhatsApp</span>
            </router-link>
          </li>
          <li>
            <a href="#" class="app-sidebar__link">
              <LinkedinIcon />
              <span>LinkedIn</span>
            </a>
          </li>
          <li>
            <router-link :to="{ name: 'facebook' }" class="app-sidebar__link">
              <FacebookIcon />
              <span>Facebook</span>
            </router-link>
          </li>
          <li>
            <a href="#" class="app-sidebar__link">
              <SlackIcon />
              <span>Slack</span>
            </a>
          </li>
        </ul>
      </section>
      <section class="app-sidebar__section">
        <h3 class="app-sidebar__section-title">Search</h3>
        <ul class="app-sidebar__list">
          <li>
            <router-link :to="{ name: 'search-meta' }" class="app-sidebar__link">
              <CodeIcon />
              <span>Search Meta</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'robots-txt' }" class="app-sidebar__link">
              <RobotIcon />
              <span>Robots</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'sitemap' }" class="app-sidebar__link">
              <SitemapIcon />
              <span>Sitemap</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'opensearch' }" class="app-sidebar__link">
              <SearchIcon />
              <span>Open Search</span>
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
  flex-direction: column;
  flex: 0 0 var(--sidebar-width);
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
  text-decoration: none;
  color: var(--color-black);
  padding: 0.5rem 0.5rem;
  transition: border-color .15s ease, color .15s ease, fill .15s ease;
  background-color: rgba(0, 0, 255, 0);
  border-left: 2px solid transparent;
}

.app-sidebar__external-link:hover,
.app-sidebar__link:hover,
.app-sidebar__link.router-link-active {
  color: var(--color-blue);
  fill: var(--color-blue);
  border-color: currentColor;
}

.app-sidebar__link svg {
  width: 18px;
  height: 18px;
  margin-right: 0.625rem;
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
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--color-blue);
  margin-bottom: 0.75rem;
}

.app-sidebar__footer {
  margin-top: auto;
  padding: .75rem 1.5rem;
  text-align: center;
  font-size: 0.75rem;
}
</style>
