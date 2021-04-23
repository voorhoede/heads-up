<template>
  <div class="android">
    <panel-section title="Properties">
      <properties-list>
        <properties-item
          v-for="item in metaData"
          :key="item.term"
          :term="item.term"
          :value="item.value"
          :required="true"
        >
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
          v-for="icon in touchIcons"
          :key="icon.term"
          :term="icon.term"
          :value="icon.url"
          :image="icon"
          type="image"
        >
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
          v-for="image in startupImages"
          :key="image.term"
          :term="image.term"
          :value="image.url"
          :image="image"
          type="image"
        >
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
  </div>
</template>

<script>
import { computed } from 'vue';
import createAbsoluteUrl from '@shared/lib/create-absolute-url';
import { findMetaContent } from '@shared/lib/find-meta';

import ExternalLink from '@shared/components/external-link';
import PanelSection from '@shared/components/panel-section';
import PropertiesItem from '@shared/components/properties-item';
import PropertiesList from '@shared/components/properties-list';
import WarningIcon from '@shared/assets/icons/warning.svg';

export default {
  props: {
    headData: {
      type: Object,
      required: true,
    },
  },

  setup: props => {
    const metaData = computed(() => {
      const { head } = props.headData;
      return [
        {
          term: 'apple-mobile-web-app-capable',
          value: findMetaContent(head, 'apple-mobile-web-app-capable'),
        },
        {
          term: 'apple-mobile-web-app-title',
          value: findMetaContent(head, 'apple-mobile-web-app-title'),
        },
        {
          term: 'apple-mobile-web-app-status-bar-style',
          value: findMetaContent(head, 'apple-mobile-web-app-status-bar-style'),
        },
        {
          term: 'format-detection',
          value: findMetaContent(head, 'format-detection'),
        },
        {
          term: 'apple-itunes-app',
          value: findMetaContent(head, 'apple-itunes-app'),
        },
      ];
    });

    const touchIcons = computed(() => (
      props.headData.head.link
        .filter(link => link.rel === 'apple-touch-icon')
        .map(icon => ({
          ...icon,
          url: absoluteUrl(icon.href),
          term: [ icon.rel, icon.sizes ],
        }))
        .sort((a, b) => {
          const sizeA = a.sizes ? a.sizes.split('x')[0] : 0;
          const sizeB = b.sizes ? b.sizes.split('x')[0] : 0;
          return parseInt(sizeA, 10) > parseInt(sizeB, 10) ? 1 : -1;
        })
    ));

    const startupImages = computed(() => (
      props.headData.head.link
        .filter(link => link.rel === 'apple-touch-startup-image')
        .map(image => ({
          ...image,
          url: absoluteUrl(image.href),
          term: [ image.rel, image.sizes, image.media ],
        }))
    ));

    const absoluteUrl = url => createAbsoluteUrl(props.headData.head, url);

    return {
      metaData,
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
