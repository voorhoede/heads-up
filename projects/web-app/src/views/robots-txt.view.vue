<template>
  <panel-section title="Robots">
    <properties-list>
      <dt>URL:</dt><dd>{{ url }}</dd>
      <dt>Crawlable:</dt><dd>{{ urlIsCrawlable }}</dd>
    </properties-list>
  </panel-section>
  <panel-section title="Sitemap">
    <div v-if="!sitemapUrls.length" class="warning-message">
      <WarningIcon class="icon" />
      <p>No sitemaps detected.</p>
    </div>
    <properties-list v-else>
      <div v-for="(url, index) in sitemapUrls" :key="index">
        <dt>Url:</dt>
        <dd>
          <external-link :href="url">{{ url }}</external-link>
        </dd>
      </div>
    </properties-list>
    <p v-if="sitemapUrls.length">
      Go to <router-link :to="{ name: 'sitemap' }">Sitemap</router-link> for more details.
    </p>
  </panel-section>
  <panel-section
    v-for="robot in robots"
    :key="robot.name"
    :title="robot.name"
  >
    <properties-list>
        <dt>Allow</dt>
        <dd>
          <div v-for="(rule, index) in robot.allow" :key="index">
            <span v-if="rule.path">{{ rule.path }}</span>
          </div>
        </dd>
        <dt>CrawlDelay</dt>
        <dd>{{ robot.crawlDelay }}</dd>
        <dt>Disallow</dt>
        <dd>
          <div v-for="(rule, index) in robot.disallow" :key="index">
            <span v-if="rule.path">{{ rule.path }}</span>
          </div>
        </dd>
      </properties-list>
  </panel-section>
  <panel-section title="Resources">
    <ul class="resource-list">
      <li>
        <external-link href="https://www.robotstxt.org/robotstxt.html">
          About robots.txt
        </external-link>
      </li>
      <li>
        <external-link href="https://developers.google.com/search/reference/robots_txt?csw=1">
          Robots.txt specification by Google
        </external-link>
      </li>
      <li>
        <external-link href="https://yandex.com/support/webmaster/controlling-robot/robots-txt.html">
          Robots.txt specification by Yandex
        </external-link>
      </li>
    </ul>
  </panel-section>
</template>

<script>
import { computed } from 'vue';
import useHead from '@/composables/use-head';
import PanelSection from '@shared/components/panel-section';
import ExternalLink from '@shared/components/external-link';
import PropertiesList from '@shared/components/properties-list';
import WarningIcon from '@shared/assets/icons/warning.svg';

export default {
  setup: () => {
    const headData = useHead().data;
    const robots = computed(() => headData.value.robots);
    const sitemapUrls = computed(() => headData.value.sitemapUrls);
    const url = computed(() => headData.value.head.url);
    const urlIsCrawlable = computed(() => headData.value.urlIsCrawlable);

    return  {
      robots,
      sitemapUrls,
      url,
      urlIsCrawlable,
    };
  },
  components: { ExternalLink, PanelSection, PropertiesList, WarningIcon },
};
</script>
