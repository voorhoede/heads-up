<template>
  <aside class="app-sidebar">
    <nav>
      <section class="app-sidebar__section">
        <h3 class="app-sidebar__section-title">Application</h3>
        <ul class="app-sidebar__list">
          <li>
            <router-link :to="{ name: 'meta' }" class="app-sidebar__link">
              <img src="@/assets/icons/code.svg" width="16" height="16" alt="" />
              <span>Meta</span>
            </router-link>
          </li>
          <li>
            <a href="#" class="app-sidebar__link">
              <img src="@/assets/icons/link.svg" width="16" height="16" alt="" />
              <span>Link</span>
            </a>
          </li>
          <li>
            <a href="#" class="app-sidebar__link">
              <img src="@/assets/icons/image.svg" width="16" height="16" alt="" />
              <span>Favicon</span>
            </a>
          </li>
          <li>
            <a href="#" class="app-sidebar__link">
              <img src="@/assets/icons/apple.svg" width="16" height="16" alt="" />
              <span>Apple iOS</span>
            </a>
          </li>
          <li>
            <a href="#" class="app-sidebar__link">
              <img src="@/assets/icons/open-graph.svg" width="16" height="16" alt="" />
              <span>OpenGraph</span>
            </a>
          </li>
          <li>
            <a href="#" class="app-sidebar__link">
              <img src="@/assets/icons/robot.svg" width="16" height="16" alt="" />
              <span>Robots.txt</span>
            </a>
          </li>
          <li>
            <a href="#" class="app-sidebar__link">
              <img src="@/assets/icons/sitemap.svg" width="16" height="16" alt="" />
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
              <img src="@/assets/icons/twitter.svg" width="16" height="16" alt="" />
              <span>Twitter</span>
            </a>
          </li>
          <li>
            <a href="#" class="app-sidebar__link">
              <img src="@/assets/icons/whatsapp.svg" width="16" height="16" alt="" />
              <span>WhatsApp</span>
            </a>
          </li>
          <li>
            <a href="#" class="app-sidebar__link">
              <img src="@/assets/icons/linkedin.svg" width="16" height="16" alt="" />
              <span>LinkedIn</span>
            </a>
          </li>
          <li>
            <a href="#" class="app-sidebar__link">
              <img src="@/assets/icons/facebook.svg" width="16" height="16" alt="" />
              <span>Facebook</span>
            </a>
          </li>
          <li>
            <a href="#" class="app-sidebar__link">
              <img src="@/assets/icons/slack.svg" width="16" height="16" alt="" />
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
              <img src="@/assets/icons/code.svg" width="16" height="16" alt="" />
              <span>Search Meta</span>
            </a>
          </li>
          <li>
            <a href="#" class="app-sidebar__link">
              <img src="@/assets/icons/search.svg" width="16" height="16" alt="" />
              <span>OpenSearch</span>
            </a>
          </li>
        </ul>
      </section>
    </nav>
  </aside>
</template>

<style>
.app-sidebar {
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
  padding: 0.125rem;
  margin-bottom: 0.5rem;
}

.app-sidebar__link:hover {
  text-decoration: underline;
  color: var(--color-blue);
}

.app-sidebar__link img {
  width: 16px;
  height: 16px;
  margin-right: 0.5rem;
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
</style>
