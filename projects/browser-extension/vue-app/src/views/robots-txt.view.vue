<template>
  <div>
    <panel-section title="Current page">
      <properties-list>
        <dt>URL:</dt><dd>{{ head.url }}</dd>
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
        <template
          v-for="item in robotData(robot)"
          :key="`${item.keyName}-key`"
        >
          <dt>
            {{ item.title }}
          </dt>
          <dd
            v-if="typeof item.value === 'string'"
            :key="`${item.keyName}-value`"
          >
            {{ item.value }}
          </dd>
          <dd
            v-else
            :key="`${item.keyName}-value`"
          >
            <template
              v-for="(value, index) in item.value"
              :key="index"
            >
              <span>{{ value.path }}<br></span>
            </template>
          </dd>
        </template>
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
import ExternalLink from '@shared/components/external-link.vue';
import PanelSection from '@shared/components/panel-section.vue';
import PropertiesList from '@shared/components/properties-list.vue';
import WarningIcon from '@shared/assets/icons/warning.svg';

export default {
  components: { ExternalLink, PanelSection, PropertiesList, WarningIcon },
  computed: {
    ...mapState([ 'head', 'robots', 'sitemapUrls', 'urlIsCrawlable' ]),
  },
  methods: {
    robotData(robot) {
      return [
        {
          keyName: 'allow',
          title: 'allow',
          value: robot.allow,
        },
        {
          keyName: 'crawl-delay',
          title: 'crawlDelay',
          value: robot.crawlDelay.toString(),
        },
        {
          keyName: 'disallow',
          title: 'disallow',
          value: robot.disallow,
        },
      ];
    },
  },
};
</script>
