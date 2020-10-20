<template>
  <div class="opensearch">
    <panel-section title="Preview">
      <p v-if="!hasOpenSearchFile">
        This page does not contain a reference to an OpenSearch description file.
      </p>

      <figure v-if="hasOpenSearchFile">
        <iframe
          ref="iframe"
          title="OpenSearch preview"
          :src="previewUrl"
          height="auto"
          width="100%"
          class="opensearch__preview"
        />
        <figcaption class="opensearch__preview-caption">
          Preview based on source file:
          <a
            :href="fileUrl"
            target="_blank"
          >
            {{ fileUrl }}
          </a>
        </figcaption>
      </figure>
    </panel-section>

    <panel-section title="Tags">
      <properties-list v-if="hasOpenSearchFile">
        <properties-item
          v-for="item in opensearchData"
          :key="item.keyName"
          :value="item.keyName !== 'urls' && item.keyName !== 'image' ? item.value : null"
          :key-name="item.keyName"
          :schema="schema"
        >
          <template #default>
            {{ item.title }}
          </template>
          <template
            v-if="item.keyName === 'urls'"
            #value
          >
            <template v-for="(url, index) in item.value">
              <p :key="index">
                <template v-for="(attribute, attrIndex) in url.attributes">
                  <external-link
                    v-if="attribute.name === 'template'"
                    :key="attrIndex"
                    :href="absoluteUrl(attribute.value)"
                  >
                    {{ attribute.value }}<br>
                  </external-link>
                </template>
                <template v-for="(attribute, attrIndex) in url.attributes">
                  <span
                    v-if="attribute.name !== 'template'"
                    :key="attrIndex"
                  >
                    {{ attribute.name }}: {{ attribute.value }}<br>
                  </span>
                </template>
              </p>
            </template>
          </template>
          <template
            v-else-if="item.keyName === 'image'"
            #value
          >
            <img
              alt=""
              :src="absoluteUrl(item.value)"
            >
            <external-link :href="absoluteUrl(item.value)">
              <span>{{ item.value }}</span>
            </external-link>
          </template>
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
import PanelSection from '@shared/components/panel-section.vue';
import ExternalLink from '@shared/components/external-link.vue';
import { PropertiesItem, PropertiesList } from '../components';
import getTheme from '../lib/theme';
import { findLinkHref, findXMLElement } from '../lib/find-meta';
import schema  from '../lib/schemas/opensearch-schema';

export default {
  components: { ExternalLink, PanelSection, PropertiesItem, PropertiesList },
  data() {
    return {
      fileContent: '',
    };
  },
  computed: {
    ...mapState([ 'head' ]),
    hasOpenSearchFile() {
      return this.fileUrl && this.fileContent;
    },
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
    metaTagValue() {
      return findLinkHref(this.head, 'search');
    },
    fileUrl() {
      return this.metaTagValue.startsWith('/')
        ? `https://${ this.head.domain }${ this.metaTagValue }`
        : this.metaTagValue;
    },
    shortName() {
      const element = findXMLElement(this.fileContent, 'ShortName');
      return element ? element[0].value : null;
    },
    description() {
      const element = findXMLElement(this.fileContent, 'Description');
      return element ? element[0].value : null;
    },
    urls() {
      const elements = findXMLElement(this.fileContent, 'Url');
      return elements ? elements : null;
    },
    image() {
      const element = findXMLElement(this.fileContent, 'Image');
      return element ? element[0].value : null;
    },
    inputEncoding() {
      const element = findXMLElement(this.fileContent, 'InputEncoding');
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
  created() {
    this.getOpenSearchFileContent();
  },
  methods: {
    absoluteUrl(url) {
      if (!url) return;
      return url.startsWith('http') ? url : new URL(this.head.url).origin + url;
    },
    getOpenSearchFileContent() {
      const request = new XMLHttpRequest();
      request.onreadystatechange = e => {
        const { readyState, response, status } = e.target;
        if (readyState === 4 && status === 200) {
          this.fileContent = response;
        }
      };
      request.onerror = () => {
        throw new Error('An error occurred, request failed.');
      };
      request.open('GET', this.fileUrl, true);
      request.send();
    },
  },
};
</script>

<style>
  .opensearch__preview {
    margin-bottom: .5em;
    padding: 0;
    border: none;
    height: 140px;
  }

  .opensearch__preview-caption {
    color: var(--label-color);
  }
</style>
