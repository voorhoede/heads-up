<template>
  <div class="open-search">
    <panel-section title="Preview">
      <div v-if="!hasOpenSearchFile" class="warning-message">
        <app-icon name="warning" />
        <p>No OpenSearch file detected.</p>
      </div>
      <open-search-preview
        v-if="hasOpenSearchFile"
        :data="previewData"
      />
      <p v-if="hasOpenSearchFile">Preview based on source file: <external-link :href="fileUrl">{{ fileUrl }}</external-link>.</p>
    </panel-section>
    <panel-section v-if="hasOpenSearchFile" title="Tags">
      <properties-list>
        <properties-item
          v-for="item in metaData"
          :key="item.term"
          :term="item.term"
          :value="item.value"
          :image="item.image"
          :type="item.type"
          :tooltip="getTooltipInfo(item.term)"
          :validation="validation"
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
import { computed, ref, onMounted, watch } from 'vue';
import createAbsoluteUrl from '@shared/lib/create-absolute-url';
import { findLinkHref, findXMLElement } from '@shared/lib/find-meta';
import getTheme from '@shared/lib/theme';
import validate from '@shared/lib/validate';
import { schema, info } from './schema';

import AppIcon from '@shared/components/app-icon';
import ExternalLink from '@shared/components/external-link';
import OpenSearchPreview from '@shared/components/rich-previews/open-search-preview';
import PanelSection from '@shared/components/panel-section';
import PropertiesList from '@shared/components/properties-list';
import PropertiesItem from '@shared/components/properties-item';

export default {
  props: {
    headData: {
      type: Object,
      required: true,
    },
  },

  setup: props => {
    const validation = ref({});
    const fileContent = ref('');
    const hasOpenSearchFile = computed(() => fileUrl.value && fileContent.value);
    const metaTagValue = computed(() => findLinkHref(props.headData.head, 'search'));
    const previewData = computed(() => ({
      title: shortName.value,
      theme: getTheme(),
    }));
    const fileUrl = computed(() => {
      return createAbsoluteUrl(props.headData.head, metaTagValue.value);
    });
    const shortName = computed(() => {
      const elements = findXMLElement(fileContent.value, 'ShortName');
      const values = elements?.map(el => el.value) ?? [];
      return values.length <= 1 ? values[0] : values;
    });
    const description = computed(() => {
      const elements = findXMLElement(fileContent.value, 'Description');
      const values = elements?.map(el => el.value) ?? [];
      return values.length <= 1 ? values[0] : values;
    });
    const inputEncoding = computed(() => {
      const element = findXMLElement(fileContent.value, 'InputEncoding');
      return element ? element[0].value : undefined;
    });
    const outputEncoding = computed(() => {
      const element = findXMLElement(fileContent.value, 'OutputEncoding');
      return element ? element[0].value : undefined;
    });
    const urls = computed(() => {
      const elements = findXMLElement(fileContent.value, 'Url');
      return elements ? elements : undefined;
    });
    const image = computed(() => {
      const element = findXMLElement(fileContent.value, 'Image');
      return element ? element[0].value : undefined;
    });
    const metaData = computed(() => ([
      {
        term: 'shortname',
        value: shortName.value,
        required: true,
      },
      {
        term: 'description',
        value: description.value,
      },
      {
        term: 'input-encoding',
        value: inputEncoding.value,
      },
      {
        term: 'output-encoding',
        value: outputEncoding.value,
      },
      {
        term: 'urls',
        value: urls?.value?.length ? formatUrlsObject(urls.value) : [],
        type: 'urls',
      },
      {
        term: 'image',
        value: image.value,
        image: {
          href: image.value,
          url: absoluteUrl(image.value),
        },
        type: 'image',
      },
    ]));

    const absoluteUrl = url => createAbsoluteUrl(props.headData.head, url);
    const formatUrlsObject = urls => urls.map(item => {
      const templateAttr = item.attributes.find(({ name }) => name === 'template');
      const url = templateAttr ? templateAttr.value : null;
      const attributes = item.attributes
        .filter(({ name }) => name !== 'template')
        .reduce((obj, { name, value }) => (
          Object.assign(obj, { [name]: value })
        ), {});

      return { url, attributes };
    });
    const getFileContent = value => {
      fetch(value)
        .then(res => res.text())
        .then(text => fileContent.value = text)
        .catch(error => {
          fileContent.value = '';
          console.error(error);
        });
    };

    const getTooltipInfo = term => (info[term] ?? {});

    watch(fileContent, (value, oldValue) => {
      if (value !== oldValue) {
        validate(metaData.value, schema)
          .then(result => validation.value = result);
      }
    });

    watch(fileUrl, (value, oldValue) => {
      fileContent.value = '';

      if (value !== oldValue) {
        getFileContent(value);
      }
    });

    onMounted(() => getFileContent(fileUrl.value));

    return {
      description,
      fileContent,
      fileUrl,
      getTooltipInfo,
      hasOpenSearchFile,
      image,
      inputEncoding,
      metaData,
      metaTagValue,
      outputEncoding,
      previewData,
      shortName,
      urls,
      validation,
    };
  },
  components: {
    ExternalLink,
    OpenSearchPreview,
    PanelSection,
    PropertiesItem,
    PropertiesList,
    AppIcon,
  },
};
</script>
