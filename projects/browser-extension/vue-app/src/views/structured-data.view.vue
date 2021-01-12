<template>
  <div>
    <panel-section title="Properties">
      <pre>
{{ structuredData }}
      </pre>
    </panel-section>
    <panel-section title="Resources">
      <ul class="resource-list">
        <li>
          <external-link href="https://schema.org/">
            Schema.org
          </external-link>
        </li>
      </ul>
    </panel-section>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ExternalLink from '@shared/components/external-link';
import PanelSection from '@shared/components/panel-section';

export default {
  components: {
    ExternalLink,
    PanelSection,
  },
  computed: {
    ...mapState([ 'structuredData' ]),
  },
};
</script>
