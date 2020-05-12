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
          :value="item.value"
          :key-name="item.keyName"
          :schema="schema"
        >
          <template v-slot:default>
            {{ item.title }}
          </template>
        </properties-item>
      </properties-list>
    </panel-section>

    <panel-section title="Resources">
      <resource-list>
        <li>
          <external-link href="https://developer.mozilla.org/en-US/docs/Web/OpenSearch">
            MDN web docs: OpenSearch description format
          </external-link>
        </li>
      </resource-list>
    </panel-section>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { ExternalLink, PanelSection, PropertiesItem, PropertiesList, ResourceList } from '../components'
  import getTheme from '../lib/theme'
  import { findLinkHref, findXMLElement } from '../lib/find-meta'
  import schema  from '../lib/schemas/opensearch-schema'

  export default {
    components: { ExternalLink, PanelSection, PropertiesItem, PropertiesList, ResourceList },
    data() {
      return {
        fileContent: '',
      }
    },
    computed: {
      ...mapState(['head']),
      hasOpenSearchFile() {
        return this.fileUrl && this.fileContent
      },
      themeClass() {
        /**
         * class '-theme-with-dark-background' is taken from original dev tools repo
         * src: https://github.com/ChromeDevTools/devtools-frontend/blob/02a851d01de158d8c0a8fd1d3af06649b5379bd6/front_end/ui/inspectorStyle.css
         */
        return getTheme() === 'dark' ? '-theme-with-dark-background' : ''
      },
      previewUrl() {
        const params = new URLSearchParams()
        params.set('title', 'YouTube')
        params.set('theme', this.themeClass)

        return `/opensearch-preview/opensearch-preview.html?${params}`
      },
      fileUrl() {
        return findLinkHref(this.head, 'search')
      },
      linkListData() {
        return this.head.link
      },
      shortName() {
        const element = findXMLElement(this.fileContent, 'ShortName')
        return element ? element[0].value : null
      },
      description() {
        const element = findXMLElement(this.fileContent, 'Description')
        return element ? element[0].value : null
      },
      url() {
        const element = findXMLElement(this.fileContent, 'Url')
        return element ? element[0].attributes.template : null
      },
      image() {
        const element = findXMLElement(this.fileContent, 'Image')
        return element ? element[0].value : null
      },
      inputEncoding() {
        const element = findXMLElement(this.fileContent, 'InputEncoding')
        return element ? element[0].value : null
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
            keyName: 'url',
            title: 'Url',
            value: this.url,
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
        ]
      },
      schema() { return schema }
    },
    created() {
      this.getOpenSearchFileContent()
    },
    methods: {
      getOpenSearchFileContent() {
        const request = new XMLHttpRequest();
        request.onreadystatechange = (e) => {
          const { readyState, response, status } = e.target
          if (readyState === 4 && status === 200) {
            this.fileContent = response
          }
        }
        request.onerror = () => {
          throw new Error('An error occurred, request failed.')
        }
        request.open('GET', this.fileUrl, true)
        request.send()
      },
    },
  }
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
