<template>
  <div>
    <panel-section title="Properties">
      <div v-if="!appleMetaData.length" class="warning-message">
        <WarningIcon class="icon" />
        <p>No meta properties detected.</p>
      </div>
      <properties-list class="apple-ios__properties-list" v-else>
        <properties-item
          v-for="(item, index) in appleMetaData"
          :key="index"
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
          v-for="(icon, index) in touchIcons"
          :key="index"
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
          v-for="(image, index) in startupImages"
          :key="index"
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
import { mapState } from 'vuex';
import createAbsoluteUrl from '@shared/lib/create-absolute-url';
import { findMetaContent } from '@shared/lib/find-meta';
import PanelSection from '@shared/components/panel-section';
import ExternalLink from '@shared/components/external-link';
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
    ...mapState([ 'head' ]),
    appleMetaData() {
      const { head } = this;
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
    },
    touchIcons() {
      return this.head.link
        .filter(link => link.rel === 'apple-touch-icon')
        .map(icon => ({
          ...icon,
          url: this.absoluteUrl(icon.href),
          term: {
            rel: icon.rel,
            sizes: icon.sizes,
          },
        }));
    },
    startupImages() {
      return this.head.link
        .filter(link => link.rel === 'apple-touch-startup-image')
        .map(image => ({
          ...image,
          url: this.absoluteUrl(image.href),
          term: {
            rel: image.rel,
            sizes: image.sizes,
            media: image.media,
          },
        }));
    },
  },
  methods: {
    absoluteUrl(url) {
      return createAbsoluteUrl(this.head, url);
    },
    metaValue(metaName) {
      return findMetaContent(this.head, metaName);
    },
  },
};
</script>
