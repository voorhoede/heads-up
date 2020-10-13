<template>
  <div>
    <panel-section title="Current Page">
      <properties-list>
        <dt>URL:</dt><dd>{{ head.url }}</dd>
        <dt>Crawlable:</dt><dd>{{ urlIsCrawlable }}</dd>
      </properties-list>
    </panel-section>
    <panel-section
      v-for="robot in robots"
      :key="robot.name"
      :title="robot.name"
    >
      <properties-list>
        <template v-for="item in robotData(robot)">
          <dt :key="`${item.keyName}-key`">
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
            <template v-for="(value, index) in item.value">
              <span :key="index">{{ value.path }}<br></span>
            </template>
          </dd>
        </template>
      </properties-list>
    </panel-section>
    <panel-section title="Resources">
      <resource-list>
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
      </resource-list>
    </panel-section>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { ExternalLink, PanelSection, PropertiesList, ResourceList } from '../components'

  export default {
    components: { ExternalLink, PanelSection, PropertiesList, ResourceList },
    computed: {
      ...mapState(['head', 'robots', 'urlIsCrawlable']),
    },
    methods: {
      robotData(robot) {
        return [
          {
            keyName: 'allow',
            title: 'allow',
            value: robot.allow
          },
          {
            keyName: 'crawl-delay',
            title: 'crawlDelay',
            value: robot.crawlDelay.toString()
          },
          {
            keyName: 'disallow',
            title: 'disallow',
            value: robot.disallow
          },
        ]
      },
    },
  }
</script>
