<template>
  <panel-section title="Properties">
    <dl>
      <div v-if="title">
        <dt>Title:</dt>
        <dd>{{ title }}</dd>
      </div>
      <div v-if="lang">
        <dt>Language:</dt>
        <dd>{{ lang }}</dd>
      </div>
      <div v-if="description">
        <dt>Description:</dt>
        <dd>{{ description }}</dd>
      </div>
    </dl>
  </panel-section>

  <panel-section title="Resources">
    <ul class="resource-list">
      <li>
        <external-link href="https://htmlhead.dev/">
          Guide to HTML5 <code>&lt;head&gt;</code> elements
        </external-link>
      </li>
    </ul>
  </panel-section>
</template>

<script>
import { computed } from 'vue';
import useHead from '@/composables/use-head';
import PanelSection from '@shared/components/panel-section';
import ExternalLink from '@shared/components/external-link.vue';

export default {
  setup: () => {
    const headData = useHead().data;
    const title = computed(() => (headData?.value?.general?.title));
    const lang = computed(() => (headData?.value?.general?.lang));
    const description = computed(() => (headData?.value?.general?.description));

    return {
      headData,
      title,
      lang,
      description,
    };
  },

  components: {
    PanelSection,
    ExternalLink,
  },
};
</script>
