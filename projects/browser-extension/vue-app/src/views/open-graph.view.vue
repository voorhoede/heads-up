<template>
  <div>
    <panel-section title="Properties">
      <properties-list>
        <properties-item
          v-for="(item, index) in ogMeta"
          :key="index"
          :value="item.content"
          :key-name="item.property"
          :refresh-on="ogMeta"
        >
          <template #default>
            {{ item.property }}
          </template>
        </properties-item>
      </properties-list>
    </panel-section>

    <panel-section title="Resources">
      <ul class="resource-list">
        <li>
          <external-link href="https://ogp.me/">
            The Open Graph Protocol
          </external-link>
        </li>
      </ul>
    </panel-section>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PanelSection from '@shared/components/panel-section';
import ExternalLink from '@shared/components/external-link';
import PropertiesItem from '@shared/components/properties-item';
import PropertiesList from '@shared/components/properties-list';

export default {
  components: { ExternalLink, PanelSection, PropertiesItem, PropertiesList },
  computed: {
    ...mapState([ 'head' ]),
    ogMeta() {
      return this.head.meta
        .filter(meta => meta.property && meta.property.startsWith('og:'));
    },
  },
};
</script>
