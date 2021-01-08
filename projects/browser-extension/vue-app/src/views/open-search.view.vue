<template>
  <div class="opensearch">
    <panel-section title="Preview">
      <div v-if="!openSearchContent" class="warning-message">
        <WarningIcon class="icon" />
        <p>No OpenSearch file detected.</p>
      </div>
      <preview-iframe
         v-if="openSearchContent"
        :url="previewUrl"
        iframeClass="opensearch__preview"
      >
        <template v-slot:caption>
          Preview based on source file:
          <a :href="openSearchUrl" target="_blank">{{ openSearchUrl }}</a>
        </template>
      </preview-iframe>
    </panel-section>

    <panel-section v-if="openSearchContent" title="Tags">
      <properties-list>
        <properties-item
          v-for="(item, index) in opensearchData"
          :key="index"
          :value="item.value"
          :term="item.keyName"
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
import { findLinkHref, findXMLElement } from '@shared/lib/find-meta';
import getTheme from '@shared/lib/theme';
import schema  from '../lib/schemas/opensearch-schema';
import PanelSection from '@shared/components/panel-section';
import ExternalLink from '@shared/components/external-link';
import PropertiesList from '@shared/components/properties-list';
import PropertiesItem from '@shared/components/properties-item';
import PreviewIframe from '@shared/components/preview-iframe';
import WarningIcon from '@shared/assets/icons/warning.svg';

export default {
  components: {
    ExternalLink,
    PanelSection,
    PropertiesItem,
    PropertiesList,
    PreviewIframe,
    WarningIcon,
  },
  computed: {
    ...mapState([ 'head', 'openSearchContent', 'openSearchUrl' ]),
    themeClass() {
      /**
       * class '-theme-with-dark-background' is taken from original dev tools repo
       * src: https://github.com/ChromeDevTools/devtools-frontend/blob/02a851d01de158d8c0a8fd1d3af06649b5379bd6/front_end/ui/inspectorStyle.css
       */
      return getTheme() === 'dark' ? '-theme-with-dark-background' : '';
    },
    previewUrl() {
      const params = new URLSearchParams();
      params.set('title', this.shortName);
      params.set('theme', this.themeClass);

      return `/previews/opensearch/opensearch.html?${ params }`;
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
    opensearchData() {
      return [
        {
          keyName: 'shortname',
          title: 'ShortName',
          value: this.shortName,
        },
        {
          keyName: 'description',
          title: 'Description',
          value: this.description,
        },
        {
          keyName: 'urls',
          title: 'Url(s)',
          value: this.urls,
        },
        {
          keyName: 'image',
          title: 'Image',
          value: this.image,
        },
        {
          keyName: 'input-encoding',
          title: 'InputEncoding',
          value: this.inputEncoding,
        },
      ];
    },
    schema() { return schema; },
  },
  methods: {
    absoluteUrl(url) {
      return createAbsoluteUrl(this.head, url);
    },
  },
};
</script>

<style>
.opensearch__preview {
  height: 140px;
}
</style>
