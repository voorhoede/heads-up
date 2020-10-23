<template>
  <div>
    <panel-section title="Rel">
      <collapsible-list :data="linkListData" />
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
import PanelSection from '@shared/components/panel-section';
import CollapsibleList from '@shared/components/collapsible-list';
import ExternalLink from '@shared/components/external-link';

export default {
  components: { CollapsibleList, ExternalLink, PanelSection },
  computed: {
    ...mapState([ 'head' ]),
    linkListData() {
      return this.head.link;
    },
  },
};
</script>
