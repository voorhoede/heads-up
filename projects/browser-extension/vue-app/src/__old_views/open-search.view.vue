<template>
  <div class="open-search">
    <panel-section title="Preview">
      <div v-if="!openSearchContent" class="warning-message">
        <app-icon name="warning" />
        <p>No OpenSearch file detected.</p>
      </div>
      <preview-iframe
        v-if="openSearchContent"
        :url="previewUrl"
        :loading-height="40"
      >
        <template v-slot:caption>
          Preview based on source file: <a :href="openSearchUrl" target="_blank">{{ openSearchUrl }}</a>.
        </template>
      </preview-iframe>
    </panel-section>
    <panel-section v-if="openSearchContent" title="Tags">
      <properties-list>
        <properties-item
          v-for="item in metaData"
          :key="item.term"
          :term="item.term"
          :value="item.value"
          :image="item.image"
          :type="item.type"
          :schema="schema"
        >
        </properties-item>
      </properties-list>
    </panel-section>
    <panel-section title="Resources">
      <ul class="resource-list">
        <li>
          <external-link href="https://developer.mozilla.org/en-US/docs/Web/OpenSearch">
            MDN web docs: OpenSearch description format
          </external-link>
        </li>
      </ul>
    </panel-section>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import createAbsoluteUrl from '@shared/lib/create-absolute-url';
import { findXMLElement } from '@shared/lib/find-meta';
import getTheme from '@shared/lib/theme';
import schema from '@shared/lib/schemas/open-search-schema';

import AppIcon from '@shared/components/app-icon';
import ExternalLink from '@shared/components/external-link';
import PanelSection from '@shared/components/panel-section';
import PropertiesList from '@shared/components/properties-list';
import PropertiesItem from '@shared/components/properties-item';
import PreviewIframe from '@shared/components/preview-iframe';

export default {
  components: {
    ExternalLink,
    PanelSection,
    PropertiesItem,
    PropertiesList,
    PreviewIframe,
    AppIcon,
  },
  data() {
    return {
      schema,
    };
  },
  computed: {
    ...mapState([ 'head', 'openSearchContent', 'openSearchUrl' ]),
    previewUrl() {
      const params = new URLSearchParams();
      params.set('title', this.shortName);
      params.set('theme', getTheme());

      return `/previews/open-search/open-search.html?${ params }`;
    },
    shortName() {
      const element = findXMLElement(this.openSearchContent, 'ShortName');
      return element ? element[0].value : null;
    },
    description() {
      const element = findXMLElement(this.openSearchContent, 'Description');
      return element ? element[0].value : null;
    },
    urls() {
      const elements = findXMLElement(this.openSearchContent, 'Url');
      return elements ? elements : null;
    },
    image() {
      const element = findXMLElement(this.openSearchContent, 'Image');
      return element ? element[0].value : null;
    },
    inputEncoding() {
      const element = findXMLElement(this.openSearchContent, 'InputEncoding');
      return element ? element[0].value : null;
    },
    metaData() {
      return [
        {
          term: 'shortname',
          value: this.shortName,
          required: true,
        },
        {
          term: 'description',
          value: this.description,
        },
        {
          term: 'urls',
          value: this.formatUrlsObject(this.urls),
          type: 'urls',
        },
        {
          term: 'image',
          value: this.image,
          image: {
            href: this.image,
            url: this.absoluteUrl(this.image),
          },
          type: 'image',
        },
        {
          term: 'input-encoding',
          value: this.inputEncoding,
        },
      ];
    },
  },
  methods: {
    absoluteUrl(url) {
      return createAbsoluteUrl(this.head, url);
    },
    formatUrlsObject(urls) {
    formatUrlsObject(urls) {
      return urls.map(item => {
        const templateAttr = item.attributes.find(({ name }) => name === 'template');
        const url = templateAttr ? templateAttr.value : null;
        const attributes = item.attributes
          .filter(({ name }) => name !== 'template')
          .reduce((obj, { name, value }) => (
            Object.assign(obj, { [name]: value })
          ), {});

        return { url, attributes };
      });
    },
  },
};
</script>
