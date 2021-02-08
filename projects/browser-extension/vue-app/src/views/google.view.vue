<template>
  <div class="google">
    <tab-selector v-model="openTab" :tabs="TABS"/>

    <panel-section v-if="openTab === 'mobile'" title="Preview">
      <preview-iframe
        :url="previewUrl"
        :loading-height="26"
        iframeClass="google__preview"
      >
        <template v-slot:caption>
          Preview based on <external-link href="https://google.com/">google.com</external-link> (Updated on Jan 26, 2021).
        </template>
      </preview-iframe>
    </panel-section>

    <panel-section v-if="openTab === 'desktop'" title="Preview">
      <preview-iframe
        :url="previewUrl"
        :loading-height="26"
        iframeClass="google__preview"
      >
        <template v-slot:caption>
          Preview based on <external-link href="https://google.com/">google.com</external-link> (Updated on Jan 26, 2021).
        </template>
      </preview-iframe>
    </panel-section>

    <panel-section title="Resources">
      <ul class="resource-list">
        <li>
          Coming soon...
        </li>
      </ul>
    </panel-section>
  </div>
</template>

<script>
import ExternalLink from '@shared/components/external-link';
import PanelSection from '@shared/components/panel-section';
import PreviewIframe from '@shared/components/preview-iframe';
import TabSelector from '@shared/components/tab-selector';

const TABS = [
  {
    label: 'Mobile',
    value: 'mobile',
  },
  {
    label: 'Desktop',
    value: 'desktop',
  },
];

export default {
  components: {
    ExternalLink,
    PanelSection,
    PreviewIframe,
    TabSelector,
  },
  data() {
    return {
      TABS,
      openTab: TABS[0].value,
    };
  },
  computed: {
    previewUrl() {
      return this.openTab === 'mobile'
        ? '/previews/google-rich-snippets/article-mobile.html'
        : '/previews/google-rich-snippets/article-desktop.html';
    },
  },
};
</script>
