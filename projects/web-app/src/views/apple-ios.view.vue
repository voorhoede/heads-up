<template>
  <panel-section title="Properties">
    <properties-list>
      <dt>apple-mobile-web-app-capable</dt><dd>{{ capable }}</dd>
      <dt>apple-mobile-web-app-title</dt><dd>{{ title }}</dd>
      <dt>apple-mobile-web-app-status-bar-style</dt><dd>{{ statusBarStyle }}</dd>
      <dt>format-detection</dt><dd>{{ formatDetection }}</dd>
      <dt>apple-itunes-app</dt><dd>{{ itunesApp }}</dd>
    </properties-list>
  </panel-section>
  <panel-section title="Touch icons">
    <p v-if="!touchIcons.length">
      No touch icons detected.
    </p>
    <properties-list v-else>
      <div v-for="icon in touchIcons" :key="icon.url">
        <dt v-if="icon.sizes">
          {{ icon.sizes }}
        </dt>
        <dd>
          <external-link :href="icon.url">
            <img :src="icon.url" alt="" />
          </external-link>
        </dd>
      </div>
    </properties-list>
  </panel-section>
  <panel-section title="Startup images">
    <p v-if="!startupImages.length">
      No startup images detected.
    </p>
    <properties-list v-else>
      <div v-for="image in startupImages" :key="image.url">
        <dt>
          <div v-if="image.filename">
            {{ image.filename }}
          </div>
          <div v-if="image.sizes">
            {{ image.sizes }}
          </div>
        </dt>
        <dd>
          <external-link :href="image.url">
            <img :src="image.url" alt="" />
          </external-link>
        </dd>
      </div>
    </properties-list>
  </panel-section>
  <panel-section title="Resources">
    <ul class="resource-list">
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
    </ul>
  </panel-section>
</template>

<script>
import { computed } from 'vue';
import useHead from '@/composables/use-head';
import { findMetaContent } from '@shared/lib/find-meta';
import ExternalLink from '@shared/components/external-link.vue';
import PanelSection from '@shared/components/panel-section.vue';
import PropertiesList from '@shared/components/properties-list.vue';

export default {
  setup: () => {
    const headData = useHead().data;

    const capable = computed(() => metaValue('apple-mobile-web-app-capable'));
    const title = computed(() => metaValue('apple-mobile-web-app-title'));
    const statusBarStyle = computed(() => metaValue('apple-mobile-web-app-status-bar-style'));
    const formatDetection = computed(() => metaValue('format-detection'));
    const itunesApp = computed(() => metaValue('apple-itunes-app'));
    const touchIcons = computed(() => {
      return headData.value.head.link
        .filter(link => link.rel === 'apple-touch-icon')
        .map(icon => ({ ...icon, url: absoluteUrl(icon.href) }));
    });
    const startupImages = computed(() => {
      return headData.value.head.link
        .filter(link => link.rel === 'apple-touch-startup-image')
        .map(image => ({ ...image, filename: image.href.split('/').pop(), url: absoluteUrl(image.href) }));
    });

    const absoluteUrl = url => {
      const headUrl = headData.value.head.url;
      return url.startsWith('http') ? url : new URL(headUrl).origin + url;
    };
    const metaValue = metaName => findMetaContent(headData.value.head, metaName);

    return {
      headData,
      capable,
      title,
      statusBarStyle,
      formatDetection,
      itunesApp,
      touchIcons,
      startupImages,
    };
  },
  components: {
    ExternalLink,
    PanelSection,
    PropertiesList,
  },
};
</script>
