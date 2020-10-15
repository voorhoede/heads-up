<template>
  <div>
    <panel-section title="Rel">
      <collapsible-list :data="linkListData" />
    </panel-section>

    <panel-section title="Resources">
      <resource-list>
        <li>
          <external-link href="https://htmlhead.dev/">
            Guide to HTML5 <code>&lt;head&gt;</code> elements
          </external-link>
        </li>
      </resource-list>
    </panel-section>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { CollapsibleList, ExternalLink, PanelSection, ResourceList } from '../components'

  export default {
    components: { CollapsibleList, ExternalLink, PanelSection, ResourceList },
    computed: {
      ...mapState(['head']),
      linkListData() {
        return this.head.link
      },
    },
  }
</script>
