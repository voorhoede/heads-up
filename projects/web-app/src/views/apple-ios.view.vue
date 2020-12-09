<template>
  <panel-section title="Properties">
    <div v-if="!appleMetadata.length" class="warning-message">
      <WarningIcon class="icon" />
      <p>No meta properties detected.</p>
    </div>
    <properties-list v-else>
      <properties-item
        v-for="item in appleMetadata"
        :key="item.keyName"
        :key-name="item.keyName"
        :refresh-on="appleMetadata"
      >
        <template #default>
          {{ item.title }}
        </template>
        <template #value>
          {{ item.value }}
        </template>
      </properties-item>
    </properties-list>
  </panel-section>
  <panel-section title="Touch icons">
    <div v-if="!touchIcons.length" class="warning-message">
      <WarningIcon class="icon" />
      <p>No touch icons detected.</p>
    </div>
    <properties-list v-else>
      <properties-item
        v-for="(icon, index) in touchIcons"
        :key="index"
        :key-name="icon.sizes"
        :refresh-on="touchIcons"
      >
        <template #default>
          <template v-if="icon.sizes">
            {{ icon.sizes }}
          </template>
        </template>
        <template #value>
          <external-link :href="icon.url">
            <img :src="icon.url" alt="" />
          </external-link>
        </template>
      </properties-item>
    </properties-list>
  </panel-section>
  <panel-section title="Startup images">
    <div v-if="!startupImages.length" class="warning-message">
      <WarningIcon class="icon" />
      <p>No startup images detected.</p>
    </div>
    <properties-list v-else>
      <properties-item
        v-for="(image, index) in startupImages"
        :key="index"
        :key-name="image.url"
        :refresh-on="startupImages"
      >
        <template #default>
          <template v-if="image.filename">
            {{ image.filename }}
          </template>
          <template v-if="image.sizes">
            {{ image.sizes }}
          </template>
        </template>
        <template #value>
          <external-link :href="image.url">
            <img :src="image.url" alt="" />
          </external-link>
        </template>
      </properties-item>
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
import createAbsoluteUrl from '@shared/lib/create-absolute-url';
import { findMetaContent } from '@shared/lib/find-meta';
import ExternalLink from '@shared/components/external-link';
import PanelSection from '@shared/components/panel-section';
import PropertiesItem from '@shared/components/properties-item';
import PropertiesList from '@shared/components/properties-list';
import WarningIcon from '@shared/assets/icons/warning.svg';

export default {
  setup: () => {
    const headData = useHead().data;
    const appleMetadata = computed(() => {
      const { head } = headData.value;
      return [
        {
          keyName: 'app-capable',
          title: 'apple-mobile-web-app-capable',
          value: findMetaContent(head, 'apple-mobile-web-app-capable'),
        },
        {
          keyName: 'app-title',
          title: 'apple-mobile-web-app-title',
          value: findMetaContent(head, 'apple-mobile-web-app-title'),
        },
        {
          keyName: 'status-bar-style',
          title: 'apple-mobile-web-app-status-bar-style',
          value: findMetaContent(head, 'apple-mobile-web-app-status-bar-style'),
        },
        {
          keyName: 'format-detection',
          title: 'format-detection',
          value: findMetaContent(head, 'format-detection'),
        },
        {
          keyName: 'itunes-app',
          title: 'apple-itunes-app',
          value: findMetaContent(head, 'apple-itunes-app'),
        },
      ];
    });
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

    const absoluteUrl = url => createAbsoluteUrl(headData.value.head, url);

    return {
      appleMetadata,
      touchIcons,
      startupImages,
    };
  },
  components: {
    ExternalLink,
    PanelSection,
    PropertiesItem,
    PropertiesList,
    WarningIcon,
  },
};
</script>
