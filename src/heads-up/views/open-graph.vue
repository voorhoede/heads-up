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
      <ul>
        <li>
          <external-link href="https://ogp.me/">The Open Graph Protocol</external-link>
        </li>
      </ul>
    </panel-section>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { ExternalLink, PanelSection, PropertiesList } from '../components'

  export default {
    components: { ExternalLink, PanelSection, PropertiesList },
    computed: {
      ...mapState(['head']),
      ogMeta() {
        return this.head.meta
          .filter(meta => meta.property && meta.property.startsWith('og:'))
      }
    },
  }
</script>
