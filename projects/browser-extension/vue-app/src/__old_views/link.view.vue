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
import { mapState } from 'vuex';

import AppIcon from '@shared/components/app-icon';
import CollapsibleList from '@shared/components/collapsible-list';
import ExternalLink from '@shared/components/external-link';
import PanelSection from '@shared/components/panel-section';

export default {
  components: { AppIcon, CollapsibleList, ExternalLink, PanelSection },
  computed: {
    ...mapState([ 'head' ]),
    linkData() {
      return this.head.link;
    },
  },
};
</script>
