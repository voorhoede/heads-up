<template>
  <div class="robots-txt">
    <panel-section title="Sitemap">
      <div v-if="!sitemapUrls.length" class="warning-message">
        <app-icon name="warning" />
        <p>No sitemaps detected.</p>
      </div>
      <properties-list v-else>
        <properties-item
          v-for="(url, index) in sitemapUrls"
          :key="index"
          term="url"
          :value="url"
        >
        </properties-item>
      </properties-list>
    </panel-section>
    <panel-section
      v-for="robot in robots"
      :key="robot.name"
      :title="robot.name"
    >
      <properties-list>
        <properties-item
          term="allow"
          :value="robot.allow.length && robot.allow"
          required
        >
        </properties-item>
        <properties-item
          term="crawlDelay"
          :value="robot.crawlDelay"
          required
        >
        </properties-item>
        <properties-item
          term="disallow"
          :value="robot.disallow.length && robot.disallow"
          required
        >
        </properties-item>
      </properties-list>
    </panel-section>
    <panel-section title="Current page">
      <properties-list>
        <properties-item
          term="url"
          :value="url"
        >
        </properties-item>
        <properties-item
          term="crawlable"
          :value="urlIsCrawlable"
        >
        </properties-item>
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
  </div>
</template>

<script>
import { computed } from 'vue';

import AppIcon from '@shared/components/app-icon';
import PanelSection from '@shared/components/panel-section';
import ExternalLink from '@shared/components/external-link';
import PropertiesItem from '@shared/components/properties-item';
import PropertiesList from '@shared/components/properties-list';

export default {
  props: {
    headData: {
      type: Object,
      required: true,
    },
  },

  setup: props => {
    const robots = computed(() => props.headData.robots);
    const sitemapUrls = computed(() => props.headData.sitemapUrls);
    const url = computed(() => props.headData.head.url);
    const urlIsCrawlable = computed(() => props.headData.urlIsCrawlable.toString());

    return  {
      robots,
      sitemapUrls,
      url,
      urlIsCrawlable,
    };
  },
  components: {
    ExternalLink,
    PanelSection,
    PropertiesItem,
    PropertiesList,
    AppIcon,
  },
};
</script>
