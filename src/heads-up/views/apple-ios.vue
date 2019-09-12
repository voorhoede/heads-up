<template>
  <div>
    <panel-section title="Properties">
      <properties-list>
        <dt>apple-mobile-web-app-capable</dt>
        <dd>{{ appCapable }}</dd>
        
        <dt>apple-mobile-web-app-title</dt>
        <dd v-if="title">
          {{ title }}
        </dd>
        <dd v-else>
          <WarningIcon class="icon-warning" />
          No title defined
        </dd>
        
        <dt>apple-mobile-web-app-status-bar-style</dt>
        <dd v-if="statusBarStyle">
          {{ statusBarStyle }}
        </dd>
        <dd v-else>
          <WarningIcon class="icon-warning" />
          No status bar style defined
        </dd>
        
        <template v-if="formatDetection">
          <dt>format-detection</dt><dd>{{ formatDetection }}</dd>
        </template>

        <dt>apple-itunes-app</dt>
        <dd v-if="itunesApp">
          {{ itunesApp }}
        </dd>
        <dd v-else>
          <WarningIcon class="icon-warning" />
          No itunes app defined
        </dd>
      </properties-list>
    </panel-section>

    <panel-section title="Touch icons">
      <p v-if="!touchIcons.length">
        No touch icons detected.
      </p>
      <properties-list>
        <template v-for="icon in touchIcons">
          <dt :key="`${icon.url}-key`">
            <div v-if="icon.sizes">
              {{ icon.sizes }}
            </div>
          </dt>
          <dd :key="`${icon.url}-value`">
            <external-link :href="icon.url">
              <img
                alt=""
                :src="icon.url"
              >
            </external-link>
          </dd>
        </template>
      </properties-list>
    </panel-section>

    <panel-section title="Startup images">
      <p v-if="!startupImages.length">
        No startup images detected.
      </p>
      <properties-list>
        <template v-for="image in startupImages">
          <dt :key="`${image.url}-key`">
            {{ image.filename }}
            {{ image.filename }}
            <div v-if="image.sizes">
              {{ image.sizes }}
            </div>
          </dt>
          <dd :key="`${image.url}-value`">
            <external-link :href="image.url">
              <img
                alt=""
                :src="image.url"
              >
            </external-link>
          </dd>
        </template>
      </properties-list>
    </panel-section>

    <panel-section title="Resources">
      <resource-list>
        <li>
          <external-link href="https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html#//apple_ref/doc/uid/TP40008193-SW3">
            Apple-specific meta tags
          </external-link>
        </li>
        <li>
          <external-link href="https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html">
            Configuring web applications for iOS
          </external-link>
        </li>
      </resource-list>
    </panel-section>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { ExternalLink, PanelSection, PropertiesList, ResourceList } from '../components'
  import { findMetaContent } from '../lib/find-meta'

  export default {
    components: { ExternalLink, PanelSection, PropertiesList, ResourceList },
    computed: {
      ...mapState(['head']),
      appCapable() { return this.metaValue('apple-mobile-web-app-capable') },
      title() { return this.metaValue('apple-mobile-web-app-title') },
      statusBarStyle() { return this.metaValue('apple-mobile-web-app-status-bar-style') },
      formatDetection() { return this.metaValue('format-detection') },
      itunesApp() { return this.metaValue('apple-itunes-app') },
      touchIcons() {
        return this.head.link
          .filter(link => link.rel === 'apple-touch-icon')
          .map(icon => ({ ...icon, url: this.absoluteUrl(icon.href) }))
      },
      startupImages() {
        return this.head.link
          .filter(link => link.rel === 'apple-touch-startup-image')
          .map(image => ({
            ...image,
            filename: image.href.split('/').pop(),
            url: this.absoluteUrl(image.href)
          }))
      }
    },
    methods: {
      absoluteUrl(url) {
        return url.startsWith('http') ? url : new URL(this.head.url).origin + url
      },
      metaValue(metaName) {
        return findMetaContent(this.head, metaName)
      }
    }
  }
</script>
