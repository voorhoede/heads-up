<template>
  <div>
    <panel-section v-if="!robots.length">
      <p>No robots.txt file was found on this domain.</p>
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
  import robotsParser from 'robots-txt-parser'
  import { ExternalLink, PanelSection, PropertiesList, ResourceList } from '../components'

  const robots = robotsParser({
    userAgent: 'Googlebot',
    allowOnNeutral: false
  })

  export default {
    components: { ExternalLink, PanelSection, PropertiesList, ResourceList },
    computed: {
      ...mapState(['head', 'robots']),
    },
    mounted() {
      this.getRobotsTxt(this.head.url)
    },
    methods: {
      getRobotsTxt(url) {
        robots.useRobotsFor(url)
          .then((result) => this.transformResult(result))
          .catch((error) => console.error(error))
      },
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
      transformResult(result) {
        if (result.sitemaps) {
          delete result.sitemaps
        }

        const robots = Object.keys(result).map((key) => ({
          name: key === '*' ? '* (all user agents)' : key,
          ...result[key],
        }))

        this.$store.commit('SET_ROBOTS', { robots: robots })
      },
    },
  }
</script>
