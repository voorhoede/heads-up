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
            <a href="#" class="app-sidebar__link">
              <OpenGraphIcon />
              <span>OpenGraph</span>
            </a>
          </li>
          <li>
            <router-link :to="{ name: 'robots-txt' }" class="app-sidebar__link">
              <RobotIcon />
              <span>Robots.txt</span>
            </router-link>
          </li>
          <li>
            <a href="#" class="app-sidebar__link">
              <SitemapIcon />
              <span>Sitemap</span>
            </a>
          </li>
        </ul>
      </section>
      <section class="app-sidebar__section">
        <h3 class="app-sidebar__section-title">Social Media</h3>
        <ul class="app-sidebar__list">
          <li>
            <a href="#" class="app-sidebar__link">
              <TwitterIcon />
              <span>Twitter</span>
            </a>
          </li>
          <li>
            <a href="#" class="app-sidebar__link">
              <WhatsappIcon />
              <span>WhatsApp</span>
            </a>
          </li>
          <li>
            <a href="#" class="app-sidebar__link">
              <LinkedinIcon />
              <span>LinkedIn</span>
            </a>
          </li>
          <li>
            <a href="#" class="app-sidebar__link">
              <FacebookIcon />
              <span>Facebook</span>
            </a>
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
            <a href="#" class="app-sidebar__link">
              <CodeIcon />
              <span>Search Meta</span>
            </a>
          </li>
          <li>
            <a href="#" class="app-sidebar__link">
              <SearchIcon />
              <span>OpenSearch</span>
            </a>
          </li>
        </ul>
      </section>
    </nav>
    <footer class="app-sidebar__footer">
      Made with love by <br>
      <external-link  href="https://www.voorhoede.nl">
        De Voorhoede
      </external-link>
    </footer>
  </aside>
</template>

<script>
import AppleIcon from '@shared/assets/icons/apple.svg';
import CodeIcon from '@shared/assets/icons/code.svg';
import ExternalLink from '@shared/components/external-link.vue';
import FacebookIcon from '@shared/assets/icons/facebook.svg';
import ImageIcon from '@shared/assets/icons/image.svg';
import LinkIcon from '@shared/assets/icons/link.svg';
import LinkedinIcon from '@shared/assets/icons/linkedin.svg';
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
}

.app-sidebar__list {
  list-style: none;
}

.app-sidebar__link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--color-black);
  padding: 0.5rem 0.5rem;
  border-radius: 3px;
  transition: background-color .15s ease, color .15s ease, fill .15s ease;
  background-color: rgba(0, 0, 255, 0);
}

.app-sidebar__link:hover {
  color: var(--color-blue);
  fill: var(--color-blue);
  background-color: rgba(0, 0, 255, 0.05);
}

.app-sidebar__link.router-link-active {
  color: var(--color-blue);
  fill: var(--color-blue);
  background-color: rgba(0, 0, 255, 0.15);
}

.app-sidebar__link svg {
  width: 18px;
  height: 18px;
  margin-right: 0.625rem;
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
