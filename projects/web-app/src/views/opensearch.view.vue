<template>
  <panel-section title="Preview">
    <div v-if="!hasOpenSearchFile" class="warning-message">
      <WarningIcon class="icon" />
      <p>No OpenSearch file detected.</p>
    </div>
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
        <external-link :href="fileUrl">{{ fileUrl }}</external-link>
      </figcaption>
    </figure>
  </panel-section>
  <panel-section v-if="hasOpenSearchFile" title="Tags">
    <properties-list>
      <properties-item
        v-for="item in opensearchData"
        :key="item.keyName"
        :value="item.keyName !== 'urls' && item.keyName !== 'image' ? item.value : null"
        :key-name="item.keyName"
        :schema="schema"
        :refresh-on="opensearchData"
      >
        <template #default>
          {{ item.title }}
        </template>
        <template v-if="item.keyName === 'urls'" #value>
          <p v-for="(url, index) in item.value" :key="index">
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
        <template v-else-if="item.keyName === 'image'" #value>
          <img :src="absoluteUrl(item.value)" alt="" />
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
</template>

<script>
import { computed, ref } from 'vue';
import useHead from '@/composables/use-head';
import createAbsoluteUrl from '@shared/lib/create-absolute-url';
import { findLinkHref, findXMLElement } from '@shared/lib/find-meta';
import getTheme from '@shared/lib/theme';
import schema from '@shared/lib/schemas/opensearch-schema';
import ExternalLink from '@shared/components/external-link.vue';
import PanelSection from '@shared/components/panel-section.vue';
import PropertiesList from '@shared/components/properties-list.vue';
import PropertiesItem from '@shared/components/properties-item.vue';
import WarningIcon from '@shared/assets/icons/warning.svg';

export default {
  setup: () => {
    const headData = useHead().data;
    const fileContent = ref('');
    const hasOpenSearchFile = computed(() => fileUrl.value && fileContent.value);
    const metaTagValue = computed(() => findLinkHref(headData.value.head, 'search'));
    const themeClass = computed(() => getTheme() === 'dark' ? '-theme-with-dark-background' : '');
    const previewUrl = computed(() => {
      const params = new URLSearchParams();
      params.set('title', shortName.value);
      params.set('theme', themeClass.value);
      return `/previews/opensearch/opensearch.html?${ params }`;
    });
    const fileUrl = computed(() => {
      return metaTagValue.value && metaTagValue.value.startsWith('/')
        ? headData.value.head.domain + metaTagValue.value
        : metaTagValue.value;
    });
    const shortName = computed(() => {
      const element = findXMLElement(fileContent.value, 'ShortName');
      return element ? element[0].value : null;
    });
    const description = computed(() => {
      const element = findXMLElement(fileContent.value, 'Description');
      return element ? element[0].value : null;
    });
    const urls = computed(() => {
      const elements = findXMLElement(fileContent.value, 'Url');
      return elements ? elements : null;
    });
    const image = computed(() => {
      const element = findXMLElement(fileContent.value, 'Image');
      return element ? element[0].value : null;
    });
    const inputEncoding = computed(() => {
      const element = findXMLElement(fileContent.value, 'InputEncoding');
      return element ? element[0].value : null;
    });
    const opensearchData = computed(() => {
      return [
        {
          keyName: 'shortname',
          title: 'ShortName',
          value: shortName.value,
        },
        {
          keyName: 'description',
          title: 'Description',
          value: description.value,
        },
        {
          keyName: 'urls',
          title: 'Url(s)',
          value: urls.value,
        },
        {
          keyName: 'image',
          title: 'Image',
          value: image.value,
        },
        {
          keyName: 'input-encoding',
          title: 'InputEncoding',
          value: inputEncoding.value,
        },
      ];
    });

    const absoluteUrl = url => createAbsoluteUrl(headData.value.head, url);
    const getFileContent = () => {
      fetch(fileUrl.value)
        .then(res => res.text())
        .then(text => fileContent.value = text)
        .catch(error => console.error(error));
    };

    return {
      schema,
      fileContent,
      hasOpenSearchFile,
      metaTagValue,
      themeClass,
      previewUrl,
      fileUrl,
      shortName,
      description,
      urls,
      image,
      inputEncoding,
      opensearchData,
      absoluteUrl,
      getFileContent,
    };
  },
  components: {
    ExternalLink,
    PanelSection,
    PropertiesItem,
    PropertiesList,
    WarningIcon,
  },
  created() {
    this.getFileContent();
  },
};
</script>

<style>
  .opensearch__preview {
    margin-bottom: 1rem;
    padding: 0;
    border: none;
    height: 140px;
  }
</style>
