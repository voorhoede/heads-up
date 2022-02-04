<template>
  <div class="link">
    <panel-section title="Rel">
      <div v-if="!linkData.length" class="warning-message">
        <app-icon name="warning" />
        <p>No link properties detected.</p>
      </div>
      <collapsible-list v-else :data="linkData" />
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
  </div>
</template>

<script>
import { computed } from 'vue';

import AppIcon from '@shared/components/app-icon';
import PanelSection from '@shared/components/panel-section';
import CollapsibleList from '@shared/components/collapsible-list';
import ExternalLink from '@shared/components/external-link';

export default {
  props: {
    headData: {
      type: Object,
      required: true,
    },
  },

  setup: props => {
    const linkData = computed(() => props.headData.head.link);

    return {
      linkData,
    };
  },
  components: {
    PanelSection,
    CollapsibleList,
    ExternalLink,
    AppIcon,
  },
};
</script>

<style>
  .collapsible-list__section:not(:last-child)::after,
  .collapsible-list__section summary::before,
  .collapsible-list__list-item::before {
    display: none;
  }

  .collapsible-list__list {
    margin-left: 0;
  }

  .collapsible-list__list-item,
  .collapsible-list__property-table > :not(summary) {
    margin-left: 0.375rem;
    padding-left: 0.625rem;
    border-left: 1px solid var(--color-gray);
  }
</style>
