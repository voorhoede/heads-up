<template>
  <panel-section title="Robots.txt">
    <properties-list>
      <dt>URL:</dt><dd>{{ url }}</dd>
      <dt>Crawlable:</dt><dd>{{ urlIsCrawlable }}</dd>
    </properties-list>
  </panel-section>
  <panel-section
    v-for="robot in robots"
    :key="robot.name"
    :title="robot.name"
  >
    <properties-list>
      <div v-for="item in robotData(robot)" :key="item.keyName">
        <dt>
          {{ item.title }}
        </dt>
        <dd v-if="typeof item.value === 'string'">
          {{ item.value }}
        </dd>
        <dd v-else>
          <div v-for="(value, index) in item.value" :key="index">
            <span>{{ value.path }}<br></span>
          </div>
        </dd>
      </div>
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

export default {
  setup: () => {
    const headData = useHead().data;
    const url = computed(() => headData.value.head.url);
    const robots = computed(() => headData.value.robots);
    const urlIsCrawlable = computed(() => headData.value.urlIsCrawlable);

    const robotData = robot => [
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

    return  {
      url,
      robots,
      urlIsCrawlable,
      robotData,
    };
  },
  components: { ExternalLink, PanelSection, PropertiesList },
};
</script>
