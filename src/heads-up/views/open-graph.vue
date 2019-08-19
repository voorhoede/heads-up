<template>
  <div>
     <panel-section title="Properties">
      <properties-list>
        <template v-for="meta in ogMeta">
          <dt :key="`${meta.property}-key`">{{ meta.property }}</dt>
          <dd :key="`${meta.property}-value`">{{ meta.content }}</dd>
        </template>
      </properties-list>
    </panel-section>

    <panel-section title="Resources">
      <resource-list>
        <li>
          <external-link href="https://ogp.me/">The Open Graph Protocol</external-link>
        </li>
      </resource-list>
    </panel-section>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { ExternalLink, PanelSection, PropertiesList, ResourceList } from '../components'

  export default {
    components: { ExternalLink, PanelSection, PropertiesList, ResourceList },
    computed: {
      ...mapState(['head']),
      ogMeta() {
        return this.head.meta
          .filter(meta => meta.property && meta.property.startsWith('og:'))
      }
    },
  }
</script>
