<template>
  <div class="robots-txt">
    <panel-section title="Sitemap">
      <div v-if="!sitemapUrls.length" class="warning-message">
        <WarningIcon class="icon" />
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
          :value="robot.allow">
        </properties-item>
        <properties-item
          term="crawlDelay"
          :value="robot.crawlDelay">
        </properties-item>
        <properties-item
          term="disallow"
          :value="robot.disallow">
        </properties-item>
      </properties-list>
    </panel-section>
    <panel-section title="Current page">
      <properties-list>
        <properties-item
          term="url"
          :value="head.url">
        </properties-item>
        <properties-item
          term="crawlable"
          :value="urlIsCrawlable">
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
import { mapState } from 'vuex';
import ExternalLink from '@shared/components/external-link';
import PanelSection from '@shared/components/panel-section';
import PropertiesItem from '@shared/components/properties-item';
import PropertiesList from '@shared/components/properties-list';
import WarningIcon from '@shared/assets/icons/warning.svg';

export default {
  components: {
    ExternalLink,
    PanelSection,
    PropertiesItem,
    PropertiesList,
    WarningIcon,
  },
  computed: {
    ...mapState([ 'head', 'robots', 'sitemapUrls', 'urlIsCrawlable' ]),
  },
};
</script>
